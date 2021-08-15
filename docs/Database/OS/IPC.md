## 进程间通信

前面我们学习了一下进程，我们知道多，进程间的地址空间相对独立。进程与进程间不能像线程间通过全局变量通信。 如果想进程间通信，就需要其他机制。

  

  常用的进程间通信方式有这几种

A.传统的进程间通信方式

无名管道(pipe)、有名管道(fifo)和信号(signal)

B.System v IPC对象

共享内存(share memory)、消息队列(message queue)和信号灯(semaphore)

C.BSD

套接字(socket)

一、无名管道(pipe)

1.1管道的介绍

A.管道是半双工的，数据只能向一个方向流动；需要双方通信时，需要建立起两个管道

**B.只能用于父子进程或者兄弟进程之间(具有亲缘关系的进程);**

C.单独构成一种独立的文件系统：管道对于管道两端的进程而言，就是一个文件，但它不是普通的文件，它不属于某种文件系统，而是自立门户，**单独构成一种文件系统，并且只存在与内存中**。

**D.数据的读出和写入：一个进程向管道中写的内容被管道另一端的进程读出。写入的内容每次都添加在管道缓冲区的末尾，并且每次都是从缓冲区的头部读出数据。
**
1.2管道的创建



解释如下 :





从以上我们可以知道:

管道是基于文件描述符的通信方式。当一个管道建立时，它会创建两个文件描述符fd[0]和fd[1]。**其中fd[0]固定用于读管道，而fd[1]固定用于写管道**,一般文件I/O的函数都可以用来操作管道(lseek除外)。





我们来测试一下管道的大小:

案例一、





单独创建一个无名管道，并没有实际的意义。我们一般是在一个进程在由pipe()创建管道后，一般再由fork一个子进程，然后通过管道实现父子进程间的通信(因此也不难推出，只要两个进程中存在亲缘关系,这里的亲缘关系指的是具有共同的祖先，都可以采用管道方式来进行通信）。

1.3无名管道的读写规则探究

A.从管道中读取数据

<1>写端不存在时,此时则认为已经读到了数据的末尾，读函数返回的读出字节数为0；

```cpp
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main()
{
    int n;
    int fd[2];
    int count = 0;
    char buf[100] = {0};

    if(pipe(fd) < 0)
    {
        perror("Fail to create pipe");
        exit(EXIT_FAILURE);
    }
    
    close(fd[1]);
    
    if((n = read(fd[0],buf,sizeof(buf))) < 0)
    {
        perror("Fail to read pipe");
        exit(EXIT_FAILURE);
    }

    printf("Rread %d bytes : %s.\n",n,buf);

    return 0;
}
```

运行结果:





<2>写端存在时，如果请求的字节数目大于PIPE_BUF(ubuntu操作系统为65536)，则返回管道中现有的数据字节数，如果请求的字节数目不大于PIPE_BUF，则放回管道中现有数据字节数（此时，管道中数据量小于请求的数据量）；或者返回请求的字节数(此时，管道中数据量不小于请求的数据量)

案例二、父进程向管道中写数据，子进程从管道中读取数据

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

#define N 10
#define MAX 100

int child_read_pipe(int fd)
{
    char buf[N];
    int n = 0;

    while(1)
    {
        n = read(fd,buf,sizeof(buf));
        buf[n] = '\0';

        printf("Read %d bytes : %s.\n",n,buf);

        if(strncmp(buf,"quit",4) == 0)
            break;
    }

    return 0;
}

int father_write_pipe(int fd)
{
    char buf[MAX] = {0};
    
    while(1)
    {
        printf(">");
        fgets(buf,sizeof(buf),stdin);
        buf[strlen(buf)-1] = '\0';
        write(fd,buf,strlen(buf));
        usleep(500);
        if(strncmp(buf,"quit",4) == 0)
            break;
    }

    return 0;
}

int main()
{
    int pid;
    int fd[2];

    if(pipe(fd) < 0)
    {
        perror("Fail to pipe");
        exit(EXIT_FAILURE);
    }

    if((pid = fork()) < 0)
    {
        perror("Fail to fork");
        exit(EXIT_FAILURE);

    }else if(pid == 0){

        close(fd[1]);
        child_read_pipe(fd[0]);

    }else{
        
        close(fd[0]);
        father_write_pipe(fd[1]);
    }
    
    exit(EXIT_SUCCESS);
}
```

运行结果:





从以上验证我们可以看到：

<1>当写端存在时，管道中没有数据时，读取管道时将阻塞

<2>当读端请求读取的数据大于管道中的数据时，此时读取管道中实际大小的数据

<3>当读端请求读取的数据小于管道中的数据时，此时放回请求读取的大小数据

B.向管道中写入数据:

向管道中写入数据时，linux将不保证写入的原子性，管道缓冲区一有空闲区域，写进程就会试图向管道写入数据。当管道满时，读进程不读走管道缓冲区中的数据，那么写操作将一直阻塞。

注意：只有管道的读端存在时，向管道中写入数据才有意义。否则，向管道中写入数据的进程将收到内核传来的SIGPIPE信号，应用程序可以处理该信号，也可以忽略(默认动作则是使应用程序终止)。

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

int main()
{
    int pid;
    int n;
    int fd[2];
    char buf[1000 * 6] = {0};

    if(pipe(fd) < 0)
    {
        perror("Fail to pipe");
        exit(EXIT_FAILURE);
    }

    if((pid = fork()) < 0)
    {
        perror("Fail to fork");
        exit(EXIT_FAILURE);

    }else if(pid == 0){
        
        close(fd[1]);
        sleep(5);
        close(fd[0]);
        printf("Read port close.\n");
        sleep(3);

    }else{

        close(fd[0]);
        
        while(1)
        {
            n = write(fd[1],buf,sizeof(buf));
            printf("Write %d bytes to pipe.\n",n);
        }
    
    }

    exit(EXIT_SUCCESS);
}
```

运行结果:





**探究发现，当管道数据满时，此时再向管道写数据，写端将阻塞。当读端不存在时，写端写数据，内核将向其发送SIGPIPE信号，默认是终止进程。**

案例3：父进程读取文件的内容，写到无名管道，子进程从管道中读取内容写到另一个文件。

//**思考：父进程什么时候结束，子进程什么时候结束?**

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>

#define MAX 100

int child_work(int pfd,char *fname)
{
    int n,fd;
    char buf[MAX];

    if((fd = open(fname,O_WRONLY | O_CREAT | O_TRUNC,0666)) < 0)
    {
        fprintf(stderr,"Fail to open %s : %s.\n",fname,strerror(errno));
        return -1;
    }

    while( n = read(pfd,buf,sizeof(buf)) )
    {
        write(fd,buf,n);
    }
    
    close(pfd);

    return 0;
}

int father_work(int pfd,char *fname)
{
    int fd,n;
    char buf[MAX];

    if((fd = open(fname,O_RDONLY)) < 0)
    {
        fprintf(stderr,"Fail to open %s : %s.\n",fname,strerror(errno));
        return -1;
    }

    while(n = read(fd,buf,sizeof(buf)))
    {
        write(pfd,buf,n);
    }
    
    close(pfd);

    return 0;
}

int main(int argc,char *argv[])
{
    int pid;
    int fd[2];

    if(argc < 3)
    {
        fprintf(stderr,"usage %s argv[1] argv[2].\n",argv[0]);
        exit(EXIT_FAILURE);
    }

    if(pipe(fd) < 0)
    {
        perror("Fail to pipe");
        exit(EXIT_FAILURE);
    }

    if((pid = fork()) < 0)
    {
        perror("Fail to fork");
        exit(EXIT_FAILURE);
    
    }else if(pid == 0){
        
        close(fd[1]);
        child_work(fd[0],argv[2]);
    
    }else{
    
        close(fd[0]);
        father_work(fd[1],argv[1]);
        wait(NULL);
    }

    exit(EXIT_SUCCESS);
}
```

二、有名管道

1.1有名管道的介绍

无名管道，由于没有名字，只能用于亲缘关系的进程间通信.。为了克服这个缺点，提出了有名管道(FIFO)。

FIFO不同于无名管道之处在于它提供了一个路径名与之关联，**以FIFO的文件形式存在于文件系统中**，这样，**即使与FIFO的创建进程不存在亲缘关系的进程，只要可以访问该路径，就能够彼此通过FIFO相互通信**，因此，通过FIFO不相关的进程也能交换数据。值的注意的是，FIFO严格遵循先进先出(first in first out),对管道及FIFO的读总是从开始处返回数据，对它们的写则把数据添加到末尾。它们不支持诸如lseek()等文件定位操作。

注意：有名管道的名字存在于文件系统中，内容存放在内存中。

1.2有名管道的创建





该函数的第一个参数是一个普通的路劲名，也就是创建后FIFO的名字。第二个参数与打开普通文件的open()函数中的mode参数相同。**如果mkfifo的一个参数是一个已经存在路劲名时，会返回EEXIST错误，所以一般典型的调用代码首先会检查是否返回该错误，如果确实返回该错误，那么只要调用打开FIFO的函数就可以了。**

1.3有名管道的打开规则

**有名管道比无名管道多了一个打开操作：open**

FIFO的打开规则:

**如果当前打开操作时为读而打开FIFO时，若已经有相应进程为写而打开该FIFO，则当前打开操作将成功返回；否则，可能阻塞到有相应进程为写而打开该FIFO(当前打开操作设置了阻塞标志)；或者，成功返回(当前打开操作没有设置阻塞标志)。**

**如果当前打开操作时为写而打开FIFO时，如果已经有相应进程为读而打开该FIFO,则当前打开操作将成功返回；否则，可能阻塞直到有相应进程为读而打开该FIFO(当前打开操作设置了阻塞标志)；或者，返回ENIO错误(当期打开操作没有设置阻塞标志)。**

案例:

A.open for  write



```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(int argc,char *argv[])
{
    int fd;

    if(argc < 2)
    {
        fprintf(stderr,"usage : %s argv[1].\n",argv[0]);
        exit(EXIT_FAILURE);
    }
    
    if(mkfifo(argv[1],0666) < 0 && errno != EEXIST)
    {
        fprintf(stderr,"Fail to mkfifo %s : %s.\n",argv[1],strerror(errno));
        exit(EXIT_FAILURE);
    }

    if((fd = open(argv[1],O_WRONLY)) < 0)
    {
        fprintf(stderr,"Fail to open %s : %s.\n",argv[1],strerror(errno));
        exit(EXIT_FAILURE);
    }

    printf("open for write success.\n");
    
    return 0;
}
```

**探究发现，如果open时没有使用O_NONBLOCK参数，我们发现不论读端还是写端先打开，先打开者都会阻塞，一直阻塞到另一端打开。**

读者自己可以探究，如果open时使用了O_NONBLOCK参数，此时打开FIFO 又会是什么情况?

1.4有名管道的读写规则

A.从FIFO中读取数据

约定：如果一个进程为了从FIFO中读取数据而以阻塞的方式打开FIFO， 则称内核为该进程的读操作设置了阻塞标志

<1>如果有进程为写而打开FIFO，且当前FIFO内没有数据，则对于设置了阻塞标志的读操作来说，将一直阻塞。对于没有设置阻塞标志读操作来说返回-1,当前errno值为EAGAIN,提醒以后再试。

<2>对于设置阻塞标志的读操作说，造成阻塞的原因有两种:当前FIFO内有数据，但有其他进程正在读这些数据；另外就是FIFO内没有数据。解阻塞的原因则是FIFO中有新的数据写入,不论写入数据量的大小，也不论读操作请求多少数据量。

<3>如果没有进程写打开FIFO,则设置了阻塞标志的读操作会阻塞

<4>如果写端关闭，管道中有数据读取管道中的数据，如果管道中没有数据读端将不会继续阻塞，此时返回0。

注意：如果FIFO中有数据，则设置了阻塞标志的读操作不会因为FIFO中的字节数小于请求读的字节数而阻塞，此时，读操作会返回FIFO中现有的数据量。

B.向FIFO中写入数据

约定：如果一个进程为了向FIFO中写入数据而阻塞打开FIFO,那么称该进程内的写操作设置了阻塞标志。

对于设置了阻塞标志的写操作:

<1>当要写入的数据量不大于PIPE_BUF时，linux将保证写入的原子性。如果此时管道空闲缓冲区不足以容纳要写入的字节数，则进入睡眠，直到当缓冲区中能够容纳写入的字节数时，才开始进行一次性写操作。

<2>当要写入的数据量大于PIPE_BUF时，Linux将不再保证写入的原子性。FIFO缓冲区一有空闲区域，写进程就会试图向管道写入数据，写操作在写完所有请求写的数据后返回。

对于没有设置阻塞标志的写操作:

<1>当要写入的数据量大于PIPE_BUF时，linux将不再保证写入的原子性。在写满所有FIFO空闲缓冲区后，写操作返回。

<2>当要写入的数据量不大于PIPE_BUF时，linux将保证写入的原子性。如果当前FIFO空闲缓冲区能够容纳请求写入的字节数，写完后成功返回；如果当前FIFO空闲缓冲区不能够容纳请求写入的字节数，则返回EAGAIN错误，提醒以后再写。

注意：只有读端存在，写端才有意义。如果读端不在，写端向FIFO写数据，内核将向对应的进程发送SIGPIPE信号（默认终止进程）；

案例一、

write to FIFO

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

#define MAX 655360

int main(int argc,char *argv[])
{
    int n,fd;
    char buf[MAX];

    if(argc < 2)
    {
        fprintf(stderr,"usage : %s argv[1].\n",argv[0]);
        exit(EXIT_FAILURE);
    }
    
    if(mkfifo(argv[1],0666) < 0 && errno != EEXIST)
    {
        fprintf(stderr,"Fail to mkfifo %s : %s.\n",argv[1],strerror(errno));
        exit(EXIT_FAILURE);
    }

    if((fd = open(argv[1],O_WRONLY )) < 0)
    {
        fprintf(stderr,"Fail to open %s : %s.\n",argv[1],strerror(errno));
        exit(EXIT_FAILURE);
    }

    printf("open for write success.\n");

    while(1)
    {
        printf(">");
        scanf("%d",&n);

        n = write(fd,buf,n);
        printf("write %d bytes.\n",n);
    }
    
    exit(EXIT_SUCCESS);
}
```

read from FIFO

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

#define MAX 655360

int main(int argc,char *argv[])
{
    int fd,n;
    char buf[MAX];

    if(argc < 2)
    {
        fprintf(stderr,"usage : %s argv[1].\n",argv[0]);
        exit(EXIT_FAILURE);
    }
    
    if(mkfifo(argv[1],0666) < 0 && errno != EEXIST)
    {
        fprintf(stderr,"Fail to mkfifo %s : %s.\n",argv[1],strerror(errno));
        exit(EXIT_FAILURE);
    }

    if((fd = open(argv[1],O_RDONLY )) < 0)
    {
        fprintf(stderr,"Fail to open %s : %s.\n",argv[1],strerror(errno));
        exit(EXIT_FAILURE);
    }
    
    printf("open for read success.\n");

    while(1)
    {
        printf(">");
        scanf("%d",&n);
        
        n = read(fd,buf,n);
    
        printf("Read %d bytes.\n",n);

    }

    exit(EXIT_SUCCESS);
}
```

上一篇：[多线程编程](http://blog.chinaunix.net/uid-26833883-id-3224261.html)

下一篇：[进程间通信---共享内存](http://blog.chinaunix.net/uid-26833883-id-3230564.html)
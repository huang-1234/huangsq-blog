# 内存问题

## 内存泄漏和内存溢出的关系和一般解决问题思路

### 内存泄漏 memory leak :

> 是指程序在申请内存后，无法释放已申请的内存空间，一次内存泄漏似乎不会有大的影响，但内存泄漏堆积后的后果就是内存溢出

### 内存溢出 out of memory :

> 指程序申请内存时，没有足够的内存供申请者使用，或者说，给了你一块存储 int 类型数据的存储空间，但是你却存储 long 类型的数据，那么结果就是内存不够用，此时就会报错 OOM,即所谓的内存溢出。

### 二者的关系：

1.内存泄漏的堆积最终会导致内存溢出 2.内存溢出就是你要的内存空间超过了系统实际分配给你的空间，此时系统相当于没法满足你的需求，就会报内存溢出的错误。 3.内存泄漏是指你向系统申请分配内存进行使用(new)，可是使用完了以后却不归还(delete)，结果你申请到的那块内存你自己也不能再访问（也许你把它的地址给弄丢了），而系统也不能再次将它分配给需要的程序。就相当于你租了个带钥匙的柜子，你存完东西之后把柜子锁上之后，把钥匙丢了或者没有将钥匙还回去，那么结果就是这个柜子将无法供给任何人使用，也无法被垃圾回收器回收，因为找不到他的任何信息。 4.内存溢出：一个盘子用尽各种方法只能装 4 个果子，你装了 5 个，结果掉倒地上不能吃了。这就是溢出。比方说栈，栈满时再做进栈必定产生空间溢出，叫上溢，栈空时再做退栈也产生空间溢出，称为下溢。就是分配的内存不足以放下数据项序列,称为内存溢出。说白了就是我承受不了那么多，那我就报错。

### 内存泄漏的分类（按发生方式来分类）

> 1.常发性内存泄漏。发生内存泄漏的代码会被多次执行到，每次被执行的时候都会导致一块内存泄漏。
> 偶发性内存泄漏。发生内存泄漏的代码只有在某些特定环境或操作过程下才会发生。常发性和偶发性是相对的。对于特定的环境，偶发性的也许就变成了常发性的。所以测试环境和测试方法对检测内存泄漏至关重要。 2.一次性内存泄漏。发生内存泄漏的代码只会被执行一次，或者由于算法上的缺陷，导致总会有一块仅且一块内存发生泄漏。比如，在类的构造函数中分配内存，在析构函数中却没有释放该内存，所以内存泄漏只会发生一次。 3.隐式内存泄漏。程序在运行过程中不停的分配内存，但是直到结束的时候才释放内存。严格的说这里并没有发生内存泄漏，因为最终程序释放了所有申请的内存。但是对于一个服务器程序，需要运行几天，几周甚至几个月，不及时释放内存也可能导致最终耗尽系统的所有内存。所以，我们称这类内存泄漏为隐式内存泄漏。

### 内存溢出的原因及解决方法：

- 内存溢出原因：

> 1.内存中加载的数据量过于庞大，如一次从数据库取出过多数据； 2.集合类中有对对象的引用，使用完后未清空，使得 JVM 不能回收； 3.代码中存在死循环或循环产生过多重复的对象实体； 4.使用的第三方软件中的 BUG； 5.启动参数内存值设定的过小

- 内存溢出的解决方案：

> 第一步，修改 JVM 启动参数，直接增加内存。(-Xms，-Xmx 参数一定不要忘记加。)
> 第二步，检查错误日志，查看“OutOfMemory”错误前是否有其 它异常或错误。
> 第三步，对代码进行走查和分析，找出可能发生内存溢出的位置。
> 重点排查以下几点： 1.检查对数据库查询中，是否有一次获得全部数据的查询。一般来说，如果一次取十万条记录到内存，就可能引起内存溢出。这个问题比较隐蔽，在上线前，数据库中数据较少，不容易出问题，上线后，数据库中数据多了，一次查询就有可能引起内存溢出。因此对于数据库查询尽量采用分页的方式查询。 2.检查代码中是否有死循环或递归调用。 3.检查是否有大循环重复产生新对象实体。 4.检查对数据库查询中，是否有一次获得全部数据的查询。一般来说，如果一次取十万条记录到内存，就可能引起内存溢出。这个问题比较隐蔽，在上线前，数据库中数据较少，不容易出问题，上线后，数据库中数据多了，一次查询就有可能引起内存溢出。因此对于数据库查询尽量采用分页的方式查询。 5.检查 List、MAP 等集合对象是否有使用完后，未清除的问题。List、MAP 等集合对象会始终存有对对象的引用，使得这些对象不能被 GC 回收。
> 第四步，使用内存查看工具动态查看内存使用情况

### 其他的一些参考

由于 java 的 JVM 引入了垃圾回收机制，垃圾回收器会自动回收不再使用的对象，了解 JVM 回收机制的都知道 JVM 是使用引用计数法和可达性分析算法来判断对象是否是不再使用的对象，本质都是判断一个对象是否还被引用。那么对于这种情况下，由于代码的实现不同就会出现很多种内存泄漏问题（让 JVM 误以为此对象还在引用中，无法回收，造成内存泄漏）。

1、静态集合类，如 HashMap、LinkedList 等等。如果这些容器为静态的，那么它们的生命周期与程序一致，则容器中的对象在程序结束之前将不能被释放，从而造成内存泄漏。简单而言，长生命周期的对象持有短生命周期对象的引用，尽管短生命周期的对象不再使用，但是因为长生命周期对象持有它的引用而导致不能被回收。

2、各种连接，如数据库连接、网络连接和 IO 连接等。在对数据库进行操作的过程中，首先需要建立与数据库的连接，当不再使用时，需要调用 close 方法来释放与数据库的连接。只有连接被关闭后，垃圾回收器才会回收对应的对象。否则，如果在访问数据库的过程中，对 Connection、Statement 或 ResultSet 不显性地关闭，将会造成大量的对象无法被回收，从而引起内存泄漏。

3、变量不合理的作用域。一般而言，一个变量的定义的作用范围大于其使用范围，很有可能会造成内存泄漏。另一方面，如果没有及时地把对象设置为 null，很有可能导致内存泄漏的发生。
如上面这个伪代码，通过 readFromNet 方法把接受的消息保存在变量 msg 中，然后调用 saveDB 方法把 msg 的内容保存到数据库中，此时 msg 已经就没用了，由于 msg 的生命周期与对象的生命周期相同，此时 msg 还不能回收，因此造成了内存泄漏。

实际上这个 msg 变量可以放在 receiveMsg 方法内部，当方法使用完，那么 msg 的生命周期也就结束，此时就可以回收了。还有一种方法，在使用完 msg 后，把 msg 设置为 null，这样垃圾回收器也会回收 msg 的内存空间。

4、内部类持有外部类，如果一个外部类的实例对象的方法返回了一个内部类的实例对象，这个内部类对象被长期引用了，即使那个外部类实例对象不再被使用，但由于内部类持有外部类的实例对象，这个外部类对象将不会被垃圾回收，这也会造成内存泄露。

5、改变哈希值，当一个对象被存储进 HashSet 集合中以后，就不能修改这个对象中的那些参与计算哈希值的字段了，否则，对象修改后的哈希值与最初存储进 HashSet 集合中时的哈希值就不同了，在这种情况下，即使在 contains 方法使用该对象的当前引用作为的参数去 HashSet 集合中检索对象，也将返回找不到对象的结果，这也会导致无法从 HashSet 集合中单独删除当前对象，造成内存泄露

## Android 之内存溢出和内存泄漏的原因和解决方案

### 基础

JAVA 是在 JVM 所虚拟出的内存环境中运行的，内存分为三个区：堆、栈和方法区。

- 栈(stack)：是简单的数据结构，程序运行时系统自动分配，使用完毕后自动释放。优点：速度快。
- 堆(heap)：用于存放由 new 创建的对象和数组。在堆中分配的内存，一方面由 java 虚拟机自动垃圾回收器来管理，另一方面还需要程序员提供修养，防止内存泄露问题。
- 方法区(method)：又叫静态区，跟堆一样，被所有的线程共享。方法区包含所有的 class 和 static 变量。

### 概念

- 内存溢出（Out of Memory）：系统会给每个 APP 分配内存也就是 Heap Size 值。当 APP 占用的内存加上我们申请的内存资源超过了 Dalvik 虚拟机的最大内存时就会抛出的 Out Of Memory 异常。
- 内存泄漏（Memory Leak）：当一个对象不在使用了，本应该被垃圾回收器（JVM）回收。但是这个对象由于被其他正在使用的对象所持有，造成无法被回收的结果。内存泄漏最终会导致内存溢出。
- 内存抖动：内存抖动是指在短时间内有大量的对象被创建或者被回收的现象，主要是循环中大量创建、回收对象。这种情况应当尽量避免。
  它们三者的重要等级分别：内存溢出 > 内存泄露 > 内存抖动。
  内存溢出对我们的 App 来说，影响是非常大的。有可能导致程序闪退，无响应等现象，因此，我们一定要优先解决 OOM 的问题。
- 强引用：强引用是使用最普遍的引用。如果一个对象具有强引用，那垃圾回收器绝不会回收它。 当内存空间不足，Java 虚拟机宁愿抛出 OutOfMemoryError 错误，使程序异常终止，也不会靠随意回收具有强引用的对象来解决内存不足的问题。
- 软引用：如果一个对象只具有软引用，但内存空间足够时，垃圾回收器就不会回收它;直到虚拟机报告内存不够时才会回收， 只要垃圾回收器没有回收它，该对象就可以被程序使用。软引用可用来实现内存敏感的高速缓存。 软引用可以和一个引用队列(ReferenceQueue)联合使用，如果软引用所引用的对象被垃圾回收器回收，Java 虚拟机就会把这个软引用加入到与之关联的引用队列中。
- 弱引用：只具有弱引用的对象拥有更短暂的生命周期。在垃圾回收器线程扫描它所管辖的内存区域的过程中，一旦发现了只具有弱引用的对象，不管当前内存空间是否足够，都会回收它的内存。 不过，由于垃圾回收器是一个优先级很低的线程，因此不一定会很快发现那些只具有弱引用的对象。 弱引用可以和一个引用队列(ReferenceQueue)联合使用，如果弱引用所引用的对象被垃圾回收，Java 虚拟机就会把这个弱引用加入到与之关联的引用队列中。
- 虚引用：虚引用可以理解为虚设的引用，与其他几种引用都不同，虚引用并不会决定对象的生命周期。如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收。 虚引用主要用来跟踪对象被垃圾回收器回收的活动。
  虚引用与软引用和弱引用的一个区别在于：虚引用必须和引用队列 (ReferenceQueue)联合使用。 当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象的内存之前，把这个虚引用加入到与之 关联的引用队列中。 程序可以通过判断引用队列中是否已经加入了虚引用，来了解被引用的对象是否将要被垃圾回收。 如果程序发现某个虚引用已经被加入到引用队列，那么就可以在所引用的对象的内存被回收之前采取必要的行动。

### 关系

- 内存泄漏是造成应用程序 OOM 的主要原因之一。由于 Android 系统为每个应用程序分配的内存有限，当一个应用中产生的内存泄漏比较多时，就难免会导致应用所需要的内存超过这个系统分配的内存限额，这就造成了内存溢出而导致应用 Crash。
- 我们的 App 多次出现内存泄露，可能就会导致内存溢出。但是，我们的 App 出现内存溢出，不一定就是因为内存泄露，因为本身 Android 系统分配给每一个的 App 的空间就是那么一点。另外，内存泄露也不一定就会出现内存溢出，因为还是泄露的速度比较慢，系统将进程杀死了，也就不会内存溢出。不过，发现内存泄露，我们还是要第一时间解决。

### 危害

- 内存溢出：会触发 Java.lang.OutOfMemoryError，造成程序崩溃。
- 内存泄漏：过多的内存泄漏会造成内存溢出，同样也会造成相关 UI 的卡顿现象。

### 判断是否有内存泄露的工具

##### LeackCanary

##### Memory Monitor

##### DDMS

### 处理方式汇总

##### 强引用，软引用和弱引用

- 释放强引用，使用软引用和弱引用；

##### 大量的图片、音频、视频处理，当在内存比较低的系统上也容易造成内存溢出

- 建议使用第三方，或者 JNI 来进行处理；

##### Bitmap 对象的处理

- 不要在主线程中处理图片

- 使用 Bitmap 对象要用 recycle 释放

```java
 // Bitmap对象没有被回收
 if (!bitmapObject.isRecyled()) {
     // 释放
     bitmapObject.recycle();
     // 提醒系统及时回收
     System.gc();
     }
```

- 控制图片的大小，压缩大图，高效处理，加载合适属性的图片。
  当我们有些场景是可以显示缩略图的时候，就不要调用网络请求加载大图，例如在 RecyclerView 中，我们在上下滑动的时候，就不要去调用网络请求，当监听到滑动结束的时候，才去加载大图，以免上下滑动的时候产生卡顿现象。

##### 非静态内部类和匿名內部类 Handler、Thread、Runnable 等由于持有外部类 Activity 的引用，从而关闭 activity，线程未完成造成内存泄漏

- 在 Activity 中创建非静态内部类，非静态内部类会持有 Activity 的隐式引用，若内部类生命周期长于 Activity，会导致 Activity 实例无法被回收。（屏幕旋转后会重新创建 Activity 实例，如果内部类持有引用，将会导致旋转前的实例无法被回收）。

- 如果一定要使用内部类，就改用 static 内部类，在内部类中通过 WeakReference 的方式引用外界资源。对 Handler、Thread、Runnable 等使用弱引用，并且调用 removeCallbacksAndMessages 等移除。
  举例：在下面这段代码中存在一个非静态的匿名类对象 Thread，会隐式持有一个外部类的引用 MainActivity 。同理，若是这个 Thread 作为 MainActivity 的内部类而不是匿名内部类，他同样会持有外部类的引用。

```java
 public class MainActivity extends AppCompatActivity {
     @Override
     protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
         setContentView(R.layout.main);
         leakFun();
     }

     private void leakFun() {
         new Thread(new Runnable() {
             @Override
             public void run() {
                 try {
                     Thread.sleep(10 * 1000);
                 } catch (InterruptedException e) {
                     e.printStackTrace();
                 }
             }
         });
     }
 }
```

在线程休眠的这 10s 内，会一直隐式持有外部类的引用 MainActivity，如果在 10s 之前，销毁 MainActivity，就会报内存泄漏。同理，若是这个 Thread 作为 MainActivity 的内部类而不是匿名内部类，也会内存泄漏。
总而言之：如果 Activity 在销毁之前，任务还未完成， 那么将导致 Activity 的内存资源无法回收，造成内存泄漏。
解决办法：在这里只需要将为 Thread 匿名类定义成静态的内部类即可（静态的内部类不会持有外部类的一个隐式引用）。或保证在 Activity 在销毁之前，完成任务！

- 在关闭 Activity 的时候停掉你的后台线程。线程停掉了，就相当于切断了 Handler 和外部连接的线，Activity 自然会在合适的时候被回收。

##### 资源未及时关闭造成的内存泄漏

对于使用了 BraodcastReceiver，ContentObserver，Cursor，File，Stream，ContentProvider，Bitmap，动画，I/O，数据库，网络的连接等资源的使用，应该在 Activity 销毁时及时关闭或者注销，否则这些资源将不会被回收，造成内存泄漏。

- 广播 BraodcastReceiver：记得注销注册 unregisterReceiver();

- 文件流 File：记得关闭流 InputStream / OutputStream.close();

- 数据库游标 Cursor：使用后关闭游标 cursor.close（）;

- 对于图片资源 Bitmap：当它不再被使用时，应调用 recycle()回收此对象的像素所占用的内存，再赋为 null

- 动画：属性动画或循环动画，在 Activity 退出时需要停止动画。在属性动画中有一类无限循环动画，如果在 Activity 中播放这类动画并且在 onDestroy 中没有去停止动画，那么这个动画将会一直播放下去，这时候 Activity 会被 View 所持有，从而导致 Activity 无法被释放。在 Activity 中 onDestroy 去调用 objectAnimator.cancel()来停止动画。

```java
 public class LeakActivity extends AppCompatActivity {
     private TextView textView;

     @Override
     protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
         setContentView(R.layout.activity_leak);
         textView = (TextView) findViewById(R.id.text_view);
         ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(textView， "rotation"， 0， 360);
         objectAnimator.setRepeatCount(ValueAnimator.INFINITE);
         objectAnimator.start();
     }
 }
```

- 集合对象及时清理，使得 JVM 回收：我们通常会把对象存入集合中，当不使用时，清空集合，让相关对象不再被引用;

```java
 objectList.clear();
 objectList=null;
```

##### 注销监听器

- 在 onPause()/onDestroy()方法中解除监听器，包括在 Android 自己的 Listener，Location Service 或 Display Manager Service 以及自己写的 Listener。

##### static 关键字修饰的变量由于生命周期过长，容易造成内存泄漏

- static 对象的生命周期过长，应该谨慎使用。一定要使用要及时进行 null 处理。

- 静态变量 Activity 和 View 会导致内存泄漏。例如：context，textView 实例的生命周期与应用的生命周期一样，而他们都持有当前 Activity 的（MainActivity ）引用，一旦 MainActivity 销毁，而他的引用一直被持有，就不会被回收。所以，内存泄漏就产出了。

```java
 public class MainActivity extends AppCompatActivity{
 private static Context context;
 private static TextView textView;

 @Override
 protected void onCreate(Bundle savedInstanceState){
     super.onCreate(savedInstanceState);
     setContentView(R.layout.activity_main);
     context = this;
     textView = new TextView(this);
     }
 }
```

##### 如果使用 Context ，尽可能使用 Applicaiton 的 Context

- 单例模式造成的内存泄漏，如 context 的使用，单例中传入的是 activity 的 context，在关闭 activity 时，activity 的内存无法被回收，因为单例持有 activity 的引用。

- 在 context 的使用上，应该传入 application 的 context 到单例模式中，这样就保证了单例的生命周期跟 application 的生命周期一样。

- 因为单例的静态特性使得单例的生命周期和应用的生命周期一样长，这就说明了如果一个对象已经不需要使用了，而单例对象还持有该对象的引用，那么这个对象将不能被正常回收，这就导致了内存泄漏。

- 单例模式应该尽量少持有生命周期不同的外部对象，一旦持有该对象的时候，必须在该对象的生命周期结束前 null

```java
 public class TestManager {
     private static TestManager instance;
     private Context context;

     private TestManager(Context context) {
         this.context = context;
     }

     public static TestManager getInstance(Context context) {
         if (instance != null) {
             instance = new TestManager(context);
         }
         return instance;
     }
 }
```

这是一个普通的单例模式，当创建这个单例的时候，由于需要传入一个 Context，所以这个 Context 的生命周期的长短至关重要：
1、传入的是 Application 的 Context：这将没有任何问题，因为单例的生命周期和 Application 的一样长 ;
2、传入的是 Activity 的 Context：当这个 Context 所对应的 Activity 退出时，由于该 Context 和 Activity 的生命周期一样长(Activity 间接继承于 Context)，所以当前 Activity 退出时它的内存并不会被回收，因为单例对象持有该 Activity 的引用。
所以正确的单例应该修改为下面这种方式：

```java
    public class TestManager {
        private static TestManager instance;
        private Context context;

        private TestManager(Context context) {
            this.context = context.getApplicationContext();
        }

        public static TestManager getInstance(Context context) {
            if (instance != null) {
                instance = new TestManager(context);
            }
            return instance;
        }
    }
```

这样不管传入什么 Context 最终将使用 Application 的 Context，而单例的生命周期和应用的一样长，这样就防止了内存泄漏。

##### 不要使用 String 进行字符串拼接

- 严格的讲，String 拼接只能归结到内存抖动中，因为产生的 String 副本能够被 GC，不会造成内存泄露。
- 频繁的字符串拼接，使用 StringBuffer 或者 StringBuilder 代替 String，可以在一定程度上避免 OOM 和内存抖动。

##### 三方库

- 对于 EventBus，RxJava 等一些第三方开源框架的使用，若是在 Activity 销毁之前没有进行解除订阅将会导致内存泄漏。

作者：juneyu
链接：https://www.jianshu.com/p/05a83c34a205
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

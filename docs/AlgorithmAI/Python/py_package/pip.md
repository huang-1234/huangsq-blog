# pip



## pip 常见命令

> pip freeze

```bash
argon2-cffi==20.1.0
async-generator==1.10
attrs==21.2.0
backcall==0.2.0
bleach==3.3.0
certifi==2020.12.5
cffi==1.14.5
colorama==0.4.4
cycler==0.10.0
d2l-zh==0.8.10
decorator==5.0.9
defusedxml==0.7.1
entrypoints==0.3
importlib-metadata==4.3.1
ipykernel==5.5.5
ipython==7.16.1
ipython-genutils==0.2.0
ipywidgets==7.6.3
jedi==0.18.0
Jinja2==3.0.1
jsonschema==3.2.0
jupyter==1.0.0
jupyter-client==6.2.0
jupyter-console==6.4.0
jupyter-core==4.7.1
jupyterlab-pygments==0.1.2
jupyterlab-widgets==1.0.0
kiwisolver==1.3.1
MarkupSafe==2.0.1
matplotlib==3.3.4
mistune==0.8.4
nbclient==0.5.3
nbconvert==6.0.7
nbformat==5.1.3
nest-asyncio==1.5.1
notebook==6.4.0
numpy==1.19.5
packaging==20.9
pandocfilters==1.4.3
parso==0.8.2
pickleshare==0.7.5
Pillow==8.2.0
prometheus-client==0.10.1
prompt-toolkit==3.0.18
pycparser==2.20
Pygments==2.9.0
pyparsing==2.4.7
pyrsistent==0.17.3
python-dateutil==2.8.1
pywin32==301
pywinpty==1.1.1
pyzmq==22.1.0
qtconsole==5.1.0
QtPy==1.9.0
Send2Trash==1.5.0
six==1.16.0
terminado==0.10.0
testpath==0.5.0
tornado==6.1
traitlets==4.3.3
typing-extensions==3.10.0.0
wcwidth==0.2.5
webencodings==0.5.1
widgetsnbextension==3.5.1
wincertstore==0.2
zipp==3.4.1
```

> 列出我的包的安装位置

```bash
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ python -m site
sys.path = [
    'G:\\Study\\Code\\Python\\DeepingLearning\\d2l-zh',
    'F:\\WareDownload\\jupyter_Python\\Anaconda3-2020-7\\envs\\gluon\\python36.zip',
    'F:\\WareDownload\\jupyter_Python\\Anaconda3-2020-7\\envs\\gluon\\DLLs',
    'F:\\WareDownload\\jupyter_Python\\Anaconda3-2020-7\\envs\\gluon\\lib',
    'F:\\WareDownload\\jupyter_Python\\Anaconda3-2020-7\\envs\\gluon',
    'F:\\WareDownload\\jupyter_Python\\Anaconda3-2020-7\\envs\\gluon\\lib\\site-packages',
    'F:\\WareDownload\\jupyter_Python\\Anaconda3-2020-7\\envs\\gluon\\lib\\site-packages\\win32',
    'F:\\WareDownload\\jupyter_Python\\Anaconda3-2020-7\\envs\\gluon\\lib\\site-packages\\win32\\lib',
    'F:\\WareDownload\\jupyter_Python\\Anaconda3-2020-7\\envs\\gluon\\lib\\site-packages\\Pythonwin',
]
USER_BASE: 'C:\\Users\\13770\\AppData\\Roaming\\Python' (exists)
USER_SITE: 'C:\\Users\\13770\\AppData\\Roaming\\Python\\Python36\\site-packages' (doesn't exist)
ENABLE_USER_SITE: True
```

平时安装python依赖库的时候都是直接打开cmd，然后就pip install，也不知道这些库被安装在哪里了，所以就查了下这方面的资料。

## 1.查看pip默认安装路径

'pip freeze'命令可以查看用pip安装的软件有哪些
 然后就再执行一次命令'pip install xx'，xx就是你已经安装的软件名字，再重新安装的时候，就会告诉你已经安装，安装路径在哪。
 这个方法是不是太so easy了，没办法，就是这么简单。



```csharp
C:\Users\root>pip freeze
absl-py==0.7.0
alabaster==0.7.12
anaconda-client==1.7.2
anaconda-navigator==1.9.6
...
C:\Users\root>pip install alabaster
Requirement already satisfied: alabaster in d:\programdata\anaconda3\lib\site-packages (0.7.12)
You are using pip version 19.0.2, however version 19.0.3 is available.
You should consider upgrading via the 'python -m pip install --upgrade pip' command.
```

就这样以'alabaster'这个为例，可以看到现在pip的默认安装位置在d盘的anaconda3.
 其实还有一个方法：



```php
C:\Users\root>python -m site
sys.path = [
    'C:\\Users\\root',
    'D:\\ProgramData\\Anaconda3\\python37.zip',
    'D:\\ProgramData\\Anaconda3\\DLLs',
    'D:\\ProgramData\\Anaconda3\\lib',
    'D:\\ProgramData\\Anaconda3',
    'C:\\Users\\root\\AppData\\Roaming\\Python\\Python37\\site-packages',
    'D:\\ProgramData\\Anaconda3\\lib\\site-packages',
    'D:\\ProgramData\\Anaconda3\\lib\\site-packages\\win32',
    'D:\\ProgramData\\Anaconda3\\lib\\site-packages\\win32\\lib',
    'D:\\ProgramData\\Anaconda3\\lib\\site-packages\\Pythonwin',
]
USER_BASE: 'C:\\Users\\root\\AppData\\Roaming\\Python' (exists)
USER_SITE: 'C:\\Users\\root\\AppData\\Roaming\\Python\\Python37\\site-packages' (exists)
ENABLE_USER_SITE: True
```

用'python -m site'命令
 这里有几点说明：
 1.我们看见这里的USER_BASE 和USER_SITE其实就是用户自定义的启用Python脚本和依赖安装包的基础路径。
 2.其中USER_BASE表示就是在C盘这个目录下的Python.exe启动程序路径以及pip,esay-install,markdown等脚本，（我们已经是安装好了Anaconda Python，这个C盘又是什么鬼，不想用它啊），而这个C盘的Python.exe启动程序路径其实就是我们在安装Anaconda的时候一个分身，更准确的说，其实就是简单的Python程序，并不是什么IDE这种级别的可以类似Eclipse这样去操作编译丰富的功能窗口，只是简单类似shell的一样的存在。所以要改。
 3.其中的USER_SITE其实就是用户如果调用C盘路径下的python.exe中的脚本pip文件去下载，就会将site-package的默认安装到这个C盘路径下。

并且大家有时候可能在使用 pip install 命令行安装一些依赖的时候，总是会提示报错“PermissionError：[WinError 5 ] Denied Excess."C"\......."这样的类似权限拒绝访问，并且提示你无管理员权限的话，使用pip -install ... + [user-site] 这样的字眼。” 如果是权限问题拒绝安装访问的话，安装cmd命令提示框中提示的user-site使用方法，就能解决权限安装问题。



```undefined
python -m site --user-site
```

所以，user_site其实就是个人的site-packages默认安装路径了。而如果使用的是Anaconda 目录下的Scripts中的pip 安装依赖库或包等，则是安装在Anaconda路径下的site-packages中去，我就是这样的。

## 2.修改pip默认安装路径

这部分可以参考：[https://blog.csdn.net/mukvintt/article/details/80908951](https://links.jianshu.com/go?to=https%3A%2F%2Fblog.csdn.net%2Fmukvintt%2Farticle%2Fdetails%2F80908951)
 其实就是对上面python -m site进行修改。


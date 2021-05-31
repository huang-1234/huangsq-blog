## 深度学习实验

```bash
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning
$ cd d2l-zh

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
Writing to C:\Users\13770\AppData\Roaming\pip\pip.ini

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ conda env create -f environment.yml
Warning: you have pip-installed dependencies in your environment file, but you do not list pip itself as one of your conda dependencies.  Conda may not use the correct pip to 
install your packages, and they may end up in the wrong place.  Please add an explicit pip dependency.  I'm adding one for you, but still nagging you.
Collecting package metadata (repodata.json): done
Solving environment: done


==> WARNING: A newer version of conda exists. <==
  current version: 4.8.3
  latest version: 4.10.1

Please update conda by running

    $ conda update -n base -c defaults conda

CondaError: KeyboardInterrupt


13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ conda update -n base -c defaults conda
Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: F:\WareDownload\jupyter_Python\Anaconda3-2020-7

  added / updated specs:
    - conda


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    backports.functools_lru_cache-1.6.4|     pyhd3eb1b0_0           9 KB
    backports.tempfile-1.0     |     pyhd3eb1b0_1          11 KB
    conda-4.10.1               |   py38haa95532_1         2.9 MB
    conda-package-handling-1.7.3|   py38h8cc25b3_1         721 KB
    ------------------------------------------------------------
                                           Total:         3.6 MB

The following packages will be UPDATED:

  backports.functoo~                             1.6.1-py_0 --> 1.6.4-pyhd3eb1b0_0
  conda                                        4.8.3-py38_0 --> 4.10.1-py38haa95532_1
  conda-package-han~                   1.6.1-py38h62dcd97_0 --> 1.7.3-py38h8cc25b3_1

The following packages will be DOWNGRADED:

  backports.tempfile                               1.0-py_1 --> 1.0-pyhd3eb1b0_1


Proceed ([y]/n)? y


Downloading and Extracting Packages
conda-4.10.1         | 2.9 MB    | ################################################################################################################################### | 100%  
conda-package-handli | 721 KB    | ################################################################################################################################### | 100%  
backports.functools_ | 9 KB      | ################################################################################################################################### | 100%  
backports.tempfile-1 | 11 KB     | ################################################################################################################################### | 100% 
Preparing transaction: done
Verifying transaction: done
Executing transaction: done

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ jupyter notebook
[I 15:00:23.538 NotebookApp] JupyterLab extension loaded from F:\WareDownload\jupyter_Python\Anaconda3-2020-7\lib\site-packages\jupyterlab
[I 15:00:23.540 NotebookApp] JupyterLab application directory is F:\WareDownload\jupyter_Python\Anaconda3-2020-7\share\jupyter\lab
[I 15:00:23.558 NotebookApp] 启动notebooks 在本地路径: G:\Study\Code\Python\DeepingLearning\d2l-zh
[I 15:00:23.559 NotebookApp] 本程序运行在: http://localhost:8888/?token=eb5d3b44e68d3cfe3fab59049ad58604ad262bcb3ef8bd63
[I 15:00:23.560 NotebookApp]  or http://127.0.0.1:8888/?token=eb5d3b44e68d3cfe3fab59049ad58604ad262bcb3ef8bd63
[I 15:00:23.562 NotebookApp] 使用control-c停止此服务器并关闭所有内核(两次跳过确认).
[C 15:00:24.188 NotebookApp] 

    To access the notebook, open this file in a browser:
        file:///C:/Users/13770/AppData/Roaming/jupyter/runtime/nbserver-44532-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/?token=eb5d3b44e68d3cfe3fab59049ad58604ad262bcb3ef8bd63
     or http://127.0.0.1:8888/?token=eb5d3b44e68d3cfe3fab59049ad58604ad262bcb3ef8bd63
[I 15:03:19.205 NotebookApp] 已经中断...
[I 15:03:19.209 NotebookApp] 关闭 0 服务

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ where python
F:\WareDownload\jupyter_Python\Anaconda3-2020-7\python.exe
F:\Ddisk\Python\python.exe
F:\WareDownload\Python\Python3.9\python.exe
C:\Users\13770\AppData\Local\Microsoft\WindowsApps\python.exe

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ jupyter notebook
[I 16:58:35.846 NotebookApp] JupyterLab extension loaded from F:\WareDownload\jupyter_Python\Anaconda3-2020-7\lib\site-packages\jupyterlab
[I 16:58:35.847 NotebookApp] JupyterLab application directory is F:\WareDownload\jupyter_Python\Anaconda3-2020-7\share\jupyter\lab
[I 16:58:35.850 NotebookApp] 启动notebooks 在本地路径: G:\Study\Code\Python\DeepingLearning\d2l-zh
[I 16:58:35.850 NotebookApp] 本程序运行在: http://localhost:8888/?token=3c334235f54e0e83610ad2223327ff867a1d9725582da201
[I 16:58:35.850 NotebookApp]  or http://127.0.0.1:8888/?token=3c334235f54e0e83610ad2223327ff867a1d9725582da201
[I 16:58:35.851 NotebookApp] 使用control-c停止此服务器并关闭所有内核(两次跳过确认).
[C 16:58:36.030 NotebookApp] 

    To access the notebook, open this file in a browser:
        file:///C:/Users/13770/AppData/Roaming/jupyter/runtime/nbserver-12916-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/?token=3c334235f54e0e83610ad2223327ff867a1d9725582da201
     or http://127.0.0.1:8888/?token=3c334235f54e0e83610ad2223327ff867a1d9725582da201
[W 16:58:42.165 NotebookApp] Notebook chapter_appendix/aws.ipynb is not trusted
[I 16:58:43.129 NotebookApp] Kernel started: 8198da40-641d-42f9-9668-0ce3a374a191
[I 16:58:43.135 NotebookApp] 302 GET /notebooks/img/os.png (::1) 3.00ms
[I 16:58:43.139 NotebookApp] 302 GET /notebooks/img/aws.png (::1) 5.98ms
[I 16:58:43.142 NotebookApp] 302 GET /notebooks/img/p2x.png (::1) 7.04ms
[I 16:58:43.145 NotebookApp] 302 GET /notebooks/img/ec2.png (::1) 8.00ms
[I 16:58:43.149 NotebookApp] 302 GET /notebooks/img/limits.png (::1) 3.00ms
[I 16:58:43.206 NotebookApp] 302 GET /notebooks/img/disk.png (::1) 33.00ms
[I 16:58:43.221 NotebookApp] 302 GET /notebooks/img/launching.png (::1) 6.00ms
[I 16:58:43.222 NotebookApp] 302 GET /notebooks/img/connect.png (::1) 7.00ms
[I 16:58:43.224 NotebookApp] 302 GET /notebooks/img/cuda.png (::1) 8.00ms
[I 16:58:43.226 NotebookApp] 302 GET /notebooks/img/jupyter.png (::1) 7.99ms
[I 16:58:43.229 NotebookApp] 302 GET /notebooks/img/keypair.png (::1) 9.04ms
[I 16:58:43.295 NotebookApp] 302 GET /notebooks/img/qr_aws.svg (::1) 13.00ms
[I 16:58:49.546 NotebookApp] Starting buffering for 8198da40-641d-42f9-9668-0ce3a374a191:5639c455fe9941ac8953fb0edcbb2115
[W 16:58:55.197 NotebookApp] Notebook chapter_appendix/d2lzh.ipynb is not trusted
[I 16:58:55.380 NotebookApp] Kernel started: 6855d06d-698d-404f-974f-5cfbe504d138
[W 16:59:01.205 NotebookApp] Notebook chapter_computer-vision/bounding-box.ipynb is not trusted
[I 16:59:01.493 NotebookApp] Kernel started: b56d26e9-7f3b-4082-bf82-bf2b21a85de7
[I 16:59:01.499 NotebookApp] 302 GET /notebooks/img/qr_bounding-box.svg (::1) 3.00ms
[I 17:00:55.129 NotebookApp] 已经中断...
[I 17:00:55.130 NotebookApp] 关闭 3 服务
[I 17:00:55.456 NotebookApp] Kernel shutdown: 8198da40-641d-42f9-9668-0ce3a374a191
[I 17:00:55.460 NotebookApp] Kernel shutdown: 6855d06d-698d-404f-974f-5cfbe504d138
[I 17:00:55.464 NotebookApp] Kernel shutdown: b56d26e9-7f3b-4082-bf82-bf2b21a85de7

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ ^C

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ canda install d2lzh
bash: canda: command not found

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ conda install d2lzh
Collecting package metadata (current_repodata.json): done
Solving environment: failed with initial frozen solve. Retrying with flexible solve.
Collecting package metadata (repodata.json): done
Solving environment: failed with initial frozen solve. Retrying with flexible solve.

PackagesNotFoundError: The following packages are not available from current channels:

  - d2lzh

Current channels:

  - https://repo.anaconda.com/pkgs/main/win-64
  - https://repo.anaconda.com/pkgs/main/noarch
  - https://repo.anaconda.com/pkgs/r/win-64
  - https://repo.anaconda.com/pkgs/r/noarch
  - https://repo.anaconda.com/pkgs/msys2/win-64
  - https://repo.anaconda.com/pkgs/msys2/noarch

To search for alternate channels that may provide the conda package you're
looking for, navigate to

    https://anaconda.org

and use the search bar at the top of the page.



13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ jupyter notebook
[I 17:01:38.282 NotebookApp] JupyterLab extension loaded from F:\WareDownload\jupyter_Python\Anaconda3-2020-7\lib\site-packages\jupyterlab
[I 17:01:38.283 NotebookApp] JupyterLab application directory is F:\WareDownload\jupyter_Python\Anaconda3-2020-7\share\jupyter\lab
[I 17:01:38.287 NotebookApp] 启动notebooks 在本地路径: G:\Study\Code\Python\DeepingLearning\d2l-zh
[I 17:01:38.287 NotebookApp] 本程序运行在: http://localhost:8888/?token=c05ab2473076df17f62d97be1fa648488372d221e32ab3e2
[I 17:01:38.287 NotebookApp]  or http://127.0.0.1:8888/?token=c05ab2473076df17f62d97be1fa648488372d221e32ab3e2
[I 17:01:38.288 NotebookApp] 使用control-c停止此服务器并关闭所有内核(两次跳过确认).
[C 17:01:38.459 NotebookApp] 

    To access the notebook, open this file in a browser:
        file:///C:/Users/13770/AppData/Roaming/jupyter/runtime/nbserver-19912-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/?token=c05ab2473076df17f62d97be1fa648488372d221e32ab3e2
     or http://127.0.0.1:8888/?token=c05ab2473076df17f62d97be1fa648488372d221e32ab3e2
[W 17:01:38.647 NotebookApp] 404 GET /api/kernels/b56d26e9-7f3b-4082-bf82-bf2b21a85de7/channels?session_id=7d8b30973d6b4585b7bcf21bc8f41a80 (::1): Kernel does not exist: b56d26e9-7f3b-4082-bf82-bf2b21a85de7
[W 17:01:38.727 NotebookApp] 404 GET /api/kernels/b56d26e9-7f3b-4082-bf82-bf2b21a85de7/channels?session_id=7d8b30973d6b4585b7bcf21bc8f41a80 (::1) 83.02ms referer=None
[W 17:01:40.627 NotebookApp] 404 GET /api/kernels/6855d06d-698d-404f-974f-5cfbe504d138/channels?session_id=af712ea4fe26486188b583b7adc60897 (::1): Kernel does not exist: 6855d06d-698d-404f-974f-5cfbe504d138
[W 17:01:40.629 NotebookApp] 404 GET /api/kernels/6855d06d-698d-404f-974f-5cfbe504d138/channels?session_id=af712ea4fe26486188b583b7adc60897 (::1) 3.00ms referer=None
[W 17:01:55.683 NotebookApp] Notebook chapter_appendix/buy-gpu.ipynb is not trusted
[I 17:01:56.042 NotebookApp] Kernel started: 40e59786-99ae-4e31-bd81-0feeddac96cd
[I 17:01:56.049 NotebookApp] 302 GET /notebooks/img/gtx.png (::1) 4.00ms
[I 17:01:56.051 NotebookApp] 302 GET /notebooks/img/qr_buy-gpu.svg (::1) 5.00ms
[I 17:02:02.359 NotebookApp] Starting buffering for 40e59786-99ae-4e31-bd81-0feeddac96cd:56c944aec56b43f8895b6e0f5d203daf
[W 17:02:16.136 NotebookApp] Notebook chapter_deep-learning-basics/backprop.ipynb is not trusted
[I 17:02:16.393 NotebookApp] Kernel started: cb31c6c0-1882-4bed-ba77-67d7a5e0e9fb
[I 17:02:16.399 NotebookApp] 302 GET /notebooks/img/qr_backprop.svg (::1) 4.00ms
[I 17:02:16.402 NotebookApp] 302 GET /notebooks/img/forward.svg (::1) 5.00ms
[W 17:02:20.473 NotebookApp] 404 GET /static/components/MathJax/fonts/HTML-CSS/TeX/otf/MathJax_AMS-Regular.otf (::1) 5.00ms referer=http://localhost:8888/notebooks/chapter_deep-learning-basics/backprop.ipynb
[I 17:02:30.810 NotebookApp] Starting buffering for cb31c6c0-1882-4bed-ba77-67d7a5e0e9fb:afa0df2d68eb4067a581253cbeee2040
[W 17:02:37.207 NotebookApp] Notebook chapter_deep-learning-basics/mlp-gluon.ipynb is not trusted
[I 17:02:37.470 NotebookApp] Kernel started: 8b3ad2b4-aac4-4a28-b7bb-9a4dd3f828b7
[I 17:02:37.479 NotebookApp] 302 GET /notebooks/img/qr_mlp-gluon.svg (::1) 3.00ms
[I 17:04:37.635 NotebookApp] Saving file at /chapter_deep-learning-basics/mlp-gluon.ipynb
[I 17:06:47.568 NotebookApp] Starting buffering for 8b3ad2b4-aac4-4a28-b7bb-9a4dd3f828b7:0bfa519749f1416d840b7f64d0524038
[W 17:07:29.496 NotebookApp] Notebook chapter_computer-vision/anchor.ipynb is not trusted
[I 17:07:30.398 NotebookApp] Kernel started: 6f714d4a-7167-4132-9776-9f55e1cc64ea
[I 17:07:30.411 NotebookApp] 302 GET /notebooks/img/anchor-label.svg (::1) 9.00ms
[I 17:07:30.413 NotebookApp] 302 GET /notebooks/img/iou.svg (::1) 7.92ms
[I 17:07:30.417 NotebookApp] 302 GET /notebooks/img/qr_anchor.svg (::1) 9.00ms
[W 17:07:35.562 NotebookApp] 404 GET /static/components/MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Script-Regular.otf (::1) 5.00ms referer=http://localhost:8888/notebooks/chapter_computer-vision/anchor.ipynb
[W 17:07:35.567 NotebookApp] 404 GET /static/components/MathJax/fonts/HTML-CSS/TeX/otf/MathJax_AMS-Regular.otf (::1) 3.99ms referer=http://localhost:8888/notebooks/chapter_computer-vision/anchor.ipynb
[W 17:08:01.527 NotebookApp] Notebook chapter_deep-learning-basics/backprop.ipynb is not trusted
[I 17:08:01.731 NotebookApp] 302 GET /notebooks/img/forward.svg (::1) 1.99ms
[I 17:08:01.734 NotebookApp] 302 GET /notebooks/img/qr_backprop.svg (::1) 2.05ms
[W 17:08:05.190 NotebookApp] 404 GET /static/components/MathJax/fonts/HTML-CSS/TeX/otf/MathJax_AMS-Regular.otf (::1) 5.00ms referer=http://localhost:8888/notebooks/chapter_deep-learning-basics/backprop.ipynb
[I 17:08:10.216 NotebookApp] Starting buffering for cb31c6c0-1882-4bed-ba77-67d7a5e0e9fb:c2c313cf9d0f475a97bbc2c6fac79a33
[W 17:08:12.208 NotebookApp] Notebook chapter_deep-learning-basics/dropout.ipynb is not trusted
[I 17:08:12.651 NotebookApp] Kernel started: 3d89fb2a-a28d-4f82-ba3a-5a87e5d788ce
[I 17:08:12.663 NotebookApp] 302 GET /notebooks/img/qr_dropout.svg (::1) 7.00ms
[I 17:08:12.665 NotebookApp] 302 GET /notebooks/img/dropout.svg (::1) 7.00ms
[I 17:08:18.144 NotebookApp] Starting buffering for 3d89fb2a-a28d-4f82-ba3a-5a87e5d788ce:4149c72780da42a68627a875aca3f970
[W 17:08:20.146 NotebookApp] Notebook chapter_deep-learning-basics/backprop.ipynb is not trusted
[I 17:08:20.354 NotebookApp] 302 GET /notebooks/img/forward.svg (::1) 2.00ms
[I 17:08:20.357 NotebookApp] 302 GET /notebooks/img/qr_backprop.svg (::1) 2.00ms
[W 17:08:24.623 NotebookApp] 404 GET /static/components/MathJax/fonts/HTML-CSS/TeX/otf/MathJax_AMS-Regular.otf (::1) 6.00ms referer=http://localhost:8888/notebooks/chapter_deep-learning-basics/backprop.ipynb
[I 17:09:02.637 NotebookApp] Starting buffering for cb31c6c0-1882-4bed-ba77-67d7a5e0e9fb:fc1fa92fd69945da84178ef3f4d1cf9c
[W 17:09:14.811 NotebookApp] Notebook chapter_deep-learning-basics/fashion-mnist.ipynb is not trusted
[I 17:09:15.282 NotebookApp] Kernel started: 0b3d5b4b-6e9d-46b1-9efb-36344cdfcb3d
[I 17:09:15.290 NotebookApp] 302 GET /notebooks/img/qr_fashion-mnist.svg (::1) 3.00ms
[I 17:09:30.653 NotebookApp] Saving file at /chapter_computer-vision/anchor.ipynb
[W 17:09:30.654 NotebookApp] Notebook chapter_computer-vision/anchor.ipynb is not trusted
[I 17:09:42.290 NotebookApp] 已经中断...
[I 17:09:42.291 NotebookApp] 关闭 6 服务
[I 17:09:42.729 NotebookApp] Kernel shutdown: 40e59786-99ae-4e31-bd81-0feeddac96cd
[I 17:09:42.730 NotebookApp] Kernel shutdown: cb31c6c0-1882-4bed-ba77-67d7a5e0e9fb
[I 17:09:42.731 NotebookApp] Kernel shutdown: 8b3ad2b4-aac4-4a28-b7bb-9a4dd3f828b7
[I 17:09:42.732 NotebookApp] Kernel shutdown: 6f714d4a-7167-4132-9776-9f55e1cc64ea
[I 17:09:42.733 NotebookApp] Kernel shutdown: 3d89fb2a-a28d-4f82-ba3a-5a87e5d788ce
[I 17:09:42.734 NotebookApp] Kernel shutdown: 0b3d5b4b-6e9d-46b1-9efb-36344cdfcb3d

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ conda activate d2l-zh

CommandNotFoundError: Your shell has not been properly configured to use 'conda activate'.
If using 'conda activate' from a batch script, change your
invocation to 'CALL conda.bat activate'.

To initialize your shell, run

    $ conda init <SHELL_NAME>

Currently supported shells are:
  - bash
  - cmd.exe
  - fish
  - tcsh
  - xonsh
  - zsh
  - powershell

See 'conda init --help' for more information and options.

IMPORTANT: You may need to close and restart your shell after running 'conda init'.



13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ conda --version
conda 4.10.1

13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ source activate
(base) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ conda env list
# conda environments:
#
base                  *  F:\WareDownload\jupyter_Python\Anaconda3-2020-7
gluon                    F:\WareDownload\jupyter_Python\Anaconda3-2020-7\envs\gluon
torch                    F:\WareDownload\jupyter_Python\Anaconda3-2020-7\envs\torch

(base) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ conda activate gluon
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip install -U d2l-zh
Looking in indexes: https://pypi.tuna.tsinghua.edu.cn/simple
Collecting d2l-zh
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/89/40/5d98d71e8f0ccf2f4f124782318a64cd4c2b9abbe008d134557d74494f0e/d2l-zh-0.8.10.tar.gz (10 kB)
Collecting numpy
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/ea/bc/da526221bc111857c7ef39c3af670bbcf5e69c247b0d22e51986f6d0c5c2/numpy-1.19.5-cp36-cp36m-win_amd64.whl (13.2 MB)
     |████████████████████████████████| 13.2 MB 1.7 MB/s 
Collecting matplotlib
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/da/75/7bb16e22aa3f8d23a3afd065a7c933de71b67561c4561cf162fbc5d94221/matplotlib-3.3.4-cp36-cp36m-win_amd64.whl (8.5 MB)
     |████████████████████████████████| 8.5 MB 1.6 MB/s 
Collecting jupyter
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/83/df/0f5dd132200728a86190397e1ea87cd76244e42d39ec5e88efd25b2abd7e/jupyter-1.0.0-py2.py3-none-any.whl (2.7 kB)
Collecting notebook
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/39/b6/8135d31209691cea4f9e8f4d72e495e0184f45f01946539af9facab3110f/notebook-6.4.0-py3-none-any.whl (9.5 MB)
     |████████████████████████████████| 9.5 MB 939 kB/s 
Collecting nbconvert
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/13/2f/acbe7006548f3914456ee47f97a2033b1b2f3daf921b12ac94105d87c163/nbconvert-6.0.7-py3-none-any.whl (552 kB)
     |████████████████████████████████| 552 kB 2.2 MB/s 
Collecting qtconsole
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/90/72/3f81d75611bcd4634ae1785efd9f5afbed06ce2b810e4dee28061a2c3895/qtconsole-5.1.0-py3-none-any.whl (119 kB)
     |████████████████████████████████| 119 kB 1.1 MB/s 
Collecting ipykernel
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/90/6d/6c8fe4b658f77947d4244ce81f60230c4c8d1dc1a21ae83e63b269339178/ipykernel-5.5.5-py3-none-any.whl (120 kB)
     |████████████████████████████████| 120 kB 1.1 MB/s 
Collecting jupyter-console
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/59/cd/aa2670ffc99eb3e5bbe2294c71e4bf46a9804af4f378d09d7a8950996c9b/jupyter_console-6.4.0-py3-none-any.whl (22 kB)
Collecting ipywidgets
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/11/53/084940a83a8158364e630a664a30b03068c25ab75243224d6b488800d43a/ipywidgets-7.6.3-py2.py3-none-any.whl (121 kB)
     |████████████████████████████████| 121 kB 1.3 MB/s 
Collecting jupyter-client
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/88/4e/50fcf8b38d9c08d5b4839c1650e595f6bfa4fc9b419e2b800db8f14ee532/jupyter_client-6.2.0-py3-none-any.whl (112 kB)
     |████████████████████████████████| 112 kB 1.6 MB/s 
Collecting traitlets>=4.1.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/ca/ab/872a23e29cec3cf2594af7e857f18b687ad21039c1f9b922fac5b9b142d5/traitlets-4.3.3-py2.py3-none-any.whl (75 kB)
     |████████████████████████████████| 75 kB 1.1 MB/s 
Collecting tornado>=4.2
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/07/7c/0e9e8831985ac2125d9ccf905dfeab407cebc998e91b99135ae151eb2982/tornado-6.1-cp36-cp36m-win_amd64.whl (422 kB)
     |████████████████████████████████| 422 kB 2.2 MB/s 
Collecting ipython>=5.0.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/23/6a/210816c943c9aeeb29e4e18a298f14bf0e118fe222a23e13bfcc2d41b0a4/ipython-7.16.1-py3-none-any.whl (785 kB)
     |████████████████████████████████| 785 kB 1.3 MB/s 
Collecting pickleshare
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/9a/41/220f49aaea88bc6fa6cba8d05ecf24676326156c23b991e80b3f2fc24c77/pickleshare-0.7.5-py2.py3-none-any.whl (6.9 kB)
Collecting pygments
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/a6/c9/be11fce9810793676017f79ffab3c6cb18575844a6c7b8d4ed92f95de604/Pygments-2.9.0-py3-none-any.whl (1.0 MB)
     |████████████████████████████████| 1.0 MB 1.3 MB/s 
Collecting backcall
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/4c/1c/ff6546b6c12603d8dd1070aa3c3d273ad4c07f5771689a7b69a550e8c951/backcall-0.2.0-py2.py3-none-any.whl (11 kB)
Requirement already satisfied: setuptools>=18.5 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l-zh) (52.0.0.post20210125)
Collecting prompt-toolkit!=3.0.0,!=3.0.1,<3.1.0,>=2.0.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/eb/e6/4b4ca4fa94462d4560ba2f4e62e62108ab07be2e16a92e594e43b12d3300/prompt_toolkit-3.0.18-py3-none-any.whl (367 kB)
     |████████████████████████████████| 367 kB 1.3 MB/s 
Collecting jedi>=0.10
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/f9/36/7aa67ae2663025b49e8426ead0bad983fee1b73f472536e9790655da0277/jedi-0.18.0-py2.py3-none-any.whl (1.4 MB)
     |████████████████████████████████| 1.4 MB 2.2 MB/s 
Collecting colorama
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/44/98/5b86278fbbf250d239ae0ecb724f8572af1c91f4a11edf4d36a206189440/colorama-0.4.4-py2.py3-none-any.whl (16 kB)
Collecting decorator
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/6a/36/b1b9bfdf28690ae01d9ca0aa5b0d07cb4448ac65fb91dc7e2d094e3d992f/decorator-5.0.9-py3-none-any.whl (8.9 kB)
Collecting parso<0.9.0,>=0.8.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/a9/c4/d5476373088c120ffed82f34c74b266ccae31a68d665b837354d4d8dc8be/parso-0.8.2-py2.py3-none-any.whl (94 kB)
     |████████████████████████████████| 94 kB 707 kB/s 
Collecting wcwidth
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/59/7c/e39aca596badaf1b78e8f547c807b04dae603a433d3e7a7e04d67f2ef3e5/wcwidth-0.2.5-py2.py3-none-any.whl (30 kB)
Collecting six
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/d9/5a/e7c31adbe875f2abbb91bd84cf2dc52d792b5a01506781dbcf25c91daf11/six-1.16.0-py2.py3-none-any.whl (11 kB)
Collecting ipython-genutils
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/fa/bc/9bd3b5c2b4774d5f33b2d544f1460be9df7df2fe42f352135381c347c69a/ipython_genutils-0.2.0-py2.py3-none-any.whl (26 kB)
Collecting nbformat>=4.2.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/e7/c7/dd50978c637a7af8234909277c4e7ec1b71310c13fb3135f3c8f5b6e045f/nbformat-5.1.3-py3-none-any.whl (178 kB)
     |████████████████████████████████| 178 kB 1.3 MB/s 
Collecting widgetsnbextension~=3.5.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/6c/7b/7ac231c20d2d33c445eaacf8a433f4e22c60677eb9776c7c5262d7ddee2d/widgetsnbextension-3.5.1-py2.py3-none-any.whl (2.2 
MB)
     |████████████████████████████████| 2.2 MB 1.3 MB/s 
Collecting jupyterlab-widgets>=1.0.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/18/b5/3473d275e3b2359efdf5768e9df95537308b93a31ad94fa92814ac565826/jupyterlab_widgets-1.0.0-py3-none-any.whl (243 kB)
     |████████████████████████████████| 243 kB 1.1 MB/s 
Collecting jupyter-core
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/53/40/5af36bffa0af3ac71d3a6fc6709de10e4f6ff7c01745b8bc4715372189c9/jupyter_core-4.7.1-py3-none-any.whl (82 kB)
     |████████████████████████████████| 82 kB 990 kB/s 
Collecting jsonschema!=2.5.0,>=2.4
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/c5/8f/51e89ce52a085483359217bc72cdbf6e75ee595d5b1d4b5ade40c7e018b8/jsonschema-3.2.0-py2.py3-none-any.whl (56 kB)
     |████████████████████████████████| 56 kB 777 kB/s 
Collecting importlib-metadata
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/e2/51/3af0db7c4caa1a5a43d506a848f63b56926fdf4f585d227a8a85a0671bbb/importlib_metadata-4.3.1-py3-none-any.whl (16 kB)
Collecting pyrsistent>=0.14.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/4d/70/fd441df751ba8b620e03fd2d2d9ca902103119616f0f6cc42e6405035062/pyrsistent-0.17.3.tar.gz (106 kB)
     |████████████████████████████████| 106 kB 1.1 MB/s 
Collecting attrs>=17.4.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/20/a9/ba6f1cd1a1517ff022b35acd6a7e4246371dfab08b8e42b829b6d07913cc/attrs-21.2.0-py2.py3-none-any.whl (53 kB)
     |████████████████████████████████| 53 kB 2.0 MB/s 
Collecting terminado>=0.8.3
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/07/ea/0b2b2a16748428e79715c763bbcb1ae9820e7bb8e0136cb3406fd311573e/terminado-0.10.0-py3-none-any.whl (14 kB)
Collecting jinja2
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/80/21/ae597efc7ed8caaa43fb35062288baaf99a7d43ff0cf66452ddf47604ee6/Jinja2-3.0.1-py3-none-any.whl (133 kB)
     |████████████████████████████████| 133 kB 819 kB/s 
Collecting pyzmq>=17
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/47/51/bac73247926e8fbd639eb0d40484894e66c3a1e0217788b0317a0a3b2eac/pyzmq-22.1.0-cp36-cp36m-win_amd64.whl (1.1 MB)
     |████████████████████████████████| 1.1 MB 595 kB/s 
Collecting argon2-cffi
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/75/13/85d8e6291099f72a72f5e2682f758a3059b4ce7c1e30a32236a3f094d4c2/argon2_cffi-20.1.0-cp36-cp36m-win_amd64.whl (42 kB)
     |████████████████████████████████| 42 kB 252 kB/s 
Collecting prometheus-client
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/22/f7/f6e1676521ce7e311d38563d2cf6594d09d3717d799ede7dab7b2520093e/prometheus_client-0.10.1-py2.py3-none-any.whl (55 kB)
     |████████████████████████████████| 55 kB 541 kB/s 
Collecting Send2Trash>=1.5.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/49/46/c3dc27481d1cc57b9385aff41c474ceb7714f7935b1247194adae45db714/Send2Trash-1.5.0-py3-none-any.whl (12 kB)
Collecting python-dateutil>=2.1
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/d4/70/d60450c3dd48ef87586924207ae8907090de0b306af2bce5d134d78615cb/python_dateutil-2.8.1-py2.py3-none-any.whl (227 kB)
     |████████████████████████████████| 227 kB 467 kB/s 
Collecting nest-asyncio>=1.5
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/52/e2/9b37da54e6e9094d2f558ae643d1954a0fa8215dfee4fa261f31c5439796/nest_asyncio-1.5.1-py3-none-any.whl (5.0 kB)
Collecting pywin32>=1.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/c6/21/bb0ff995c5f67786fb3d6ffbfc5160ed89d7267862123a10e0a4a2d924db/pywin32-301-cp36-cp36m-win_amd64.whl (9.2 MB)
     |████████████████████████████████| 9.2 MB 137 kB/s 
Collecting pywinpty>=1.1.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/31/45/c8d5f05089931725f8157111e1b3430071e3537402bef9b976563da63a70/pywinpty-1.1.1-cp36-none-win_amd64.whl (1.4 MB)
     |████████████████████████████████| 1.4 MB 595 kB/s 
Collecting cffi>=1.0.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/4e/04/25885ffc576fffe36bae2007c65f481dc886ae828520be94fb629eeed32b/cffi-1.14.5-cp36-cp36m-win_amd64.whl (178 kB)
     |████████████████████████████████| 178 kB 1.1 MB/s 
Collecting pycparser
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/ae/e7/d9c3a176ca4b02024debf82342dab36efadfc5776f9c8db077e8f6e71821/pycparser-2.20-py2.py3-none-any.whl (112 kB)
     |████████████████████████████████| 112 kB 930 kB/s 
Collecting zipp>=0.5
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/0f/8c/715c54e9e34c0c4820f616a913a7de3337d0cd79074dd1bed4dd840f16ae/zipp-3.4.1-py3-none-any.whl (5.2 kB)
Collecting typing-extensions>=3.6.4
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/2e/35/6c4fff5ab443b57116cb1aad46421fb719bed2825664e8fe77d66d99bcbc/typing_extensions-3.10.0.0-py3-none-any.whl (26 kB)
Collecting MarkupSafe>=2.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/73/60/296031f365b3ae96732225203d864fac7b83a185ed1820c1c87b78e154bc/MarkupSafe-2.0.1-cp36-cp36m-win_amd64.whl (14 kB)
Collecting pyparsing!=2.0.4,!=2.1.2,!=2.1.6,>=2.0.3
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/8a/bb/488841f56197b13700afd5658fc279a2025a39e22449b7cf29864669b15d/pyparsing-2.4.7-py2.py3-none-any.whl (67 kB)
     |████████████████████████████████| 67 kB 691 kB/s 
Collecting kiwisolver>=1.0.1
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/6e/df/1250c32ab3b532c32a7e47c1cd240faba98f75b1b5150939b10e9bffb758/kiwisolver-1.3.1-cp36-cp36m-win_amd64.whl (51 kB)
     |████████████████████████████████| 51 kB 41 kB/s 
Collecting cycler>=0.10
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/f7/d2/e07d3ebb2bd7af696440ce7e754c59dd546ffe1bbe732c8ab68b9c834e61/cycler-0.10.0-py2.py3-none-any.whl (6.5 kB)
Collecting pillow>=6.2.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/cf/f7/124c119cf1d4a95dd15913038aba427ab30b7220ec47d2c5617cf56db7cb/Pillow-8.2.0-cp36-cp36m-win_amd64.whl (2.2 MB)
     |████████████████████████████████| 2.2 MB 1.6 MB/s 
Collecting defusedxml
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/07/6c/aa3f2f849e01cb6a001cd8554a88d4c77c5c1a31c95bdf1cf9301e6d9ef4/defusedxml-0.7.1-py2.py3-none-any.whl (25 kB)
Collecting testpath
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/ac/87/5422f6d056bfbded920ccf380a65de3713a3b95a95ba2255be2a3fb4f464/testpath-0.5.0-py3-none-any.whl (84 kB)
     |████████████████████████████████| 84 kB 1.5 MB/s 
Collecting bleach
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/f0/46/2bbd92086a4c6f051214cb48df6d9132b5f32c5e881d3f4991b16ec7e499/bleach-3.3.0-py2.py3-none-any.whl (283 kB)
     |████████████████████████████████| 283 kB 1.3 MB/s 
Collecting entrypoints>=0.2.2
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/ac/c6/44694103f8c221443ee6b0041f69e2740d89a25641e62fb4f2ee568f2f9c/entrypoints-0.3-py2.py3-none-any.whl (11 kB)
Collecting jupyterlab-pygments
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/a8/6f/c34288766797193b512c6508f5994b830fb06134fdc4ca8214daba0aa443/jupyterlab_pygments-0.1.2-py2.py3-none-any.whl (4.6 kB)
Collecting pandocfilters>=1.4.1
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/28/78/bd59a9adb72fa139b1c9c186e6f65aebee52375a747e4b6a6dcf0880956f/pandocfilters-1.4.3.tar.gz (16 kB)
Collecting mistune<2,>=0.8.1
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/09/ec/4b43dae793655b7d8a25f76119624350b4d65eb663459eb9603d7f1f0345/mistune-0.8.4-py2.py3-none-any.whl (16 kB)
Collecting nbclient<0.6.0,>=0.5.0
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/22/a6/f3a01a5c1a0e72d1d064f33d4cd9c3a782010f48f48f47f256d0b438994a/nbclient-0.5.3-py3-none-any.whl (82 kB)
     |████████████████████████████████| 82 kB 363 kB/s 
Collecting async-generator
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/71/52/39d20e03abd0ac9159c162ec24b93fbcaa111e8400308f2465432495ca2b/async_generator-1.10-py3-none-any.whl (18 kB)
Collecting webencodings
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/f4/24/2a3e3df732393fed8b3ebf2ec078f05546de641fe1b667ee316ec1dcf3b7/webencodings-0.5.1-py2.py3-none-any.whl (11 kB)
Collecting packaging
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/3e/89/7ea760b4daa42653ece2380531c90f64788d979110a2ab51049d92f408af/packaging-20.9-py2.py3-none-any.whl (40 kB)
     |████████████████████████████████| 40 kB 1.3 MB/s 
Collecting qtpy
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/cd/fd/9972948f02e967b691cc0ca1f26124826a3b88cb38f412a8b7935b8c3c72/QtPy-1.9.0-py2.py3-none-any.whl (54 kB)
     |████████████████████████████████| 54 kB 2.0 MB/s 
Building wheels for collected packages: d2l-zh, pyrsistent, pandocfilters
  Building wheel for d2l-zh (setup.py) ... done
  Created wheel for d2l-zh: filename=d2l_zh-0.8.10-py3-none-any.whl size=10084 sha256=e72835f9b55a333faf9db38d88cc3b13dce9083b6a66f921338e3de0707ab1fd
  Stored in directory: c:\users\13770\appdata\local\pip\cache\wheels\35\7b\11\16c28e76ca847c98b72d93b0231ce3e4ab44581df7894f4511
  Building wheel for pyrsistent (setup.py) ... done
  Created wheel for pyrsistent: filename=pyrsistent-0.17.3-cp36-cp36m-win_amd64.whl size=55871 sha256=55eaded9ec63bf636af854d2079f2973f45255e677a70c9ef987dc2425473896
  Stored in directory: c:\users\13770\appdata\local\pip\cache\wheels\c3\94\5b\d59b8a1377beee8d947bd2ab38f91f73f75d88223e66b68577
  Building wheel for pandocfilters (setup.py) ... done
  Created wheel for pandocfilters: filename=pandocfilters-1.4.3-py3-none-any.whl size=7992 sha256=b3a344507049a8b22930b5a7649747ea867198af38f15d5887aaf002658a5911
  Stored in directory: c:\users\13770\appdata\local\pip\cache\wheels\e9\71\95\f84b1999411289b722b5a29127a3e24cc7052086403066e91b
Successfully built d2l-zh pyrsistent pandocfilters
Installing collected packages: zipp, typing-extensions, six, ipython-genutils, decorator, traitlets, pywin32, pyrsistent, importlib-metadata, attrs, wcwidth, tornado, pyzmq, python-dateutil, pyparsing, parso, nest-asyncio, jupyter-core, jsonschema, webencodings, pygments, pycparser, prompt-toolkit, pickleshare, packaging, nbformat, MarkupSafe, jupyter-client, jedi, colorama, backcall, async-generator, testpath, pywinpty, pandocfilters, nbclient, mistune, jupyterlab-pygments, jinja2, ipython, entrypoints, defusedxml, cffi, bleach, terminado, Send2Trash, prometheus-client, nbconvert, ipykernel, argon2-cffi, notebook, widgetsnbextension, qtpy, jupyterlab-widgets, qtconsole, pillow, numpy, kiwisolver, jupyter-console, ipywidgets, cycler, matplotlib, jupyter, d2l-zh
Successfully installed MarkupSafe-2.0.1 Send2Trash-1.5.0 argon2-cffi-20.1.0 async-generator-1.10 attrs-21.2.0 backcall-0.2.0 bleach-3.3.0 cffi-1.14.5 colorama-0.4.4 cycler-0.10.0 d2l-zh-0.8.10 decorator-5.0.9 defusedxml-0.7.1 entrypoints-0.3 importlib-metadata-4.3.1 ipykernel-5.5.5 ipython-7.16.1 ipython-genutils-0.2.0 ipywidgets-7.6.3 jedi-0.18.0 
jinja2-3.0.1 jsonschema-3.2.0 jupyter-1.0.0 jupyter-client-6.2.0 jupyter-console-6.4.0 jupyter-core-4.7.1 jupyterlab-pygments-0.1.2 jupyterlab-widgets-1.0.0 kiwisolver-1.3.1 matplotlib-3.3.4 mistune-0.8.4 nbclient-0.5.3 nbconvert-6.0.7 nbformat-5.1.3 nest-asyncio-1.5.1 notebook-6.4.0 numpy-1.19.5 packaging-20.9 pandocfilters-1.4.3 parso-0.8.2 pickleshare-0.7.5 pillow-8.2.0 prometheus-client-0.10.1 prompt-toolkit-3.0.18 pycparser-2.20 pygments-2.9.0 pyparsing-2.4.7 pyrsistent-0.17.3 python-dateutil-2.8.1 pywin32-301 pywinpty-1.1.1 pyzmq-22.1.0 qtconsole-5.1.0 qtpy-1.9.0 six-1.16.0 terminado-0.10.0 testpath-0.5.0 tornado-6.1 traitlets-4.3.3 typing-extensions-3.10.0.0 wcwidth-0.2.5 webencodings-0.5.1 widgetsnbextension-3.5.1 zipp-3.4.1
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show
WARNING: ERROR: Please provide a package name or names.
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show pytorch
WARNING: Package(s) not found: pytorch
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show d2lzh
WARNING: Package(s) not found: d2lzh
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show --files
WARNING: ERROR: Please provide a package name or names.
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip freeze
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
(gluon) 
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
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show d2l-zh
Name: d2l-zh
Version: 0.8.10
Summary: Dive into Deep Learning (in Chinese) Utils
Home-page: https://zh.d2l.ai
Author: Contributors
Author-email: mli@amazon.com
License: Apache-2.0
Location: f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages
Requires: jupyter, matplotlib, numpy
Required-by:
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show jupyter
Name: jupyter
Version: 1.0.0
Summary: Jupyter metapackage. Install all the Jupyter components in one go.
Home-page: http://jupyter.org
Author: Jupyter Development Team
Author-email: jupyter@googlegroups.org
License: BSD
Location: f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages
Requires: jupyter-console, ipywidgets, nbconvert, notebook, ipykernel, qtconsole
Required-by: d2l-zh
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show d2l torch
WARNING: Package(s) not found: d2l, torch
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show d2l 
WARNING: Package(s) not found: d2l
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show d2l
WARNING: Package(s) not found: d2l
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip hsow torch
ERROR: unknown command "hsow" - maybe you meant "show"
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show torch
WARNING: Package(s) not found: torch
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip install d2l torch
Looking in indexes: https://pypi.tuna.tsinghua.edu.cn/simple
WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:852)'),)': /simple/d2l/
WARNING: Retrying (Retry(total=3, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:852)'),)': /simple/d2l/
WARNING: Retrying (Retry(total=2, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:852)'),)': /simple/d2l/
WARNING: Retrying (Retry(total=1, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:852)'),)': /simple/d2l/
WARNING: Retrying (Retry(total=0, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:852)'),)': /simple/d2l/
Could not fetch URL https://pypi.tuna.tsinghua.edu.cn/simple/d2l/: There was a problem confirming the ssl certificate: HTTPSConnectionPool(host='pypi.tuna.tsinghua.edu.cn', port=443): Max retries exceeded with url: /simple/d2l/ (Caused by SSLError(SSLError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:852)'),)) - skipping  
ERROR: Could not find a version that satisfies the requirement d2l (from versions: none)
ERROR: No matching distribution found for d2l
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip install d2l torch
Looking in indexes: https://pypi.tuna.tsinghua.edu.cn/simple
Collecting d2l
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/f4/e9/89f71389acf3cc4231d7e51839a9f093ea0078d93c44988f8ade9f6d44e5/d2l-0.16.4-py3-none-any.whl (77 kB)
     |████████████████████████████████| 77 kB 655 kB/s 
Collecting torch
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/78/2c/13fd3b176ebd9c4211d054034c9f8fc51e9b7b1926dcc1ca48cdc328cf4c/torch-1.8.1-cp36-cp36m-win_amd64.whl (190.5 MB)
     |████████████████████████████████| 190.5 MB 32 kB/s 
Requirement already satisfied: jupyter in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from d2l) (1.0.0)
Requirement already satisfied: numpy in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from d2l) (1.19.5)
Collecting requests
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/29/c1/24814557f1d22c56d50280771a17307e6bf87b70727d975fd6b2ce6b014a/requests-2.25.1-py2.py3-none-any.whl (61 kB)
     |████████████████████████████████| 61 kB 186 kB/s 
Collecting pandas
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/79/87/8bb36bd4ebae147612c73d1bdc1385db7beebb9eb141c4bfefb33f52c87c/pandas-1.1.5-cp36-cp36m-win_amd64.whl (8.7 MB)
     |████████████████████████████████| 8.7 MB 242 kB/s 
Requirement already satisfied: matplotlib in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from d2l) (3.3.4)
Collecting dataclasses
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/fe/ca/75fac5856ab5cfa51bbbcefa250182e50441074fdc3f803f6e76451fab43/dataclasses-0.8-py3-none-any.whl (19 kB)
Requirement already satisfied: typing-extensions in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from torch) (3.10.0.0)
Requirement already satisfied: nbconvert in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2l) (6.0.7)
Requirement already satisfied: notebook in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2l) (6.4.0)
Requirement already satisfied: ipywidgets in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2l) (7.6.3)
Requirement already satisfied: jupyter-console in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2l) (6.4.0)
Requirement already satisfied: ipykernel in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2l) (5.5.5)
Requirement already satisfied: qtconsole in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2l) (5.1.0)
Requirement already satisfied: traitlets>=4.1.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipykernel->jupyter->d2l) (4.3.3)
Requirement already satisfied: ipython>=5.0.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipykernel->jupyter->d2l) (7.16.1)
Requirement already satisfied: tornado>=4.2 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipykernel->jupyter->d2l) (6.1)
Requirement already satisfied: jupyter-client in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipykernel->jupyter->d2l) (6.2.0)
Requirement already satisfied: backcall in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l) (0.2.0)
Requirement already satisfied: prompt-toolkit!=3.0.0,!=3.0.1,<3.1.0,>=2.0.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l) (3.0.18)
Requirement already satisfied: colorama in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l) (0.4.4) 
Requirement already satisfied: pygments in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l) (2.9.0) 
Requirement already satisfied: pickleshare in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l) (0.7.5)
Requirement already satisfied: jedi>=0.10 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l) (0.18.0)
Requirement already satisfied: decorator in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l) (5.0.9)
Requirement already satisfied: setuptools>=18.5 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2l) 
(52.0.0.post20210125)
Requirement already satisfied: parso<0.9.0,>=0.8.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jedi>=0.10->ipython>=5.0.0->ipykernel->jupyter->d2l) (0.8.2)
Requirement already satisfied: wcwidth in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from prompt-toolkit!=3.0.0,!=3.0.1,<3.1.0,>=2.0.0->ipython>=5.0.0->ipykernel->jupyter->d2l) (0.2.5)
Requirement already satisfied: six in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from traitlets>=4.1.0->ipykernel->jupyter->d2l) (1.16.0)   
Requirement already satisfied: ipython-genutils in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from traitlets>=4.1.0->ipykernel->jupyter->d2l) (0.2.0)
Requirement already satisfied: widgetsnbextension~=3.5.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipywidgets->jupyter->d2l) (3.5.1)
Requirement already satisfied: nbformat>=4.2.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipywidgets->jupyter->d2l) (5.1.3)
Requirement already satisfied: jupyterlab-widgets>=1.0.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipywidgets->jupyter->d2l) (1.0.0)
Requirement already satisfied: jsonschema!=2.5.0,>=2.4 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbformat>=4.2.0->ipywidgets->jupyter->d2l) (3.2.0)
Requirement already satisfied: jupyter-core in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbformat>=4.2.0->ipywidgets->jupyter->d2l) (4.7.1)
Requirement already satisfied: pyrsistent>=0.14.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2l) (0.17.3)
Requirement already satisfied: attrs>=17.4.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2l) (21.2.0)
Requirement already satisfied: importlib-metadata in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2l) (4.3.1)
Requirement already satisfied: pyzmq>=17 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2l) (22.1.0)
Requirement already satisfied: Send2Trash>=1.5.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2l) (1.5.0)
Requirement already satisfied: prometheus-client in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2l) (0.10.1)        
Requirement already satisfied: jinja2 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2l) (3.0.1)
Requirement already satisfied: terminado>=0.8.3 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2l) (0.10.0)
Requirement already satisfied: argon2-cffi in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2l) (20.1.0)
Requirement already satisfied: nest-asyncio>=1.5 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter-client->ipykernel->jupyter->d2l) (1.5.1)
Requirement already satisfied: python-dateutil>=2.1 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter-client->ipykernel->jupyter->d2l) (2.8.1)
Requirement already satisfied: pywin32>=1.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter-core->nbformat>=4.2.0->ipywidgets->jupyter->d2l) (301)
Requirement already satisfied: pywinpty>=1.1.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from terminado>=0.8.3->notebook->jupyter->d2l) 
(1.1.1)
Requirement already satisfied: cffi>=1.0.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from argon2-cffi->notebook->jupyter->d2l) (1.14.5)
Requirement already satisfied: pycparser in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from cffi>=1.0.0->argon2-cffi->notebook->jupyter->d2l) (2.20)
Requirement already satisfied: zipp>=0.5 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from importlib-metadata->jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2l) (3.4.1)
Requirement already satisfied: MarkupSafe>=2.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jinja2->notebook->jupyter->d2l) (2.0.1)
Requirement already satisfied: kiwisolver>=1.0.1 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from matplotlib->d2l) (1.3.1)
Requirement already satisfied: cycler>=0.10 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from matplotlib->d2l) (0.10.0)
Requirement already satisfied: pillow>=6.2.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from matplotlib->d2l) (8.2.0)
Requirement already satisfied: pyparsing!=2.0.4,!=2.1.2,!=2.1.6,>=2.0.3 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from matplotlib->d2l) 
(2.4.7)
Requirement already satisfied: mistune<2,>=0.8.1 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2l) (0.8.4)
Requirement already satisfied: jupyterlab-pygments in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2l) (0.1.2)      
Requirement already satisfied: nbclient<0.6.0,>=0.5.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2l) (0.5.3)   
Requirement already satisfied: entrypoints>=0.2.2 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2l) (0.3)
Requirement already satisfied: testpath in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2l) (0.5.0)
Requirement already satisfied: pandocfilters>=1.4.1 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2l) (1.4.3)     
Requirement already satisfied: bleach in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2l) (3.3.0)
Requirement already satisfied: defusedxml in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2l) (0.7.1)
Requirement already satisfied: async-generator in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbclient<0.6.0,>=0.5.0->nbconvert->jupyter->d2l) (1.10)
Requirement already satisfied: packaging in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from bleach->nbconvert->jupyter->d2l) (20.9)
Requirement already satisfied: webencodings in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from bleach->nbconvert->jupyter->d2l) (0.5.1)
Collecting pytz>=2017.2
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/70/94/784178ca5dd892a98f113cdd923372024dc04b8d40abe77ca76b5fb90ca6/pytz-2021.1-py2.py3-none-any.whl (510 kB)
     |████████████████████████████████| 510 kB 930 kB/s 
Requirement already satisfied: qtpy in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from qtconsole->jupyter->d2l) (1.9.0)
Collecting chardet<5,>=3.0.2
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/19/c7/fa589626997dd07bd87d9269342ccb74b1720384a4d739a1872bd84fbe68/chardet-4.0.0-py2.py3-none-any.whl (178 kB)
     |████████████████████████████████| 178 kB 1.3 MB/s 
Collecting idna<3,>=2.5
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/a2/38/928ddce2273eaa564f6f50de919327bf3a00f091b5baba8dfa9460f3a8a8/idna-2.10-py2.py3-none-any.whl (58 kB)
     |████████████████████████████████| 58 kB 735 kB/s 
Requirement already satisfied: certifi>=2017.4.17 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from requests->d2l) (2020.12.5)
Collecting urllib3<1.27,>=1.21.1
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/0c/cd/1e2ec680ec7b09846dc6e605f5a7709dfb9d7128e51a026e7154e18a234e/urllib3-1.26.5-py2.py3-none-any.whl (138 kB)
     |████████████████████████████████| 138 kB 1.1 MB/s 
Installing collected packages: urllib3, pytz, idna, chardet, requests, pandas, dataclasses, torch, d2l
Successfully installed chardet-4.0.0 d2l-0.16.4 dataclasses-0.8 idna-2.10 pandas-1.1.5 pytz-2021.1 requests-2.25.1 torch-1.8.1 urllib3-1.26.5
(gluon) 
```

> 查看torch和d2l

```bash
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show torch
Name: torch
Version: 1.8.1
Summary: Tensors and Dynamic neural networks in Python with strong GPU acceleration
Home-page: https://pytorch.org/
Author: PyTorch Team
Author-email: packages@pytorch.org
License: BSD-3
Location: f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages
Requires: numpy, dataclasses, typing-extensions
Required-by:
(gluon) 
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip show d2l
Name: d2l
Version: 0.16.4
Summary: Dive into Deep Learning
Home-page: https://d2l.ai
Author: D2L Developers
Author-email: d2l.devs@gmail.com
License: MIT-0
Location: f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages
Requires: matplotlib, jupyter, numpy, pandas, requests
Required-by:
(gluon) 
```

### 安装d2lzh包

```bash
13770@HSQ MINGW64 /g/Study/Code/Python/DeepingLearning/d2l-zh
$ pip install d2lzh
Looking in indexes: https://pypi.tuna.tsinghua.edu.cn/simple
Collecting d2lzh
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/73/9d/bdd54a6dbfa60d0cc4d23f4928dfc60fda2746309c08bbb60d47a8de3ad8/d2lzh-1.0.0.tar.gz (9.8 kB)
Requirement already satisfied: numpy in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from d2lzh) (1.19.5)
Requirement already satisfied: matplotlib in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from d2lzh) (3.3.4)
Requirement already satisfied: jupyter in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from d2lzh) (1.0.0)
Requirement already satisfied: ipykernel in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2lzh) (5.5.5)
Requirement already satisfied: notebook in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2lzh) (6.4.0)
Requirement already satisfied: ipywidgets in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2lzh) (7.6.3)
Requirement already satisfied: jupyter-console in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2lzh) (6.4.0)
Requirement already satisfied: qtconsole in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2lzh) (5.1.0)
Requirement already satisfied: nbconvert in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter->d2lzh) (6.0.7)
Requirement already satisfied: jupyter-client in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipykernel->jupyter->d2lzh) (6.2.0)
Requirement already satisfied: traitlets>=4.1.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipykernel->jupyter->d2lzh) (4.3.3)       
Requirement already satisfied: ipython>=5.0.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipykernel->jupyter->d2lzh) (7.16.1)        
Requirement already satisfied: tornado>=4.2 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipykernel->jupyter->d2lzh) (6.1)
Requirement already satisfied: jedi>=0.10 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2lzh) (0.18.0)
Requirement already satisfied: pygments in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2lzh) (2.9.0)
Requirement already satisfied: backcall in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2lzh) (0.2.0)
Requirement already satisfied: pickleshare in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2lzh) (0.7.5)
Requirement already satisfied: prompt-toolkit!=3.0.0,!=3.0.1,<3.1.0,>=2.0.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2lzh) (3.0.18)
Requirement already satisfied: colorama in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2lzh) (0.4.4)
Requirement already satisfied: setuptools>=18.5 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2lzh) (52.0.0.post20210125)
Requirement already satisfied: decorator in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipython>=5.0.0->ipykernel->jupyter->d2lzh) (5.0.9)
Requirement already satisfied: parso<0.9.0,>=0.8.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jedi>=0.10->ipython>=5.0.0->ipykernel->jupyter->d2lzh) (0.8.2)
Requirement already satisfied: wcwidth in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from prompt-toolkit!=3.0.0,!=3.0.1,<3.1.0,>=2.0.0->ipython>=5.0.0->ipykernel->jupyter->d2lzh) (0.2.5)
Requirement already satisfied: ipython-genutils in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from traitlets>=4.1.0->ipykernel->jupyter->d2lzh) (0.2.0)
Requirement already satisfied: six in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from traitlets>=4.1.0->ipykernel->jupyter->d2lzh) (1.16.0) 
Requirement already satisfied: jupyterlab-widgets>=1.0.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipywidgets->jupyter->d2lzh) (1.0.0)
Requirement already satisfied: nbformat>=4.2.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipywidgets->jupyter->d2lzh) (5.1.3)       
Requirement already satisfied: widgetsnbextension~=3.5.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from ipywidgets->jupyter->d2lzh) (3.5.1)
Requirement already satisfied: jupyter-core in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbformat>=4.2.0->ipywidgets->jupyter->d2lzh) 
(4.7.1)
Requirement already satisfied: jsonschema!=2.5.0,>=2.4 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbformat>=4.2.0->ipywidgets->jupyter->d2lzh) (3.2.0)
Requirement already satisfied: attrs>=17.4.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2lzh) (21.2.0)
Requirement already satisfied: pyrsistent>=0.14.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2lzh) (0.17.3)
Requirement already satisfied: importlib-metadata in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2lzh) (4.3.1)
Requirement already satisfied: terminado>=0.8.3 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2lzh) (0.10.0)
Requirement already satisfied: prometheus-client in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2lzh) (0.10.1)      
Requirement already satisfied: pyzmq>=17 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2lzh) (22.1.0)
Requirement already satisfied: argon2-cffi in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2lzh) (20.1.0)
Requirement already satisfied: jinja2 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2lzh) (3.0.1)
Requirement already satisfied: Send2Trash>=1.5.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from notebook->jupyter->d2lzh) (1.5.0)       
Requirement already satisfied: python-dateutil>=2.1 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter-client->ipykernel->jupyter->d2lzh) (2.8.1)
Requirement already satisfied: nest-asyncio>=1.5 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter-client->ipykernel->jupyter->d2lzh) (1.5.1)
Requirement already satisfied: pywin32>=1.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jupyter-core->nbformat>=4.2.0->ipywidgets->jupyter->d2lzh) (301)
Requirement already satisfied: pywinpty>=1.1.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from terminado>=0.8.3->notebook->jupyter->d2lzh) (1.1.1)
Requirement already satisfied: cffi>=1.0.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from argon2-cffi->notebook->jupyter->d2lzh) (1.14.5)
Requirement already satisfied: pycparser in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from cffi>=1.0.0->argon2-cffi->notebook->jupyter->d2lzh) (2.20)
Requirement already satisfied: typing-extensions>=3.6.4 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from importlib-metadata->jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2lzh) (3.10.0.0)
Requirement already satisfied: zipp>=0.5 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from importlib-metadata->jsonschema!=2.5.0,>=2.4->nbformat>=4.2.0->ipywidgets->jupyter->d2lzh) (3.4.1)
Requirement already satisfied: MarkupSafe>=2.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from jinja2->notebook->jupyter->d2lzh) (2.0.1)
Requirement already satisfied: pyparsing!=2.0.4,!=2.1.2,!=2.1.6,>=2.0.3 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from matplotlib->d2lzh) (2.4.7)
Requirement already satisfied: pillow>=6.2.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from matplotlib->d2lzh) (8.2.0)
Requirement already satisfied: cycler>=0.10 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from matplotlib->d2lzh) (0.10.0)
Requirement already satisfied: kiwisolver>=1.0.1 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from matplotlib->d2lzh) (1.3.1)
Requirement already satisfied: testpath in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2lzh) (0.5.0)
Requirement already satisfied: bleach in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2lzh) (3.3.0)
Requirement already satisfied: mistune<2,>=0.8.1 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2lzh) (0.8.4)      
Requirement already satisfied: entrypoints>=0.2.2 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2lzh) (0.3)       
Requirement already satisfied: pandocfilters>=1.4.1 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2lzh) (1.4.3)   
Requirement already satisfied: defusedxml in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2lzh) (0.7.1)
Requirement already satisfied: jupyterlab-pygments in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2lzh) (0.1.2)    
Requirement already satisfied: nbclient<0.6.0,>=0.5.0 in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbconvert->jupyter->d2lzh) (0.5.3) 
Requirement already satisfied: async-generator in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from nbclient<0.6.0,>=0.5.0->nbconvert->jupyter->d2lzh) (1.10)
Requirement already satisfied: webencodings in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from bleach->nbconvert->jupyter->d2lzh) (0.5.1)
Requirement already satisfied: packaging in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from bleach->nbconvert->jupyter->d2lzh) (20.9)       
Requirement already satisfied: qtpy in f:\waredownload\jupyter_python\anaconda3-2020-7\envs\gluon\lib\site-packages (from qtconsole->jupyter->d2lzh) (1.9.0)
Building wheels for collected packages: d2lzh
  Building wheel for d2lzh (setup.py) ... done
  Created wheel for d2lzh: filename=d2lzh-1.0.0-py3-none-any.whl size=10054 sha256=bb54512533338f9928e91d1aaaba23a62ab41a21500cc5f6e6de44de65cec90f
  Stored in directory: c:\users\13770\appdata\local\pip\cache\wheels\f7\1e\8d\1954e24ea39e3390fdc6f8591a04a0ddeabfdc9cea259a05be
Successfully built d2lzh
Installing collected packages: d2lzh
Successfully installed d2lzh-1.0.0
```

老是说我name 'd2l' is not defined

于是运行一下命令pip install d2lzh as d2l


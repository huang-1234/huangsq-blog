## a project have multiply branches

> 创建远程的某一个分支为master，然后将本地的master push上去

```bash
$ git remote add master https://github.com/huang-1234/learn_gitpro.git
13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (master)
$ git push -u master master
Enumerating objects: 68, done.
Counting objects: 100% (68/68), done.
Delta compression using up to 8 threads
Compressing objects: 100% (55/55), done.
Writing objects: 100% (68/68), 10.08 KiB | 644.00 KiB/s, done.
Total 68 (delta 12), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (12/12), done
```

>  同样的在远程创建一个分支叫做ch2，然后将本地的ch2 push上去

```bash

$ git remote add ch2 https://github.com/huang-1234/learn_gitpro.git
13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch2)
$ git push -u ch2 ch2
Enumerating objects: 68, done.
Counting objects: 100% (68/68), done.
Delta compression using up to 8 threads
Compressing objects: 100% (55/55), done.
Writing objects: 100% (68/68), 10.08 KiB | 644.00 KiB/s, done.
Total 68 (delta 12), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (12/12), done
```



```bash
13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch2)
$ git remote add ch2 https://github.com/huang-1234/learn_gitpro.git
error: remote ch2 already exists.

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch2)
$ git remote -v
ch2     https://github.com/huang-1234/learn_gitpro.git (fetch)
ch2     https://github.com/huang-1234/learn_gitpro.git (push)

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch2)
$ git staus
git: 'staus' is not a git command. See 'git --help'.

The most similar command is
        status

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch2)
$ git status
On branch ch2
nothing to commit, working tree clean

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch2)
$ git push -u ch2 ch2
Enumerating objects: 64, done.
Counting objects: 100% (64/64), done.
Delta compression using up to 8 threads
Compressing objects: 100% (54/54), done.
Writing objects: 100% (64/64), 9.95 KiB | 849.00 KiB/s, done.
Total 64 (delta 9), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (9/9), done.
To https://github.com/huang-1234/learn_gitpro.git
 * [new branch]      ch2 -> ch2
Branch 'ch2' set up to track remote branch 'ch2' from 'ch2'.

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (ch2)
$ git checkout master
Switched to branch 'master'

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (master)
$ git status
On branch master
nothing to commit, working tree clean

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (master)
$ git push -u origin master
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (master)
$ git remote -v
ch2     https://github.com/huang-1234/learn_gitpro.git (fetch)
ch2     https://github.com/huang-1234/learn_gitpro.git (push)

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (master)
$ git push -u master master
fatal: 'master' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (master)
$ git remote add master https://github.com/huang-1234/learn_gitpro.git

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (master)
$ git push -u master master
Enumerating objects: 68, done.
Counting objects: 100% (68/68), done.
Delta compression using up to 8 threads
Compressing objects: 100% (55/55), done.
Writing objects: 100% (68/68), 10.08 KiB | 644.00 KiB/s, done.
Total 68 (delta 12), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (12/12), done.
remote:
remote: Create a pull request for 'master' on GitHub by visiting:
remote:      https://github.com/huang-1234/learn_gitpro/pull/new/master
remote:
To https://github.com/huang-1234/learn_gitpro.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'master'.

13770@HSQ MINGW64 /g/Study/Code/Web/NodeJS/learnFrontTest/Git/first_learn_git (master)
$

```


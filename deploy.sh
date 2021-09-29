#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# git init
git add .
git commit -m 'update architecture'

# git remote -v
# git pull

git push -f  origin master

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'update architecture'

# 如果发布到 https://<USERNAME>.github.io
# git pull

git remote add origin git@github.com:huang-1234/huang-1234.github.io.git

# git remote -v

# git pull
# git push origin master

git push -f origin master

# git push -f git@github.com:huang-1234/huang-1234.github.io.git master
# git pull
# git push

cd -
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
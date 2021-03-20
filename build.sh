#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# nav into the build out dir
cd docs/.vuepress/dist

# git
git init
git add .
git commit -m 'deploy'
git remote add origin https://github.com/Nodreame/Nodreame.github.io.git
git push -f origin master
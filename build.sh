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
git remote add origin https://github.com/huang-1234/huang-1234.github.io.git
git push -f origin master
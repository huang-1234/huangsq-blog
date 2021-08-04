#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# nav into the build out dir

# git
# git init
git add .
git commit -m 'update'
# git remote add origin https://github.com/huang-1234/MyvuePressBlog.git
git push -f origin main
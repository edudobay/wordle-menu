#!/usr/bin/env sh

set -e

UPSTREAM_URL=git@github.com:edudobay/wordle-menu.git

yarn build --base=/wordle-menu/

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f "$UPSTREAM_URL" main:gh-pages

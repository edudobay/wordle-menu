#!/usr/bin/env sh

set -e

yarn build --base=/wordle-menu/

git switch --orphan gh-pages
git add dist
git mv dist/* .
git commit -m 'deploy'

git push -f origin gh-pages:gh-pages

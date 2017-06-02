#git subtree push -f --prefix _site origin gh-pages
git push origin `git subtree split --prefix _site master`:gh-pages --force

#!/bin/sh
# Builds two copies from src/:
#   index.html      one self-contained file (for the Claude artifact link, or to open anywhere)
#   web/            the installable app for GitHub Pages: index.html + manifest + offline helper + icons
cd /home/claude/game
{ cat src/shell.html; cat src/10-core.js src/20-art.js src/30-data-ui.js src/35-learn.js src/36-wild.js src/37-learn2.js src/40-story.js src/50-sanct.js src/55-sanct2.js src/56-gems.js src/58-device.js src/59-read.js src/60-main.js; printf '</script>\n</body></html>\n'; } > index.html
mkdir -p web
python3 - <<'PY'
s = open('index.html').read()
head = open('src/pwa-head.html').read()
open('web/index.html', 'w').write(s.replace('<!--PWA-->', head, 1))
PY
cp src/manifest.webmanifest src/sw.js web/
[ -d src/icons ] && cp -r src/icons web/
VER=$(date +%Y%m%d%H%M%S); sed -i "s/__BUILD__/$VER/" web/sw.js
: > web/.nojekyll
wc -c index.html web/index.html

#!/bin/sh
# Builds two copies from src/:
#   index.html      one self-contained file (for the Claude artifact link, or to open anywhere)
#   web/            the installable app for GitHub Pages: index.html + manifest + offline helper + icons
cd /home/claude/game
{ cat src/shell.html; cat src/10-core.js src/20-art.js src/30-data-ui.js src/35-learn.js src/36-wild.js src/37-learn2.js src/40-story.js src/50-sanct.js src/55-sanct2.js src/56-gems.js src/57-island.js src/57b-v5.js src/58-device.js src/59-read.js src/58b-pad.js src/60-main.js; printf '</script>\n</body></html>\n'; } > index.html
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
# ---- Axl's edition: the same game, every "Arlo" becomes "Axl", with its own save and app name ----
mkdir -p axl/web
python3 - <<'PY'
import re, shutil, os
ED = open('src/edition-axl.js').read()
def axl(t):
    t = t.replace('Arlo', 'Axl').replace('ARLO', 'AXL').replace('arlo', 'axl')
    if '</script>\n</body>' in t: t = t.replace('</script>\n</body>', ED.replace('drawArlo', 'drawAxl') + '\n</script>\n</body>', 1)
    return t
for src, dst in [('index.html', 'axl/index.html'), ('web/index.html', 'axl/web/index.html'), ('web/manifest.webmanifest', 'axl/web/manifest.webmanifest'), ('web/sw.js', 'axl/web/sw.js')]:
    open(dst, 'w').write(axl(open(src).read()))
if os.path.exists('axl/web/icons'): shutil.rmtree('axl/web/icons')
shutil.copytree('web/icons', 'axl/web/icons'); open('axl/web/.nojekyll', 'w').close()
for f in ['axl/index.html', 'axl/web/index.html', 'axl/web/manifest.webmanifest', 'axl/web/sw.js']:
    n = len(re.findall('arlo', open(f).read(), re.I))
    if n: raise SystemExit(f + ' still mentions Arlo %d times' % n)
print('axl edition ok')
PY

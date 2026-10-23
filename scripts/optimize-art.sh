#!/bin/bash
# Convert art/*.jpg into WebP pages (art/web) and cover thumbs (art/thumb).
# Re-running skips files that are already newer than their JPEG.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ART="$ROOT/art"
WEB="$ART/web"
THUMB="$ART/thumb"
Q_PAGE=78
Q_THUMB=75

mkdir -p "$WEB" "$THUMB"

count=0
skip=0
for jpg in "$ART"/*.jpg; do
  base="$(basename "$jpg" .jpg)"
  web="$WEB/${base}.webp"
  thumb="$THUMB/${base}.webp"
  if [[ -f "$web" && "$web" -nt "$jpg" && -f "$thumb" && "$thumb" -nt "$jpg" ]]; then
    skip=$((skip + 1))
    continue
  fi
  width="$(sips -g pixelWidth "$jpg" 2>/dev/null | awk '/pixelWidth/ {print $2}')"
  if [[ "${width:-0}" -gt 1280 ]]; then
    cwebp -quiet -q "$Q_PAGE" -resize 1280 0 "$jpg" -o "$web"
  else
    cwebp -quiet -q "$Q_PAGE" "$jpg" -o "$web"
  fi
  if [[ "${width:-0}" -gt 480 ]]; then
    cwebp -quiet -q "$Q_THUMB" -resize 480 0 "$jpg" -o "$thumb"
  else
    cwebp -quiet -q "$Q_THUMB" "$jpg" -o "$thumb"
  fi
  count=$((count + 1))
  echo "ok $base"
done

{
  echo "window.ART_DIMS = window.ART_DIMS || {};"
  echo "(function (d) {"
  python3 - "$WEB" "$THUMB" <<'PY'
import os, sys, subprocess, json

def dims(path):
    out = subprocess.check_output(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path], text=True)
    w = h = None
    for line in out.splitlines():
        line = line.strip()
        if line.startswith("pixelWidth:"):
            w = int(line.split(":")[1])
        elif line.startswith("pixelHeight:"):
            h = int(line.split(":")[1])
    return w, h

for folder, prefix in ((sys.argv[1], "art/web/"), (sys.argv[2], "art/thumb/")):
    for name in sorted(os.listdir(folder)):
        if not name.endswith(".webp"):
            continue
        w, h = dims(os.path.join(folder, name))
        key = prefix + name
        print(f"  d[{json.dumps(key)}] = [{w}, {h}];")
PY
  echo "})(window.ART_DIMS);"
} > "$ART/dims.js"

echo "converted $count skipped $skip"
du -sh "$WEB" "$THUMB"

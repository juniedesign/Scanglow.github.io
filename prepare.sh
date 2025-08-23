#!/usr/bin/env bash
set -e

# 배포할 대상 목록을 projects.json 에서 읽음
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "[prepare] github-deploy 어댑터를 준비합니다."
echo "[prepare] projects.json 읽는 중..."

PROJECTS=$(cat "$ROOT/projects.json" | sed -n \'s/.*"path": *"\([^"]*\)".*/\1/p\')

for P in $PROJECTS; do
  NAME=$(basename "$P")
  SRC="$ROOT/../$P"
  DST="$ROOT/adapters/$NAME"

  echo "[prepare] $NAME 복제 준비 -> $DST"

  rm -rf "$DST"
  mkdir -p "$DST"

  # 1) 빌드 산출물이 있는 경우 우선 사용 (dist|build)
  if [ -d "$SRC/dist" ]; then
    cp -R "$SRC/dist/." "$DST/"
  elif [ -d "$SRC/build" ]; then
    cp -R "$SRC/build/." "$DST/"
  else
    # 정적 사이트라면 원본 복제(HTML/CSS/JS만)
    rsync -av --exclude node_modules --exclude .git "$SRC/" "$DST/"
  fi

  # 2) SPA 라우팅 대응(404.html = index.html)
  if [ -f "$DST/index.html" ]; then
    cp "$DST/index.html" "$DST/404.html"
  fi

  # 3) 절대경로 → 상대경로 보정(간단 패턴)
  # <link href="/style.css"> 와 같은 루트 기준 경로를 ./ 으로 보정
  find "$DST" -type f -name "*.html" -print0 | xargs -0 sed -i \
    -e \'s/href="\//href=".\/_/g\' \
    -e \'s/src="\//src=".\/_/g\'
  # 보정 후 다시 되돌리는 후처리(./_ → ./)
  find "$DST" -type f -name "*.html" -print0 | xargs -0 sed -i \
    -e \'s/\.\//\.\//g\' -e \'s/\.\/_/\.\//g\'
done

echo "[prepare] 완료"



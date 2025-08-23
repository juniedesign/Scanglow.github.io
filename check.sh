#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
echo "[check] 링크/파일 존재 여부 기본 점검"
# 필요시 htmlhint, linkinator 등 도입 가능
[ -f "$ROOT/index.html" ] || (echo "index.html 없음" && exit 1)
[ -d "$ROOT/adapters" ] || (echo "adapters 폴더 없음" && exit 1)
echo "[check] OK"



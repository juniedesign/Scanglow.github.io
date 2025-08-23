#!/usr/bin/env bash
set -e

# github-deploy 폴더로 이동
cd "$(dirname "$0")/.."

echo "[deploy-vercel] Vercel 배포 시작..."

# Vercel CLI를 사용하여 배포
# --prod 플래그는 프로덕션 배포를 의미합니다.
# -y 플래그는 모든 질문에 자동으로 'yes'로 응답합니다.
vercel --prod -y

echo "[deploy-vercel] Vercel 배포 완료!"



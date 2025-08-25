#!/bin/bash

# Git LFS 설정 스크립트
# 대용량 파일 관리를 위한 Git LFS 초기화

echo "🚀 Git LFS 설정을 시작합니다..."

# Git LFS 설치 확인
if ! command -v git-lfs &> /dev/null; then
    echo "❌ Git LFS가 설치되지 않았습니다."
    echo "📥 Git LFS를 설치해주세요:"
    echo "   macOS: brew install git-lfs"
    echo "   Ubuntu: sudo apt-get install git-lfs"
    echo "   Windows: https://git-lfs.github.com/"
    exit 1
fi

echo "✅ Git LFS가 설치되어 있습니다."

# Git LFS 초기화
echo "🔧 Git LFS를 초기화합니다..."
git lfs install

# .gitattributes 파일이 존재하는지 확인
if [ -f ".gitattributes" ]; then
    echo "✅ .gitattributes 파일이 존재합니다."
else
    echo "❌ .gitattributes 파일이 없습니다."
    exit 1
fi

# Git LFS 추적 설정
echo "📁 Git LFS 추적을 설정합니다..."
git lfs track

# 변경사항 커밋
echo "💾 변경사항을 커밋합니다..."
git add .gitattributes
git commit -m "chore: setup Git LFS tracking"

echo "🎉 Git LFS 설정이 완료되었습니다!"
echo ""
echo "📋 다음 단계:"
echo "   1. git push origin main"
echo "   2. GitHub에서 LFS 스토리지 확인"
echo "   3. 대용량 파일 추가 시 자동으로 LFS로 추적됨"
echo ""
echo "💡 유용한 Git LFS 명령어:"
echo "   - git lfs ls-files: LFS로 추적되는 파일 목록"
echo "   - git lfs status: LFS 상태 확인"
echo "   - git lfs pull: LFS 파일 다운로드"

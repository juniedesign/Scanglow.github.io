#!/usr/bin/env bash

# GitHub Deploy Adapter - 배포 전 점검 스크립트
# 기본적인 파일 존재 여부와 구조를 확인

set -e

# 스크립트 디렉토리와 루트 디렉토리 설정
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🔍 GitHub Deploy Adapter - 배포 전 점검 시작"
echo "📁 루트 디렉토리: $ROOT_DIR"

# 점검 결과를 저장할 변수
CHECK_PASSED=true

# 함수: 점검 실패 시 처리
check_failed() {
    local message="$1"
    echo "❌ $message"
    CHECK_PASSED=false
}

# 함수: 점검 성공 시 처리
check_passed() {
    local message="$1"
    echo "✅ $message"
}

echo ""
echo "📋 필수 파일 점검 중..."

# 1. 핵심 파일 존재 여부 확인
if [ ! -f "$ROOT_DIR/index.html" ]; then
    check_failed "index.html 파일이 없습니다"
else
    check_passed "index.html 파일 확인됨"
fi

if [ ! -f "$ROOT_DIR/projects.json" ]; then
    check_failed "projects.json 파일이 없습니다"
else
    check_passed "projects.json 파일 확인됨"
fi

if [ ! -f "$ROOT_DIR/vercel.json" ]; then
    check_failed "vercel.json 파일이 없습니다"
else
    check_passed "vercel.json 파일 확인됨"
fi

if [ ! -f "$ROOT_DIR/package.json" ]; then
    check_failed "package.json 파일이 없습니다"
else
    check_passed "package.json 파일 확인됨"
fi

# 2. 필수 폴더 존재 여부 확인
echo ""
echo "📁 필수 폴더 점검 중..."

if [ ! -d "$ROOT_DIR/scripts" ]; then
    check_failed "scripts 폴더가 없습니다"
else
    check_passed "scripts 폴더 확인됨"
fi

if [ ! -d "$ROOT_DIR/api" ]; then
    check_failed "api 폴더가 없습니다"
else
    check_passed "api 폴더 확인됨"
fi

if [ ! -d "$ROOT_DIR/styles" ]; then
    check_failed "styles 폴더가 없습니다"
else
    check_passed "styles 폴더 확인됨"
fi

# 3. 스크립트 파일 실행 권한 확인
echo ""
echo "🔧 스크립트 파일 점검 중..."

if [ ! -x "$ROOT_DIR/scripts/prepare.sh" ]; then
    echo "⚠️  prepare.sh 실행 권한이 없습니다. 권한을 부여합니다..."
    chmod +x "$ROOT_DIR/scripts/prepare.sh"
fi

if [ ! -x "$ROOT_DIR/scripts/check.sh" ]; then
    echo "⚠️  check.sh 실행 권한이 없습니다. 권한을 부여합니다..."
    chmod +x "$ROOT_DIR/scripts/check.sh"
fi

check_passed "스크립트 실행 권한 확인됨"

# 4. API 파일 존재 여부 확인
echo ""
echo "🌐 API 파일 점검 중..."

if [ ! -f "$ROOT_DIR/api/health.js" ]; then
    check_failed "api/health.js 파일이 없습니다"
else
    check_passed "api/health.js 파일 확인됨"
fi

if [ ! -f "$ROOT_DIR/api/proxy.js" ]; then
    check_failed "api/proxy.js 파일이 없습니다"
else
    check_passed "api/proxy.js 파일 확인됨"
fi

# 5. 스타일 파일 존재 여부 확인
echo ""
echo "🎨 스타일 파일 점검 중..."

if [ ! -f "$ROOT_DIR/styles/main.css" ]; then
    check_failed "styles/main.css 파일이 없습니다"
else
    check_passed "styles/main.css 파일 확인됨"
fi

# 6. JavaScript 파일 존재 여부 확인
echo ""
echo "📜 JavaScript 파일 점검 중..."

if [ ! -f "$ROOT_DIR/scripts/main.js" ]; then
    check_failed "scripts/main.js 파일이 없습니다"
else
    check_passed "scripts/main.js 파일 확인됨"
fi

# 7. adapters 폴더 점검
echo ""
echo "📦 adapters 폴더 점검 중..."

if [ ! -d "$ROOT_DIR/adapters" ]; then
    echo "⚠️  adapters 폴더가 없습니다. 생성합니다..."
    mkdir -p "$ROOT_DIR/adapters"
    check_passed "adapters 폴더 생성됨"
else
    check_passed "adapters 폴더 확인됨"
    
    # adapters 내 프로젝트 확인
    if [ -z "$(ls -A "$ROOT_DIR/adapters")" ]; then
        echo "⚠️  adapters 폴더가 비어있습니다. npm run prepare을 실행해주세요."
    else
        echo "📋 adapters 폴더 내 프로젝트:"
        ls -la "$ROOT_DIR/adapters" | grep "^d" | awk '{print "   - " $9}'
    fi
fi

# 8. package.json 스크립트 점검
echo ""
echo "📋 package.json 스크립트 점검 중..."

if command -v npm &> /dev/null; then
    cd "$ROOT_DIR"
    
    # prepare 스크립트 테스트
    if npm run prepare --dry-run &> /dev/null || npm run prepare --help &> /dev/null; then
        check_passed "prepare 스크립트 확인됨"
    else
        check_failed "prepare 스크립트 실행 실패"
    fi
    
    # check 스크립트 테스트
    if npm run check --dry-run &> /dev/null || npm run check --help &> /dev/null; then
        check_passed "check 스크립트 확인됨"
    else
        check_failed "check 스크립트 실행 실패"
    fi
else
    echo "⚠️  npm이 설치되어 있지 않습니다. Node.js를 설치해주세요."
fi

# 9. 최종 점검 결과
echo ""
echo "🎯 점검 완료!"

if [ "$CHECK_PASSED" = true ]; then
    echo "✅ 모든 점검이 통과되었습니다!"
    echo ""
    echo "🚀 배포 준비가 완료되었습니다!"
    echo ""
    echo "다음 단계:"
    echo "1. npm run dev (로컬 미리보기)"
    echo "2. Git 커밋 및 푸시"
    echo "3. Vercel 연결 및 배포"
    echo "4. GitHub Pages 설정 (선택사항)"
    echo ""
    echo "배포 전 로컬 테스트를 권장합니다:"
    echo "   npm run dev"
    echo "   브라우저에서 http://localhost:5173 접속"
    
    exit 0
else
    echo "❌ 일부 점검이 실패했습니다."
    echo ""
    echo "🔧 문제를 해결한 후 다시 점검해주세요:"
    echo "   npm run check"
    echo ""
    echo "자세한 오류 내용은 위의 메시지를 확인하세요."
    
    exit 1
fi

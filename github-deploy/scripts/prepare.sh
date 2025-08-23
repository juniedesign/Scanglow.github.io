#!/usr/bin/env bash

# GitHub Deploy Adapter - 프로젝트 준비 스크립트
# 기존 프로젝트를 adapters 폴더로 복제하고 배포에 최적화

set -e

# 샘플 프로젝트 생성 함수
createSampleProject() {
    local dst="$1"
    local path="$2"
    local name="$3"
    local desc="$4"
    
    cat > "$dst/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>샘플 프로젝트</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 2rem; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #2563eb; margin-bottom: 1rem; }
        p { color: #64748b; line-height: 1.6; }
        .demo-btn { display: inline-block; background: #2563eb; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 6px; margin-top: 1rem; }
        .demo-btn:hover { background: #1d4ed8; }
    </style>
</head>
<body>
    <div class="container">
        <h1>샘플 프로젝트</h1>
        <p>이것은 샘플 프로젝트입니다. 실제 프로젝트를 추가하려면:</p>
        <ol>
            <li>상위 디렉토리에 프로젝트 폴더를 생성</li>
            <li>projects.json에 프로젝트 정보 추가</li>
            <li>npm run prepare 실행</li>
        </ol>
        <a href="../" class="demo-btn">← 런처로 돌아가기</a>
    </div>
</body>
</html>
EOF
}

# 스크립트 디렉토리와 루트 디렉토리 설정
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 GitHub Deploy Adapter - 프로젝트 준비 시작"
echo "📁 루트 디렉토리: $ROOT_DIR"

# projects.json 파일 확인
PROJECTS_FILE="$ROOT_DIR/projects.json"
if [ ! -f "$PROJECTS_FILE" ]; then
    echo "❌ projects.json 파일을 찾을 수 없습니다: $PROJECTS_FILE"
    exit 1
fi

# adapters 폴더 생성
ADAPTERS_DIR="$ROOT_DIR/adapters"
if [ -d "$ADAPTERS_DIR" ]; then
    echo "🧹 기존 adapters 폴더 정리 중..."
    rm -rf "$ADAPTERS_DIR"
fi
mkdir -p "$ADAPTERS_DIR"

echo "📋 프로젝트 목록 읽는 중..."

# jq가 설치되어 있지 않으면 기본 파싱 사용
if command -v jq &> /dev/null; then
    # jq를 사용한 JSON 파싱
    PROJECTS=$(jq -r '.[] | "\(.path)|\(.name)|\(.desc)"' "$PROJECTS_FILE")
else
    # 기본 파싱 (간단한 정규식)
    PROJECTS=$(grep -o '"path"[[:space:]]*:[[:space:]]*"[^"]*"' "$PROJECTS_FILE" | sed 's/.*"path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
fi

# 각 프로젝트 처리
echo "$PROJECTS" | while IFS='|' read -r path name desc; do
    if [ -z "$path" ]; then
        continue
    fi
    
    echo "🔧 프로젝트 처리 중: $path"
    
    # 원본 프로젝트 경로 (상위 디렉토리 기준)
    SRC="../$path"
    DST="$ADAPTERS_DIR/$path"
    
    # 원본 프로젝트 존재 확인
    if [ ! -d "$SRC" ]; then
        echo "⚠️  원본 프로젝트를 찾을 수 없습니다: $SRC"
        echo "   샘플 프로젝트를 생성합니다..."
        mkdir -p "$DST"
        createSampleProject "$DST" "$path" "$name" "$desc"
        continue
    fi
    
    # 대상 폴더 생성
    mkdir -p "$DST"
    
    echo "📁 복제 중: $SRC → $DST"
    
    # 1) 빌드 산출물이 있는 경우 우선 사용 (dist|build)
    if [ -d "$SRC/dist" ]; then
        echo "   📦 dist 폴더 복사 중..."
        cp -R "$SRC/dist/." "$DST/"
    elif [ -d "$SRC/build" ]; then
        echo "   📦 build 폴더 복사 중..."
        cp -R "$SRC/build/." "$DST/"
    elif [ -d "$SRC/out" ]; then
        echo "   📦 out 폴더 복사 중..."
        cp -R "$SRC/out/." "$DST/"
    elif [ -d "$SRC/public" ]; then
        echo "   📦 public 폴더 복사 중..."
        cp -R "$SRC/public/." "$DST/"
    else
        # 정적 사이트라면 원본 복제(HTML/CSS/JS만)
        echo "   📄 정적 파일 복사 중..."
        rsync -av --exclude node_modules --exclude .git --exclude .env --exclude .DS_Store "$SRC/" "$DST/"
    fi
    
    # 2) SPA 라우팅 대응(404.html = index.html)
    if [ -f "$DST/index.html" ]; then
        echo "   🔄 SPA 라우팅 대응: 404.html 생성"
        cp "$DST/index.html" "$DST/404.html"
    fi
    
    # 3) 절대경로 → 상대경로 보정(간단 패턴)
    echo "   🔧 경로 보정 중..."
    find "$DST" -type f -name "*.html" -print0 | xargs -0 sed -i \
        -e 's/href="\//href=".\/_/g' \
        -e 's/src="\//src=".\/_/g' \
        -e 's/url(\//url(.\/_/g'
    
    # 보정 후 다시 되돌리는 후처리(./_ → ./)
    find "$DST" -type f -name "*.html" -print0 | xargs -0 sed -i \
        -e 's/\.\//\.\//g' -e 's/\.\/_/\.\//g'
    
    # CSS 파일 내 경로도 보정
    find "$DST" -type f -name "*.css" -print0 | xargs -0 sed -i \
        -e 's/url(\//url(.\/_/g'
    
    find "$DST" -type f -name "*.css" -print0 | xargs -0 sed -i \
        -e 's/\.\/_/\.\//g'
    
    echo "   ✅ 완료: $path"
done

echo ""
echo "🎉 모든 프로젝트 준비 완료!"
echo "📁 adapters 폴더: $ADAPTERS_DIR"
echo ""
echo "다음 단계:"
echo "1. npm run dev (로컬 미리보기)"
echo "2. npm run check (배포 전 점검)"
echo "3. Git 커밋 및 푸시"
echo "4. Vercel 연결 및 배포"

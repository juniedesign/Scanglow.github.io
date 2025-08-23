# 🚀 GitHub Deploy Adapter

GitHub Pages 및 Vercel을 통한 효율적인 배포 및 서빙을 위한 자동화된 가이드라인입니다.

## ✨ 주요 기능

- **기존 프로젝트 UI/UX 100% 보존** - 원본 코드를 수정하지 않고 배포
- **자동 배포 최적화** - GitHub 커밋 시 Vercel에서 자동 빌드 및 배포
- **다중 플랫폼 지원** - GitHub Pages와 Vercel을 동시에 지원
- **SPA 라우팅 완벽 지원** - React, Vue, Svelte 등 SPA의 클라이언트 라우팅 지원
- **자동 경로 보정** - GitHub Pages 서브 경로 환경에 최적화된 상대 경로 변환
- **프록시 서비스** - CORS 문제 해결을 위한 API 프록시 제공

## 🏗️ 프로젝트 구조

```
github-deploy/
├── index.html              # 런처 페이지 (메인)
├── projects.json           # 프로젝트 목록 정의
├── vercel.json            # Vercel 배포 설정
├── package.json           # Node.js 프로젝트 설정
├── styles/
│   └── main.css          # 4단계 스타일 시스템
├── scripts/
│   ├── main.js           # 메인 JavaScript
│   ├── prepare.sh        # 프로젝트 준비 스크립트
│   └── check.sh          # 배포 전 점검 스크립트
├── api/
│   ├── health.js         # 헬스체크 API
│   └── proxy.js          # 프록시 API
├── public/
│   └── favicon.ico       # 파비콘
└── adapters/              # 프로젝트 어댑터 (자동 생성)
```

## 🚀 빠른 시작

### 1. 프로젝트 준비

```bash
cd github-deploy
npm install
npm run prepare
```

### 2. 로컬 테스트

```bash
npm run dev
# 브라우저에서 http://localhost:5173 접속
```

### 3. 배포 전 점검

```bash
npm run check
```

### 4. Git 커밋 및 푸시

```bash
git add .
git commit -m "feat: Add GitHub Deploy Adapter"
git push origin main
```

## 🔧 Vercel 배포 설정

1. **Vercel 대시보드**에서 새 프로젝트 생성
2. **GitHub 저장소 연결** (github-deploy 폴더가 포함된 저장소)
3. **프로젝트 설정**:
   - Framework Preset: `Other`
   - Root Directory: `github-deploy/`
   - Build Command: `npm run vercel-build`
4. **환경변수 설정** (필요시):
   - `PROXY_TARGET`: 프록시할 외부 API URL
5. **배포**

## 🌐 GitHub Pages 설정

1. **GitHub 저장소 설정** → Pages
2. **Source**: `Deploy from a branch`
3. **Branch**: `main`
4. **Folder**: `/github-deploy`
5. **Save**

## 📋 프로젝트 추가 방법

### 1. projects.json에 프로젝트 정보 추가

```json
{
  "name": "내 프로젝트",
  "path": "my-project",
  "desc": "프로젝트 설명",
  "tags": ["react", "spa"],
  "type": "spa",
  "framework": "react"
}
```

### 2. 프로젝트 준비 스크립트 실행

```bash
npm run prepare
```

### 3. Git 커밋 및 푸시

```bash
git add .
git commit -m "feat: Add my-project"
git push origin main
```

## 🎨 스타일 시스템 (4단계)

### 1단계: CSS 변수 및 기본 리셋
- 색상 시스템, 타이포그래피, 간격, 그림자 등 디자인 토큰
- 브라우저 기본 스타일 리셋

### 2단계: 레이아웃 시스템
- 컨테이너, 그리드, 반응형 브레이크포인트
- Flexbox 및 CSS Grid 기반 레이아웃

### 3단계: 컴포넌트 스타일
- 버튼, 카드, 폼, 네비게이션 등 UI 컴포넌트
- 호버 효과 및 전환 애니메이션

### 4단계: 반응형 디자인
- 모바일 우선 접근법
- 다크 모드 및 접근성 지원

## 🔌 API 엔드포인트

### 헬스체크
```
GET /api/health
```

### 프록시 서비스
```
GET /api/proxy/*
POST /api/proxy/*
PUT /api/proxy/*
DELETE /api/proxy/*
```

## 📱 지원 환경

- **브라우저**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Node.js**: 16.0.0+
- **npm**: 8.0.0+

## 🤝 기여하기

1. 이 저장소를 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🆘 문제 해결

### 일반적인 문제들

1. **프로젝트가 표시되지 않음**
   - `npm run prepare` 실행 확인
   - `projects.json` 파일 형식 확인

2. **이미지/스타일이 로드되지 않음**
   - 절대 경로를 상대 경로로 변경
   - `npm run prepare` 재실행

3. **SPA 라우팅 문제**
   - `404.html` 파일 존재 확인
   - 빌드 설정에서 `publicPath` 또는 `base` 설정

4. **Vercel 배포 실패**
   - `vercel.json` 설정 확인
   - 환경변수 설정 확인

### 지원 채널

- [GitHub Issues](https://github.com/your-username/your-repo-name/issues)
- [GitHub Discussions](https://github.com/your-username/your-repo-name/discussions)

---

**GitHub Deploy Adapter**로 여러분의 프로젝트를 전 세계에 배포하세요! 🌍

# 🌐 완벽한 배포 가이드: GitHub Pages + Vercel

## 🎯 개요

이 가이드는 **ScanGlow** 프로젝트를 **GitHub Pages**와 **Vercel** 모두에 배포하는 방법을 설명합니다.

## 🚀 배포 옵션 비교

| 기능 | GitHub Pages | Vercel |
|------|-------------|---------|
| **자동 배포** | ✅ GitHub Actions | ✅ GitHub Actions |
| **도메인** | `username.github.io/repo-name` | `project-name.vercel.app` |
| **HTTPS** | ✅ 자동 | ✅ 자동 |
| **CDN** | ✅ GitHub CDN | ✅ 글로벌 CDN |
| **PWA 지원** | ✅ 완벽 | ✅ 완벽 |
| **서버리스 함수** | ❌ 불가 | ✅ 지원 |
| **실시간 미리보기** | ❌ 불가 | ✅ Pull Request별 |
| **비용** | 🆓 무료 | 🆓 무료 (개인) |

## 🔄 권장 배포 전략

### 🥇 **1순위: GitHub Pages**
- **용도**: 메인 프로덕션 배포
- **장점**: 안정적, GitHub 생태계 통합
- **사용자**: 최종 사용자

### 🥈 **2순위: Vercel**
- **용도**: 개발/테스트, 실시간 미리보기
- **장점**: 빠른 배포, 개발자 경험 향상
- **사용자**: 개발자, 테스터

## 🚀 단계별 배포 가이드

### 1단계: GitHub 저장소 설정

```bash
# 1. 저장소 클론
git clone https://github.com/username/repo-name.git
cd repo-name

# 2. github-upload 폴더의 모든 내용 복사
cp -r github-upload/* ./

# 3. Git 초기화
git init
git add .
git commit -m "feat: initial commit with complete deployment setup"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### 2단계: GitHub Pages 설정

1. **Repository Settings** → **Pages** 이동
2. **Source**를 **GitHub Actions**로 설정
3. **Branch**는 `main`으로 유지
4. **Actions 권한 설정**:
   - Actions → General → "Read and write permissions" 선택

### 3단계: Vercel 설정

1. **[vercel.com](https://vercel.com)**에서 계정 생성
2. **New Project** → **Import Git Repository**
3. **GitHub 저장소** 연결 및 선택
4. **프로젝트 설정**:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 4단계: GitHub Actions 자동 배포 설정

#### GitHub Secrets 설정
Repository Settings → Secrets and variables → Actions에서:

```
# Vercel 배포용
VERCEL_TOKEN=your_vercel_token
ORG_ID=your_org_id
PROJECT_ID=your_project_id

# 환경 변수
NODE_ENV=production
```

#### Vercel 정보 수집
1. Vercel 프로젝트 생성 후 **Settings** → **General**
2. **Project ID** 복사
3. **Account Settings** → **Tokens**에서 새 토큰 생성
4. **Team ID** (Organization ID) 확인

## 📁 프로젝트 구조

```
repo-name/
├── .github/workflows/           # GitHub Actions
│   ├── web-pages.yml           # GitHub Pages 배포
│   ├── app-android.yml         # Android 앱 빌드
│   ├── app-ios.yml             # iOS 앱 빌드
│   └── vercel-deploy.yml       # Vercel 배포
├── frontend/                    # 프론트엔드 앱
│   ├── public/                 # 정적 파일
│   │   ├── manifest.webmanifest
│   │   ├── service-worker.js
│   │   ├── 404.html
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/                    # 소스 코드
│   ├── capacitor.config.ts     # Capacitor 설정
│   └── package.json            # 의존성
├── .gitattributes              # Git LFS 설정
├── vercel.json                 # Vercel 설정
├── .vercelignore               # Vercel 제외 파일
└── README.md                   # 프로젝트 설명
```

## 🔄 배포 워크플로우

### GitHub Pages 배포
```mermaid
graph LR
    A[코드 푸시] --> B[GitHub Actions]
    B --> C[빌드]
    C --> D[GitHub Pages 배포]
    D --> E[사이트 접근 가능]
```

### Vercel 배포
```mermaid
graph LR
    A[코드 푸시] --> B[GitHub Actions]
    B --> C[빌드]
    C --> D[Vercel 배포]
    D --> E[글로벌 CDN 배포]
```

## 🌐 배포 URL

### GitHub Pages
- **메인**: `https://username.github.io/repo-name/`
- **PWA**: 브라우저에서 "홈 화면에 추가" 가능

### Vercel
- **메인**: `https://project-name.vercel.app`
- **미리보기**: `https://project-name-git-branch-username.vercel.app`

## 📱 하이브리드 앱 빌드

### Android APK
- GitHub Actions에서 자동 빌드
- Actions → Artifacts에서 다운로드

### iOS 아카이브
- GitHub Actions에서 수동 실행
- macOS 러너에서만 빌드 가능

## 🚨 문제 해결

### GitHub Pages 문제
1. **Actions 로그** 확인
2. **권한 설정** 재확인
3. **base path** 설정 확인

### Vercel 문제
1. **Vercel 로그** 확인
2. **GitHub Secrets** 설정 확인
3. **프로젝트 설정** 검증

### 공통 문제
1. **Node.js 버전** 호환성 (18.x 이상)
2. **의존성 충돌** 해결
3. **환경 변수** 설정

## 📊 모니터링 및 관리

### GitHub Actions
- **Actions** 탭에서 모든 워크플로우 상태 확인
- **빌드 로그** 및 에러 디버깅
- **아티팩트** 다운로드

### Vercel 대시보드
- **Analytics**: 방문자 통계, 성능 메트릭
- **Functions**: 서버리스 함수 실행 로그
- **Deployments**: 배포 히스토리

### GitHub Pages
- **Pages** 탭에서 배포 상태 확인
- **빌드 히스토리** 및 성능 메트릭

## 🔄 업데이트 프로세스

### 코드 변경 시
```bash
# 1. 로컬 테스트
cd frontend
npm run dev
npm run build

# 2. 커밋 및 푸시
git add .
git commit -m "feat: update feature"
git push origin main

# 3. 자동 배포
# - GitHub Pages: 자동 배포
# - Vercel: 자동 배포
# - 앱 빌드: 자동/수동 실행
```

## 🎯 최적화 팁

### 성능 최적화
- **Lighthouse** 점수 90점 이상 목표
- **Bundle 분석**: `npm run analyze`
- **이미지 최적화**: WebP/AVIF 포맷 사용

### SEO 최적화
- **robots.txt** 및 **sitemap.xml** 설정
- **메타 태그** 최적화
- **구조화된 데이터** 추가

### PWA 최적화
- **Service Worker** 캐싱 전략
- **Manifest** 아이콘 및 색상
- **오프라인** 기능 테스트

## 📚 추가 리소스

- [GitHub Pages 설정 가이드](GITHUB_PAGES_SETUP.md)
- [Vercel 배포 가이드](VERCEL_DEPLOYMENT_GUIDE.md)
- [GitHub 최적화 요약](GITHUB_OPTIMIZATION_SUMMARY.md)
- [프로젝트 README](README.md)

---

**🎉 이제 GitHub Pages와 Vercel 모두에서 ScanGlow를 완벽하게 배포할 수 있습니다!**

**🌐 GitHub Pages**: 안정적인 메인 배포
**🚀 Vercel**: 빠른 개발 및 테스트 배포
**📱 하이브리드 앱**: Android/iOS 앱 빌드
**⚡ PWA**: 오프라인 지원 및 앱 설치

# 🚀 GitHub 저장소 업로드 파일 모음

이 폴더는 **GitHub 저장소에 바로 복사해서 넣을 수 있는 모든 파일들**을 포함하고 있습니다.

## 📁 폴더 구조

```
github-upload/
├── .github/                    # GitHub Actions 워크플로우
│   └── workflows/
│       ├── web-pages.yml      # 웹 자동 배포
│       ├── app-android.yml    # Android 앱 빌드
│       └── app-ios.yml        # iOS 앱 빌드
├── frontend/                   # 프론트엔드 앱 설정
│   ├── public/                # 정적 파일들
│   │   ├── manifest.webmanifest  # PWA 매니페스트
│   │   ├── service-worker.js     # 서비스 워커
│   │   ├── 404.html             # SPA 라우팅 지원
│   │   ├── robots.txt            # 검색 엔진 최적화
│   │   └── sitemap.xml          # 사이트맵
│   ├── capacitor.config.ts      # Capacitor 설정
│   └── package.json            # 의존성 및 스크립트
├── .gitattributes              # Git LFS 설정
├── setup-git-lfs.sh            # Git LFS 초기화 스크립트
├── GITHUB_PAGES_SETUP.md       # 상세 설정 가이드
├── GITHUB_OPTIMIZATION_SUMMARY.md # 최적화 완료 요약
└── README.md                   # 프로젝트 설명
```

## 🔄 사용 방법

### 1. GitHub 저장소에 복사

```bash
# 이 폴더의 모든 내용을 GitHub 저장소 루트에 복사
cp -r github-upload/* /path/to/your/github/repo/
```

### 2. Git 초기화 및 커밋

```bash
cd /path/to/your/github/repo
git init
git add .
git commit -m "feat: initial commit with GitHub optimization"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### 3. GitHub Pages 설정

1. **Repository Settings** → **Pages** 이동
2. **Source**를 **GitHub Actions**로 설정
3. **Branch**는 `main`으로 유지

### 4. 권한 설정

**Repository Settings** → **Actions** → **General**에서:
- **Actions permissions**: "Allow all actions and reusable workflows"
- **Workflow permissions**: "Read and write permissions" 선택

## ✨ 포함된 기능

### 🚀 자동 배포
- **GitHub Actions**로 main 브랜치 푸시 시 자동 배포
- **캐싱 최적화**로 빌드 속도 향상
- **병렬 실행**으로 효율적인 워크플로우

### 📱 하이브리드 앱
- **Capacitor**를 통한 PWA + 네이티브 앱 빌드
- **Android APK** 자동 빌드 및 아티팩트 생성
- **iOS 아카이브** 빌드 (macOS 러너 필요)

### 🌐 PWA 기능
- **오프라인 지원**을 위한 서비스 워커
- **앱 설치** 가능한 매니페스트
- **푸시 알림** 지원

### ⚡ 성능 최적화
- **SPA 라우팅** 지원 (404.html)
- **검색 엔진 최적화** (robots.txt, sitemap.xml)
- **Git LFS**로 대용량 파일 효율적 관리

## 📱 지원 플랫폼

| 플랫폼 | 상태 | 배포 방법 |
|--------|------|-----------|
| **웹** | ✅ 완료 | GitHub Pages 자동 배포 |
| **PWA** | ✅ 완료 | 브라우저 "홈 화면 추가" |
| **Android** | ✅ 완료 | GitHub Actions APK 빌드 |
| **iOS** | ✅ 완료 | GitHub Actions 아카이브 빌드 |

## 🎯 배포 URL

- **웹**: `https://username.github.io/repo-name/`
- **PWA**: 브라우저에서 설치 가능
- **앱**: GitHub Actions 아티팩트에서 다운로드

## 🚨 주의사항

### GitHub Pages
- **base path**를 저장소 이름에 맞게 수정 필요
- **상대 경로** 사용 필수
- **SPA 라우팅**을 위한 404.html 포함

### 앱 빌드
- **iOS 빌드**는 macOS 러너에서만 가능
- **Capacitor** 초기 설정 후 플랫폼 추가 필요

### Git LFS
- **대용량 파일**은 자동으로 LFS로 추적
- **팀원들**도 Git LFS 설치 필요

## 📚 추가 정보

- [GitHub Pages 설정 가이드](GITHUB_PAGES_SETUP.md) - 상세 설정 방법
- [최적화 완료 요약](GITHUB_OPTIMIZATION_SUMMARY.md) - 전체 개선사항 요약
- [프로젝트 README](README.md) - 프로젝트 상세 설명

---

**🎉 이제 이 폴더의 모든 내용을 GitHub 저장소에 복사하면 완벽하게 최적화된 프로젝트가 완성됩니다!**

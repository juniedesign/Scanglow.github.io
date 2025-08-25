# GitHub Pages 설정 가이드

## 🚀 자동 배포 설정

### 1. GitHub Pages 활성화

1. **Repository Settings** → **Pages** 이동
2. **Source**를 **GitHub Actions**로 설정
3. **Branch**는 `main`으로 유지

### 2. 환경 변수 설정 (필요시)

**Repository Settings** → **Secrets and variables** → **Actions**에서:

```
NODE_ENV=production
```

### 3. 권한 설정

**Repository Settings** → **Actions** → **General**에서:

- **Actions permissions**: "Allow all actions and reusable workflows"
- **Workflow permissions**: "Read and write permissions" 선택

## 📱 하이브리드 앱 빌드

### Android 빌드

```bash
# 로컬에서 첫 실행
cd frontend
npm run cap:build:android

# GitHub Actions에서 자동 빌드
# main 브랜치 푸시 시 자동 실행
```

### iOS 빌드

```bash
# 로컬에서 첫 실행
cd frontend
npm run cap:build:ios

# GitHub Actions에서 수동 실행
# Actions 탭에서 "App iOS Build" 워크플로우 수동 실행
```

## 🔧 로컬 개발 환경

### 의존성 설치

```bash
cd frontend
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드 테스트

```bash
npm run build:gh
npm run preview
```

## 📁 프로젝트 구조

```
SKIN-concierge/
├── .github/workflows/          # GitHub Actions
│   ├── web-pages.yml          # 웹 자동 배포
│   ├── app-android.yml        # Android 빌드
│   └── app-ios.yml            # iOS 빌드
├── frontend/                   # 프론트엔드 앱
│   ├── public/                # 정적 파일
│   │   ├── manifest.webmanifest  # PWA 매니페스트
│   │   ├── service-worker.js     # 서비스 워커
│   │   ├── 404.html             # SPA 라우팅 지원
│   │   ├── robots.txt            # 검색 엔진 최적화
│   │   └── sitemap.xml          # 사이트맵
│   ├── src/                   # 소스 코드
│   ├── capacitor.config.ts     # Capacitor 설정
│   └── package.json           # 의존성 및 스크립트
├── .gitattributes             # Git LFS 설정
└── README.md                  # 프로젝트 설명
```

## 🌐 배포 URL

- **웹**: `https://juniekim.github.io/SKIN-concierge/`
- **PWA**: 브라우저에서 "홈 화면에 추가" 가능
- **하이브리드 앱**: GitHub Actions 아티팩트에서 APK/AAB 다운로드

## 📊 모니터링

### 빌드 상태 확인

1. **Actions** 탭에서 워크플로우 실행 상태 확인
2. **Pages** 탭에서 배포 상태 확인
3. **Releases** 탭에서 앱 빌드 아티팩트 확인

### 성능 최적화

- **Lighthouse** 점수: 90점 이상 목표
- **Bundle 분석**: `npm run analyze`로 번들 크기 확인
- **이미지 최적화**: WebP/AVIF 포맷 사용 권장

## 🚨 문제 해결

### 빌드 실패 시

1. **Actions 로그** 확인
2. **Node.js 버전** 호환성 체크 (20.x 권장)
3. **의존성 충돌** 해결: `npm ci` 재실행

### 배포 실패 시

1. **Pages 설정** 확인
2. **권한 설정** 재확인
3. **워크플로우 파일** 문법 검증

### SPA 라우팅 문제

1. **404.html** 파일 존재 확인
2. **React Router** 설정 검증
3. **base path** 설정 확인

## 🔄 업데이트 프로세스

### 코드 변경 시

1. **로컬 테스트**: `npm run dev` → `npm run build:gh`
2. **커밋 & 푸시**: `git add .` → `git commit -m "feat: update"` → `git push`
3. **자동 배포**: GitHub Actions가 자동으로 실행
4. **배포 완료**: Pages에서 변경사항 확인

### 앱 업데이트 시

1. **버전 업데이트**: `package.json`의 `version` 필드 수정
2. **Capacitor 동기화**: `npm run cap:sync`
3. **플랫폼별 빌드**: `npm run cap:build:android` / `npm run cap:build:ios`

## 📚 추가 리소스

- [GitHub Pages 공식 문서](https://pages.github.com/)
- [GitHub Actions 가이드](https://docs.github.com/en/actions)
- [Capacitor 문서](https://capacitorjs.com/docs)
- [PWA 가이드](https://web.dev/progressive-web-apps/)

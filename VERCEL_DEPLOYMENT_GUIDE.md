# 🚀 Vercel 배포 가이드

## 📋 개요

이 가이드는 **ScanGlow** 프로젝트를 Vercel에 배포하는 방법을 설명합니다.

## 🎯 Vercel 배포의 장점

- **자동 배포**: GitHub 푸시 시 자동 배포
- **글로벌 CDN**: 전 세계 어디서나 빠른 접속
- **HTTPS 자동 설정**: SSL 인증서 자동 관리
- **서버리스 함수**: API 엔드포인트 지원
- **실시간 미리보기**: Pull Request별 미리보기 URL 제공

## 🔧 사전 준비

### 1. Vercel 계정 생성
- [vercel.com](https://vercel.com)에서 계정 생성
- GitHub 계정으로 로그인 권장

### 2. Vercel CLI 설치 (선택사항)
```bash
npm i -g vercel
```

## 🚀 배포 방법

### 방법 1: Vercel 대시보드에서 배포 (권장)

1. **Vercel 대시보드**에서 **New Project** 클릭
2. **Import Git Repository** 선택
3. **GitHub 저장소** 연결 및 선택
4. **프로젝트 설정**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`

### 방법 2: GitHub Actions 자동 배포

1. **Vercel 프로젝트 생성** 후 다음 정보 수집:
   - `VERCEL_TOKEN`
   - `ORG_ID`
   - `PROJECT_ID`

2. **GitHub Secrets 설정**:
   - Repository Settings → Secrets and variables → Actions
   - 다음 시크릿 추가:
     ```
     VERCEL_TOKEN=your_vercel_token
     ORG_ID=your_org_id
     PROJECT_ID=your_project_id
     ```

3. **자동 배포 활성화**:
   - main 브랜치 푸시 시 자동으로 Vercel에 배포
   - GitHub Actions 탭에서 배포 상태 확인 가능

## ⚙️ 프로젝트 설정

### vercel.json 설정

```json
{
  "version": 2,
  "name": "scanglow-app",
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/index.html"
    }
  ]
}
```

### 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수 설정:

```
NODE_ENV=production
VITE_API_URL=your_api_url
VITE_APP_NAME=ScanGlow
```

## 🔄 배포 프로세스

### 1. 빌드 단계
```bash
cd frontend
npm ci
npm run build
```

### 2. 배포 단계
- Vercel이 `frontend/dist` 폴더를 자동으로 배포
- 정적 파일들을 글로벌 CDN에 업로드
- 자동으로 HTTPS 설정

### 3. 도메인 설정
- **Vercel 도메인**: `project-name.vercel.app`
- **커스텀 도메인**: 원하는 도메인 연결 가능

## 📱 PWA 설정

### Service Worker
- Vercel에서 자동으로 서비스 워커 지원
- 오프라인 기능 정상 작동

### Manifest
- `manifest.webmanifest` 파일 자동 인식
- PWA 설치 기능 정상 작동

## 🚨 문제 해결

### 빌드 실패
1. **Node.js 버전** 확인 (18.x 이상 권장)
2. **의존성 충돌** 해결: `npm ci` 재실행
3. **환경 변수** 설정 확인

### 배포 실패
1. **Vercel 로그** 확인
2. **GitHub Actions 로그** 확인
3. **권한 설정** 확인

### SPA 라우팅 문제
1. **vercel.json**의 routes 설정 확인
2. **404.html** 파일 존재 확인
3. **React Router** 설정 검증

## 📊 모니터링

### Vercel 대시보드
- **Analytics**: 방문자 통계, 성능 메트릭
- **Functions**: 서버리스 함수 실행 로그
- **Deployments**: 배포 히스토리 및 상태

### GitHub Actions
- **워크플로우 실행** 상태 확인
- **빌드 로그** 및 에러 디버깅
- **배포 완료** 알림

## 🔗 유용한 링크

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vercel GitHub Actions](https://vercel.com/docs/concepts/git/vercel-for-github)
- [Vercel CLI 문서](https://vercel.com/docs/cli)
- [Vercel 대시보드](https://vercel.com/dashboard)

## 🎉 배포 완료 후

1. **도메인 확인**: `https://your-project.vercel.app`
2. **PWA 테스트**: 브라우저에서 "홈 화면에 추가" 테스트
3. **성능 테스트**: Lighthouse 점수 확인
4. **모바일 테스트**: 다양한 디바이스에서 테스트

---

**🚀 이제 Vercel과 GitHub Pages 모두에서 ScanGlow를 배포할 수 있습니다!**

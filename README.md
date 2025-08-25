# SKIN Concierge 🧴✨

AI 기반 피부 진단 및 맞춤형 화장품 추천 서비스

## 🌟 프로젝트 소개

SKIN Concierge는 AI 기술을 활용하여 사용자의 피부 상태를 분석하고, 개인 맞춤형 화장품을 추천하는 웹 애플리케이션입니다.

### 주요 기능
- 🤖 **AI 피부 스캔**: 사진을 통한 피부 상태 분석
- 🎯 **맞춤형 추천**: 개인 피부 타입에 맞는 제품 추천
- 📊 **피부 상태 추적**: 시간에 따른 피부 변화 모니터링
- 💬 **리뷰 시스템**: 제품 사용 후기 및 평가
- 🔔 **알림 서비스**: 피부 관리 일정 및 제품 사용 알림

## 🚀 배포 상태

[![Web Pages](https://github.com/juniekim/SKIN-concierge/workflows/Web%20Pages/badge.svg)](https://github.com/juniekim/SKIN-concierge/actions)
[![App Android Build](https://github.com/juniekim/SKIN-concierge/workflows/App%20Android%20Build/badge.svg)](https://github.com/juniekim/SKIN-concierge/actions)
[![App iOS Build](https://github.com/juniekim/SKIN-concierge/workflows/App%20iOS%20Build/badge.svg)](https://github.com/juniekim/SKIN-concierge/actions)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://juniekim.github.io/SKIN-concierge)

**🌐 배포된 사이트**: [https://juniekim.github.io/SKIN-concierge](https://juniekim.github.io/SKIN-concierge)

**📱 하이브리드 앱**: GitHub Actions에서 APK/AAB 아티팩트로 빌드

## 🛠️ 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스
- **Vite** - 빌드 도구 및 개발 서버
- **React Router** - 클라이언트 사이드 라우팅
- **Chart.js** - 데이터 시각화
- **Tailwind CSS** - 스타일링

### Backend
- **Node.js** - 서버 런타임
- **Express.js** - 웹 프레임워크
- **MongoDB** - 데이터베이스
- **JWT** - 인증 시스템

### DevOps
- **GitHub Actions** - CI/CD 파이프라인
- **GitHub Pages** - 정적 사이트 호스팅
- **Capacitor** - 하이브리드 앱 빌드
- **Docker** - 컨테이너화

## 📁 프로젝트 구조

```
SKIN-concierge/
├── frontend/                 # React 프론트엔드
│   ├── src/                 # 소스 코드
│   ├── public/              # 정적 파일
│   └── dist/                # 빌드 결과물
├── backend/                  # Node.js 백엔드
│   ├── src/                 # 서버 소스 코드
│   ├── models/              # 데이터 모델
│   └── routes/              # API 라우트
├── .github/                  # GitHub 설정
│   └── workflows/           # GitHub Actions
└── docs/                     # 문서
```

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/juniekim/SKIN-concierge.git
cd SKIN-concierge
```

### 2. 프론트엔드 개발 서버 실행
```bash
cd frontend
npm install
npm run dev
```

### 3. 백엔드 서버 실행
```bash
cd backend
npm install
npm run dev
```

## 📦 배포

### 자동 배포 (권장)
GitHub Actions를 통해 main 브랜치에 푸시할 때마다 자동으로 배포됩니다.

```bash
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
```

### 수동 배포
```bash
# 배포 스크립트 사용
./deploy.sh

# 또는 npm 스크립트 사용
cd frontend
npm run deploy
```

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 테스트 실행
npm run test

# 린팅
npm run lint

# 번들 분석
npm run analyze
```

## 📚 문서

- [GitHub Pages 설정 가이드](GITHUB_PAGES_SETUP.md) - 자동 배포 및 앱 빌드 가이드
- [배포 가이드](DEPLOYMENT.md) - GitHub Pages 배포 상세 가이드
- [배포 체크리스트](DEPLOYMENT_CHECKLIST.md) - 배포 전 확인사항
- [개발 가이드](DEVELOPMENT_TASKS.md) - 개발 작업 목록
- [프로젝트 상태](DEVELOPMENT_STATUS.md) - 현재 개발 진행 상황

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

- **GitHub Issues**: [프로젝트 이슈](https://github.com/juniekim/SKIN-concierge/issues)
- **이메일**: [your-email@example.com]

## 🙏 감사의 말

이 프로젝트는 다음과 같은 오픈소스 프로젝트들의 도움을 받았습니다:
- React, Vite, Node.js, Express.js 등

---

**SKIN Concierge와 함께 더 건강하고 아름다운 피부를 만들어보세요! ✨**

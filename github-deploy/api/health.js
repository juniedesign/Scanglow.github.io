// Vercel 서버리스 함수 - 헬스체크 API
export default function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET 요청만 허용
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET', 'OPTIONS']);
    res.status(405).json({ 
      error: 'Method not allowed',
      allowed: ['GET', 'OPTIONS']
    });
    return;
  }

  try {
    // 현재 시간
    const now = new Date();
    const timestamp = now.getTime();
    
    // 시스템 정보
    const systemInfo = {
      ok: true,
      status: 'healthy',
      timestamp: timestamp,
      datetime: now.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.version,
      platform: process.platform,
      arch: process.arch
    };

    // 배포 정보
    const deploymentInfo = {
      service: 'github-deploy-adapter',
      platform: 'vercel',
      region: process.env.VERCEL_REGION || 'unknown',
      url: process.env.VERCEL_URL || 'unknown',
      gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
      gitCommitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'unknown',
      gitBranch: process.env.VERCEL_GIT_COMMIT_REF || 'unknown'
    };

    // 응답 데이터 구성
    const response = {
      ...systemInfo,
      deployment: deploymentInfo,
      endpoints: {
        health: '/api/health',
        proxy: '/api/proxy/*',
        projects: '/projects.json',
        launcher: '/'
      },
      features: [
        'GitHub Pages 호환',
        'SPA 라우팅 지원',
        '자동 경로 보정',
        '프록시 서비스',
        '정적 파일 최적화'
      ]
    };

    // 성공 응답
    res.status(200).json(response);

  } catch (error) {
    console.error('Health check error:', error);
    
    // 에러 응답
    res.status(500).json({
      ok: false,
      status: 'error',
      error: error.message,
      timestamp: Date.now(),
      datetime: new Date().toISOString()
    });
  }
}

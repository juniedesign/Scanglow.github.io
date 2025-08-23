// Vercel 서버리스 함수 - 프록시 API
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // OPTIONS 요청 처리 (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 프록시 대상 URL 확인
    const target = process.env.PROXY_TARGET;
    if (!target) {
      return res.status(500).json({ 
        error: 'PROXY_TARGET environment variable not set',
        message: 'Vercel 대시보드에서 PROXY_TARGET 환경변수를 설정해주세요.',
        example: 'https://api.example.com'
      });
    }

    // 요청 URL에서 프록시 경로 추출
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname.replace(/^\/api\/proxy/, '');
    const destination = target + path + (url.search || '');

    // 요청 헤더 정리 (불필요한 헤더 제거)
    const headers = { ...req.headers };
    const excludedHeaders = ['host', 'connection', 'content-length', 'x-forwarded-for', 'x-forwarded-proto'];
    excludedHeaders.forEach(header => delete headers[header.toLowerCase()]);

    // 요청 본문 처리
    let body;
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    // 업스트림 요청 구성
    const fetchOptions = {
      method: req.method,
      headers: headers,
      body: body
    };

    // GET/HEAD 요청의 경우 body 제거
    if (['GET', 'HEAD'].includes(req.method)) {
      delete fetchOptions.body;
    }

    console.log(`[PROXY] ${req.method} ${destination}`);

    // 외부 API 호출
    const upstreamResponse = await fetch(destination, fetchOptions);

    // 응답 상태 코드 설정
    res.status(upstreamResponse.status);

    // 응답 헤더 복사
    upstreamResponse.headers.forEach((value, key) => {
      // 보안 관련 헤더는 제외
      if (!['content-security-policy', 'x-frame-options'].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    // CORS 헤더 재설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    // 응답 본문 처리
    const contentType = upstreamResponse.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      // JSON 응답
      const data = await upstreamResponse.json();
      res.json(data);
    } else if (contentType && contentType.includes('text/')) {
      // 텍스트 응답
      const text = await upstreamResponse.text();
      res.send(text);
    } else {
      // 바이너리/기타 응답
      const buffer = await upstreamResponse.arrayBuffer();
      res.send(Buffer.from(buffer));
    }

  } catch (error) {
    console.error('Proxy error:', error);
    
    // 에러 응답
    res.status(500).json({
      error: 'Proxy request failed',
      message: error.message,
      timestamp: Date.now(),
      datetime: new Date().toISOString()
    });
  }
}

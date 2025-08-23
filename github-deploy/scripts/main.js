// GitHub Deploy Adapter - 메인 JavaScript
class GitHubDeployAdapter {
    constructor() {
        this.projects = [];
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.updateProjectCount();
        this.checkSystemStatus();
        this.setupEventListeners();
    }

    // 프로젝트 목록 로드
    async loadProjects() {
        try {
            const response = await fetch('./projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.projects = await response.json();
            this.renderProjects();
        } catch (error) {
            console.error('프로젝트 목록을 불러오는데 실패했습니다:', error);
            this.showError('프로젝트 목록을 불러올 수 없습니다.');
        }
    }

    // 프로젝트 목록 렌더링
    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        if (this.projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="loading">
                    <p>등록된 프로젝트가 없습니다.</p>
                    <p>projects.json 파일에 프로젝트를 추가해주세요.</p>
                </div>
            `;
            return;
        }

        const projectsHTML = this.projects.map(project => this.createProjectCard(project)).join('');
        projectsGrid.innerHTML = projectsHTML;
    }

    // 프로젝트 카드 생성
    createProjectCard(project) {
        const { name, path, desc = '', tags = [] } = project;
        
        const tagsHTML = tags.length > 0 
            ? `<div class="project-tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
            : '';

        return `
            <a href="./adapters/${path}/" class="project-card">
                <div class="project-name">${name}</div>
                <div class="project-desc">${desc}</div>
                ${tagsHTML}
                <div class="project-path">${path}</div>
            </a>
        `;
    }

    // 프로젝트 수 업데이트
    updateProjectCount() {
        const projectCountElement = document.getElementById('projectCount');
        if (projectCountElement) {
            projectCountElement.textContent = this.projects.length;
        }
    }

    // 시스템 상태 확인
    async checkSystemStatus() {
        await this.checkHealth();
        await this.checkProxy();
    }

    // 헬스체크 API 상태 확인
    async checkHealth() {
        const healthStatusElement = document.getElementById('healthStatus');
        if (!healthStatusElement) return;

        try {
            const response = await fetch('/api/health');
            if (response.ok) {
                const data = await response.json();
                healthStatusElement.textContent = '🟢 정상';
                healthStatusElement.className = 'status-indicator success';
                healthStatusElement.title = `마지막 확인: ${new Date(data.ts).toLocaleString()}`;
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            healthStatusElement.textContent = '🔴 오류';
            healthStatusElement.className = 'status-indicator error';
            healthStatusElement.title = `오류: ${error.message}`;
        }
    }

    // 프록시 서비스 상태 확인
    async checkProxy() {
        const proxyStatusElement = document.getElementById('proxyStatus');
        if (!proxyStatusElement) return;

        try {
            // 간단한 프록시 테스트 (존재하지 않는 엔드포인트로 테스트)
            const response = await fetch('/api/proxy/test-endpoint');
            if (response.status === 500) {
                // 500 에러는 정상 (PROXY_TARGET이 설정되지 않았을 때)
                proxyStatusElement.textContent = '🟡 설정 필요';
                proxyStatusElement.className = 'status-indicator warning';
                proxyStatusElement.title = 'Vercel 환경변수 PROXY_TARGET 설정이 필요합니다';
            } else {
                proxyStatusElement.textContent = '🟢 정상';
                proxyStatusElement.className = 'status-indicator success';
                proxyStatusElement.title = '프록시 서비스가 정상 동작 중입니다';
            }
        } catch (error) {
            proxyStatusElement.textContent = '🔴 오류';
            proxyStatusElement.className = 'status-indicator error';
            proxyStatusElement.title = `오류: ${error.message}`;
        }
    }

    // 수동 상태 확인 함수들 (전역 함수로 노출)
    async manualHealthCheck() {
        const healthStatusElement = document.getElementById('healthStatus');
        if (healthStatusElement) {
            healthStatusElement.textContent = '확인 중...';
            healthStatusElement.className = 'status-indicator';
        }
        await this.checkHealth();
    }

    async manualProxyCheck() {
        const proxyStatusElement = document.getElementById('proxyStatus');
        if (proxyStatusElement) {
            proxyStatusElement.textContent = '확인 중...';
            proxyStatusElement.className = 'status-indicator';
        }
        await this.checkProxy();
    }

    // 에러 표시
    showError(message) {
        const projectsGrid = document.getElementById('projectsGrid');
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="error-message">
                    <p>❌ ${message}</p>
                    <button class="btn btn-primary" onclick="location.reload()">다시 시도</button>
                </div>
            `;
        }
    }

    // 이벤트 리스너 설정
    setupEventListeners() {
        // 스크롤 시 헤더 그림자 효과
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // 네비게이션 링크 스무스 스크롤
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // 프로젝트 카드 호버 효과
        this.setupProjectCardEffects();
    }

    // 스크롤 핸들러
    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 10) {
                header.style.boxShadow = 'var(--shadow-xl)';
            } else {
                header.style.boxShadow = 'var(--shadow-lg)';
            }
        }
    }

    // 스무스 스크롤 핸들러
    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // 프로젝트 카드 효과 설정
    setupProjectCardEffects() {
        document.addEventListener('DOMContentLoaded', () => {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-4px)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                });
            });
        });
    }

    // 유틸리티 함수들
    static formatDate(timestamp) {
        return new Date(timestamp).toLocaleString('ko-KR');
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// 전역 함수들 (HTML에서 직접 호출)
window.checkHealth = function() {
    if (window.adapter) {
        window.adapter.manualHealthCheck();
    }
};

window.checkProxy = function() {
    if (window.adapter) {
        window.adapter.manualProxyCheck();
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.adapter = new GitHubDeployAdapter();
    
    // 로딩 애니메이션
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'opacity 0.3s ease-in-out';
            element.style.opacity = '1';
        }, 100);
    });

    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    document.querySelectorAll('.feature, .status-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// 에러 처리
window.addEventListener('error', (event) => {
    console.error('JavaScript 오류:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('처리되지 않은 Promise 거부:', event.reason);
});

import React from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';

const Landing = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: colors.ui.background.primary,
        padding: `${spacing[16]} 0`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${colors.accent[10]} 0%, ${colors.accent[5]} 100%)`,
          zIndex: 0,
        }} />
        <Container>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            <Typography 
              variant="h1" 
              style={{ 
                marginBottom: spacing[4],
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize['5xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.ui.foreground.primary,
              }}
            >
              피부 고민, 이제 AI로 진단하고 맞춤 추천 받으세요.
            </Typography>
            <Typography 
              variant="h5" 
              style={{ 
                maxWidth: '600px',
                marginBottom: spacing[8],
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.regular,
                color: colors.ui.foreground.secondary,
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              단 1분이면 내 피부 타입, 상태, 가장 잘 맞는 뷰티 솔루션까지 한눈에 확인할 수 있습니다.
            </Typography>
            <Button 
              variant="primary" 
              size="lg"
              style={{ 
                animation: `${animations.keyframes.scaleIn} ${animations.transition.smooth}`,
                background: colors.accent[100],
                color: colors.white,
                padding: `${spacing[4]} ${spacing[8]}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                transition: animations.transitions.fade,
                '&:hover': {
                  background: colors.accent[115],
                }
              }}
            >
              지금 바로 무료 진단 시작하기
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: `${spacing[16]} 0`,
        background: colors.ui.background.secondary,
      }}>
        <Container>
          <Typography 
            variant="h2" 
            style={{ 
              textAlign: 'center',
              marginBottom: spacing[12],
              fontFamily: typography.fontFamily.primary,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.ui.foreground.primary,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            AI 피부 분석으로 달라지는 스킨케어
          </Typography>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: spacing[8],
          }}>
            <Card style={{
              padding: spacing[8],
              background: colors.ui.background.primary,
              borderRadius: borderRadius.xl,
              boxShadow: 'lg',
              transition: animations.transition.scale,
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography 
                variant="h4" 
                style={{ 
                  marginBottom: spacing[4],
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.ui.foreground.primary,
                }}
              >
                빠른 AI 진단
              </Typography>
              <Typography 
                variant="body1" 
                style={{
                  color: colors.ui.foreground.secondary,
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                }}
              >
                스마트폰 카메라로 즉시 피부 상태를 분석하고, 과학적으로 진단받을 수 있어요.
              </Typography>
            </Card>

            <Card style={{
              padding: spacing[8],
              background: colors.ui.background.primary,
              borderRadius: borderRadius.xl,
              boxShadow: 'lg',
              transition: animations.transition.scale,
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography 
                variant="h4" 
                style={{ 
                  marginBottom: spacing[4],
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.ui.foreground.primary,
                }}
              >
                개인화 추천
              </Typography>
              <Typography 
                variant="body1" 
                style={{
                  color: colors.ui.foreground.secondary,
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                }}
              >
                내 피부와 선호도에 딱 맞는 제품과 솔루션을 전 세계 리뷰 데이터와 함께 추천해 드립니다.
              </Typography>
            </Card>

            <Card style={{
              padding: spacing[8],
              background: colors.ui.background.primary,
              borderRadius: borderRadius.xl,
              boxShadow: 'lg',
              transition: animations.transition.scale,
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography 
                variant="h4" 
                style={{ 
                  marginBottom: spacing[4],
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.ui.foreground.primary,
                }}
              >
                지속 추적
              </Typography>
              <Typography 
                variant="body1" 
                style={{
                  color: colors.ui.foreground.secondary,
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                }}
              >
                내 피부 변화 과정을 기록하고, 개선 상황을 지속적으로 확인할 수 있습니다.
              </Typography>
            </Card>
          </div>
        </Container>
      </section>

      {/* Social Proof Section */}
      <section style={{
        background: colors.ui.background.tertiary,
        padding: `${spacing[16]} 0`,
      }}>
        <Container>
          <div style={{
            textAlign: 'center',
            marginBottom: spacing[12],
          }}>
            <Typography 
              variant="h2" 
              style={{ 
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.ui.foreground.primary,
                marginBottom: spacing[4],
              }}
            >
              14,218명의 사용자가 선택한 서비스
            </Typography>
            <Typography 
              variant="h5" 
              style={{ 
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.regular,
                color: colors.ui.foreground.secondary,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              실제 사용자들의 경험을 확인해보세요
            </Typography>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: spacing[8],
          }}>
            {[
              {
                quote: "매번 어떤 제품을 선택할지 고민이었는데, AI 추천으로 딱 맞는 제품을 찾았어요. 다른 서비스와 달리 딱 맞는 솔루션을 받을 수 있어 신뢰가 갑니다.",
                author: "김서연",
                role: "30대 / 복합성 피부"
              },
              {
                quote: "피부 변화를 눈으로 직접 확인할 수 있어서 좋아요. 꾸준히 관리하게 되고, 실제로 피부가 좋아지는 걸 느낄 수 있어요.",
                author: "이지민",
                role: "20대 / 건성 피부"
              },
              {
                quote: "전문가 상담 받은 것처럼 정확하게 진단해주고 관리법도 알려줘서 너무 좋아요. 이제는 제품 고르는 게 훨씬 쉬워졌어요.",
                author: "박지현",
                role: "30대 / 민감성 피부"
              }
            ].map((testimonial, index) => (
              <Card 
                key={index}
                style={{ 
                  padding: spacing[8],
                  background: colors.ui.background.primary,
                  borderRadius: borderRadius.xl,
                  boxShadow: 'lg',
                  textAlign: 'left',
                  transition: animations.transition.scale,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <Typography 
                  variant="body1" 
                  style={{ 
                    marginBottom: spacing[6],
                    fontSize: typography.fontSize.lg,
                    lineHeight: typography.lineHeight.relaxed,
                    color: colors.ui.foreground.primary,
                  }}
                >
                  "{testimonial.quote}"
                </Typography>
                <div>
                  <Typography 
                    variant="h6"
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.ui.foreground.primary,
                      marginBottom: spacing[1],
                    }}
                  >
                    {testimonial.author}
                  </Typography>
                  <Typography 
                    variant="body2"
                    style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.ui.foreground.tertiary,
                    }}
                  >
                    {testimonial.role}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{
        background: colors.accent[100],
        padding: `${spacing[16]} 0`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${colors.accent[115]} 0%, ${colors.accent[100]} 100%)`,
          opacity: 0.9,
          zIndex: 0,
        }} />
        <Container>
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}>
            <Typography 
              variant="h2" 
              style={{ 
                color: colors.white,
                marginBottom: spacing[6],
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize['4xl'],
                fontWeight: typography.fontWeight.bold,
                lineHeight: typography.lineHeight.tight,
              }}
            >
              오늘 바로 나만의 맞춤 피부 솔루션을 만나보세요
            </Typography>
            <Typography 
              variant="h5"
              style={{ 
                color: colors.ground[90],
                marginBottom: spacing[8],
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.regular,
                lineHeight: typography.lineHeight.relaxed,
                maxWidth: '600px',
                margin: `0 auto ${spacing[8]}`,
              }}
            >
              AI 피부 분석부터 맞춤형 제품 추천까지, 모든 서비스를 무료로 경험해보세요.
            </Typography>
            <Button 
              variant="outline"
              size="lg"
              style={{ 
                background: colors.white,
                color: colors.accent[100],
                padding: `${spacing[4]} ${spacing[8]}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                border: 'none',
                boxShadow: 'lg',
                transition: animations.transitions.fade,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
                }
              }}
            >
              무료로 시작하기
            </Button>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer style={{
        background: colors.dark[120],
        padding: `${spacing[12]} 0 ${spacing[8]}`,
        color: colors.white,
      }}>
        <Container>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: spacing[12],
            marginBottom: spacing[12],
          }}>
            <div>
              <Typography 
                variant="h6" 
                style={{ 
                  color: colors.white, 
                  marginBottom: spacing[4],
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                }}
              >
                SKIN concierge
              </Typography>
              <Typography 
                variant="body2" 
                style={{ 
                  color: colors.ground[70],
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                  marginBottom: spacing[6],
                }}
              >
                AI 기반 맞춤형 스킨케어 솔루션으로<br />
                당신의 피부 건강을 책임지겠습니다.
              </Typography>
              <div style={{
                display: 'flex',
                gap: spacing[4],
              }}>
                <a href="#" style={{ color: colors.ground[60], textDecoration: 'none', transition: animations.transitions.fade }}>
                  Instagram
                </a>
                <a href="#" style={{ color: colors.ground[60], textDecoration: 'none', transition: animations.transitions.fade }}>
                  Facebook
                </a>
                <a href="#" style={{ color: colors.ground[60], textDecoration: 'none', transition: animations.transitions.fade }}>
                  Blog
                </a>
              </div>
            </div>

            <div>
              <Typography 
                variant="h6" 
                style={{ 
                  color: colors.white, 
                  marginBottom: spacing[4],
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                }}
              >
                고객센터
              </Typography>
              <Typography 
                variant="body2" 
                style={{ 
                  color: colors.ground[70],
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                }}
              >
                평일 10:00 - 18:00<br />
                점심시간 12:30 - 13:30<br />
                주말 및 공휴일 휴무<br /><br />
                <a href="mailto:support@skinconcierge.com" 
                  style={{ 
                    color: colors.accent[100], 
                    textDecoration: 'none',
                    transition: animations.transitions.fade,
                  }}
                >
                  support@skinconcierge.com
                </a>
              </Typography>
            </div>

            <div>
              <Typography 
                variant="h6" 
                style={{ 
                  color: colors.white, 
                  marginBottom: spacing[4],
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                }}
              >
                바로가기
              </Typography>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: spacing[3],
              }}>
                {[
                  '서비스 소개',
                  'AI 피부 진단',
                  '제품 추천',
                  '이용 가이드',
                  '자주 묻는 질문',
                ].map((item, index) => (
                  <a 
                    key={index}
                    href="#" 
                    style={{ 
                      color: colors.ground[70], 
                      textDecoration: 'none',
                      transition: animations.transitions.fade,
                      '&:hover': {
                        color: colors.white,
                      }
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            borderTop: `1px solid ${colors.dark[90]}`,
            paddingTop: spacing[8],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: spacing[4],
          }}>
            <div style={{
              display: 'flex',
              gap: spacing[6],
            }}>
              <a href="#" style={{ color: colors.ground[60], textDecoration: 'none', fontSize: typography.fontSize.sm }}>
                이용약관
              </a>
              <a href="#" style={{ color: colors.ground[60], textDecoration: 'none', fontSize: typography.fontSize.sm }}>
                개인정보처리방침
              </a>
              <a href="#" style={{ color: colors.ground[60], textDecoration: 'none', fontSize: typography.fontSize.sm }}>
                제휴 문의
              </a>
            </div>
            <Typography 
              variant="body2" 
              style={{ 
                color: colors.ground[50],
                fontSize: typography.fontSize.sm,
              }}
            >
              © 2024 SKIN concierge. All rights reserved.
            </Typography>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Landing;
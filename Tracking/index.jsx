import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import { Line } from 'react-chartjs-2';
import Icon from '../../components/common/Icon';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SkinTracking = () => {
  // Design System Tokens
  const designTokens = {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      internationalOrange: '#FF3C00',
      baseGray: '#191919',
      ground: {
        100: '#FFFFFF',
        90: 'rgb(255 255 255 / 0.9)',
        80: 'rgb(255 255 255 / 0.8)',
        70: 'rgb(255 255 255 / 0.7)',
        60: 'rgb(255 255 255 / 0.6)',
        50: 'rgb(255 255 255 / 0.5)',
        40: 'rgb(255 255 255 / 0.4)',
        30: 'rgb(255 255 255 / 0.3)',
        20: 'rgb(255 255 255 / 0.2)',
        15: 'rgb(255 255 255 / 0.15)',
        10: 'rgb(255 255 255 / 0.1)',
        5: 'rgb(255 255 255 / 0.05)'
      },
      dark: {
        120: '#1A1A1A',
        100: '#191919',
        90: 'rgb(25 25 25 / 0.9)',
        80: 'rgb(25 25 25 / 0.8)',
        70: 'rgb(25 25 25 / 0.7)',
        60: 'rgb(25 25 25 / 0.6)',
        50: 'rgb(25 25 25 / 0.5)',
        40: 'rgb(25 25 25 / 0.4)',
        30: 'rgb(25 25 25 / 0.3)',
        20: 'rgb(25 25 25 / 0.2)',
        10: 'rgb(25 25 25 / 0.1)',
        5: 'rgb(25 25 25 / 0.05)'
      },
      accent: {
        115: '#E53600',
        100: '#FF3C00',
        90: 'rgb(255 60 0 / 0.9)',
        80: 'rgb(255 60 0 / 0.8)',
        70: 'rgb(255 60 0 / 0.7)',
        60: 'rgb(255 60 0 / 0.6)',
        50: 'rgb(255 60 0 / 0.5)',
        40: 'rgb(255 60 0 / 0.4)',
        30: 'rgb(255 60 0 / 0.3)',
        20: 'rgb(255 60 0 / 0.2)',
        10: 'rgb(255 60 0 / 0.1)',
        5: 'rgb(255 60 0 / 0.05)'
      },
      status: {
        error: '#FF0000',
        warning: '#FFA600',
        success: '#6CCD5D'
      },
      ui: {
        border: 'rgb(25 25 25 / 0.1)',
        background: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F2F2F2'
        },
        foreground: {
          primary: '#191919',
          secondary: 'rgb(25 25 25 / 0.7)',
          tertiary: 'rgb(25 25 25 / 0.5)'
        }
      }
    },
    spacing: {
      0: '0',
      px: '1px',
      '0_5': '0.125rem',
      1: '0.25rem',
      '1_5': '0.375rem',
      2: '0.5rem',
      '2_5': '0.625rem',
      3: '0.75rem',
      '3_5': '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem'
    },
    typography: {
      fontFamily: {
        primary: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        english: "'Lato', -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
      },
      fontSize: {
        xs: '0.8125rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem'
      },
      fontWeight: {
        thin: 100,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
      },
      lineHeight: {
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625
      },
      letterSpacing: {
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em'
      }
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    },
    radius: {
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px'
    },
    animation: {
      duration: {
        base: '0.3s',
        smooth: '0.6s'
      },
      easing: {
        base: 'ease',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  };

  const [timePeriod, setTimePeriod] = useState('daily');
  const [chartData, setChartData] = useState({
    labels: ['2/14', '2/15', '2/16', '2/17', '2/18', '2/19', '2/20'],
    datasets: [
      {
        label: '수분 지수',
        data: [65, 68, 70, 72, 75, 78, 80],
        borderColor: designTokens.colors.accent[100],
        backgroundColor: designTokens.colors.accent[10],
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: designTokens.colors.ui.background.primary,
        pointBorderColor: designTokens.colors.accent[100],
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: designTokens.colors.ui.background.primary,
        titleColor: designTokens.colors.ui.foreground.primary,
        bodyColor: designTokens.colors.ui.foreground.secondary,
        borderColor: designTokens.colors.ui.border,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          title: function(context) {
            return context[0].label + ' 기준';
          },
          label: function(context) {
            return '수분 지수: ' + context.raw;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: designTokens.colors.ui.border,
          drawBorder: false
        },
        ticks: {
          color: designTokens.colors.ui.foreground.secondary,
          font: {
            family: designTokens.typography.fontFamily.primary,
            size: 12
          },
          padding: 8
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: designTokens.colors.ui.foreground.secondary,
          font: {
            family: designTokens.typography.fontFamily.primary,
            size: 12
          },
          padding: 8
        }
      }
    }
  };

  const skinHistory = [
    { date: '2024.02.20', description: '수분 지수 개선' },
    { date: '2024.02.19', description: '트러블 감소' },
    { date: '2024.02.18', description: '피부 톤 개선' },
  ];

  return (
    <div style={{ 
        backgroundColor: designTokens.colors.ui.background.secondary, 
        minHeight: '100vh',
        fontFamily: designTokens.typography.fontFamily.primary
      }}>
      <Container style={{ 
        padding: `${designTokens.spacing[8]} ${designTokens.spacing[4]}`,
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: designTokens.spacing[8] }}>
          <Typography variant="h3" style={{ 
            marginBottom: designTokens.spacing[2],
            fontSize: designTokens.typography.fontSize['3xl'],
            fontWeight: designTokens.typography.fontWeight.bold,
            color: designTokens.colors.ui.foreground.primary,
            letterSpacing: designTokens.typography.letterSpacing.tight,
            lineHeight: designTokens.typography.lineHeight.tight
          }}>
            내 피부 변화, 한눈에 확인하세요
          </Typography>
          <Typography variant="body1" style={{
            color: designTokens.colors.ui.foreground.secondary,
            fontSize: designTokens.typography.fontSize.lg,
            letterSpacing: designTokens.typography.letterSpacing.wide,
            lineHeight: designTokens.typography.lineHeight.relaxed
          }}>
            AI가 분석한 피부 상태 변화와 개선 포인트를 추적합니다.
          </Typography>
        </div>

        {/* Time Period Selector */}
        <Card 
          padding="large" 
          style={{ 
            marginBottom: designTokens.spacing[6],
            boxShadow: designTokens.shadows.md,
            borderRadius: designTokens.radius['2xl'],
            backgroundColor: designTokens.colors.ui.background.primary
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: designTokens.spacing[4]
          }}>
            <Button 
              variant={timePeriod === 'daily' ? 'primary' : 'outline'} 
              onClick={() => setTimePeriod('daily')}
              style={{
                fontSize: designTokens.typography.fontSize.base,
                fontWeight: designTokens.typography.fontWeight.medium,
                letterSpacing: designTokens.typography.letterSpacing.wide
              }}
            >
              일별
            </Button>
            <Button 
              variant={timePeriod === 'weekly' ? 'primary' : 'outline'} 
              onClick={() => setTimePeriod('weekly')}
              style={{
                fontSize: designTokens.typography.fontSize.base,
                fontWeight: designTokens.typography.fontWeight.medium,
                letterSpacing: designTokens.typography.letterSpacing.wide
              }}
            >
              주별
            </Button>
            <Button 
              variant={timePeriod === 'monthly' ? 'primary' : 'outline'} 
              onClick={() => setTimePeriod('monthly')}
              style={{
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium
              }}
            >
              월별
            </Button>
          </div>
        </Card>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: spacing[4],
          marginBottom: spacing[8],
        }}>
          {/* Skin Score Card */}
          <Card 
            padding="large" 
            style={{
              boxShadow: shadows.md,
              borderRadius: '12px',
              backgroundColor: colors.neutral.white,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: shadows.lg
              }
            }}
          >
            <Typography 
              variant="h5" 
              style={{ 
                marginBottom: spacing[4],
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral.gray[900]
              }}
            >
              피부 점수
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                border: `10px solid ${colors.primary.blue + '20'}`,
                background: `linear-gradient(135deg, ${colors.primary.blue + '10'}, ${colors.primary.blue + '05'})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: typography.fontSize['4xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.primary.blue,
                margin: '0 auto',
                marginBottom: spacing[4],
                boxShadow: `0 0 20px ${colors.primary.blue + '20'}`,
                position: 'relative',
              }}>
                <span style={{
                  background: `linear-gradient(135deg, ${colors.primary.blue}, ${colors.primary.indigo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>85</span>
              </div>
              <Typography 
                variant="body1" 
                style={{
                  color: colors.neutral.gray[600],
                  fontSize: typography.fontSize.lg,
                  marginBottom: spacing[2]
                }}
              >
                이전 대비
              </Typography>
              <Typography 
                variant="body2" 
                style={{
                  color: colors.status.success,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold
                }}
              >
                +5% 개선
              </Typography>
            </div>
          </Card>

          {/* Moisture Level Chart */}
          <Card 
            padding="large" 
            style={{
              boxShadow: designTokens.shadows.md,
              borderRadius: designTokens.radius['2xl'],
              backgroundColor: designTokens.colors.ui.background.primary,
              transition: `transform ${designTokens.animation.duration.base} ${designTokens.animation.easing.base}`,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: designTokens.shadows.lg
              }
            }}
          >
            <Typography 
              variant="h5" 
              style={{ 
                marginBottom: designTokens.spacing[4],
                fontSize: designTokens.typography.fontSize['2xl'],
                fontWeight: designTokens.typography.fontWeight.bold,
                color: designTokens.colors.ui.foreground.primary,
                letterSpacing: designTokens.typography.letterSpacing.tight,
                lineHeight: designTokens.typography.lineHeight.tight
              }}
            >
              수분 지수
            </Typography>
            <div style={{ 
              height: '240px',
              padding: designTokens.spacing[2],
              backgroundColor: designTokens.colors.ui.background.secondary,
              borderRadius: designTokens.radius.lg
            }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </Card>

          {/* Skin History */}
          <Card 
            padding="large" 
            style={{
              boxShadow: designTokens.shadows.md,
              borderRadius: designTokens.radius['2xl'],
              backgroundColor: designTokens.colors.ui.background.primary,
              transition: `transform ${designTokens.animation.duration.base} ${designTokens.animation.easing.base}`,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: designTokens.shadows.lg
              }
            }}
          >
            <Typography 
              variant="h5" 
              style={{ 
                marginBottom: designTokens.spacing[4],
                fontSize: designTokens.typography.fontSize['2xl'],
                fontWeight: designTokens.typography.fontWeight.bold,
                color: designTokens.colors.ui.foreground.primary,
                letterSpacing: designTokens.typography.letterSpacing.tight,
                lineHeight: designTokens.typography.lineHeight.tight
              }}
            >
              피부 상태 히스토리
            </Typography>
            <div style={{
              backgroundColor: designTokens.colors.ui.background.secondary,
              borderRadius: designTokens.radius.lg,
              padding: designTokens.spacing[4]
            }}>
              {skinHistory.map((item, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: index !== skinHistory.length - 1 ? designTokens.spacing[4] : 0,
                    padding: designTokens.spacing[3],
                    backgroundColor: designTokens.colors.ui.background.primary,
                    borderRadius: designTokens.radius.md,
                    boxShadow: designTokens.shadows.sm
                  }}
                >
                  <Typography 
                    variant="body2" 
                    style={{
                      color: designTokens.colors.ui.foreground.secondary,
                      fontSize: designTokens.typography.fontSize.sm,
                      marginBottom: designTokens.spacing[1],
                      letterSpacing: designTokens.typography.letterSpacing.wide
                    }}
                  >
                    {item.date}
                  </Typography>
                  <Typography 
                    variant="body1"
                    style={{
                      color: designTokens.colors.ui.foreground.primary,
                      fontSize: designTokens.typography.fontSize.base,
                      fontWeight: designTokens.typography.fontWeight.medium,
                      letterSpacing: designTokens.typography.letterSpacing.wide
                    }}
                  >
                    {item.description}
                  </Typography>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendations */}
          <Card 
            padding="large" 
            style={{
              boxShadow: designTokens.shadows.md,
              borderRadius: designTokens.radius['2xl'],
              backgroundColor: designTokens.colors.ui.background.primary,
              transition: `transform ${designTokens.animation.duration.base} ${designTokens.animation.easing.base}`,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: designTokens.shadows.lg
              }
            }}
          >
            <Typography 
              variant="h5" 
              style={{ 
                marginBottom: designTokens.spacing[4],
                fontSize: designTokens.typography.fontSize['2xl'],
                fontWeight: designTokens.typography.fontWeight.bold,
                color: designTokens.colors.ui.foreground.primary,
                letterSpacing: designTokens.typography.letterSpacing.tight,
                lineHeight: designTokens.typography.lineHeight.tight
              }}
            >
              맞춤형 알림
            </Typography>
            <div style={{
              backgroundColor: designTokens.colors.ui.background.secondary,
              borderRadius: designTokens.radius.lg,
              padding: designTokens.spacing[4]
            }}>
              <div 
                style={{ 
                  marginBottom: designTokens.spacing[4],
                  padding: designTokens.spacing[3],
                  backgroundColor: designTokens.colors.ui.background.primary,
                  borderRadius: designTokens.radius.md,
                  boxShadow: designTokens.shadows.sm,
                  borderLeft: `4px solid ${designTokens.colors.accent[100]}`
                }}
              >
                <Typography 
                  variant="body1"
                  style={{
                    color: designTokens.colors.ui.foreground.primary,
                    fontSize: designTokens.typography.fontSize.lg,
                    fontWeight: designTokens.typography.fontWeight.semibold,
                    marginBottom: designTokens.spacing[2],
                    letterSpacing: designTokens.typography.letterSpacing.tight
                  }}
                >
                  오늘의 피부 미션
                </Typography>
                <Typography 
                  variant="body2"
                  style={{
                    color: designTokens.colors.ui.foreground.secondary,
                    fontSize: designTokens.typography.fontSize.base,
                    letterSpacing: designTokens.typography.letterSpacing.wide
                  }}
                >
                  수분크림 꼭꼭히 바르기
                </Typography>
              </div>
              <div 
                style={{ 
                  padding: designTokens.spacing[3],
                  backgroundColor: designTokens.colors.ui.background.primary,
                  borderRadius: designTokens.radius.md,
                  boxShadow: designTokens.shadows.sm,
                  borderLeft: `4px solid ${designTokens.colors.accent[80]}`
                }}
              >
                <Typography 
                  variant="body1"
                  style={{
                    color: designTokens.colors.ui.foreground.primary,
                    fontSize: designTokens.typography.fontSize.lg,
                    fontWeight: designTokens.typography.fontWeight.semibold,
                    marginBottom: designTokens.spacing[2],
                    letterSpacing: designTokens.typography.letterSpacing.tight
                  }}
                >
                  최근 활동과 연동된 개인화 알림
                </Typography>
                <Typography 
                  variant="body2"
                  style={{
                    color: designTokens.colors.ui.foreground.secondary,
                    fontSize: designTokens.typography.fontSize.base,
                    letterSpacing: designTokens.typography.letterSpacing.wide
                  }}
                >
                  피부 관리 팁 및 제품 추천
                </Typography>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: designTokens.spacing[8],
          padding: designTokens.spacing[6],
          backgroundColor: designTokens.colors.ui.background.primary,
          borderRadius: designTokens.radius['2xl'],
          boxShadow: designTokens.shadows.md
        }}>
          <Button 
            variant="primary" 
            size="lg"
            style={{
              fontSize: designTokens.typography.fontSize.lg,
              fontWeight: designTokens.typography.fontWeight.semibold,
              padding: `${designTokens.spacing[4]} ${designTokens.spacing[8]}`,
              borderRadius: designTokens.radius.lg,
              background: `linear-gradient(135deg, ${designTokens.colors.accent[100]}, ${designTokens.colors.accent[115]})`,
              boxShadow: `0 4px 14px ${designTokens.colors.accent[100]}30`,
              transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.base}`,
              letterSpacing: designTokens.typography.letterSpacing.wide,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${designTokens.colors.accent[100]}40`
              }
            }}
          >
            새로운 스캔으로 피부 상태 갱신하기
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default SkinTracking;

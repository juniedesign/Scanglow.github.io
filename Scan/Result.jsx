import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';

const ScanResult = () => {
  const { id } = useParams();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScan = async () => {
      try {
        const res = await axios.get(`/api/v1/scans/${id}`);
        setScan(res.data.data.scan);
        setLoading(false);
      } catch (err) {
        setError('스캔 결과를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchScan();
  }, [id]);

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.ui.background.secondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography 
        style={{ 
          color: colors.ui.foreground.secondary,
          fontSize: typography.fontSize.lg,
        }}
      >
        분석 결과를 불러오는 중...
      </Typography>
    </div>
  );

  if (error) return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.ui.background.secondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing[4],
    }}>
      <div style={{
        padding: spacing[4],
        background: `${colors.status.error}15`,
        borderRadius: borderRadius.lg,
        textAlign: 'center',
      }}>
        <Typography 
          style={{ 
            color: colors.status.error,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
          }}
        >
          {error}
        </Typography>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.ui.background.secondary,
      padding: `${spacing[8]} ${spacing[4]}`,
    }}>
      <Container maxWidth="md">
        <Card style={{ 
          padding: spacing[8],
          background: colors.ui.background.primary,
          borderRadius: borderRadius.xl,
          boxShadow: 'xl',
        }}>
          <div style={{ textAlign: 'center', marginBottom: spacing[8] }}>
            <Typography 
              variant="h4" 
              style={{ 
                marginBottom: spacing[3],
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.ui.foreground.primary,
                lineHeight: typography.lineHeight.tight,
              }}
            >
              AI 피부 분석 결과
            </Typography>
            <Typography 
              variant="body1" 
              style={{ 
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.lg,
                lineHeight: typography.lineHeight.relaxed,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              AI가 분석한 당신의 피부 상태를 확인해보세요.
            </Typography>
          </div>

          {scan && (
            <div>
              <div style={{
                position: 'relative',
                borderRadius: borderRadius.xl,
                overflow: 'hidden',
                marginBottom: spacing[8],
                backgroundColor: colors.dark[120],
              }}>
                <img 
                  src={`data:image/jpeg;base64,${scan.imageUrl}`} 
                  alt="스캔 이미지" 
                  style={{ 
                    width: '100%',
                    display: 'block',
                  }} 
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: spacing[6],
              }}>
                {Object.entries(scan.results).map(([key, value]) => {
                  const score = Math.round(value);
                  let status = 'normal';
                  let statusColor = colors.status.success;
                  let statusText = '정상';

                  if (score < 30) {
                    status = 'warning';
                    statusColor = colors.status.warning;
                    statusText = '주의';
                  } else if (score < 50) {
                    status = 'error';
                    statusColor = colors.status.error;
                    statusText = '위험';
                  }

                  return (
                    <Card 
                      key={key}
                      style={{
                        padding: spacing[6],
                        background: colors.ui.background.secondary,
                        borderRadius: borderRadius.xl,
                        transition: animations.transitions.scale,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        }
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: spacing[4],
                      }}>
                        <Typography 
                          variant="h6"
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: typography.fontSize.lg,
                            fontWeight: typography.fontWeight.semibold,
                            color: colors.ui.foreground.primary,
                          }}
                        >
                          {key}
                        </Typography>
                        <div style={{
                          padding: `${spacing[1]} ${spacing[2]}`,
                          background: `${statusColor}15`,
                          borderRadius: borderRadius.full,
                          color: statusColor,
                          fontSize: typography.fontSize.sm,
                          fontWeight: typography.fontWeight.medium,
                        }}>
                          {statusText}
                        </div>
                      </div>

                      <div style={{
                        position: 'relative',
                        height: '8px',
                        backgroundColor: `${colors.accent[10]}`,
                        borderRadius: borderRadius.full,
                        overflow: 'hidden',
                        marginBottom: spacing[3],
                      }}>
                        <div 
                          style={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: `${score}%`,
                            backgroundColor: statusColor,
                            borderRadius: borderRadius.full,
                            transition: animations.transitions.scale,
                          }}
                        />
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <Typography 
                          style={{ 
                            fontSize: typography.fontSize['3xl'],
                            fontWeight: typography.fontWeight.bold,
                            color: statusColor,
                          }}
                        >
                          {score}
                        </Typography>
                        <Typography 
                          style={{ 
                            fontSize: typography.fontSize.sm,
                            color: colors.ui.foreground.tertiary,
                          }}
                        >
                          / 100
                        </Typography>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default ScanResult;
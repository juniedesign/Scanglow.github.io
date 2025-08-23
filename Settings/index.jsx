import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, shadows } from '../../styles/design-system';
import userService from '../../services/userService';
import authService from '../../services/authService';

const Settings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    skinDiagnosis: true,
    productRecommendation: true,
    reviewRequest: false,
    marketingInfo: false,
  });
  const [dataUsageSettings, setDataUsageSettings] = useState({
    dataCollection: true,
    locationInfo: true,
    searchHistory: true,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const currentUser = authService.getCurrentUser();
        if (currentUser && currentUser.data && currentUser.data.user && currentUser.data.user._id) {
          const res = await userService.getUserProfile(currentUser.data.user._id);
          setUserData(res.data.data.user);
          // Assuming notification and data usage settings are part of user data
          // For now, use default or dummy values
        } else {
          setError('사용자 정보를 불러올 수 없습니다. 로그인 해주세요.');
        }
        setLoading(false);
      } catch (err) {
        setError('사용자 데이터를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleNotificationChange = (settingName) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [settingName]: !prev[settingName],
    }));
  };

  const handleDataUsageChange = (settingName) => {
    setDataUsageSettings((prev) => ({
      ...prev,
      [settingName]: !prev[settingName],
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const currentUser = authService.getCurrentUser();
      // In a real app, you would send these settings to the backend
      // await userService.updateUserProfile(currentUser.data.user._id, { notificationSettings, dataUsageSettings });
      alert('설정이 저장되었습니다.');
      setLoading(false);
    } catch (err) {
      setError('설정 저장에 실패했습니다.');
      setLoading(false);
    }
  };

  if (loading) return <Container><Typography>로딩 중...</Typography></Container>;
  if (error) return <Container><Typography color="error">{error}</Typography></Container>;
  if (!userData) return <Container><Typography>데이터가 없습니다.</Typography></Container>;

  return (
    <div style={{ 
        backgroundColor: colors.neutral.gray[50], 
        minHeight: '100vh',
        fontFamily: typography.fontFamily.primary
      }}>
      <Container style={{ 
        padding: `${spacing[8]} ${spacing[4]}`,
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <Typography 
          variant="h3" 
          style={{ 
            marginBottom: spacing[6],
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral.gray[900],
            lineHeight: typography.lineHeight.tight
          }}
        >
          앱 설정
        </Typography>

        {/* 알림 설정 */}
        <Card 
          padding="large" 
          style={{ 
            marginBottom: spacing[6],
            boxShadow: shadows.md,
            borderRadius: '16px',
            backgroundColor: colors.neutral.white
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              marginBottom: spacing[6],
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral.gray[900]
            }}
          >
            알림 설정
          </Typography>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: spacing[4],
            backgroundColor: colors.neutral.gray[50],
            borderRadius: '12px',
            padding: spacing[4]
          }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[4],
                backgroundColor: colors.neutral.white,
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md
                }
              }}
            >
              <div>
                <Typography 
                  variant="body1" 
                  style={{ 
                    marginBottom: spacing[1],
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.neutral.gray[900]
                  }}
                >
                  피부 진단 알림
                </Typography>
                <Typography 
                  variant="body2" 
                  style={{
                    color: colors.neutral.gray[600],
                    fontSize: typography.fontSize.sm
                  }}
                >
                  정기적인 피부 진단 시기를 알려드립니다
                </Typography>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.skinDiagnosis}
                onChange={() => handleNotificationChange('skinDiagnosis')}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  accentColor: colors.primary.blue,
                  cursor: 'pointer'
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[4],
                backgroundColor: colors.neutral.white,
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md
                }
              }}
            >
              <div>
                <Typography 
                  variant="body1" 
                  style={{ 
                    marginBottom: spacing[1],
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.neutral.gray[900]
                  }}
                >
                  제품 추천 알림
                </Typography>
                <Typography 
                  variant="body2" 
                  style={{
                    color: colors.neutral.gray[600],
                    fontSize: typography.fontSize.sm
                  }}
                >
                  새로운 맞춤 제품이 추천되면 알려드립니다
                </Typography>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.productRecommendation}
                onChange={() => handleNotificationChange('productRecommendation')}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  accentColor: colors.primary.blue,
                  cursor: 'pointer'
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[4],
                backgroundColor: colors.neutral.white,
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md
                }
              }}
            >
              <div>
                <Typography variant="body1" style={{ marginBottom: spacing[1] }}>
                  리뷰 알림
                </Typography>
                <Typography variant="body2" color="secondary">
                  구매한 제품의 리뷰 작성을 알려드립니다
                </Typography>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.reviewRequest}
                onChange={() => handleNotificationChange('reviewRequest')}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  accentColor: colors.primary.blue,
                  cursor: 'pointer'
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[4],
                backgroundColor: colors.neutral.white,
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md
                }
              }}
            >
              <div>
                <Typography variant="body1" style={{ marginBottom: spacing[1] }}>
                  마케팅 정보
                </Typography>
                <Typography variant="body2" color="secondary">
                  새로운 이벤트와 할인 정보를 받아보세요
                </Typography>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.marketingInfo}
                onChange={() => handleNotificationChange('marketingInfo')}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  accentColor: colors.primary.blue,
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        </Card>

        {/* 개인정보 설정 */}
        <Card padding="large" elevation="base" style={{ marginBottom: spacing[6] }}>
          <Typography variant="h5" style={{ marginBottom: spacing[6] }}>
            개인정보 설정
          </Typography>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[4],
                backgroundColor: colors.neutral.white,
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md
                }
              }}
            >
              <div>
                <Typography variant="body1" style={{ marginBottom: spacing[1] }}>
                  데이터 수집 및 사용
                </Typography>
                <Typography variant="body2" color="secondary">
                  서비스 개선을 위한 사용자 데이터 수집을 허용합니다
                </Typography>
              </div>
              <input
                type="checkbox"
                checked={dataUsageSettings.dataCollection}
                onChange={() => handleDataUsageChange('dataCollection')}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  accentColor: colors.primary.blue,
                  cursor: 'pointer'
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[4],
                backgroundColor: colors.neutral.white,
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md
                }
              }}
            >
              <div>
                <Typography variant="body1" style={{ marginBottom: spacing[1] }}>
                  위치 정보
                </Typography>
                <Typography variant="body2" color="secondary">
                  맞춤형 서비스 제공을 위한 위치 정보 사용을 허용합니다
                </Typography>
              </div>
              <input
                type="checkbox"
                checked={dataUsageSettings.locationInfo}
                onChange={() => handleDataUsageChange('locationInfo')}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  accentColor: colors.primary.blue,
                  cursor: 'pointer'
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[4],
                backgroundColor: colors.neutral.white,
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md
                }
              }}
            >
              <div>
                <Typography variant="body1" style={{ marginBottom: spacing[1] }}>
                  검색 기록
                </Typography>
                <Typography variant="body2" color="secondary">
                  검색 기록을 저장하여 더 나은 추천을 제공합니다
                </Typography>
              </div>
              <input
                type="checkbox"
                checked={dataUsageSettings.searchHistory}
                onChange={() => handleDataUsageChange('searchHistory')}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  accentColor: colors.primary.blue,
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: spacing[6] }}>
            <Button variant="outline" fullWidth>
              개인정보 다운로드
            </Button>
          </div>
        </Card>

        {/* 계정 설정 */}
        <Card 
          padding="large" 
          style={{ 
            marginBottom: spacing[6],
            boxShadow: shadows.md,
            borderRadius: '16px',
            backgroundColor: colors.neutral.white
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              marginBottom: spacing[6],
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral.gray[900]
            }}
          >
            계정 설정
          </Typography>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: spacing[4],
            backgroundColor: colors.neutral.gray[50],
            borderRadius: '12px',
            padding: spacing[4]
          }}>
            <Button 
              variant="outline"
              style={{
                padding: spacing[4],
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                backgroundColor: colors.neutral.white,
                borderColor: colors.neutral.gray[300],
                color: colors.neutral.gray[800],
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md,
                  borderColor: colors.primary.blue,
                  color: colors.primary.blue
                }
              }}
            >
              비밀번호 변경
            </Button>
            <Button 
              variant="outline"
              style={{
                padding: spacing[4],
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                backgroundColor: colors.neutral.white,
                borderColor: colors.neutral.gray[300],
                color: colors.neutral.gray[800],
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md,
                  borderColor: colors.primary.blue,
                  color: colors.primary.blue
                }
              }}
            >
              이메일 주소 변경
            </Button>
            <Button 
              variant="outline"
              style={{
                padding: spacing[4],
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                backgroundColor: colors.neutral.white,
                borderColor: colors.neutral.gray[300],
                color: colors.neutral.gray[800],
                borderRadius: '8px',
                boxShadow: shadows.sm,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.md,
                  borderColor: colors.primary.blue,
                  color: colors.primary.blue
                }
              }}
            >
              전화번호 변경
            </Button>
          </div>
        </Card>

        {/* 기타 설정 */}
        <Card 
          padding="large" 
          style={{ 
            marginBottom: spacing[6],
            boxShadow: shadows.md,
            borderRadius: '16px',
            backgroundColor: colors.neutral.white
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              marginBottom: spacing[6],
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral.gray[900]
            }}
          >
            기타 설정
          </Typography>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: spacing[4],
            backgroundColor: colors.neutral.gray[50],
            borderRadius: '12px',
            padding: spacing[4]
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: spacing[4],
              backgroundColor: colors.neutral.white,
              borderRadius: '8px',
              boxShadow: shadows.sm,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: shadows.md
              }
            }}>
              <div>
                <Typography 
                  variant="body1" 
                  style={{ 
                    marginBottom: spacing[1],
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.neutral.gray[900]
                  }}
                >
                  언어 설정
                </Typography>
                <Typography 
                  variant="body2" 
                  style={{
                    color: colors.neutral.gray[600],
                    fontSize: typography.fontSize.sm
                  }}
                >
                  앱 표시 언어를 선택합니다
                </Typography>
              </div>
              <select
                style={{
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: '6px',
                  border: `2px solid ${colors.neutral.gray[200]}`,
                  backgroundColor: colors.neutral.white,
                  fontSize: typography.fontSize.base,
                  color: colors.neutral.gray[900],
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: colors.primary.blue
                  },
                  '&:focus': {
                    outline: 'none',
                    borderColor: colors.primary.blue,
                    boxShadow: `0 0 0 3px ${colors.primary.blue}20`
                  }
                }}
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: spacing[4],
              backgroundColor: colors.neutral.white,
              borderRadius: '8px',
              boxShadow: shadows.sm,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: shadows.md
              }
            }}>
              <div>
                <Typography 
                  variant="body1" 
                  style={{ 
                    marginBottom: spacing[1],
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.neutral.gray[900]
                  }}
                >
                  테마 설정
                </Typography>
                <Typography 
                  variant="body2" 
                  style={{
                    color: colors.neutral.gray[600],
                    fontSize: typography.fontSize.sm
                  }}
                >
                  앱의 테마를 선택합니다
                </Typography>
              </div>
              <select
                style={{
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: '6px',
                  border: `2px solid ${colors.neutral.gray[200]}`,
                  backgroundColor: colors.neutral.white,
                  fontSize: typography.fontSize.base,
                  color: colors.neutral.gray[900],
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: colors.primary.blue
                  },
                  '&:focus': {
                    outline: 'none',
                    borderColor: colors.primary.blue,
                    boxShadow: `0 0 0 3px ${colors.primary.blue}20`
                  }
                }}
              >
                <option value="light">라이트</option>
                <option value="dark">다크</option>
                <option value="system">시스템 설정</option>
              </select>
            </div>
          </div>
        </Card>

        {/* 위험 구역 */}
        <Card 
          padding="large" 
          style={{ 
            backgroundColor: colors.status.error + '05',
            boxShadow: shadows.md,
            borderRadius: '16px',
            border: `1px solid ${colors.status.error}30`
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              marginBottom: spacing[4],
              color: colors.status.error,
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold
            }}
          >
            계정 삭제
          </Typography>
          <Typography 
            variant="body2" 
            style={{ 
              marginBottom: spacing[4],
              color: colors.neutral.gray[600],
              fontSize: typography.fontSize.base,
              lineHeight: typography.lineHeight.relaxed
            }}
          >
            계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
          </Typography>
          <Button 
            variant="outline"
            style={{ 
              color: colors.status.error,
              borderColor: colors.status.error,
              backgroundColor: colors.status.error + '10',
              padding: `${spacing[3]} ${spacing[4]}`,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              borderRadius: '8px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: colors.status.error,
                color: colors.neutral.white,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 12px ${colors.status.error}30`
              }
            }}
          >
            계정 삭제
          </Button>
        </Card>

        <div style={{ 
          textAlign: 'center', 
          marginTop: spacing[8],
          padding: spacing[6],
          backgroundColor: colors.neutral.white,
          borderRadius: '12px',
          boxShadow: shadows.md
        }}>
          <Button 
            variant="primary" 
            onClick={handleSaveChanges} 
            loading={loading}
            style={{
              padding: `${spacing[4]} ${spacing[8]}`,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${colors.primary.blue}, ${colors.primary.indigo})`,
              boxShadow: `0 4px 14px ${colors.primary.blue}30`,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${colors.primary.blue}40`
              }
            }}
          >
            변경 사항 저장
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Settings;

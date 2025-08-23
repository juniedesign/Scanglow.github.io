import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';
import userService from '../../services/userService'; // Import userService
import authService from '../../services/authService'; // To get current user ID
import Icon from '../../components/common/Icon';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const currentUser = authService.getCurrentUser();
        if (currentUser && currentUser.data && currentUser.data.user && currentUser.data.user._id) {
          // Assuming backend has a route like /api/v1/users/:id
          const res = await userService.getUserProfile(currentUser.data.user._id);
          setUserData(res.data.data.user);
          setFormData({
            name: res.data.data.user.name,
            email: res.data.data.user.email,
            phone: res.data.data.user.phone || '', // Assuming phone might be optional
          });
        } else {
          setError('사용자 정보를 불러올 수 없습니다. 로그인 해주세요.');
        }
        setLoading(false);
      } catch (err) {
        setError('사용자 프로필을 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const currentUser = authService.getCurrentUser();
      await userService.updateUserProfile(currentUser.data.user._id, formData);
      setUserData((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
      setLoading(false);
      alert('프로필이 성공적으로 업데이트되었습니다.');
    } catch (err) {
      setError('프로필 업데이트에 실패했습니다.');
      setLoading(false);
    }
  };

  const renderTabs = () => (
    <div style={{
      display: 'flex',
      borderBottom: `1px solid ${colors.neutral.gray[200]}`,
      marginBottom: spacing[6],
    }}>
      {[
        { id: 'profile', label: '프로필' },
        { id: 'activity', label: '활동 내역' },
        { id: 'settings', label: '설정' },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            padding: spacing[4],
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === tab.id ? colors.primary.blue : 'transparent'}`,
            color: activeTab === tab.id ? colors.primary.blue : colors.neutral.gray[600],
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: activeTab === tab.id ? '600' : '400',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  const renderProfile = () => (
    <>
      <Card style={{ 
        padding: spacing[8],
        background: colors.ui.background.primary,
        borderRadius: borderRadius.xl,
        boxShadow: 'lg',
        marginBottom: spacing[8],
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: spacing[8],
          marginBottom: spacing[8],
        }}>
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: borderRadius.full,
            backgroundColor: colors.ui.image.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            👤
          </div>
          <div style={{ flex: 1 }}>
            <Typography 
              variant="h4" 
              style={{ 
                marginBottom: spacing[2],
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.ui.foreground.primary,
              }}
            >
              {userData.name}
            </Typography>
            <Typography 
              variant="body1" 
              style={{ 
                marginBottom: spacing[4],
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.lg,
              }}
            >
              {userData.email}
            </Typography>
            <div style={{
              display: 'flex',
              gap: spacing[2],
              flexWrap: 'wrap',
            }}>
              <div style={{
                padding: `${spacing[1]} ${spacing[2]}`,
                background: `${colors.status.success}15`,
                color: colors.status.success,
                borderRadius: borderRadius.full,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
              }}>
                프리미엄 회원
              </div>
              <div style={{
                padding: `${spacing[1]} ${spacing[2]}`,
                background: colors.ui.background.secondary,
                color: colors.ui.foreground.secondary,
                borderRadius: borderRadius.full,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
              }}>
                건성 / 민감성
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: spacing[6],
        }}>
          {[
            { 
              label: '가입일', 
              value: new Date(userData.createdAt).toLocaleDateString(),
              icon: 'calendar'
            },
            { 
              label: '구독 상태', 
              value: '프리미엄 (연간)',
              icon: 'star'
            },
            { 
              label: '최근 스캔', 
              value: '2024.06.30',
              icon: 'camera'
            },
          ].map((item, index) => (
            <div 
              key={index}
              style={{
                padding: spacing[4],
                background: colors.ui.background.secondary,
                borderRadius: borderRadius.lg,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                marginBottom: spacing[2],
              }}>
                <Icon name={item.icon} size={24} color={colors.primary.blue} />
                <Typography 
                  variant="body2" 
                  style={{ 
                    color: colors.ui.foreground.secondary,
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  {item.label}
                </Typography>
              </div>
              <Typography 
                variant="body1"
                style={{
                  color: colors.ui.foreground.primary,
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ 
        padding: spacing[8],
        background: colors.ui.background.primary,
        borderRadius: borderRadius.xl,
        boxShadow: 'lg',
        marginBottom: spacing[8],
      }}>
        <Typography 
          variant="h5" 
          style={{ 
            marginBottom: spacing[6],
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.ui.foreground.primary,
          }}
        >
          계정 정보
        </Typography>
        <form onSubmit={handleProfileUpdate}>
          <div style={{ marginBottom: spacing[6] }}>
            <Typography 
              variant="body2" 
              style={{ 
                marginBottom: spacing[2],
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.sm,
              }}
            >
              이름
            </Typography>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              disabled={!editMode}
              style={{
                width: '100%',
                padding: spacing[4],
                background: editMode ? colors.ui.background.secondary : colors.ui.background.tertiary,
                border: `1px solid ${colors.ui.border}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.ui.foreground.primary,
                transition: animations.transitions.fade,
                '&:focus': {
                  outline: 'none',
                  borderColor: colors.accent[100],
                  boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                },
                '&::placeholder': {
                  color: colors.ui.placeholder,
                }
              }}
            />
          </div>
          <div style={{ marginBottom: spacing[6] }}>
            <Typography 
              variant="body2" 
              style={{ 
                marginBottom: spacing[2],
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.sm,
              }}
            >
              이메일
            </Typography>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              disabled={!editMode}
              style={{
                width: '100%',
                padding: spacing[4],
                background: editMode ? colors.ui.background.secondary : colors.ui.background.tertiary,
                border: `1px solid ${colors.ui.border}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.ui.foreground.primary,
                transition: animations.transitions.fade,
                '&:focus': {
                  outline: 'none',
                  borderColor: colors.accent[100],
                  boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                },
                '&::placeholder': {
                  color: colors.ui.placeholder,
                }
              }}
            />
          </div>
          <div style={{ marginBottom: spacing[6] }}>
            <Typography 
              variant="body2" 
              style={{ 
                marginBottom: spacing[2],
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.sm,
              }}
            >
              연락처
            </Typography>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              disabled={!editMode}
              style={{
                width: '100%',
                padding: spacing[4],
                background: editMode ? colors.ui.background.secondary : colors.ui.background.tertiary,
                border: `1px solid ${colors.ui.border}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.ui.foreground.primary,
                transition: animations.transitions.fade,
                '&:focus': {
                  outline: 'none',
                  borderColor: colors.accent[100],
                  boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                },
                '&::placeholder': {
                  color: colors.ui.placeholder,
                }
              }}
            />
          </div>
          {editMode ? (
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              loading={loading}
              style={{
                background: colors.accent[100],
                color: colors.white,
                padding: spacing[4],
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                transition: animations.transitions.fade,
                '&:hover': {
                  background: colors.accent[115],
                }
              }}
            >
              저장
            </Button>
          ) : (
            <Button 
              type="button" 
              variant="outline" 
              fullWidth 
              onClick={() => setEditMode(true)}
              style={{
                background: colors.ui.background.primary,
                color: colors.ui.foreground.primary,
                padding: spacing[4],
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                border: `1px solid ${colors.ui.border}`,
                transition: animations.transitions.fade,
                '&:hover': {
                  background: colors.ui.background.secondary,
                }
              }}
            >
              수정
            </Button>
          )}
        </form>
      </Card>

      <Card style={{ 
        padding: spacing[8],
        background: colors.ui.background.primary,
        borderRadius: borderRadius.xl,
        boxShadow: 'lg',
      }}>
        <Typography 
          variant="h5" 
          style={{ 
            marginBottom: spacing[6],
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.ui.foreground.primary,
          }}
        >
          계정 연동
        </Typography>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: spacing[4],
        }}>
          {[
            { name: 'Google', icon: 'globe', connected: true },
            { name: 'Kakao', icon: 'message-circle', connected: false },
            { name: 'Apple', icon: 'smartphone', connected: false },
          ].map((service) => (
            <div
              key={service.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[4],
                background: colors.ui.background.secondary,
                borderRadius: borderRadius.lg,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3],
              }}>
                <Icon name={service.icon} size={24} color={colors.primary.blue} />
                <Typography 
                  variant="body1"
                  style={{
                    color: colors.ui.foreground.primary,
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  {service.name}
                </Typography>
              </div>
              <Button
                variant={service.connected ? 'outline' : 'primary'}
                size="sm"
                style={service.connected ? {
                  background: 'transparent',
                  color: colors.ui.foreground.secondary,
                  border: `1px solid ${colors.ui.border}`,
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  transition: animations.transitions.fade,
                  '&:hover': {
                    background: colors.ui.background.tertiary,
                  }
                } : {
                  background: colors.accent[100],
                  color: colors.white,
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  transition: animations.transitions.fade,
                  '&:hover': {
                    background: colors.accent[115],
                  }
                }}
              >
                {service.connected ? '연동 해제' : '연동하기'}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );

  const renderActivity = () => (
    <>
      <Card style={{ 
        padding: spacing[8],
        background: colors.ui.background.primary,
        borderRadius: borderRadius.xl,
        boxShadow: 'lg',
        marginBottom: spacing[8],
      }}>
        <Typography 
          variant="h5" 
          style={{ 
            marginBottom: spacing[6],
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.ui.foreground.primary,
          }}
        >
          최근 활동
        </Typography>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: spacing[5],
        }}>
          {[
            {
              date: '2024.06.30',
              type: 'scan',
              icon: 'camera',
              title: 'AI 피부 진단',
              detail: '건성, 민감성 피부로 진단',
              color: colors.accent[100],
            },
            {
              date: '2024.06.29',
              type: 'review',
              icon: 'edit',
              title: '제품 리뷰 작성',
              detail: '수분 크림에 대한 리뷰',
              color: colors.status.success,
            },
            {
              date: '2024.06.28',
              type: 'purchase',
              icon: 'shopping-cart',
              title: '제품 구매',
              detail: '수분 크림 외 2개',
              color: colors.status.warning,
            },
          ].map((activity, index) => (
            <div
              key={index}
              style={{
                padding: spacing[6],
                background: colors.ui.background.secondary,
                borderRadius: borderRadius.lg,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing[4],
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: borderRadius.lg,
                  background: `${activity.color}15`,
                  color: activity.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon name={activity.icon} size={20} color={activity.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <Typography 
                    variant="body2" 
                    style={{ 
                      marginBottom: spacing[1],
                      color: colors.ui.foreground.tertiary,
                      fontSize: typography.fontSize.sm,
                    }}
                  >
                    {activity.date}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={{ 
                      marginBottom: spacing[1],
                      color: colors.ui.foreground.primary,
                      fontSize: typography.fontSize.lg,
                      fontWeight: typography.fontWeight.medium,
                    }}
                  >
                    {activity.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    style={{
                      color: colors.ui.foreground.secondary,
                      fontSize: typography.fontSize.base,
                    }}
                  >
                    {activity.detail}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ 
        padding: spacing[8],
        background: colors.ui.background.primary,
        borderRadius: borderRadius.xl,
        boxShadow: 'lg',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing[6],
        }}>
          <Typography 
            variant="h5" 
            style={{ 
              fontFamily: typography.fontFamily.primary,
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.ui.foreground.primary,
            }}
          >
            저장한 제품
          </Typography>
          <Button 
            variant="text"
            style={{
              color: colors.accent[100],
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              padding: `${spacing[2]} ${spacing[4]}`,
              borderRadius: borderRadius.lg,
              transition: animations.transitions.fade,
              '&:hover': {
                background: colors.accent[5],
              }
            }}
          >
            전체보기
          </Button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: spacing[6],
        }}>
          {[
            { name: '수분 크림', brand: 'COSRX', tags: ['수분 공급', '진정'] },
            { name: '토너', brand: 'Roundlab', tags: ['각질 케어', '수분'] },
            { name: '세럼', brand: 'The Ordinary', tags: ['미백', '탄력'] },
          ].map((product, index) => (
            <div 
              key={index} 
              style={{ 
                cursor: 'pointer',
                transition: animations.transitions.scale,
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <div style={{
                width: '100%',
                aspectRatio: '1',
                backgroundColor: colors.ui.image.background,
                borderRadius: borderRadius.lg,
                marginBottom: spacing[3],
              }} />
              <Typography 
                variant="body2" 
                style={{ 
                  marginBottom: spacing[1],
                  color: colors.ui.foreground.secondary,
                  fontSize: typography.fontSize.sm,
                }}
              >
                {product.brand}
              </Typography>
              <Typography 
                variant="body1"
                style={{
                  marginBottom: spacing[3],
                  color: colors.ui.foreground.primary,
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                {product.name}
              </Typography>
              <div style={{
                display: 'flex',
                gap: spacing[2],
                flexWrap: 'wrap',
              }}>
                {product.tags.map((tag, tagIndex) => (
                  <div 
                    key={tagIndex}
                    style={{
                      padding: `${spacing[1]} ${spacing[2]}`,
                      background: colors.ui.background.secondary,
                      borderRadius: borderRadius.full,
                      fontSize: typography.fontSize.xs,
                      color: colors.ui.foreground.secondary,
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );

  const renderSettings = () => (
    <>
      <Card style={{ 
        padding: spacing[8],
        background: colors.ui.background.primary,
        borderRadius: borderRadius.xl,
        boxShadow: 'lg',
        marginBottom: spacing[8],
      }}>
        <Typography 
          variant="h5" 
          style={{ 
            marginBottom: spacing[6],
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.ui.foreground.primary,
          }}
        >
          알림 설정
        </Typography>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: spacing[4],
        }}>
          {[
            { 
              name: '피부 진단 리마인더',
              description: '정기적인 피부 진단 알림을 받아보세요.',
              icon: 'calendar',
              color: colors.accent[100],
            },
            { 
              name: '제품 추천 알림',
              description: '맞춤형 제품 추천 정보를 받아보세요.',
              icon: 'gift',
              color: colors.status.success,
            },
            { 
              name: '리뷰 요청',
              description: '구매한 제품에 대한 리뷰 작성을 알려드립니다.',
              icon: 'edit',
              color: colors.status.warning,
            },
            { 
              name: '마케팅 정보',
              description: '새로운 제품과 이벤트 소식을 받아보세요.',
              icon: 'bell',
              color: colors.status.info,
            },
          ].map((setting, index) => (
            <label
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing[6],
                background: colors.ui.background.secondary,
                borderRadius: borderRadius.lg,
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing[4],
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: borderRadius.lg,
                  background: `${setting.color}15`,
                  color: setting.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon name={setting.icon} size={20} color={setting.color} />
                </div>
                <div>
                  <Typography 
                    variant="body1"
                    style={{
                      marginBottom: spacing[1],
                      color: colors.ui.foreground.primary,
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.medium,
                    }}
                  >
                    {setting.name}
                  </Typography>
                  <Typography 
                    variant="body2"
                    style={{
                      color: colors.ui.foreground.secondary,
                      fontSize: typography.fontSize.sm,
                    }}
                  >
                    {setting.description}
                  </Typography>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked={index < 2}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: borderRadius.sm,
                  border: `1px solid ${colors.ui.border}`,
                  cursor: 'pointer',
                  '&:checked': {
                    backgroundColor: colors.accent[100],
                    borderColor: colors.accent[100],
                  }
                }}
              />
            </label>
          ))}
        </div>
      </Card>

      <Card style={{ 
        padding: spacing[8],
        background: colors.ui.background.primary,
        borderRadius: borderRadius.xl,
        boxShadow: 'lg',
      }}>
        <Typography 
          variant="h5" 
          style={{ 
            marginBottom: spacing[6],
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.ui.foreground.primary,
          }}
        >
          개인정보 설정
        </Typography>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: spacing[6],
        }}>
          <div>
            <Typography 
              variant="body2" 
              style={{ 
                marginBottom: spacing[2],
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.sm,
              }}
            >
              이메일
            </Typography>
            <input
              type="email"
              value="seoyeon@email.com"
              disabled
              style={{
                width: '100%',
                padding: spacing[4],
                background: colors.ui.background.tertiary,
                border: `1px solid ${colors.ui.border}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.ui.foreground.secondary,
              }}
            />
          </div>
          <div>
            <Typography 
              variant="body2" 
              style={{ 
                marginBottom: spacing[2],
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.sm,
              }}
            >
              이름
            </Typography>
            <input
              type="text"
              defaultValue="김서연"
              style={{
                width: '100%',
                padding: spacing[4],
                background: colors.ui.background.secondary,
                border: `1px solid ${colors.ui.border}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.ui.foreground.primary,
                transition: animations.transitions.fade,
                '&:focus': {
                  outline: 'none',
                  borderColor: colors.accent[100],
                  boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                },
                '&::placeholder': {
                  color: colors.ui.placeholder,
                }
              }}
            />
          </div>
          <div>
            <Typography 
              variant="body2" 
              style={{ 
                marginBottom: spacing[2],
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.sm,
              }}
            >
              전화번호
            </Typography>
            <input
              type="tel"
              defaultValue="010-1234-5678"
              style={{
                width: '100%',
                padding: spacing[4],
                background: colors.ui.background.secondary,
                border: `1px solid ${colors.ui.border}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.ui.foreground.primary,
                transition: animations.transitions.fade,
                '&:focus': {
                  outline: 'none',
                  borderColor: colors.accent[100],
                  boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                },
                '&::placeholder': {
                  color: colors.ui.placeholder,
                }
              }}
            />
          </div>
          <Button 
            variant="primary"
            style={{
              background: colors.accent[100],
              color: colors.white,
              padding: spacing[4],
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              transition: animations.transitions.fade,
              '&:hover': {
                background: colors.accent[115],
              }
            }}
          >
            변경사항 저장
          </Button>
        </div>
      </Card>
    </>
  );

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
        프로필을 불러오는 중...
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

  if (!userData) return (
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
        background: `${colors.status.warning}15`,
        borderRadius: borderRadius.lg,
        textAlign: 'center',
      }}>
        <Typography 
          style={{ 
            color: colors.status.warning,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
          }}
        >
          사용자 데이터를 불러올 수 없습니다.
        </Typography>
      </div>
    </div>
  );

  return (
    <div style={{ 
      backgroundColor: colors.ui.background.secondary, 
      minHeight: '100vh',
      padding: `${spacing[8]} ${spacing[4]}`,
    }}>
      <Container>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[4],
          marginBottom: spacing[8],
          padding: spacing[4],
          background: colors.ui.background.primary,
          borderRadius: borderRadius.xl,
          boxShadow: 'lg',
        }}>
          {[
            { id: 'profile', label: '프로필', icon: 'user' },
            { id: 'activity', label: '활동 내역', icon: 'activity' },
            { id: 'settings', label: '설정', icon: 'settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                padding: `${spacing[3]} ${spacing[4]}`,
                backgroundColor: activeTab === tab.id ? colors.accent[10] : 'transparent',
                border: 'none',
                borderRadius: borderRadius.lg,
                color: activeTab === tab.id ? colors.accent[100] : colors.ui.foreground.secondary,
                cursor: 'pointer',
                fontSize: typography.fontSize.base,
                fontWeight: activeTab === tab.id ? typography.fontWeight.semibold : typography.fontWeight.regular,
                transition: animations.transitions.fade,
                '&:hover': {
                  backgroundColor: activeTab === tab.id ? colors.accent[10] : colors.ui.background.secondary,
                }
              }}
            >
              <Icon name={tab.icon} size={20} color={activeTab === tab.id ? colors.accent[100] : colors.ui.foreground.secondary} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'activity' && renderActivity()}
        {activeTab === 'settings' && renderSettings()}
      </Container>
    </div>
  );
};

export default Profile;

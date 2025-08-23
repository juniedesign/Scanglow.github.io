import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';
import reviewService from '../../services/reviewService';
import Icon from '../../components/common/Icon';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await reviewService.getAllReviews();
        setReviews(res.data.data.reviews);
        setLoading(false);
      } catch (err) {
        setError('리뷰를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filters = [
    { id: 'all', name: '전체' },
    { id: 'dry', name: '건성' },
    { id: 'oily', name: '지성' },
    { id: 'sensitive', name: '민감성' },
    { id: '5star', name: '5점' },
    { id: '4star', name: '4점' },
    { id: '3star_below', name: '3점 이하' },
  ];

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
        리뷰를 불러오는 중...
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
      backgroundColor: colors.ui.background.secondary, 
      minHeight: '100vh',
      padding: `${spacing[8]} ${spacing[4]}`,
    }}>
      <Container>
        {/* Header */}
        <div style={{ marginBottom: spacing[8] }}>
          <Typography 
            variant="h3" 
            style={{ 
              marginBottom: spacing[3],
              fontFamily: typography.fontFamily.primary,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.ui.foreground.primary,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            사용자 리뷰
          </Typography>
          <Typography 
            variant="body1" 
            style={{ 
              color: colors.ui.foreground.secondary,
              fontSize: typography.fontSize.lg,
              lineHeight: typography.lineHeight.relaxed,
              maxWidth: '600px',
            }}
          >
            제품에 대한 실제 사용자들의 솔직한 리뷰를 확인하세요.
          </Typography>
        </div>

        {/* Filters */}
        <Card style={{ 
          padding: spacing[6],
          background: colors.ui.background.primary,
          borderRadius: borderRadius.xl,
          boxShadow: 'lg',
          marginBottom: spacing[8],
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing[2],
            marginBottom: spacing[4],
          }}>
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                style={{
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.medium,
                  minWidth: '100px',
                  transition: animations.transitions.fade,
                  ...(selectedFilter === filter.id ? {
                    background: colors.accent[100],
                    color: colors.white,
                    '&:hover': {
                      background: colors.accent[115],
                    }
                  } : {
                    background: colors.ui.background.primary,
                    color: colors.ui.foreground.primary,
                    border: `1px solid ${colors.ui.border}`,
                    '&:hover': {
                      background: colors.ui.background.secondary,
                    }
                  })
                }}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </Card>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: spacing[6],
        }}>
          {reviews.map((review) => (
            <Card
              key={review._id}
              style={{ 
                padding: spacing[6],
                background: colors.ui.background.primary,
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
                alignItems: 'flex-start',
                marginBottom: spacing[4],
              }}>
                <div>
                  <Typography 
                    variant="h6"
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: typography.fontSize.lg,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.ui.foreground.primary,
                      marginBottom: spacing[1],
                    }}
                  >
                    {review.userId}
                  </Typography>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2],
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[1],
                    }}>
                      <Icon name="star" size={16} color={colors.status.warning} />
                      <Typography 
                        variant="body2"
                        style={{
                          color: colors.ui.foreground.primary,
                          fontSize: typography.fontSize.base,
                          fontWeight: typography.fontWeight.medium,
                        }}
                      >
                        {review.rating}
                      </Typography>
                    </div>
                    <Typography 
                      variant="caption" 
                      style={{ 
                        color: colors.ui.foreground.tertiary,
                        fontSize: typography.fontSize.sm,
                      }}
                    >
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </div>
                </div>

                <div style={{
                  padding: `${spacing[1]} ${spacing[2]}`,
                  background: colors.ui.background.secondary,
                  borderRadius: borderRadius.full,
                  fontSize: typography.fontSize.xs,
                  color: colors.ui.foreground.secondary,
                }}>
                  {review.skinType || '건성'}
                </div>
              </div>

              <Typography 
                variant="body1" 
                style={{ 
                  color: colors.ui.foreground.primary,
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                  marginBottom: spacing[4],
                }}
              >
                {review.comment}
              </Typography>

              <div style={{
                display: 'flex',
                gap: spacing[2],
                flexWrap: 'wrap',
              }}>
                {['수분 공급', '진정', '미백'].map((tag, index) => (
                  <div 
                    key={index}
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
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Reviews;

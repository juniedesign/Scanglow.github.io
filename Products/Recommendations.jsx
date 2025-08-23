import React, { useState } from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';
import Icon from '../../components/common/Icon';

const ProductRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'cleanser', name: '클렌저' },
    { id: 'toner', name: '토너' },
    { id: 'serum', name: '세럼' },
    { id: 'moisturizer', name: '크림' },
    { id: 'sunscreen', name: '선크림' },
  ];

    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productService.getRecommendedProducts();
        setProducts(res.data.data.products);
        setLoading(false);
      } catch (err) {
        setError('제품을 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        제품 정보를 불러오는 중...
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
            맞춤 제품 추천
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
            AI가 분석한 피부 타입에 맞는 제품을 추천해드립니다.
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
            marginBottom: spacing[6],
          }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.medium,
                  minWidth: '100px',
                  transition: animations.transitions.fade,
                  ...(selectedCategory === category.id ? {
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
                {category.name}
              </Button>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: spacing[4],
          }}>
            <div style={{
              display: 'flex',
              gap: spacing[2],
            }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: `${spacing[3]} ${spacing[4]}`,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.ui.border}`,
                  backgroundColor: colors.ui.background.secondary,
                  color: colors.ui.foreground.primary,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.medium,
                  cursor: 'pointer',
                  transition: animations.transitions.fade,
                  '&:focus': {
                    outline: 'none',
                    borderColor: colors.accent[100],
                    boxShadow: `0 0 0 2px ${colors.accent[20]}`,
                  }
                }}
              >
                <option value="recommended">추천순</option>
                <option value="rating">평점순</option>
                <option value="reviews">리뷰순</option>
                <option value="price_low">가격 낮은순</option>
                <option value="price_high">가격 높은순</option>
              </select>
            </div>

            <Typography 
              variant="body2" 
              style={{ 
                color: colors.ui.foreground.secondary,
                fontSize: typography.fontSize.base,
              }}
            >
              총 {products.length}개 제품
            </Typography>
          </div>
        </Card>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: spacing[6],
        }}>
          {products.map((product) => (
            <Card
              key={product._id}
              style={{ 
                padding: spacing[4],
                background: colors.ui.background.primary,
                borderRadius: borderRadius.xl,
                cursor: 'pointer',
                transition: animations.transitions.scale,
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              {/* Product Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                backgroundColor: colors.ui.image.background,
                borderRadius: borderRadius.lg,
                marginBottom: spacing[4],
                overflow: 'hidden',
              }}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: spacing[3],
              }}>
                <div>
                  <Typography 
                    variant="body2" 
                    style={{ 
                      color: colors.ui.foreground.secondary,
                      fontSize: typography.fontSize.sm,
                      marginBottom: spacing[1],
                    }}
                  >
                    {product.brand}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    style={{ 
                      color: colors.ui.foreground.primary,
                      fontSize: typography.fontSize.lg,
                      fontWeight: typography.fontWeight.semibold,
                      marginBottom: spacing[1],
                    }}
                  >
                    {product.name}
                  </Typography>
                </div>

                <div style={{
                  padding: `${spacing[1]} ${spacing[2]}`,
                  background: `${colors.accent[100]}15`,
                  color: colors.accent[100],
                  borderRadius: borderRadius.full,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                }}>
                  {product.match || '-'}% 매칭
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing[4],
              }}>
                <Typography 
                  variant="body1" 
                  style={{ 
                    color: colors.ui.foreground.primary,
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.bold,
                  }}
                >
                  {product.price || '가격 정보 없음'}
                </Typography>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[3],
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[1],
                  }}>
                    <span style={{ fontSize: typography.fontSize.base }}>⭐</span>
                    <Typography 
                      variant="body2"
                      style={{
                        color: colors.ui.foreground.primary,
                        fontSize: typography.fontSize.base,
                        fontWeight: typography.fontWeight.medium,
                      }}
                    >
                      {product.rating || '-'}
                    </Typography>
                  </div>
                  <Typography 
                    variant="body2" 
                    style={{ 
                      color: colors.ui.foreground.secondary,
                      fontSize: typography.fontSize.sm,
                    }}
                  >
                    ({product.reviews || 0})
                  </Typography>
                </div>
              </div>

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

        {/* Load More */}
        <div style={{
          textAlign: 'center',
          marginTop: spacing[8],
        }}>
          <Button 
            variant="outline"
            style={{
              background: colors.ui.background.primary,
              color: colors.ui.foreground.primary,
              padding: `${spacing[3]} ${spacing[6]}`,
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
            더 보기
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ProductRecommendations;
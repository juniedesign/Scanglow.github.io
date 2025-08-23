import React, { useState } from 'react';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing } from '../../styles/design-system';

const ProductDetail = () => {
  const [selectedTab, setSelectedTab] = useState('info'); // info, ingredients, reviews

  const renderTabs = () => (
    <div style={{
      display: 'flex',
      borderBottom: `1px solid ${colors.neutral.gray[200]}`,
      marginBottom: spacing[6],
    }}>
      {[
        { id: 'info', label: '제품 정보' },
        { id: 'ingredients', label: '전성분' },
        { id: 'reviews', label: '리뷰' },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setSelectedTab(tab.id)}
          style={{
            padding: spacing[4],
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${selectedTab === tab.id ? colors.primary.blue : 'transparent'}`,
            color: selectedTab === tab.id ? colors.primary.blue : colors.neutral.gray[600],
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: selectedTab === tab.id ? '600' : '400',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  const renderProductInfo = () => (
    <>
      <Typography variant="h6" style={{ marginBottom: spacing[4] }}>
        제품 설명
      </Typography>
      <Typography variant="body1" color="secondary" style={{ marginBottom: spacing[6] }}>
        수분 크림은 피부 속 깊은 곳까지 수분을 공급하여 건강한 피부로 가꾸어주는 제품입니다.
        히알루론산과 세라마이드 성분이 풍부하게 함유되어 있어 피부 장벽 강화에도 도움을 줍니다.
      </Typography>

      <Typography variant="h6" style={{ marginBottom: spacing[4] }}>
        주요 특징
      </Typography>
      <div style={{ marginBottom: spacing[6] }}>
        {[
          '즉각적인 수분 공급',
          '피부 장벽 강화',
          '민감한 피부도 사용 가능',
          '끈적임 없는 산뜻한 마무리',
        ].map((feature, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: spacing[2],
            }}
          >
            <span style={{ marginRight: spacing[2] }}>✓</span>
            <Typography variant="body1">{feature}</Typography>
          </div>
        ))}
      </div>

      <Typography variant="h6" style={{ marginBottom: spacing[4] }}>
        사용법
      </Typography>
      <Typography variant="body1" color="secondary">
        1. 세안 후 토너로 피부결을 정돈합니다.<br />
        2. 적당량을 덜어 얼굴 전체에 골고루 펴발라줍니다.<br />
        3. 가볍게 두드려 흡수시켜줍니다.
      </Typography>
    </>
  );

  const renderIngredients = () => (
    <>
      <Typography variant="h6" style={{ marginBottom: spacing[4] }}>
        전성분 목록
      </Typography>
      <Card padding="large" elevation="base" style={{ marginBottom: spacing[6] }}>
        <Typography variant="body1" color="secondary" style={{ lineHeight: '1.8' }}>
          정제수, 글리세린, 부틸렌글라이콜, 디메치콘, 세테아릴알코올,
          폴리소르베이트60, 스테아릭애씨드, 글리세릴스테아레이트,
          히알루론산나트륨, 세라마이드엔피, 판테놀, 알란토인...
        </Typography>
      </Card>

      <Typography variant="h6" style={{ marginBottom: spacing[4] }}>
        주요 성분 설명
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {[
          {
            name: '히알루론산',
            description: '수분을 끌어당기고 보습을 유지하는데 도움을 주는 성분',
          },
          {
            name: '세라마이드',
            description: '피부 장벽을 강화하고 수분 손실을 막아주는 성분',
          },
          {
            name: '판테놀',
            description: '피부 진정과 보습에 도움을 주는 성분',
          },
        ].map((ingredient, index) => (
          <Card key={index} padding="large" elevation="base">
            <Typography variant="h6" style={{ marginBottom: spacing[2] }}>
              {ingredient.name}
            </Typography>
            <Typography variant="body1" color="secondary">
              {ingredient.description}
            </Typography>
          </Card>
        ))}
      </div>
    </>
  );

  const renderReviews = () => (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing[6],
      }}>
        <div>
          <Typography variant="h6" style={{ marginBottom: spacing[2] }}>
            사용자 리뷰
          </Typography>
          <Typography variant="body1" color="secondary">
            총 128개의 리뷰
          </Typography>
        </div>
        <Button variant="outline">
          리뷰 작성하기
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {[1, 2, 3].map((review) => (
          <Card key={review} padding="large" elevation="base">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: spacing[3],
            }}>
              <div>
                <Typography variant="body1" style={{ marginBottom: spacing[1] }}>
                  user****
                </Typography>
                <div style={{ display: 'flex', gap: spacing[1] }}>
                  <span>⭐⭐⭐⭐⭐</span>
                  <Typography variant="body2" color="secondary">
                    5.0
                  </Typography>
                </div>
              </div>
              <Typography variant="body2" color="secondary">
                2024.06.30
              </Typography>
            </div>
            <Typography variant="body1" style={{ marginBottom: spacing[3] }}>
              수분감이 좋고 흡수도 잘 되어서 매우 만족스러워요.
              건성 피부인데 하루종일 촉촉함이 유지됩니다.
            </Typography>
            <div style={{
              display: 'flex',
              gap: spacing[2],
            }}>
              {[1, 2].map((img) => (
                <div
                  key={img}
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: colors.neutral.gray[200],
                    borderRadius: '4px',
                  }}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: spacing[6],
      }}>
        <Button variant="outline">
          더보기
        </Button>
      </div>
    </>
  );

  return (
    <div style={{ backgroundColor: colors.neutral.gray[50], minHeight: '100vh' }}>
      <Container style={{ padding: `${spacing[8]} ${spacing[4]}` }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: spacing[8],
          marginBottom: spacing[8],
        }}>
          {/* Product Image */}
          <div>
            <div style={{
              width: '100%',
              aspectRatio: '1',
              backgroundColor: colors.neutral.gray[200],
              borderRadius: '8px',
              marginBottom: spacing[4],
            }} />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: spacing[2],
            }}>
              {[1, 2, 3, 4].map((thumb) => (
                <div
                  key={thumb}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    backgroundColor: colors.neutral.gray[300],
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div style={{
              display: 'inline-block',
              padding: `${spacing[1]} ${spacing[2]}`,
              backgroundColor: colors.primary.blue + '15',
              color: colors.primary.blue,
              borderRadius: '4px',
              marginBottom: spacing[2],
            }}>
              <Typography variant="body2">
                98% 매칭
              </Typography>
            </div>

            <Typography variant="body1" color="secondary" style={{ marginBottom: spacing[1] }}>
              Brand A
            </Typography>
            <Typography variant="h4" style={{ marginBottom: spacing[4] }}>
              수분 크림
            </Typography>
            <Typography variant="h5" style={{ marginBottom: spacing[6] }}>
              32,000원
            </Typography>

            <div style={{
              display: 'flex',
              gap: spacing[4],
              marginBottom: spacing[6],
            }}>
              <div>
                <Typography variant="body2" color="secondary" style={{ marginBottom: spacing[1] }}>
                  평점
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[1] }}>
                  <span>⭐</span>
                  <Typography variant="h6">4.8</Typography>
                </div>
              </div>
              <div>
                <Typography variant="body2" color="secondary" style={{ marginBottom: spacing[1] }}>
                  리뷰
                </Typography>
                <Typography variant="h6">128개</Typography>
              </div>
              <div>
                <Typography variant="body2" color="secondary" style={{ marginBottom: spacing[1] }}>
                  구매
                </Typography>
                <Typography variant="h6">1.2만개</Typography>
              </div>
            </div>

            <Button variant="primary" fullWidth style={{ marginBottom: spacing[2] }}>
              구매하기
            </Button>
            <Button variant="outline" fullWidth>
              장바구니
            </Button>
          </div>
        </div>

        {/* Tabs */}
        {renderTabs()}

        {/* Tab Content */}
        {selectedTab === 'info' && renderProductInfo()}
        {selectedTab === 'ingredients' && renderIngredients()}
        {selectedTab === 'reviews' && renderReviews()}
      </Container>
    </div>
  );
};

export default ProductDetail;
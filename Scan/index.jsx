import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 직접 사용
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing, typography, animations, borderRadius } from '../../styles/design-system';
import Icon from '../../components/common/Icon';

const Scan = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setMessage('카메라를 사용할 수 없습니다. 권한을 확인해주세요.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takeSnapshot = async () => {
    if (videoRef.current) {
      setLoading(true);
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('photo', blob, 'scan.jpg');

        try {
          const res = await axios.post('/api/v1/scans', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              // Authorization: `Bearer ${token}` // 실제 앱에서는 토큰 추가
            }
          });
          stopCamera();
          navigate(`/scan/result/${res.data.data.scan._id}`);
        } catch (err) {
          setMessage('스캔에 실패했습니다. 다시 시도해주세요.');
          setLoading(false);
        }
      }, 'image/jpeg');
    }
  };

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
              AI 피부 스캔
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
              스마트폰 카메라로 즉시 피부 상태를 분석하고,<br />
              과학적으로 진단받을 수 있어요.
            </Typography>
          </div>

          {!stream ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing[6],
              padding: `${spacing[8]} 0`,
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: borderRadius.full,
                background: `${colors.accent[10]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing[4],
              }}>
                <Icon name="camera" size={48} color={colors.accent[100]} />
              </div>
              <div style={{
                maxWidth: '400px',
                textAlign: 'center',
              }}>
                <Typography 
                  variant="h6" 
                  style={{ 
                    marginBottom: spacing[3],
                    fontFamily: typography.fontFamily.primary,
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.ui.foreground.primary,
                  }}
                >
                  스캔 가이드
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ 
                    color: colors.ui.foreground.secondary,
                    fontSize: typography.fontSize.base,
                    lineHeight: typography.lineHeight.relaxed,
                    marginBottom: spacing[6],
                  }}
                >
                  정확한 분석을 위해 밝은 조명 아래에서 정면을 응시해주세요.<br />
                  얼굴 전체가 잘 보이도록 촬영해주세요.
                </Typography>
                <Button 
                  onClick={startCamera} 
                  variant="primary" 
                  size="lg"
                  style={{
                    background: colors.accent[100],
                    color: colors.white,
                    padding: `${spacing[4]} ${spacing[8]}`,
                    borderRadius: borderRadius.lg,
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    transition: animations.transitions.fade,
                    '&:hover': {
                      background: colors.accent[115],
                    }
                  }}
                >
                  카메라 시작
                </Button>
              </div>
            </div>
          ) : (
            <div style={{
              position: 'relative',
              borderRadius: borderRadius.xl,
              overflow: 'hidden',
              backgroundColor: colors.dark[120],
            }}>
              <video 
                ref={videoRef} 
                autoPlay 
                style={{ 
                  width: '100%',
                  maxHeight: '70vh',
                  objectFit: 'cover',
                }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: spacing[6],
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                display: 'flex',
                gap: spacing[4],
                justifyContent: 'center',
              }}>
                <Button 
                  onClick={stopCamera} 
                  variant="outline"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: colors.white,
                    padding: spacing[4],
                    borderRadius: borderRadius.lg,
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.medium,
                    border: `1px solid rgba(255,255,255,0.2)`,
                    minWidth: '120px',
                    transition: animations.transitions.fade,
                    '&:hover': {
                      background: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  취소
                </Button>
                <Button 
                  onClick={takeSnapshot} 
                  loading={loading}
                  style={{
                    background: colors.accent[100],
                    color: colors.white,
                    padding: spacing[4],
                    borderRadius: borderRadius.lg,
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    minWidth: '120px',
                    transition: animations.transitions.fade,
                    '&:hover': {
                      background: colors.accent[115],
                    }
                  }}
                >
                  스캔하기
                </Button>
              </div>
            </div>
          )}

          {message && (
            <div style={{
              marginTop: spacing[4],
              padding: spacing[4],
              background: `${colors.status.error}15`,
              borderRadius: borderRadius.lg,
              textAlign: 'center',
            }}>
              <Typography 
                variant="body2" 
                style={{ 
                  color: colors.status.error,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                {message}
              </Typography>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Scan;

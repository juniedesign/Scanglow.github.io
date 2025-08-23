import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card } from '../../components/common';
import { colors, spacing } from '../../styles/design-system';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [skinConcerns, setSkinConcerns] = useState([]);
  const [lifestyle, setLifestyle] = useState({
    sleep: '',
    stress: '',
    skincare: '',
  });

  const handleConcernClick = (concern) => {
    setSkinConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
  };

  const handleLifestyleChange = (e) => {
    const { name, value } = e.target;
    setLifestyle((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    // TODO: Save onboarding data to backend
    navigate('/scan');
  };

  const renderStep1 = () => (
    <>
      <Typography variant="h5" style={{ marginBottom: spacing[4], textAlign: 'center' }}>
        가장 큰 피부 고민을 선택해주세요.
      </Typography>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[4], marginBottom: spacing[6] }}>
        {['건조', '트러블', '주름', '민감', '색소침착', '모공'].map((concern) => (
          <Button
            key={concern}
            variant={skinConcerns.includes(concern) ? 'primary' : 'outline'}
            onClick={() => handleConcernClick(concern)}
          >
            {concern}
          </Button>
        ))}
      </div>
      <Button onClick={nextStep} fullWidth>다음</Button>
    </>
  );

  const renderStep2 = () => (
    <>
      <Typography variant="h5" style={{ marginBottom: spacing[4], textAlign: 'center' }}>
        생활 습관을 알려주세요.
      </Typography>
      <div style={{ marginBottom: spacing[6] }}>
        <div style={{ marginBottom: spacing[4] }}>
          <Typography variant="body1" style={{ marginBottom: spacing[2] }}>수면 패턴</Typography>
          <select name="sleep" value={lifestyle.sleep} onChange={handleLifestyleChange} style={{ width: '100%', padding: spacing[2], borderRadius: '0.5rem' }}>
            <option value="">선택</option>
            <option value="regular">규칙적</option>
            <option value="irregular">불규칙적</option>
          </select>
        </div>
        <div style={{ marginBottom: spacing[4] }}>
          <Typography variant="body1" style={{ marginBottom: spacing[2] }}>스트레스 수준</Typography>
          <select name="stress" value={lifestyle.stress} onChange={handleLifestyleChange} style={{ width: '100%', padding: spacing[2], borderRadius: '0.5rem' }}>
            <option value="">선택</option>
            <option value="low">낮음</option>
            <option value="medium">중간</option>
            <option value="high">높음</option>
          </select>
        </div>
        <div>
          <Typography variant="body1" style={{ marginBottom: spacing[2] }}>스킨케어 루틴</Typography>
          <select name="skincare" value={lifestyle.skincare} onChange={handleLifestyleChange} style={{ width: '100%', padding: spacing[2], borderRadius: '0.5rem' }}>
            <option value="">선택</option>
            <option value="simple">간단함</option>
            <option value="multi-step">다단계</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: spacing[4] }}>
        <Button onClick={prevStep} fullWidth variant="outline">이전</Button>
        <Button onClick={handleSubmit} fullWidth>스캔 시작하기</Button>
      </div>
    </>
  );

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.neutral.gray[50],
      display: 'flex',
      alignItems: 'center',
    }}>
      <Container maxWidth="md">
        <Card elevation="lg" padding="large">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
        </Card>
      </Container>
    </div>
  );
};

export default Onboarding;

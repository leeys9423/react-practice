import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import Stepper from './Stepper';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);  // 이 부분이 누락되었었네요
  const [timer, setTimer] = useState(0);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  
  // 약관 동의 상태
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketing: false
  });

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    email: '',
    verificationCode: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    address: '',
    addressDetail1: '',
    addressDetail2: ''
  });

  // 타이머 관리
  useEffect(() => {
    let interval;
    if (timer > 0 && isVerificationSent) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsVerificationSent(false);
    }
    return () => clearInterval(interval);
  }, [timer, isVerificationSent]);

  // 이메일 인증 요청
  const handleVerificationRequest = () => {
    setIsVerificationSent(true);
    setTimer(180); // 3분 = 180초
  };

  // 약관 전체 동의 처리
  const handleAllAgreements = (checked) => {
    setAgreements({
      termsOfService: checked,
      privacyPolicy: checked,
      marketing: checked
    });
  };

  // 다음 단계로 이동
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // 타이머 포맷팅 (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne 
            agreements={agreements}
            setAgreements={setAgreements}
            handleNext={handleNext}
            handleAllAgreements={handleAllAgreements}
          />
        );
      case 2:
        return (
          <StepTwo
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            handleVerificationRequest={handleVerificationRequest}
            isVerificationSent={isVerificationSent}
            timer={timer}
            formatTime={formatTime}
            handleNext={handleNext}
          />
        );
      case 3:
        return <StepThree />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <Heart size={32} className="text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">현혈증 기부 시스템</h2>
          </Link>
        </div>

        <Stepper currentStep={currentStep} />
        {renderStepContent()}
      </div>
    </div>
  );
};

export default SignupPage;
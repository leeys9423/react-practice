import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Check } from 'lucide-react';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    addressDetail: ''
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

  // 스텝별 컨텐츠
  const renderStepContent = () => {
    switch (currentStep) {
      // case 1 부분만 수정
      case 1:
          return (
            <div className="space-y-4">
              {/* 서비스 이용약관 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">[필수] 서비스 이용약관</h3>
                <textarea
                  readOnly
                  className="w-full h-32 p-2 mb-2 border rounded-md bg-gray-50 text-sm resize-none"
                  value={`제1조 (목적)
        이 약관은 현혈증 기부 시스템이 제공하는 서비스의 이용조건 및 절차, 이용자와 당사의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.
        
        제2조 (용어의 정의)
        이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        1. "서비스"라 함은 현혈증 기부 시스템이 제공하는 모든 서비스를 의미합니다.
        2. "이용자"라 함은 이 약관에 따라 서비스를 이용하는 회원을 말합니다.`}
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={agreements.termsOfService}
                    onChange={(e) => setAgreements({...agreements, termsOfService: e.target.checked})}
                    className="h-4 w-4 text-red-600 rounded"
                  />
                  <span className="text-sm">서비스 이용약관에 동의합니다.</span>
                </label>
              </div>
        
              {/* 개인정보 처리방침 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">[필수] 개인정보 처리방침</h3>
                <textarea
                  readOnly
                  className="w-full h-32 p-2 mb-2 border rounded-md bg-gray-50 text-sm resize-none"
                  value={`1. 개인정보의 수집 및 이용 목적
        회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
        - 회원 가입 및 관리
        - 서비스 제공 및 운영
        - 고충처리 및 분쟁 해결
        
        2. 개인정보의 보유 및 이용기간
        회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.`}
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={agreements.privacyPolicy}
                    onChange={(e) => setAgreements({...agreements, privacyPolicy: e.target.checked})}
                    className="h-4 w-4 text-red-600 rounded"
                  />
                  <span className="text-sm">개인정보 처리방침에 동의합니다.</span>
                </label>
              </div>
        
              {/* 마케팅 정보 수신 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">[선택] 마케팅 정보 수신 동의</h3>
                <textarea
                  readOnly
                  className="w-full h-24 p-2 mb-2 border rounded-md bg-gray-50 text-sm resize-none"
                  value={`현혈증 기부 시스템의 새로운 소식과 다양한 헌혈 관련 정보를 받아보실 수 있습니다.
        - 이벤트 및 프로모션 정보 제공
        - 헌혈 관련 새로운 소식 및 정보 제공
        - 서비스 업데이트 및 변경사항 안내`}
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={agreements.marketing}
                    onChange={(e) => setAgreements({...agreements, marketing: e.target.checked})}
                    className="h-4 w-4 text-red-600 rounded"
                  />
                  <span className="text-sm">마케팅 정보 수신에 동의합니다.</span>
                </label>
              </div>
        
              {/* 전체 동의 */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={Object.values(agreements).every(v => v)}
                    onChange={(e) => handleAllAgreements(e.target.checked)}
                    className="h-4 w-4 text-red-600 rounded"
                  />
                  <span className="font-medium">모든 약관에 동의합니다</span>
                </label>
              </div>
        
              <button
                onClick={handleNext}
                disabled={!agreements.termsOfService || !agreements.privacyPolicy}
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                다음 단계
              </button>
            </div>
          );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">이메일</label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                    placeholder="이메일 주소를 입력하세요"
                  />
                  <button
                    onClick={handleVerificationRequest}
                    disabled={isVerificationSent}
                    className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-gray-300"
                  >
                    인증하기
                  </button>
                </div>
              </div>

              {isVerificationSent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">인증번호</label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="text"
                      value={userInfo.verificationCode}
                      onChange={(e) => setUserInfo({...userInfo, verificationCode: e.target.value})}
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                      placeholder="인증번호 6자리를 입력하세요"
                    />
                    <span className="flex items-center text-red-600">
                      {formatTime(timer)}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                <input
                  type="password"
                  value={userInfo.password}
                  onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
                <input
                  type="password"
                  value={userInfo.passwordConfirm}
                  onChange={(e) => setUserInfo({...userInfo, passwordConfirm: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">이름</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">연락처</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="연락처를 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">주소</label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    value={userInfo.address}
                    readOnly
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                    placeholder="주소를 검색하세요"
                  />
                  <button
                    onClick={() => {/* 다음 주소 API 연동 */}}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    주소 검색
                  </button>
                </div>
                <input
                  type="text"
                  value={userInfo.addressDetail}
                  onChange={(e) => setUserInfo({...userInfo, addressDetail: e.target.value})}
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="상세 주소를 입력하세요"
                />
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md"
            >
              가입하기
            </button>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">회원가입을 축하합니다!</h2>
            <p className="text-gray-600">
              현혈증 기부 시스템의 회원이 되신 것을 환영합니다.
            </p>
            <Link
              to="/login"
              className="block w-full py-2 px-4 bg-red-600 text-white rounded-md"
            >
              로그인하러 가기
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* 로고 */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <Heart size={32} className="text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">현혈증 기부 시스템</h2>
          </Link>
        </div>

        {/* 진행 상태 표시 */}
        <div className="flex items-center justify-between relative">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-4 ${
                  currentStep > step ? 'bg-red-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* 단계별 내용 */}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default SignupPage;
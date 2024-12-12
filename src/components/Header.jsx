import { Link } from 'react-router-dom';
import { Heart, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black text-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart size={24} className="text-red-600" />
          <Link to="/" className="text-2xl font-bold">현혈증 기부 시스템</Link>
        </div>
        <nav className="flex space-x-6">
          {/* 드롭다운 메뉴 */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-red-400 py-2">
              <span>헌혈의집</span>
              <ChevronDown size={16} />
            </button>
            
            <div className="invisible group-hover:visible absolute left-0 w-48 bg-white text-black rounded-md shadow-lg">
              <div className="py-1">
                <Link to="/bloodhouse/reservation" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                  조회 및 예약
                </Link>
                <Link to="/bloodhouse/find" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                  헌혈의집 찾기
                </Link>
                <Link to="/bloodhouse/hours" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                  운영시간 안내
                </Link>
                <Link to="/bloodhouse/directions" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                  찾아오시는 길
                </Link>
              </div>
            </div>
          </div>

          {/* 기타 메뉴 */}
          <Link to="/donate" className="flex items-center hover:text-red-400 py-2">
            기부하기
          </Link>
          <Link to="/apply" className="flex items-center hover:text-red-400 py-2">
            신청하기
          </Link>
          <Link to="/login" className="flex items-center hover:text-red-400 py-2">
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
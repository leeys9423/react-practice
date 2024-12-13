// components/community/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); // 현재 경로를 확인하기 위해 사용

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <h2 className="text-lg font-bold mb-4">커뮤니티</h2>
      <ul className="space-y-2">
        <li className={`rounded ${location.pathname === '/community/notice' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
          <Link to="/community/notice" className="block px-4 py-2">
            공지사항
          </Link>
        </li>
        <li className={`rounded ${location.pathname === '/community/request' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
          <Link to="/community/request" className="block px-4 py-2">
            요청게시판
          </Link>
        </li>
        <li className={`rounded ${location.pathname === '/community/article' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
          <Link to="/community/article" className="block px-4 py-2">
            헌혈 기사
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
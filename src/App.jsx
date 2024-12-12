import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>

      {/* Outlet이 라우터에서 매칭된 컴포넌트를 여기에 렌더링 */}
      <Outlet />
    </div>
  );
};

export default App;
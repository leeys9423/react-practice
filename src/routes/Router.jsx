import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainPage from "../pages/MainPage";
import LoginPage from '../pages/LoginPage';
import SignupPage from "../pages/signup/SignupPage";
import NoticeBoard from "../pages/community/NoticeBoard";
import RequestBoard from "../pages/community/RequestBoard";
import Article from "../pages/community/Article";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/community/notice",
        element: <NoticeBoard />
      },
      {
        path: "/community/request",
        element: <RequestBoard />
      },
      {
        path: "/community/article",
        element: <Article />
      },
    ]
  }
]);

export default router;
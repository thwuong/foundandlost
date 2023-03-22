import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { saveSocket } from "./stores/SocketSlice";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostDetail from "./pages/PostDetail";
import ProfilePage from "./pages/ProfilePage";
import RequestPage from "./pages/RequestPage";
import CreatePost from "./pages/CreatePost";
import ChatPage from "./pages/ChatPage";
import ManageAccount from "./pages/ManageAccount";
import ManagePost from "./pages/ManagePost";
import ManageCategory from "./pages/ManageCategory";
import NotFound from "./pages/NotFound";
import UnAuthorized from "./pages/UnAuthorized";
import PrivateRoutes from "./utils/PrivateRoutes";
import RequireAuth from "./utils/RequireAuth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("http://localhost:5000");
    dispatch(saveSocket(socket));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<RequireAuth />}>
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/post/create-post" element={<CreatePost />}></Route>
          <Route path="/post/:postId" element={<PostDetail />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/profile/:userId" element={<ProfilePage />}></Route>
          <Route path="/profile/request" element={<RequestPage />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
          {/* Admin */}
          <Route element={<PrivateRoutes />}>
            <Route path="/manage/account" element={<ManageAccount />}></Route>
            <Route path="/manage/post" element={<ManagePost />}></Route>
            <Route path="/manage/category" element={<ManageCategory />}></Route>
          </Route>
          <Route path="/unauthorized" element={<UnAuthorized />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

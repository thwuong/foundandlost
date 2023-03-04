import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostDetail from "./pages/PostDetail";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import ManageAccount from "./pages/ManageAccount";
import ManagePost from "./pages/ManagePost";
import ManageCategory from "./pages/ManageCategory";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route element={<PrivateRoutes />}> */}
        <Route index path="/" element={<HomePage />}></Route>
        <Route path="/post/create-post" element={<CreatePost />}></Route>
        <Route path="/post/:id" element={<PostDetail />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        {/* Admin */}
        <Route path="/manage/account" element={<ManageAccount />}></Route>
        <Route path="/manage/post" element={<ManagePost />}></Route>
        <Route path="/manage/category" element={<ManageCategory />}></Route>
        {/* </Route> */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

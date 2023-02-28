import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostDetail from "./pages/PostDetail";
import ProfilePage from "./pages/ProfilePage";
import ManageAccount from "./pages/ManageAccount";
import NotFound from "./pages/NotFoundPage";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route element={<PrivateRoutes />}> */}
        <Route index path="/" element={<HomePage />}></Route>
        <Route path="/post/:id" element={<PostDetail />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/admin/account" element={<ManageAccount />}></Route>
        {/* </Route> */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

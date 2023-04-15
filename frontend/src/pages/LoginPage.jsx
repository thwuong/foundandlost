import systemImage from "../assets/system-image.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const auth = useSelector((state) => state.auth);
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ idNumber, password }, dispatch);
  };
  useEffect(() => {
    if (!auth.user) return;
    if (auth.user && auth.user.isAdmin) {
      navigate("/manage/account");
    } else {
      navigate("/");
    }
  }, [auth]);
  return (
    <div className="w-4/5 mx-auto min-h-screen xl:my-0 mt-10">
      <div className="container">
        <main className="flex justify-center items-center">
          <div className="sm:w-2/4 xl:w-2/5 w-full">
            <h1 className="sm:text-5xl sm:text-left font-bold text-primary leading-tight text-6xl text-center">
              Welcome to FOUND&LOST SYSTEM
            </h1>
            <h4 className="mt-12 text-2xl text-primary font-medium text-center">Đăng nhập tài khoản</h4>
            <form className="mt-8 w-full mx-auto">
              <div className="mt-8">
                <input
                  id="idNumber"
                  type="text"
                  placeholder="Nhập mã đăng nhập"
                  name="idNumber"
                  value={idNumber}
                  onChange={(e) => {
                    setIdNumber(e.target.value);
                  }}
                  className="w-full py-2 px-4 outline-primary rounded shadow-xl"
                />
              </div>
              <div className="mt-8">
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full py-2 px-4 outline-primary rounded shadow-xl"
                />
              </div>
              <button onClick={handleSubmit} className="w-full mt-16 py-2 px-4 bg-primary text-white rounded">
                Đăng nhập
              </button>
            </form>
          </div>
          <figure className="sm:w-2/4 xl:w-3/5 sm:block hidden">
            <img src={systemImage} alt="Ảnh mô tả hệ thống" className="" />
          </figure>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;

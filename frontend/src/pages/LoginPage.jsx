import systemImage from "../assets/system-image.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api/apiAuth";
import { useNavigate } from "react-router-dom";
function Login() {
  const auth = useSelector((state) => state.auth);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ code, password }, dispatch, navigate);
  };
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-[80%] mx-auto xl:max-h-screen">
      <div className="container">
        <main className="flex justify-center items-center">
          <div className="w-[45%]">
            <h1 className="text-5xl font-bold text-primary leading-tight">
              Welcome to FOUND&LOST SYSTEM
            </h1>
            <h4 className="mt-12 text-2xl text-primary font-medium text-center">
              Đăng nhập tài khoản
            </h4>
            <form className="mt-8 w-full mx-auto">
              <div className="mt-8">
                <input
                  id="code"
                  type="text"
                  placeholder="Nhập mã đăng nhập"
                  name="code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
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
              <button
                onClick={handleSubmit}
                className="w-full mt-16 py-2 px-4 bg-primary text-white rounded"
              >
                Đăng nhập
              </button>
            </form>
          </div>
          <figure className="flex-1">
            <img src={systemImage} alt="Ảnh mô tả hệ thống" />
          </figure>
        </main>
      </div>
    </div>
  );
}

export default Login;

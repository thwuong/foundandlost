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
    const data = await login({ idNumber, password }, dispatch);
    data.user.isAdmin === 1 ? navigate("/manage") : navigate("/");
  };
  useEffect(() => {
    if (auth.user) {
      navigate(-1);
    }
  }, []);
  return (
    <div className="w-4/5 mx-auto min-h-screen xl:my-0 mt-10">
      <div className="container">
        <main className="flex justify-center items-center">
          <div className="sm:w-2/4 xl:w-2/5 w-full">
            <h1 className="sm:text-5xl sm:text-left font-bold text-primary leading-tight text-4xl text-center uppercase">
              Hệ thống <br /> Tìm đồ thất lạc <br />
              <span className="text-yellow-500 font-serif">FOUND&LOST</span>
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
                  className="w-full py-3 px-4 outline-primary bg-gray-100 border-gray-500/20 border rounded shadow-lg"
                />
              </div>
              <div className="mt-6">
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full py-3 px-4 outline-primary bg-gray-100 border-gray-500/20 border rounded shadow-lg"
                />
              </div>
              <button onClick={handleSubmit} className="w-full mt-12 py-3 px-4 bg-primary text-white rounded">
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

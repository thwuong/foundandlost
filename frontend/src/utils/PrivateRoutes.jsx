import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoutes = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

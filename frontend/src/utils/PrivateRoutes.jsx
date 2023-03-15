import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  console.log(location);
  return user.isAdmin ? <Outlet /> : <Navigate to={"/unauthorized"} />;
};

export default PrivateRoutes;

import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  return user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} replace={true} />
  );
};

export default AdminRoutes;

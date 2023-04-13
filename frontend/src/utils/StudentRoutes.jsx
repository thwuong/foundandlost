import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const StudentRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  return !user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} replace={true} />
  );
};

export default StudentRoutes;

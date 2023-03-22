import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ClientSocket from "./ClientSocket";
const RequireAuth = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? (
    <>
      <Outlet />
      <ClientSocket />
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default RequireAuth;

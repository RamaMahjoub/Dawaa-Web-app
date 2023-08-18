import { FC, ReactElement } from "react";
import { getStoredUser } from "../utils/user-storage";
import { Navigate } from "react-router-dom";
import { routes } from "./constant";

interface Props {
  element: ReactElement;
}

const AuthGuard: FC<Props> = ({ element }) => {
  const isAuthinticated = getStoredUser();
  if (isAuthinticated?.accessToken !== undefined) return element;
  return <Navigate to={`/${routes.LOGIN}`} replace />;
};

export default AuthGuard;

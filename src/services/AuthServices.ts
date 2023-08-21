import { CompleteInfo } from "../Schema/Requests/CompleteInfo";
import { LoginRequest } from "../Schema/Requests/Login";
import { RegisterRequest } from "../Schema/Requests/Register";
import http, { protectedAxios } from "./axios";

const register = (body: RegisterRequest) => {
  return http.post<any>("/auth/warehouse-register", body);
};

const completeInfo = (body: CompleteInfo) => {
  return protectedAxios.post<any>("/warehouse/create-warehouse", body);
};

const updateInfo = (body: Partial<CompleteInfo>) => {
  return protectedAxios.patch<any>("/warehouse", body);
};

const login = (body: LoginRequest) => {
  return http.post<any>("/auth/login-warehouse", body);
};

const isAccepted = () => {
  return protectedAxios.post<any>("/user/is-accepted");
};

const getInfo = () => {
  return protectedAxios.get<any>("/warehouse/get-info");
};

const AuthService = {
  register,
  completeInfo,
  updateInfo,
  login,
  isAccepted,
  getInfo,
};

export default AuthService;

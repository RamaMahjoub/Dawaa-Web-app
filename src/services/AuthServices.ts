import { LoginSchema } from "../Schema/request/login.schema";
import { RegisterSchema } from "../Schema/request/register.schema";
import { RegisterDetailSchema } from "../Schema/request/registerDetails.schema";
import http, { protectedAxios } from "./axios";

const register = (body: RegisterSchema) => {
  return http.post<any>("/auth/warehouse-register", body);
};

const completeInfo = (body: RegisterDetailSchema) => {
  return protectedAxios.post<any>("/warehouse/create-warehouse", body);
};

const updateInfo = (body: Partial<RegisterDetailSchema>) => {
  return protectedAxios.patch<any>("/warehouse", body);
};

const login = (body: LoginSchema) => {
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

import { RegisterDetailSchema } from "../Schema/request/registerDetails.schema";
import { Token } from "./../Schema/response/Token";
import Cookies from "js-cookie";
const USER_KEY = "user";
const USER_INFO = "user-info";

// export const setUserInformation = (info: RegisterDetailSchema): void => {
//   const token = jwt.sign(info, USER_INFO);
//   Cookies.set(USER_INFO, token, {
//     path: "/",
//   });
// };

// export const getUserInformation = () => {
//   const token = Cookies.get(USER_INFO);
//   const decoded = jwt.verify(token!, USER_INFO);
//   return decoded;
// };

export function getStoredUser(): Token | null {
  const accessToken = Cookies.get(USER_KEY);
  return { accessToken: accessToken! } || null;
}

export function setStoredUser(tokens: Token): void {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 180 * 60 * 60 * 1000);
  Cookies.set(USER_KEY, tokens.accessToken, {
    expires: expirationDate,
    path: "/",
  });
}

export function clearStoredUser(): void {
  Cookies.remove(USER_KEY, { path: "/" });
}

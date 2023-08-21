import Cookies from "js-cookie";
import { Token } from "../Schema/Responses/Token";
const USER_KEY = "user";

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

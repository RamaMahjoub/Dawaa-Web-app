import { Token } from "./../Schema/response/Token";

const USER_KEY = 'user';

export function getStoredUser(): Token | null {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(tokens: Token): void {
  localStorage.setItem(USER_KEY, JSON.stringify(tokens));
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_KEY);
}
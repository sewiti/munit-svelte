import { baseUrl } from "$src/constants";
import { navigate } from "svelte-navigator";
import { writable } from "svelte/store";

let authHeaderStr = "";

export const token = writable(localStorage.getItem("token") || "");
token.subscribe((token) => {
  localStorage.setItem("token", token);
  authHeaderStr = `Bearer ${token}`;
});

export const authHeader = (): string => {
  return authHeaderStr;
};

export class AuthError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  const url = `${baseUrl}/register`;

  const body = {
    email: email,
    password: password,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new AuthError(res.statusText);
  }
  await login(email, password);
};

export const login = async (email: string, password: string): Promise<void> => {
  const url = `${baseUrl}/login`;

  const body = {
    email: email,
    password: password,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new AuthError(res.statusText);
  }
  const data = await res.json();
  token.set(data.token);
};

export const logout = () => {
  token.set("");
  navigate("/");
};

export const handleStatus = (res: Response): boolean => {
  if (res.status == 401) {
    logout();
    return false;
  }
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return true;
};

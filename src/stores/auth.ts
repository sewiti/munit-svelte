import { baseUrl } from "$src/constants";
import { writable } from "svelte/store";
import { fetchSelf, User } from "$src/stores/user";

export type Auth = {
  loggedIn: boolean;
  user: User;
};

export const auth = writable(<Auth>{
  loggedIn: true,
});

let authHeaderStr = "";

const token = writable(localStorage.getItem("token") || "");
token.subscribe((token) => {
  console.log({ token });
  if (token === "") {
    // localStorage.removeItem("token");
    // auth.set(<Auth>{
    //   loggedIn: false,
    // });
    // authHeaderStr = "";
    return;
  }

  localStorage.setItem("token", token);
  authHeaderStr = `Bearer ${token}`;
  fetchSelf().catch(() => {
    logout();
  });
});

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

  switch (res.status) {
    case 200: {
      break; // continue
    }
    case 401: {
      throw Error("bad login");
    }
    default: {
      throw Error("unable to login");
    }
  }

  const data = await res.json();
  token.set(data.token);
};

export const logout = () => {
  token.set("");
};

export const authHeader = (): string => {
  return authHeaderStr;
};

import { baseUrl } from "$src/constants";
import { authHeader, handleStatus, logout } from "$src/stores/auth";
import { writable } from "svelte/store";

export type User = {
  id: string;
  displayName: string;
  email: string;
  created: string;
  modified: string;
};

export const user = writable(<User>{});

export async function fetchSelf(): Promise<void> {
  const url = `${baseUrl}/profile`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authHeader(),
    },
  });

  if (!handleStatus(res)) {
    return;
  }
  const data = await res.json();
  user.set(data);
}

export const fetchUser = async (id: string) => {
  const url = `${baseUrl}/profile`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authHeader(),
    },
  });

  if (!handleStatus(res)) {
    return;
  }
  const data = await res.json();
  return data;
};

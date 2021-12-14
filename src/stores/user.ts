import { baseUrl } from "$src/constants";
import { authHeader, handleStatus, logout } from "$src/stores/auth";

export type User = {
  id: string;
  displayName: string;
  email: string;
  created: string;
  modified: string;
};

export async function fetchSelf(): Promise<User> {
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
  return await res.json();
}

export const fetchUser = async (id: string): Promise<User> => {
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
  return await res.json();
};

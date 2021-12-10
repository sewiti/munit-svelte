import { baseUrl } from "$src/constants";
import { Auth, auth, authHeader } from "$src/stores/auth";

export type User = {
  id: string;
  displayName: string;
  email: string;
  created: string;
  modified: string;
};

export async function fetchSelf(): Promise<void> {
  const url = `${baseUrl}/profile`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authHeader(),
    },
  });

  if (!res.ok) {
    throw Error("invalid token");
  }

  const data = await res.json();
  auth.set(<Auth>{
    loggedIn: true,
    user: data,
  });
}

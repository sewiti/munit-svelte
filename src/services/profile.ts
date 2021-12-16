import { baseUrl } from "$src/constants";
import { authHeader, handleStatus } from "$src/stores/auth";

export type User = {
  id: string;
  displayName: string;
  email: string;
  created: string;
  modified: string;
};

export const getUser = async (id: string): Promise<User> => {
  const url = `${baseUrl}/profile/${id}`;
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

export const getProfile = async (): Promise<User> => {
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

export const editProfile = async (
  displayName: string,
  email: string
): Promise<User> => {
  const url = `${baseUrl}/profile`;
  const body = {
    displayName: displayName,
    email: email,
  };

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify(body),
  });
  if (!handleStatus(res)) {
    return;
  }
  return await res.json();
};

export const deleteProfile = async (): Promise<void> => {
  const url = `${baseUrl}/profile`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: authHeader(),
    },
  });
  if (!handleStatus(res)) {
    return;
  }
};

import { baseUrl } from "$src/constants";
import { authHeader, handleStatus } from "$src/stores/auth";

export type Commit = {
  id: string;
  title: string;
  message: string;
  created: string;
  modified: string;
  projectID: string;
  userID: string;
};

export const getCommit = async (pid: string, cid: string): Promise<Commit> => {
  const url = `${baseUrl}/projects/${pid}/commits/${cid}`;
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

export const getAllCommits = async (pid: string): Promise<Commit[]> => {
  const url = `${baseUrl}/projects/${pid}/commits`;
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

export const createCommit = async (
  pid: string,
  title: string,
  msg: string
): Promise<Commit> => {
  const url = `${baseUrl}/projects/${pid}/commits`;
  const body = {
    title: title,
    message: msg,
  };

  const res = await fetch(url, {
    method: "POST",
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

export const editCommit = async (
  pid: string,
  cid: string,
  title: string,
  msg: string
): Promise<Commit> => {
  const url = `${baseUrl}/projects/${pid}/commits/${cid}`;
  const body = {
    title: title,
    message: msg,
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

export const deleteCommit = async (
  pid: string,
  cid: string
): Promise<Commit> => {
  const url = `${baseUrl}/projects/${pid}/commits/${cid}`;
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

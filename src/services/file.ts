import { baseUrl } from "$src/constants";
import { authHeader, handleStatus } from "$src/stores/auth";

export type MunitFile = {
  id: string;
  path: string;
  data: string | null;
  created: string;
  modified: string;
  commitID: string;
  projectID: string;
};

export const getFile = async (
  pid: string,
  cid: string,
  fid: string
): Promise<MunitFile> => {
  const url = `${baseUrl}/projects/${pid}/commits/${cid}/files/${fid}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authHeader(),
    },
  });
  if (!handleStatus(res)) {
    return;
  }
  let rData: MunitFile = await res.json();
  rData.data = atob(rData.data);
  return rData;
};

export const getAllFiles = async (
  pid: string,
  cid: string
): Promise<MunitFile[]> => {
  const url = `${baseUrl}/projects/${pid}/commits/${cid}/files`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authHeader(),
    },
  });
  if (!handleStatus(res)) {
    return;
  }

  const rData: MunitFile[] = await res.json();
  rData.forEach((file, i) => {
    rData[i].data = atob(file.data);
  });
  return rData;
};

export const createFile = async (
  pid: string,
  cid: string,
  path: string,
  data: string
): Promise<MunitFile> => {
  const url = `${baseUrl}/projects/${pid}/commits/${cid}/files`;
  const body = {
    path: path,
    data: btoa(data),
  };
  console.log({ body });

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

  let rData: MunitFile = await res.json();
  rData.data = atob(rData.data);
  return rData;
};

export const editFile = async (
  pid: string,
  cid: string,
  fid: string,
  path: string,
  data: string
): Promise<MunitFile> => {
  const url = `${baseUrl}/projects/${pid}/commits/${cid}/files/${fid}`;
  const body = {
    path: path,
    data: btoa(data),
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

  const rData: MunitFile = await res.json();
  rData.data = atob(rData.data);
  return rData;
};

export const deleteFile = async (
  pid: string,
  cid: string,
  fid: string
): Promise<void> => {
  const url = `${baseUrl}/projects/${pid}/commits/${cid}/files/${fid}`;
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

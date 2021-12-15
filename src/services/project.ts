import { baseUrl } from "$src/constants";
import { authHeader, handleStatus } from "$src/stores/auth";

export type Project = {
  id: string;
  name: string;
  description: string;
  created: string;
  modified: string;
  ownerID: string;
  contributors: string[];
};

export const createProject = async (
  name: string,
  desc: string = ""
): Promise<Project> => {
  const url = `${baseUrl}/projects`;
  const body = {
    name: name,
    description: desc,
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

export const editProject = async (
  id: string,
  name: string,
  desc: string = ""
): Promise<Project> => {
  const url = `${baseUrl}/projects/${id}`;
  const body = {
    name: name,
    description: desc,
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

export const getProject = async (id: string): Promise<Project> => {
  const url = `${baseUrl}/projects/${id}`;

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

export const getAllProjects = async (): Promise<Project[]> => {
  const url = `${baseUrl}/projects`;

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

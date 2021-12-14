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

export async function fetchProject(id: string): Promise<Project> {
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
}

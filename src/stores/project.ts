import { baseUrl } from "$src/constants";
import { writable } from "svelte/store";
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

export const project = writable(<Project>{});

export async function fetchProject(id: string): Promise<void> {
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
  const data = await res.json();
  project.set(data);
}

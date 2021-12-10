import { baseUrl } from "$src/constants";
import { writable } from "svelte/store";
import { authHeader, handleStatus } from "$src/stores/auth";
import type { Project } from "$src/stores/project";

export const projects = writable<Project[]>([]);

export async function fetchProjects(): Promise<void> {
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
  const data = await res.json();
  projects.set(data);
}

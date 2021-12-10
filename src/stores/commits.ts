import { baseUrl } from "$src/constants";
import { writable } from "svelte/store";
import { authHeader, handleStatus } from "$src/stores/auth";
import type { Commit } from "$src/stores/commit";

export const commits = writable<Commit[]>([]);

export async function fetchCommits(pid: string): Promise<void> {
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
  const data = await res.json();
  commits.set(data);
}

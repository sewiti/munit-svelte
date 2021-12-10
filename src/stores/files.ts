import { baseUrl } from "$src/constants";
import { writable } from "svelte/store";
import { authHeader, handleStatus } from "$src/stores/auth";
import type { MunitFile } from "$src/stores/file";

export const files = writable<MunitFile[]>([]);

export async function fetchFiles(pid: string, cid: string): Promise<void> {
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
  const data = await res.json();
  files.set(data);
}

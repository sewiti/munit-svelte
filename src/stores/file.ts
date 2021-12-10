import { baseUrl } from "$src/constants";
import { writable } from "svelte/store";
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

export const file = writable(<MunitFile>{});

export async function fetchFile(
  pid: string,
  cid: string,
  fid: string
): Promise<void> {
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
  const data = await res.json();
  file.set(data);
}

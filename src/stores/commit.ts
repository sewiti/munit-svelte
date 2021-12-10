import { baseUrl } from "$src/constants";
import { writable } from "svelte/store";
import { authHeader, handleStatus } from "./auth";

export type Commit = {
  id: string;
  title: string;
  message: string;
  created: string;
  modified: string;
  projectID: string;
  userID: string;
};

export const commit = writable(<Commit>{});

export async function fetchCommit(pid: string, cid: string): Promise<void> {
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
  const data = await res.json();
  commit.set(data);
}

import { baseUrl } from "$src/constants";
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

export async function fetchCommit(pid: string, cid: string): Promise<Commit> {
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
}

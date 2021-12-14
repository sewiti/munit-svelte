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

export const fetchFile = async (
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
  return await res.json();
};

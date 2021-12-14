import { baseUrl } from "$src/constants";
import { authHeader, handleStatus } from "$src/stores/auth";
import type { MunitFile } from "$src/stores/file";

export async function fetchFiles(
  pid: string,
  cid: string
): Promise<MunitFile[]> {
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
  return await res.json();
}

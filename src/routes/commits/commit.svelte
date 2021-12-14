<script lang="ts">
  import { appName } from "$src/constants";

  import { Commit, fetchCommit } from "$src/stores/commit";
  import type { MunitFile } from "$src/stores/file";
  import { fetchFiles } from "$src/stores/files";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";

  export let pid = "";
  export let cid = "";

  let loading = true;
  let commit = <Commit>{};
  let files = <MunitFile[]>[];
  onMount(async () => {
    [commit, files] = await Promise.all([
      fetchCommit(pid, cid),
      fetchFiles(pid, cid),
    ]);
    loading = false;
  });
</script>

<svelte:head>
  <title>{commit.title || "Commit"} - {appName}</title>
</svelte:head>

<h1 aria-busy={loading}>{commit.title || ""}</h1>

<table>
  <thead>
    <tr>
      <th scope="col">Title</th>
    </tr>
  </thead>
  <tbody aria-busy={loading}>
    {#each files || [] as file}
      <tr>
        <th scope="row">
          <Link to={`/projects/${pid}/commits/${cid}/files/${file.id}`}>
            {file.path}
          </Link>
        </th>
      </tr>
    {/each}
  </tbody>
</table>

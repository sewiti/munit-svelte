<script lang="ts">
  import { commit, fetchCommit } from "$src/stores/commit";
  import { fetchFiles, files } from "$src/stores/files";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  export let pid = "";
  export let cid = "";
  onMount(() => {
    fetchCommit(pid, cid);
    fetchFiles(pid, cid);
  });
</script>

<svelte:head>
  <title>Commit</title>
</svelte:head>

<h1>{$commit.title}</h1>

<table>
  <thead>
    <tr>
      <th scope="col">Title</th>
    </tr>
  </thead>
  <tbody>
    {#each $files || [] as file}
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

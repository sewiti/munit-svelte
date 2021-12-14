<script lang="ts">
  import type { Commit } from "$src/stores/commit";

  import { fetchCommits } from "$src/stores/commits";
  import { fetchProject, Project } from "$src/stores/project";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";

  export let id = "";

  let loading = true;
  let project = <Project>{};
  let commits = <Commit[]>[];
  onMount(async () => {
    [project, commits] = await Promise.all([
      fetchProject(id),
      fetchCommits(id),
    ]);
    loading = false;
  });
</script>

<svelte:head>
  <title>Project</title>
</svelte:head>

<h1 aria-busy={loading}>{project.name || ""}</h1>

<table>
  <thead>
    <tr>
      <th scope="col">Title</th>
    </tr>
  </thead>
  <tbody aria-busy={loading}>
    {#each commits as commit}
      <tr>
        <th scope="row">
          <Link to={`/projects/${id}/commits/${commit.id}`}>
            {commit.title}
          </Link>
        </th>
      </tr>
    {/each}
  </tbody>
</table>

<script lang="ts">
  import { commits, fetchCommits } from "$src/stores/commits";

  import { fetchProject, project } from "$src/stores/project";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  export let id = "";
  onMount(() => {
    fetchProject(id);
    fetchCommits(id);
  });
</script>

<svelte:head>
  <title>Project</title>
</svelte:head>

<h1>{$project.name}</h1>

<table>
  <thead>
    <tr>
      <th scope="col">Title</th>
    </tr>
  </thead>
  <tbody>
    {#each $commits || [] as commit}
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

<script lang="ts">
  import { fetchProjects } from "$src/stores/projects";
  import type { Project } from "$src/stores/project";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import { appName } from "$src/constants";

  let loading = true;
  let projects = <Project[]>[];
  onMount(async () => {
    projects = await fetchProjects();
    loading = false;
  });
</script>

<svelte:head>
  <title>My Projects - {appName}</title>
</svelte:head>

<h1>My Projects</h1>

<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
    </tr>
  </thead>
  <tbody aria-busy={loading}>
    {#each projects as project}
      <tr>
        <th scope="row">
          <Link to={`/projects/${project.id}`}>
            {project.name}
          </Link>
        </th>
      </tr>
    {/each}
  </tbody>
</table>

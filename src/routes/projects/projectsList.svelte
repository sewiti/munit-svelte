<script lang="ts">
  import { fetchProjects, projects } from "$src/stores/projects";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  onMount(fetchProjects);
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<h1>Projects</h1>

<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
    </tr>
  </thead>
  <tbody>
    {#each $projects || [] as project}
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

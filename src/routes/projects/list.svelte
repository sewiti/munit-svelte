<script lang="ts">
  import Main from "$src/components/main.svelte";
  import { getAllProjects, Project } from "$src/services/project";
  import { Link } from "svelte-navigator";
  import { appName } from "$src/constants";
  import { onMount } from "svelte";

  let loading = true;
  let projects = <Project[]>[];
  onMount(async () => {
    projects = await getAllProjects();
    loading = false;
  });
</script>

<svelte:head>
  <title>My Projects - {appName}</title>
</svelte:head>

<Main>
  <article>
    <h1 style="display: flex; justify-content: space-between;">
      <span>My Projects</span>
      <Link to="/projects/create" class="outline" role="button"
        >New Project</Link
      >
    </h1>

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
  </article>
</Main>

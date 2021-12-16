<script lang="ts">
  import { appName } from "$src/constants";
  import { getAllCommits, Commit } from "$src/services/commit";
  import { getProject, Project } from "$src/services/project";
  import { Link } from "svelte-navigator";
  import { onMount } from "svelte";
  import Main from "$src/components/main.svelte";

  export let id = "";

  let loading = true;
  let project = <Project>{};
  let commits = <Commit[]>[];
  onMount(async () => {
    [project, commits] = await Promise.all([getProject(id), getAllCommits(id)]);
    loading = false;
  });
</script>

<svelte:head>
  <title>{project.name || "Project"} - {appName}</title>
</svelte:head>

<Main>
  <article>
    <hgroup>
      <h1
        style="display: flex; justify-content: space-between;"
        aria-busy={loading}
      >
        <span>{project.name || ""}</span>
        <div>
          <Link to={`/projects/${id}/edit`} class="outline" role="button">
            Edit Project
          </Link>
          <Link to={`/projects/${id}/create`} role="button">New Commit</Link>
        </div>
      </h1>
      <h2 aria-busy={loading}>{project.description || ""}</h2>
    </hgroup>

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
  </article>
</Main>

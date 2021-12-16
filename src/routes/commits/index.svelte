<script lang="ts">
  import { appName } from "$src/constants";
  import Main from "$src/components/main.svelte";
  import { Commit, getCommit } from "$src/services/commit";
  import { getAllFiles, MunitFile } from "$src/services/file";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";

  export let pid = "";
  export let cid = "";

  let loading = true;
  let commit = <Commit>{};
  let files = <MunitFile[]>[];
  onMount(async () => {
    [commit, files] = await Promise.all([
      getCommit(pid, cid),
      getAllFiles(pid, cid),
    ]);
    loading = false;
  });
</script>

<svelte:head>
  <title>{commit.title || "Commit"} - {appName}</title>
</svelte:head>

<Main>
  <article>
    <hgroup>
      <h1
        style="display: flex; justify-content: space-between;"
        aria-busy={loading}
      >
        <span>{commit.title || ""}</span>
        <div>
          <Link
            to={`/projects/${pid}/commits/${cid}/edit`}
            class="outline"
            role="button"
          >
            Edit Commit
          </Link>
          <Link to={`/projects/${pid}/commits/${cid}/create`} role="button">
            New File
          </Link>
        </div>
      </h1>
      <h2 aria-busy={loading}>{commit.message || ""}</h2>
    </hgroup>

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
  </article>
</Main>

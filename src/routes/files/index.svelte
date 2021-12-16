<script lang="ts">
  import { appName } from "$src/constants";
  import Main from "$src/components/main.svelte";
  import { getFile, MunitFile } from "$src/services/file";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";

  export let pid = "";
  export let cid = "";
  export let fid = "";

  let loading = true;
  let file = <MunitFile>{};
  onMount(async () => {
    file = await getFile(pid, cid, fid);
    loading = false;
  });
</script>

<svelte:head>
  <title>{file.path || "File"} - {appName}</title>
</svelte:head>

<Main>
  <article>
    <h1
      style="display: flex; justify-content: space-between;"
      aria-busy={loading}
    >
      <span>{file.path || ""}</span>
      <div>
        <Link
          to={`/projects/${pid}/commits/${cid}/files/${file.id}/edit`}
          class="outline"
          role="button"
        >
          Edit File
        </Link>
      </div>
    </h1>

    <code aria-busy={loading}>
      {file.data || ""}
    </code>
  </article>
</Main>

<script lang="ts">
  import { appName } from "$src/constants";
  import Main from "$src/components/main.svelte";
  import { fetchFile, MunitFile } from "$src/stores/file";
  import { onMount } from "svelte";

  export let pid = "";
  export let cid = "";
  export let fid = "";

  let loading = true;
  let file = <MunitFile>{};
  onMount(async () => {
    file = await fetchFile(pid, cid, fid);
    loading = false;
  });
</script>

<svelte:head>
  <title>{file.path || "File"} - {appName}</title>
</svelte:head>

<Main>
  <article>
    <h1 aria-busy={loading}>{file.path || ""}</h1>
  </article>
</Main>

<script lang="ts">
  import { fetchFile, file } from "$src/stores/file";

  import { onMount } from "svelte";

  export let pid = "";
  export let cid = "";
  export let fid = "";

  onMount(() => {
    fetchFile(pid, cid, fid);
  });
</script>

<svelte:head>
  <title>File</title>
</svelte:head>

<h1>{$file.path}</h1>

<script lang="ts">
  import { appName } from "$src/constants";

  import { logout } from "$src/stores/auth";
  import { onMount } from "svelte";

  onMount(() => {
    logout();
  });
</script>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

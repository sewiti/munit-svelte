<script lang="ts">
  import { fetchSelf, User } from "$src/stores/user";
  import { onMount } from "svelte";

  let loading = true;
  let profile = <User>{};
  onMount(async () => {
    profile = await fetchSelf();
    loading = false;
  });
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<h1 aria-busy={loading}>{profile.email || ""}</h1>

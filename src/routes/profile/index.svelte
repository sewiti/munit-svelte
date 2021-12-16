<script lang="ts">
  import { appName } from "$src/constants";
  import Main from "$src/components/main.svelte";
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
  <title>My Profile - {appName}</title>
</svelte:head>

<Main>
  <article>
    <h1 aria-busy={loading}>{profile.email || ""}</h1>
  </article>
</Main>

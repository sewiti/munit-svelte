<script lang="ts">
  import { appName } from "$src/constants";
  import Main from "$src/components/main.svelte";
  import { fetchSelf, User } from "$src/stores/user";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";

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
    <h1
      style="display: flex; justify-content: space-between;"
      aria-busy={loading}
    >
      <span>{profile.email || ""}</span>
      <Link to={"/profile/edit"} class="outline" role="button">Edit</Link>
    </h1>
  </article>
</Main>

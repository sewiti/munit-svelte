<script lang="ts">
  import { fetchSelf, user } from "$src/stores/user";
  import { onMount } from "svelte";
  onMount(fetchSelf);
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<h1>{$user.email}</h1>

<script lang="ts">
  import { auth } from "$src/stores/auth";
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<h1>{$auth.user.email}</h1>

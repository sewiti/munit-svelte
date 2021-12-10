<script lang="ts">
  import { logout } from "$src/stores/auth";
  import { onMount } from "svelte";

  onMount(() => {
    logout();
  });
</script>

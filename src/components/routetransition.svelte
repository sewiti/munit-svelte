<script lang="ts">
  import { Route } from "svelte-navigator";
  import { cubicIn } from "svelte/easing";
  import { fade } from "svelte/transition";
</script>

<Route {...$$props}>
  <div in:fade={{ duration: 300, easing: cubicIn }}>
    <slot />
  </div>
</Route>

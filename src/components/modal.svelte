<script>
  import { fade } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { clickOutside } from "$src/components/outclick";

  export let display = false;
</script>

{#if display}
  <div class="modal" in:fade={{ duration: 250, easing: cubicInOut }}>
    <article
      class="modal-content"
      use:clickOutside
      on:outclick={() => {
        display = false;
      }}
    >
      <slot />
    </article>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }

  .modal-content {
    margin: 0 auto;
    position: relative;
    top: 20%;
    width: 25em;
  }
</style>

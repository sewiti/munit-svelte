<script lang="ts">
  export let errors: string[];
</script>

<small hidden={errors ? errors.length === 0 : true}>
  <ul class="error">
    {#each errors || [] as err}
      <li>{err}</li>
    {/each}
  </ul>
</small>

<style>
  .error {
    color: indianred;
  }
</style>

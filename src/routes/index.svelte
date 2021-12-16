<script>
  import { appName } from "$src/constants";
</script>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

<div class="container-fluid fill">
  <div class="overlay">
    <h1 class="brand">Welcome to Munit.digital</h1>
  </div>
</div>

<style>
  .fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 75vh;
    padding: 0;

    background-image: url("/IMG_1447.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .overlay {
    background-color: rgba(0, 8, 16, 0.75);
    width: 100%;
    height: 100%;
  }

  .brand {
    text-align: center;
    /* margin: auto auto; */
    margin: 3em 0;
  }
</style>

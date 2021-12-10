<script lang="ts">
  import { Link } from "svelte-navigator";
  import { token } from "$src/stores/auth";
</script>

<nav class="container">
  <ul>
    <li>
      <strong>
        <Link class="contrast" to="/">Munit</Link>
      </strong>
    </li>
  </ul>
  <ul>
    {#if $token !== ""}
      <li>
        <Link to="/projects">Projects</Link>
      </li>
      <li>
        <Link to="/profile">My Profile</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    {:else}
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    {/if}
  </ul>
</nav>

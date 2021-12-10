<script lang="ts">
  import { Link } from "svelte-navigator";
  import { auth } from "$src/stores/auth";
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
    {#if $auth.loggedIn}
      <li>
        <Link to="/profile">Profile</Link>
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

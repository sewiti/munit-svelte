<script lang="ts">
  import { Link } from "svelte-navigator";
  import { token } from "$src/stores/auth";
  import { MenuIcon } from "svelte-feather-icons";
</script>

<nav class="container">
  <ul>
    <li>
      <Link class="secondary" to="/">
        <strong class="brand">
          <span style="color: var(--contrast);">Munit</span><span>.digital</span
          >
        </strong>
      </Link>
    </li>
  </ul>

  {#if $token === ""}
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  {:else}
    <ul>
      <li>
        <Link to="/projects">My Projects</Link>
      </li>
      <li>
        <Link to="/profile">My Profile</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </ul>
  {/if}
</nav>

<style>
  @import url("http://fonts.cdnfonts.com/css/coolvetica-2");
  .brand {
    font-family: "Coolvetica", var(--font-family);
    font-size: x-large;
    line-height: 1em;
  }
</style>

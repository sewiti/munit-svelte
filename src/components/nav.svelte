<script lang="ts">
  import { Link } from "svelte-navigator";
  import { token } from "$src/stores/auth";
  import { MenuIcon } from "svelte-feather-icons";

  let dropdown = false;
  const toggleDropdown = () => {
    dropdown = !dropdown;
  };
  const hideDropdown = () => {
    dropdown = false;
  };
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
    <!-- Logged in -->
    <ul class="notXS">
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
    <!-- Logged in dropdown (this is trash) -->
    <ul class="xs">
      <div class="dropdown-container" hidden={!dropdown}>
        <article class="dropdown">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </article>
      </div>
      <li>
        <button
          class="primary outline"
          style="padding:0.5em"
          on:click={toggleDropdown}
        >
          <MenuIcon size="24" />
        </button>
      </li>
    </ul>
  {:else}
    <!-- Guest -->
    <ul class="notXS">
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
    <!-- Guest dropdown (this is trash) -->
    <ul class="xs">
      <div class="dropdown-container" hidden={!dropdown}>
        <article class="dropdown">
          <Link to="/projects">My Projects</Link>
          <Link to="/profile">My Profile</Link>
          <Link to="/logout">Logout</Link>
        </article>
      </div>
      <li>
        <button
          class="primary outline"
          style="padding:0.5em"
          on:click={toggleDropdown}
        >
          <MenuIcon size="24" />
        </button>
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

  .dropdown-container {
    position: fixed;
    width: 0;
    height: 0;
    z-index: 1;
  }
  .dropdown {
    position: relative;
    top: 3em;
    right: 7em;
    width: 10em;
  }

  .xs {
    display: none;
  }
  .notXS {
    display: block;
  }
  @media (max-width: 576px) {
    .xs {
      display: block;
    }
    .notXS {
      display: none;
    }
  }
</style>

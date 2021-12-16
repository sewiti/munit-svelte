<script>
  import { Link } from "svelte-navigator";
</script>

<footer class="footer">
  <div class="container" style="text-align:center">
    <ul>
      <li>
        <Link
          class="contrast"
          style="text-decoration: none;"
          to="https://github.com/sewiti/munit-svelte"
        >
          GitHub
        </Link>
      </li>
    </ul>
    <ul style="color: var(--muted-color)">
      <li>
        <small>
          Made by
          <a class="secondary" href="https://github.com/sewiti">
            Mindaugas Bernotas
          </a>
        </small>
      </li>
      <li>
        <small>
          Code licensed
          <a
            class="secondary"
            href="https://github.com/sewiti/munit-svelte/blob/master/LICENSE"
          >
            MIT
          </a>
        </small>
      </li>
    </ul>
  </div>
</footer>

<style>
  .footer {
    margin-top: auto;
    padding: 1rem;
  }
  body > footer li {
    display: inline-block;
  }
  body > footer ul {
    margin-bottom: 0;
  }
  body > footer li:not(:first-child)::before {
    margin: 0 0.25rem;
    content: "·";
  }
</style>

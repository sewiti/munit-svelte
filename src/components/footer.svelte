<footer class="footer">
  <div class="container" style="text-align:center">
    <ul>
      <li>
        <a
          class="contrast"
          style="text-decoration: none;"
          href="https://github.com/sewiti/munit-svelte"
        >
          GitHub
        </a>
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

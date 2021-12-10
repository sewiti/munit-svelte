<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Nav from "$src/components/nav.svelte";
  import Index from "$src/routes/index.svelte";
  import Login from "$src/routes/login.svelte";
  import Register from "$src/routes/register.svelte";
</script>

<div>
  <Router>
    <header>
      <Nav />
    </header>
    <main class="container">
      <Route path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <!-- <Route path="blog/*">
      <Route path="/">
        <Blog />
      </Route>
      <Route path=":id" component={BlogPost} />
    </Route> -->
    </main>
  </Router>
</div>

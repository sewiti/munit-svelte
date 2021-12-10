<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Nav from "$src/components/nav.svelte";
  import Index from "$src/routes/index.svelte";
  import Login from "$src/routes/login.svelte";
  import Register from "$src/routes/register.svelte";
  import Logout from "$src/routes/logout.svelte";
  import Profile from "$src/routes/profile.svelte";
  import ProjectsList from "$src/routes/projects/projectsList.svelte";
  import Project from "$src/routes/projects/project.svelte";
  import Commit from "$src/routes/commits/commit.svelte";
  import FileIndex from "$src/routes/files/index.svelte";
</script>

<div>
  <Router>
    <header>
      <Nav />
    </header>
    <main class="container">
      <Route path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />

      <Route path="/projects/*">
        <Route path="/" component={ProjectsList} />

        <Route path="/:id/*" let:params={project}>
          <Route path="/">
            <Project id={project.id} />
          </Route>

          <Route path="/commits/:id/*" let:params={commit}>
            <Route path="/">
              <Commit pid={project.id} cid={commit.id} />
            </Route>

            <Route path="/files/:id" let:params={file}>
              <FileIndex pid={project.id} cid={commit.id} fid={file.id} />
            </Route>
          </Route>
        </Route>
      </Route>
    </main>
  </Router>
</div>

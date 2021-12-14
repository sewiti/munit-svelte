<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Nav from "$src/components/nav.svelte";
  import Index from "$src/routes/index.svelte";
  import Login from "$src/routes/login.svelte";
  import Register from "$src/routes/register.svelte";
  import Logout from "$src/routes/logout.svelte";
  import ProfileIndex from "$src/routes/profile/index.svelte";
  import ProjectsList from "$src/routes/projects/projectsList.svelte";
  import Project from "$src/routes/projects/project.svelte";
  import Commit from "$src/routes/commits/commit.svelte";
  import FileIndex from "$src/routes/files/index.svelte";
  import RouteTransition from "./components/routetransition.svelte";
</script>

<div>
  <Router>
    <header>
      <Nav />
    </header>

    <main class="container" style="position: relative;">
      <RouteTransition path="/">
        <Index />
      </RouteTransition>

      <RouteTransition path="/login">
        <Login />
      </RouteTransition>

      <RouteTransition path="/logout">
        <Logout />
      </RouteTransition>

      <Route path="/profile/*">
        <RouteTransition path="/">
          <ProfileIndex />
        </RouteTransition>
      </Route>

      <RouteTransition path="/register">
        <Register />
      </RouteTransition>

      <Route path="/projects/*">
        <RouteTransition path="/">
          <ProjectsList />
        </RouteTransition>

        <Route path="/:id/*" let:params={project}>
          <RouteTransition path="/">
            <Project id={project.id} />
          </RouteTransition>

          <Route path="/commits/:id/*" let:params={commit}>
            <RouteTransition path="/">
              <Commit pid={project.id} cid={commit.id} />
            </RouteTransition>

            <Route path="/files/:id/*" let:params={file}>
              <RouteTransition route="/">
                <FileIndex pid={project.id} cid={commit.id} fid={file.id} />
              </RouteTransition>
            </Route>
          </Route>
        </Route>
      </Route>
    </main>
  </Router>
</div>

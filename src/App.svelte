<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import RouteTransition from "$src/components/routetransition.svelte";

  import Nav from "$src/components/nav.svelte";
  import Footer from "$src/components/footer.svelte";

  import Index from "$src/routes/index.svelte";
  import Login from "$src/routes/login.svelte";
  import Logout from "$src/routes/logout.svelte";
  import Register from "$src/routes/register.svelte";

  import ProfileIndex from "$src/routes/profile/index.svelte";
  import ProfileEdit from "$src/routes/profile/edit.svelte";

  import Project from "$src/routes/projects/index.svelte";
  import ProjectsList from "$src/routes/projects/list.svelte";
  import ProjectCreate from "$src/routes/projects/create.svelte";
  import ProjectEdit from "$src/routes/projects/edit.svelte";

  import CommitIndex from "$src/routes/commits/index.svelte";
  import CommitCreate from "$src/routes/commits/create.svelte";
  import CommitEdit from "$src/routes/commits/edit.svelte";

  import FileIndex from "$src/routes/files/index.svelte";
  import FileCreate from "$src/routes/files/create.svelte";
  import FileEdit from "$src/routes/files/edit.svelte";
</script>

<Router>
  <Nav />

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

    <RouteTransition path="/edit">
      <ProfileEdit />
    </RouteTransition>
  </Route>

  <RouteTransition path="/register">
    <Register />
  </RouteTransition>

  <Route path="/projects/*">
    <RouteTransition path="/">
      <ProjectsList />
    </RouteTransition>

    <RouteTransition path="/create">
      <ProjectCreate />
    </RouteTransition>

    <Route path="/:id/*" let:params={project}>
      <RouteTransition path="/">
        <Project id={project.id} />
      </RouteTransition>

      <RouteTransition path="/edit">
        <ProjectEdit pid={project.id} />
      </RouteTransition>

      <RouteTransition path="/create">
        <CommitCreate pid={project.id} />
      </RouteTransition>

      <Route path="/commits/:id/*" let:params={commit}>
        <RouteTransition path="/">
          <CommitIndex pid={project.id} cid={commit.id} />
        </RouteTransition>

        <RouteTransition path="/edit">
          <CommitEdit pid={project.id} cid={commit.id} />
        </RouteTransition>

        <RouteTransition path="/create">
          <FileCreate pid={project.id} cid={commit.id} />
        </RouteTransition>

        <Route path="/files/:id/*" let:params={file}>
          <RouteTransition route="/">
            <FileIndex pid={project.id} cid={commit.id} fid={file.id} />
          </RouteTransition>

          <RouteTransition path="/edit">
            <FileEdit pid={project.id} cid={commit.id} fid={file.id} />
          </RouteTransition>
        </Route>
      </Route>
    </Route>
  </Route>

  <Footer />
</Router>

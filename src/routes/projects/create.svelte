<script lang="ts">
  import { appName } from "$src/constants";
  import { createProject } from "$src/services/project";
  import ProfileForm from "$src/routes/projects/form.svelte";
  import Main from "$src/components/main.svelte";
  import { navigate } from "svelte-navigator";

  let fields = {
    name: "",
    desc: "",
  };
  const handleSubmit = async (): Promise<void> => {
    const project = await createProject(fields.name, fields.desc);
    navigate(`/projects/${project.id}`, { replace: true });
  };
</script>

<svelte:head>
  New Project - {appName}
</svelte:head>

<Main>
  <article>
    <h1>New Project</h1>
    <ProfileForm
      buttonTitle="New Project"
      callback={handleSubmit}
      bind:fields
    />
  </article>
</Main>

<script lang="ts">
  import { appName } from "$src/constants";
  import { editProject, getProject } from "$src/services/project";
  import ProfileForm from "$src/routes/projects/form.svelte";
  import { navigate } from "svelte-navigator";
  import { onMount } from "svelte";

  let loading = true;
  export let pid = "";
  let fields = {
    name: "",
    desc: "",
  };
  const handleSubmit = async (): Promise<void> => {
    const project = await editProject(pid, fields.name, fields.desc);
    navigate(`/projects/${project.id}`);
  };

  onMount(async () => {
    const project = await getProject(pid);
    fields.name = project.name;
    fields.desc = project.description;
    loading = false;
  });
</script>

<svelte:head>
  Edit Project - {appName}
</svelte:head>

<article>
  <h1>Edit Project</h1>
  {#if loading}
    <div aria-busy={loading} />
  {:else}
    <ProfileForm
      buttonTitle="Edit Project"
      callback={handleSubmit}
      bind:fields
    />
  {/if}
</article>

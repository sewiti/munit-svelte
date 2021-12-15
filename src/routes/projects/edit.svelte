<script lang="ts">
  import { appName } from "$src/constants";
  import {
    deleteProject,
    editProject,
    getProject,
  } from "$src/services/project";
  import ProfileForm from "$src/routes/projects/form.svelte";
  import { navigate, useNavigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import Modal from "$src/components/modal.svelte";

  export let pid = "";

  let loading = true;
  let loadingModal = false;
  let showModal = false;

  let fields = {
    name: "",
    desc: "",
  };
  const handleSubmit = async (): Promise<void> => {
    const project = await editProject(pid, fields.name, fields.desc);
    navigate(`/projects/${project.id}`);
  };

  const hideModal = () => {
    showModal = false;
  };

  const toggleModal = () => {
    showModal = !showModal;
  };

  const handleDelete = async () => {
    try {
      loadingModal = true;
      await deleteProject(pid);
      navigate("/projects");
    } finally {
      loadingModal = false;
    }
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
  <h1 style="display: flex; justify-content: space-between;">
    <span>Edit Project</span>
    <div>
      <button
        class="outline destructive-outline"
        on:click|preventDefault={toggleModal}
      >
        Delete
      </button>
    </div>
  </h1>

  {#if loading}
    <div aria-busy={loading} />
  {:else}
    <ProfileForm buttonTitle="Save" callback={handleSubmit} bind:fields />
  {/if}

  <Modal bind:display={showModal}>
    <h4>Are you sure you want to delete?</h4>
    <div class="modalButtons">
      <button
        class="contrast outline"
        on:click|preventDefault={hideModal}
        disabled={loadingModal}
      >
        Cancel
      </button>
      <button
        class="destructive"
        aria-busy={loadingModal}
        disabled={loadingModal}
        on:click|preventDefault={handleDelete}
      >
        Delete
      </button>
    </div>
  </Modal>
</article>

<style>
  .destructive {
    background-color: indianred;
    border-color: indianred;
  }

  .destructive:hover {
    background-color: rgb(204, 115, 115);
    border-color: rgb(204, 115, 115);
  }

  .destructive-outline {
    color: indianred;
    border-color: indianred;
  }

  .destructive-outline:hover {
    color: rgb(204, 115, 115);
    border-color: rgb(204, 115, 115);
  }

  .modalButtons {
    display: flex;
  }

  .modalButtons > button {
    margin-left: 1em;
    margin-right: 1em;
  }
</style>

<script lang="ts">
  import { appName } from "$src/constants";
  import { deleteCommit, editCommit, getCommit } from "$src/services/commit";
  import { navigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import Main from "$src/components/main.svelte";
  import Modal from "$src/components/modal.svelte";
  import CommitForm from "$src/routes/commits/form.svelte";

  export let pid = "";
  export let cid = "";

  let loading = true;
  let loadingModal = false;
  let showModal = false;

  let fields = {
    title: "",
    message: "",
  };
  const handleSubmit = async (): Promise<void> => {
    const commit = await editCommit(pid, cid, fields.title, fields.message);
    navigate(`/projects/${pid}/commits/${commit.id}`);
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
      await deleteCommit(pid, cid);
      navigate(`/projects/${pid}`);
    } finally {
      loadingModal = false;
    }
  };

  onMount(async () => {
    const commit = await getCommit(pid, cid);
    fields.title = commit.title;
    fields.message = commit.message;
    loading = false;
  });
</script>

<svelte:head>
  Edit Commit - {appName}
</svelte:head>

<Main>
  <article>
    <h1 style="display: flex; justify-content: space-between;">
      <span>Edit Commit</span>
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
      <CommitForm buttonTitle="Save" callback={handleSubmit} bind:fields />
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
</Main>

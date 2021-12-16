<script lang="ts">
  import { appName } from "$src/constants";
  import { deleteFile, editFile, getFile } from "$src/services/file";
  import { navigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import Main from "$src/components/main.svelte";
  import Modal from "$src/components/modal.svelte";
  import FileForm from "$src/routes/files/form.svelte";

  export let pid = "";
  export let cid = "";
  export let fid = "";

  let loading = true;
  let loadingModal = false;
  let showModal = false;

  let fields = {
    path: "",
    data: "",
  };
  const handleSubmit = async (): Promise<void> => {
    const file = await editFile(pid, cid, fid, fields.path, fields.data);
    navigate(`/projects/${pid}/commits/${cid}/files/${file.id}`, {
      replace: true,
    });
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
      await deleteFile(pid, cid, fid);
      navigate(`/projects/${pid}/commits/${cid}`);
    } finally {
      loadingModal = false;
    }
  };

  onMount(async () => {
    const file = await getFile(pid, cid, fid);
    fields.path = file.path;
    fields.data = file.data;
    loading = false;
  });
</script>

<svelte:head>
  Edit File - {appName}
</svelte:head>

<Main>
  <article>
    <h1 style="display: flex; justify-content: space-between;">
      <span>Edit File</span>
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
      <FileForm buttonTitle="Save" callback={handleSubmit} bind:fields />
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

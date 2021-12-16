<script lang="ts">
  import { appName } from "$src/constants";
  import {
    deleteProfile,
    editProfile,
    getProfile,
  } from "$src/services/profile";
  import ProfileForm from "$src/routes/profile/form.svelte";
  import { navigate } from "svelte-navigator";
  import Main from "$src/components/main.svelte";
  import { onMount } from "svelte";
  import Modal from "$src/components/modal.svelte";
  import { logout } from "$src/stores/auth";

  let loading = true;
  let loadingModal = false;
  let showModal = false;

  let fields = {
    displayName: "",
    email: "",
  };
  const handleSubmit = async (): Promise<void> => {
    await editProfile(fields.displayName, fields.email);
    navigate("/profile");
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
      await deleteProfile();
      logout();
    } finally {
      loadingModal = false;
    }
  };

  onMount(async () => {
    const profile = await getProfile();
    fields.displayName = profile.displayName;
    fields.email = profile.email;
    loading = false;
  });
</script>

<svelte:head>
  Edit Profile - {appName}
</svelte:head>

<Main>
  <article>
    <h1 style="display: flex; justify-content: space-between;">
      <span>Edit Profile</span>
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
</Main>

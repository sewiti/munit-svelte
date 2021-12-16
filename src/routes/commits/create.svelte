<script lang="ts">
  import { appName } from "$src/constants";
  import { navigate } from "svelte-navigator";
  import { createCommit } from "$src/services/commit";
  import CommitForm from "$src/routes/commits/form.svelte";
  import Main from "$src/components/main.svelte";

  export let pid = "";
  let fields = {
    title: "",
    message: "",
  };
  const handleSubmit = async (): Promise<void> => {
    const commit = await createCommit(pid, fields.title, fields.message);
    navigate(`/projects/${pid}/commits/${commit.id}`, { replace: true });
  };
</script>

<svelte:head>
  New Commit - {appName}
</svelte:head>

<Main>
  <article>
    <h1>New Commit</h1>
    <CommitForm buttonTitle="Create" callback={handleSubmit} bind:fields />
  </article>
</Main>

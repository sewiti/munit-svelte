<script lang="ts">
  import { appName } from "$src/constants";
  import { navigate } from "svelte-navigator";
  import { createFile } from "$src/services/file";
  import FileForm from "$src/routes/files/form.svelte";
  import Main from "$src/components/main.svelte";

  export let pid = "";
  export let cid = "";
  let fields = {
    path: "",
    data: "",
  };
  const handleSubmit = async (): Promise<void> => {
    console.log({ fields });
    const file = await createFile(pid, cid, fields.path, fields.data);
    navigate(`/projects/${pid}/commits/${cid}/files/${file.id}`, {
      replace: true,
    });
  };
</script>

<svelte:head>
  New File - {appName}
</svelte:head>

<Main>
  <article>
    <h1>New File</h1>
    <FileForm buttonTitle="Create" callback={handleSubmit} bind:fields />
  </article>
</Main>

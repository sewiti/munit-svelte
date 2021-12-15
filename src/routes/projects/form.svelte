<script lang="ts">
  import * as yup from "yup";
  import FormErrs from "$src/components/formerrs.svelte";

  let loading = false;
  let touched = false;
  export let fields = {
    name: "",
    desc: "",
  };
  let errs = <
    {
      name: string[];
      desc: string[];
    }
  >{};

  const schema = yup.object().shape({
    name: yup
      .string()
      .max(72, (msg) => `Project name must be at most ${msg.max} characters`)
      .required("Project name is required"),
    desc: yup
      .string()
      .max(1024, (msg) => `Description must be at most ${msg.max} characters`),
  });

  export let buttonTitle = "";
  export let callback: (name: string, desc: string) => Promise<void>;

  const handleSubmit = async (): Promise<void> => {
    try {
      touched = true;
      loading = true;
      errs = <typeof errs>{};
      schema.validateSync(fields, { abortEarly: false });
      await callback(fields.name, fields.desc);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        errs = err.inner.reduce((errs, err) => {
          errs[err.path] = err.errors;
          return errs;
        }, <typeof errs>{});
        return;
      }

      touched = false;
      console.error(err);
    } finally {
      loading = false;
    }
  };
</script>

<form on:submit|preventDefault>
  <label for="name">Project name</label>
  <input
    type="text"
    name="name"
    placeholder="Project name"
    aria-label="Project name"
    aria-invalid={touched ? (errs.name || []).length > 0 : null}
    bind:value={fields.name}
    maxlength="72"
    required
  />
  <FormErrs errors={errs.name} />

  <label for="password">Description</label>
  <textarea
    style="resize: vertical;"
    name="desc"
    placeholder="Description"
    aria-label="Description"
    aria-invalid={touched ? (errs.desc || []).length > 0 : null}
    bind:value={fields.desc}
    maxlength="1024"
  />
  <FormErrs errors={errs.desc} />

  <button
    type="submit"
    aria-busy={loading}
    disabled={loading}
    on:click={handleSubmit}
  >
    {buttonTitle}
  </button>
</form>

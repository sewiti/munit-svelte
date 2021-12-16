<script lang="ts">
  import * as yup from "yup";
  import FormErrs from "$src/components/formerrs.svelte";

  let loading = false;
  let touched = false;
  export let fields = {
    path: "",
    data: "",
  };
  let errs = <
    {
      path: string[];
      data: string[];
    }
  >{};

  const schema = yup.object().shape({
    path: yup
      .string()
      .matches(new RegExp("/.*"), "Path must start with '/'")
      .max(256, (msg) => `Path must be at most ${msg.max} characters`)
      .required("Path is required"),
    data: yup
      .string()
      .max(1024, (msg) => `Data must be at most ${msg.max} characters`),
  });

  export let buttonTitle = "";
  export let callback: (name: string, desc: string) => Promise<void>;

  const handleSubmit = async (): Promise<void> => {
    try {
      touched = true;
      loading = true;
      errs = <typeof errs>{};
      schema.validateSync(fields, { abortEarly: false });
      await callback(fields.path, fields.data);
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
  <label for="path">Path</label>
  <input
    type="text"
    name="path"
    placeholder="Path"
    aria-label="Path"
    aria-invalid={touched ? (errs.path || []).length > 0 : null}
    bind:value={fields.path}
    maxlength="256"
    pattern="/.*"
    required
  />
  <FormErrs errors={errs.path} />

  <label for="data">Data</label>
  <textarea
    style="resize: vertical;"
    name="data"
    placeholder="Data"
    aria-label="Data"
    aria-invalid={touched ? (errs.data || []).length > 0 : null}
    bind:value={fields.data}
    maxlength="1024"
  />
  <FormErrs errors={errs.data} />

  <button
    type="submit"
    aria-busy={loading}
    disabled={loading}
    on:click={handleSubmit}
  >
    {buttonTitle}
  </button>
</form>

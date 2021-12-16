<script lang="ts">
  import * as yup from "yup";
  import FormErrs from "$src/components/formerrs.svelte";

  let loading = false;
  let touched = false;
  export let fields = {
    title: "",
    message: "",
  };
  let errs = <
    {
      title: string[];
      message: string[];
    }
  >{};

  const schema = yup.object().shape({
    title: yup
      .string()
      .max(72, (msg) => `Title must be at most ${msg.max} characters`)
      .required("Title is required"),
    message: yup
      .string()
      .max(1024, (msg) => `Message must be at most ${msg.max} characters`),
  });

  export let buttonTitle = "";
  export let callback: (name: string, desc: string) => Promise<void>;

  const handleSubmit = async (): Promise<void> => {
    try {
      touched = true;
      loading = true;
      errs = <typeof errs>{};
      schema.validateSync(fields, { abortEarly: false });
      await callback(fields.title, fields.message);
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
  <label for="title">Title</label>
  <input
    type="text"
    name="title"
    placeholder="Title"
    aria-label="Title"
    aria-invalid={touched ? (errs.title || []).length > 0 : null}
    bind:value={fields.title}
    maxlength="72"
    required
  />
  <FormErrs errors={errs.title} />

  <label for="message">Message</label>
  <input
    type="text"
    name="message"
    placeholder="Message"
    aria-label="Message"
    aria-invalid={touched ? (errs.message || []).length > 0 : null}
    bind:value={fields.message}
    maxlength="1024"
  />
  <FormErrs errors={errs.message} />

  <button
    type="submit"
    aria-busy={loading}
    disabled={loading}
    on:click={handleSubmit}
  >
    {buttonTitle}
  </button>
</form>

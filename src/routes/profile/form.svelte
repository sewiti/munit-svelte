<script lang="ts">
  import * as yup from "yup";
  import FormErrs from "$src/components/formerrs.svelte";

  let loading = false;
  let touched = false;
  export let fields = {
    displayName: "",
    email: "",
  };
  let errs = <
    {
      displayName: string[];
      email: string[];
    }
  >{};

  const schema = yup.object().shape({
    displayName: yup
      .string()
      .max(72, (msg) => `Display name must be at most ${msg.max} characters`),
    email: yup
      .string()
      .email("Must be a valid email address")
      .max(112, (msg) => `Email address must be at most ${msg.max} characters`)
      .required("Email address is required"),
  });

  export let buttonTitle = "";
  export let callback: (displayName: string, email: string) => Promise<void>;

  const handleSubmit = async (): Promise<void> => {
    try {
      touched = true;
      loading = true;
      errs = <typeof errs>{};
      schema.validateSync(fields, { abortEarly: false });
      await callback(fields.displayName, fields.email);
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
  <label for="displayName">Display name</label>
  <input
    type="text"
    name="displayName"
    placeholder="Display name"
    aria-label="Display name"
    aria-invalid={touched ? (errs.displayName || []).length > 0 : null}
    bind:value={fields.displayName}
    maxlength="112"
  />
  <FormErrs errors={errs.displayName} />

  <label for="email">Email address</label>
  <input
    type="email"
    name="email"
    placeholder="Email address"
    aria-label="Email address"
    aria-invalid={touched ? (errs.email || []).length > 0 : null}
    bind:value={fields.email}
    maxlength="72"
    required
  />
  <FormErrs errors={errs.email} />

  <button
    type="submit"
    aria-busy={loading}
    disabled={loading}
    on:click={handleSubmit}
  >
    {buttonTitle}
  </button>
</form>

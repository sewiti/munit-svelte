<script lang="ts">
  import * as yup from "yup";
  import FormErrs from "$src/components/formerrs.svelte";
  import { appName } from "$src/constants";
  import Main from "$src/components/main.svelte";
  import { register } from "$src/stores/auth";
  import { navigate } from "svelte-navigator";

  let loading = false;
  let touched = false;

  let fields = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  let errs = <
    {
      email: string[];
      password: string[];
      confirmPassword: string[];
    }
  >{};

  const schema = yup.object().shape({
    email: yup
      .string()
      .max(112, (msg) => `Email address must be at most ${msg.max} characters`)
      .email("Must be a valid email address")
      .required("Email address is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, (msg) => `Password must be at least ${msg.min} characters`)
      .max(72, (msg) => `Password must be at most ${msg.max} characters`),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  async function handleSubmit() {
    try {
      touched = true;
      loading = true;
      errs = <typeof errs>{};
      schema.validateSync(fields, { abortEarly: false });
      await register(fields.email, fields.password);
      navigate("/projects");
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
  }
</script>

<svelte:head>
  <title>Register - {appName}</title>
</svelte:head>

<Main>
  <article>
    <h1>Register</h1>

    <form on:submit|preventDefault>
      <label for="email">Email address</label>
      <input
        type="email"
        name="email"
        placeholder="Email address"
        aria-label="Email address"
        autocomplete="email"
        aria-invalid={touched ? (errs.email || []).length > 0 : null}
        bind:value={fields.email}
        maxlength="112"
        required
      />
      <FormErrs errors={errs.email} />

      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Password"
        autocomplete="current-password"
        aria-invalid={touched ? (errs.password || []).length > 0 : null}
        bind:value={fields.password}
        minlength="8"
        maxlength="72"
        required
      />
      <FormErrs errors={errs.password} />

      <label for="confirm-password">Confirm password</label>
      <input
        type="password"
        name="confirm-password"
        placeholder="Confirm password"
        aria-label="Confirm password"
        aria-invalid={touched ? (errs.confirmPassword || []).length > 0 : null}
        bind:value={fields.confirmPassword}
        minlength="8"
        maxlength="72"
        required
      />
      <FormErrs errors={errs.confirmPassword} />

      <button
        type="submit"
        aria-busy={loading}
        disabled={loading}
        on:click={handleSubmit}
      >
        Register
      </button>
    </form>
  </article>
</Main>

<script lang="ts">
  import * as yup from "yup";
  import { AuthError, login } from "$src/stores/auth";
  import FormErrs from "$src/components/formerrs.svelte";
  import Main from "$src/components/main.svelte";
  import { navigate } from "svelte-navigator";
  import { appName } from "$src/constants";

  let loading = false;
  let touched = false;
  let fields = {
    email: "",
    password: "",
  };
  let errs = <
    {
      email: string[];
      password: string[];
      login: string[];
    }
  >{};

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email address is required"),
    password: yup
      .string()
      .min(8, (msg) => `Password must be at least ${msg.min} characters`)
      .max(72, (msg) => `Password must be at most ${msg.max} characters`)
      .required("Password is required"),
  });

  const handleSubmit = async () => {
    try {
      touched = true;
      loading = true;
      errs = <typeof errs>{};
      schema.validateSync(fields, { abortEarly: false });
      await login(fields.email, fields.password);
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

      if (err instanceof AuthError) {
        errs = <typeof errs>{
          login: ["Incorrect email address or password."],
        };

        return;
      }
      console.error(err);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>Login - {appName}</title>
</svelte:head>

<Main>
  <article>
    <h1>Login</h1>
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

      <button
        type="submit"
        aria-busy={loading}
        disabled={loading}
        on:click={handleSubmit}
      >
        Login
      </button>
      <div style="color:indianred">
        {errs.login || ""}
      </div>
    </form>
  </article>
</Main>

<script lang="ts">
  import * as yup from "yup";
  import FormErrs from "$src/components/formerrs.svelte";

  type Fields = {
    email: string;
    password: string;
    confirmPassword: string;
  };
  type Errors = {
    email: string[];
    password: string[];
    confirmPassword: string[];
  };

  let loading = false;
  let touched = false;
  let fields = <Fields>{};
  let errors = <Errors>{};

  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, (msg) => `Password must be at least ${msg.min} characters`)
      .max(72, (msg) => `password must be at most ${msg.max} characters`),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  async function handleSubmit() {
    touched = true;
    try {
      schema.validateSync(fields, { abortEarly: false });
    } catch (reason) {
      errors = reason.inner.reduce(
        (errs, err) => {
          errs[err.path].push(err.message);
          return errs;
        },
        <Errors>{ email: [], password: [], confirmPassword: [] }
      );
      return;
    }
    loading = true;
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<article>
  <h1>Register</h1>

  <form>
    <label for="email">Email address</label>
    <input
      type="email"
      name="email"
      placeholder="Email address"
      aria-label="Email address"
      autocomplete="email"
      aria-invalid={!touched ? null : errors.email.length > 0}
      bind:value={fields.email}
      required
    />
    <FormErrs errors={errors.email} />

    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      placeholder="Password"
      aria-label="Password"
      autocomplete="current-password"
      aria-invalid={!touched ? null : errors.password.length > 0}
      bind:value={fields.password}
      required
    />
    <FormErrs errors={errors.password} />

    <label for="confirm-password">Confirm password</label>
    <input
      type="password"
      name="confirm-password"
      placeholder="Confirm password"
      aria-label="Confirm password"
      aria-invalid={!touched ? null : errors.confirmPassword.length > 0}
      bind:value={fields.confirmPassword}
      required
    />
    <FormErrs errors={errors.confirmPassword} />

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

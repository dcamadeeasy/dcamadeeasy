import { component$ } from "@builder.io/qwik";
import { Form, z } from "@builder.io/qwik-city";

import { useAuthSignin } from "~/routes/plugin@auth";

export default component$(() => {
  const signIn = useAuthSignin();

  return (
    <Form action={signIn}>
      <input type="hidden" name="providerId" value="email" />
      <input type="email" name="options.email" required />

      <button>Continue</button>
    </Form>
  );
});

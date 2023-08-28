import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";


import { useAuthSignin } from "~/routes/plugin@auth";
import { IS_DEV_MODE } from "~/utils/constants";

export default component$(() => {
  const signIn = useAuthSignin();

  return (
    <Form action={signIn}>
      <input type="hidden" name="providerId" value={IS_DEV_MODE ? "credentials" : "email"} />
      <input type="email" name="options.email" required />
      <button>Continue</button>
    </Form>
  );
});

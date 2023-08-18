import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { getRequiredSession } from "~/features/auth/server";

export const useUser = routeLoader$(async (event) => {
  return await getRequiredSession(event);
});

export default component$(() => {
  const session = useUser();

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(session.value.user, null, 2)}</pre>
    </div>
  );
});

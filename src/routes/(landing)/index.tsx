import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

import { getOptionalSession } from "~/features/auth/server";

export const useIsSignedIn = routeLoader$(async (event) => {
  const session = await getOptionalSession(event);
  return Boolean(session);
});

export default component$(() => {
  const isSignedIn = useIsSignedIn();

  return (
    <div>
      <h1>Landing Page</h1>
      {isSignedIn.value ? (
        <Link href="app">Go to dashboard</Link>
      ) : (
        <Link href="sign-in">Sign in</Link>
      )}
    </div>
  );
});

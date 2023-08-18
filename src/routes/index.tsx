import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { getDatabase } from "~/core/database";

export const useUsers = routeLoader$(async (event) => {
  const database = getDatabase(event);
  return await database.query.users.findMany();
});

export default component$(() => {
  const users = useUsers();

  return <pre>{JSON.stringify(users.value, null, 2)}</pre>;
});

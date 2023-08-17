import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { databaseBinding } from "~/core/platform/bindings";

export const usePlatform = routeLoader$(async ({ platform }) => {
  const database = databaseBinding(platform);
  const result = await database.prepare("select 'Hello world' as response").first();
  return String(result?.["response"]);
});

export default component$(() => {
  const platform = usePlatform();

  return <h1>{platform.value}</h1>;
});

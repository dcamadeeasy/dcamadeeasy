import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";

export const ApplicationRoot = component$(() => (
  <QwikCityProvider>
    <head>
      <meta charSet="utf-8" />
      <link rel="manifest" href="/manifest.json" />
      <ServiceWorkerRegister />
    </head>
    <body lang="en">
      <RouterOutlet />
    </body>
  </QwikCityProvider>
));

import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";

declare const self: ServiceWorkerGlobalScope;

setupServiceWorker();

addEventListener("install", () => void self.skipWaiting());
addEventListener("activate", () => void self.clients.claim());

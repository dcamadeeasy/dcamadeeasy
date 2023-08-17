import { cloudflarePagesAdapter } from "@builder.io/qwik-city/adapters/cloudflare-pages/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";

import config from "../../vite.config";

export default extendConfig(config, {
  build: {
    ssr: true,
    rollupOptions: {
      input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
    },
  },
  plugins: [cloudflarePagesAdapter()],
});

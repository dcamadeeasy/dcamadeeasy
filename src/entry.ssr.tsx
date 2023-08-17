import { renderToStream, type RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";

import { ApplicationRoot } from "~/root";

export default function render(opts: RenderToStreamOptions) {
  return renderToStream(<ApplicationRoot />, {
    manifest,
    ...opts,
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes,
    },
  });
}

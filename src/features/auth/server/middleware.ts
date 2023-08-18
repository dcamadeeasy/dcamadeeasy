import type { RequestEventCommon } from "@builder.io/qwik-city";

import { Session } from "./session";

const SHARED_SESSION_KEY = "session";

export function withRequiredSignin() {
  return {
    onRequest: async (event: RequestEventCommon) => {
      const session = await getOptionalSession(event);
      if (!session || session.expires < new Date()) {
        throw event.redirect(302, `/api/auth/signin?callbackUrl=${event.url.href}`);
      }
    },
  };
}

export function withRequiredSignout() {
  return {
    onRequest: async (event: RequestEventCommon) => {
      const session = await getOptionalSession(event);
      if (session && session.expires > new Date()) {
        throw event.redirect(302, "/app");
      }
    },
  };
}

export async function getRequiredSession(event: RequestEventCommon) {
  return await Session.parseAsync(getSharedSession(event));
}

export async function getOptionalSession(event: RequestEventCommon) {
  return await Session.nullish().parseAsync(getSharedSession(event));
}

function getSharedSession(event: RequestEventCommon) {
  return event.sharedMap.get(SHARED_SESSION_KEY);
}

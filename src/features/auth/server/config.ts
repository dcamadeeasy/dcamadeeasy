import type { QwikAuthConfig } from "@builder.io/qwik-auth";
import type { RequestEventCommon } from "@builder.io/qwik-city";
import { z } from "zod";

import { getDatabase } from "~/core/database";
import { getEnvironment } from "~/core/environment";

import { DrizzleAdapter } from "./adapters";
import { EmailProvider } from "./providers";

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
  }
}

declare module "@auth/core/types" {
  interface User {
    id: string;
  }

  interface Session {
    user: User;
  }
}

export function authConfig(event: RequestEventCommon): QwikAuthConfig {
  const database = getDatabase(event);
  const environment = getEnvironment(z.object({ secret: z.string() }), {
    secret: event.env.get("AUTH_SECRET"),
  });

  return {
    secret: environment.secret,
    adapter: DrizzleAdapter(database),
    providers: [EmailProvider()],
    trustHost: true,
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/sign-in",
    },
    callbacks: {
      jwt: ({ token, user = undefined }) => {
        if (user) token.id = user.id;
        return token;
      },
      session: ({ session, token }) => {
        session.user.id = token.id;
        return session;
      },
    },
  };
}

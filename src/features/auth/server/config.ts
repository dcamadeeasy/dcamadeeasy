import type { QwikAuthConfig } from "@builder.io/qwik-auth";
import type { RequestEventCommon } from "@builder.io/qwik-city";
import { z } from "zod";

import { getDatabase } from "~/core/database";
import { getEnvironment } from "~/core/environment";

import { DrizzleAdapter } from "./adapters";
import { ProdEmailProvider, DevEmailProvider } from "./providers";

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
  const environment = getEnvironment(z.object({ secret: z.string(), isDevMode: z.boolean() }), {
    secret: event.env.get("AUTH_SECRET"),
    isDevMode: event.env.get("DEV_MODE") === "true",
  });

  const provider = environment.isDevMode ? DevEmailProvider(database) : ProdEmailProvider();

  return {
    secret: environment.secret,
    adapter: DrizzleAdapter(database),
    providers: [provider],
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

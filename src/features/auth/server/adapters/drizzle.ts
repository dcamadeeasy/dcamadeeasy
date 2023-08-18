import type { Adapter } from "@auth/core/adapters";
import { and, eq } from "drizzle-orm";

import type { DatabaseClient } from "~/core/database";
import { users, verificationTokens } from "~/features/auth/server/schema";

export function DrizzleAdapter(database: DatabaseClient): Adapter {
  return {
    createUser: async ({ email, emailVerified: verifiedAt }) => {
      const user = await database.insert(users).values({ email, verifiedAt }).returning().get();

      return { id: String(user.id), email: user.email, emailVerified: user.verifiedAt };
    },
    updateUser: async ({ id, emailVerified: verifiedAt = null }) => {
      const user = await database
        .update(users)
        .set({ verifiedAt })
        .where(eq(users.id, Number(id)))
        .returning()
        .get();

      return { id: String(user.id), email: user.email, emailVerified: user.verifiedAt };
    },
    getUserByEmail: async (email) => {
      const user = await database.query.users.findFirst({
        columns: { id: true, email: true, verifiedAt: true },
        where: eq(users.email, email),
      });

      if (!user) return null;

      return { id: String(user.id), email: user.email, emailVerified: user.verifiedAt };
    },
    createVerificationToken: async ({ identifier, token, expires }) => {
      const verificationToken = await database
        .insert(verificationTokens)
        .values({ email: identifier, token, expiredAt: expires })
        .returning()
        .get();

      return {
        identifier: verificationToken.email,
        token: verificationToken.token,
        expires: verificationToken.expiredAt,
      };
    },
    useVerificationToken: async ({ identifier, token }) => {
      const verificationToken = await database
        .delete(verificationTokens)
        .where(and(eq(verificationTokens.email, identifier), eq(verificationTokens.token, token)))
        .returning()
        .get();

      if (!verificationToken) return null;

      return {
        identifier: verificationToken.email,
        token: verificationToken.token,
        expires: verificationToken.expiredAt,
      };
    },
  };
}

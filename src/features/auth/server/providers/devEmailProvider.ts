import type { Provider } from "@auth/core/providers";
import type { DatabaseClient } from "~/core/database";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export function DevEmailProvider(database: DatabaseClient): Provider {
  return {
    id: "email",
    name: "Credentials",
    type: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
    },
    async authorize(credentials, request) {
      const email = credentials["email"] as string;
      const user = await database.select().from(users).where(eq(users.email, email)).get();

      if (user) {
        return { id: String(user.id), email: user.email };
      }
      return null;
    },
  };
}

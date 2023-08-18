import { z } from "zod";

export type User = z.infer<typeof User>;
export type Session = z.infer<typeof Session>;

export const User = z.object({
  id: z.coerce.number(),
  email: z.string(),
});

export const Session = z.object({
  user: User,
  expires: z.coerce.date(),
});

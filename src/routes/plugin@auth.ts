import { serverAuth$ } from "@builder.io/qwik-auth";

import { authConfig } from "~/features/auth/server/config";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } = serverAuth$(authConfig);

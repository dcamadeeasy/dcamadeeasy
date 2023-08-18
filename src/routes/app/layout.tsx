import { withRequiredSignin } from "~/features/auth/server/middleware";

export const { onRequest } = withRequiredSignin();

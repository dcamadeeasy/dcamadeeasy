import { withRequiredSignout } from "~/features/auth/server/middleware";

export const { onRequest } = withRequiredSignout();

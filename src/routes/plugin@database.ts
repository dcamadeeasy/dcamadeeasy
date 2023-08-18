import { withDatabase } from "~/core/database/middleware";

export const { onRequest } = withDatabase();

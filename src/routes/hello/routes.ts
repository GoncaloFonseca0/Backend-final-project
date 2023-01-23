import type { ServerRoute } from "@hapi/hapi";
import { hello } from "./service";

/**
 * @handle `GET /`
 */
const getDefault = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/",
  handler: (_req) => hello(),
});

const getNewRoutes = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/with-content-type",
  handler: async (_req, h) => {
    const value = await Promise.resolve(hello());
    return h.response(value).header("content-type", "text/plain");
  },
});

/**
 * Routes of the plugin `hello`
 */
export default [getDefault, getNewRoutes];

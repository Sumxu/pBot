export const isDev =
  import.meta.env?.MODE === "development" ||
  process.env.NODE_ENV === "development";

export const isProd =
  import.meta.env?.MODE === "production" ||
  process.env.NODE_ENV === "production";
import dotenv from "dotenv";
dotenv.config();

/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
export default {
  port: process.env.API_PORT,
  hostname: "localhost",
  mode: "server",
  serverEntry: "./src/index.ts",
};

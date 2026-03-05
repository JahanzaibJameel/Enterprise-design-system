import type { Config } from 'drizzle-kit';

const config: Config = {
  out: "./migrations",
  schema: "./shared/schema.ts",
};

export default config;

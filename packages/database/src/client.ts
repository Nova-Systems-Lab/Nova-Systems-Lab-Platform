import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured. Set it before importing @nova/database.",
  );
}

function createDatabaseClient(): PrismaClient {
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
}

// Reuse a single client across module reloads in development so that Next.js
// or ts-node/tsx hot reloading does not exhaust the connection pool by
// instantiating a new PrismaClient on every recompilation.
type DatabaseGlobal = typeof globalThis & {
  __novaDatabaseClient__?: PrismaClient;
};

const globalForDatabase = globalThis as DatabaseGlobal;

export const database: PrismaClient =
  globalForDatabase.__novaDatabaseClient__ ?? createDatabaseClient();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.__novaDatabaseClient__ = database;
}

export type DatabaseClient = PrismaClient;

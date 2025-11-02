import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL!,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
} as const;

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

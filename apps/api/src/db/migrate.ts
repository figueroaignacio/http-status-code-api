import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

dotenv.config();

const runMigrations = async () => {
  console.log("⏳ Running migrations...");

  const connection = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(connection);

  await migrate(db, { migrationsFolder: "drizzle" });

  await connection.end();

  console.log("✅ Migrations completed");
  process.exit(0);
};

runMigrations().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});

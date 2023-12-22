import { migrate } from "drizzle-orm/node-postgres/migrator";
import { database } from "./connection";

async function applyMigration() {
  try {
    console.log(`💼 Migration: Database: ${process.env.DATABASE_NAME}`);
    console.log("⏳ Migration: Attempting Migration...");
    await migrate(database, { migrationsFolder: "src/database/migrations" });
    console.log(`✅ Migration: Completed`);
    process.exit(0);
  } catch (error) {
    console.log("❌ Migration: Failed");
    console.error(error);
    process.exit(1);
  }
}

applyMigration();

import { Pool } from "pg";
import { config } from "dotenv";

config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const initDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Failed to connect to PostgreSQL", error);
    process.exit(1);
  }
};

const init = () => {
  let envPath = ".env";

  if (process.env.NODE_ENV !== "production") {
    config({ path: envPath });
  }
};

export default init;

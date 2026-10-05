import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = mysql.createPool(DATABASE_URL);

export const db = drizzle(client, { schema, mode: 'default' });

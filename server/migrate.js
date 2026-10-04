import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { pool } from './db.js';

const directory = join(dirname(fileURLToPath(import.meta.url)), 'migrations');
const client = await pool.connect();

try {
  await client.query('SELECT pg_advisory_lock($1)', [7_294_035]);
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  const applied = new Set((await client.query('SELECT name FROM schema_migrations')).rows.map((row) => row.name));
  const migrations = (await readdir(directory)).filter((name) => name.endsWith('.sql')).sort();
  for (const name of migrations) {
    if (applied.has(name)) continue;
    const sql = await readFile(join(directory, name), 'utf8');
    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [name]);
      await client.query('COMMIT');
      console.info(`Applied migration ${name}`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  }
} finally {
  await client.query('SELECT pg_advisory_unlock($1)', [7_294_035]);
  client.release();
  await pool.end();
}

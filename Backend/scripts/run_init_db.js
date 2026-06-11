const { readFileSync } = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL in Backend/.env. Please set it to your Postgres connection string.');
  process.exit(1);
}

const sqlPath = path.resolve(__dirname, '../src/scripts/init_db.sql');
let sql = '';
try {
  sql = readFileSync(sqlPath, 'utf8');
} catch (err) {
  console.error('Failed to read init SQL file at', sqlPath, err);
  process.exit(1);
}

async function run() {
  const client = new Client({ connectionString: DATABASE_URL });
  try {
    await client.connect();
    console.log('Connected to DB. Running init SQL...');
    await client.query(sql);
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error running init SQL:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

run();

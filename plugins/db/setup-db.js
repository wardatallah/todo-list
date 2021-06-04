import conn from './index.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
var sql = fs.readFileSync(path.resolve('plugins/db/db.sql')).toString();
dotenv.config();

const pool = conn.getPool();


async function run() {
	try {
		await pool.query(sql);
		console.log('DB was initiated successfully!!')
	} catch(err) {
		throw err;
		process.exit(1);
	}
	await pool.end();
	process.exit(0);
}

run();
import pgPkg from 'pg';
import mongoPkg from 'mongodb';
const { MongoClient } = mongoPkg;
const { Pool, Client } = pgPkg;
const isPostgres = process.env.ENGINE === 'pg';
const host = isPostgres ? process.env.PGHOST : process.env.MGHOST;
const user = isPostgres ? process.env.PGUSER : process.env.MGUSER;
const password = isPostgres ? process.env.PGPASSWORD : process.env.MGPASSWORD;
const database = isPostgres ? process.env.PGDATABASE : process.env.MGDATABASE;
const port = isPostgres ? process.env.PGPORT : process.env.MGPORT;

const connection = {
	getPool: () => {
		const pool =  new Pool({
			host,
			user,
			password,
			database,
			port,
		});
		return pool;
	},

	query: (qry, vars, cb) => {
		const pool = connection.getPool();
		pool.query(qry, vars, (err, result) => {
			pool.end();
			cb(err, result);
		});
	},
	getMongo: async () => {
		const uri = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;
		const client = new MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		try {
			await client.connect();

			const collection = client.db(database).collection('todo_list');
			return collection;
		} catch (err) {
			console.error(err);
		} finally {
			client.close();
		}
	}
};

export default connection;

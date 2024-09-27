import { Database } from 'bun:sqlite';

const db = new Database('database.db');

const sql = (query: TemplateStringsArray, ...args: any[]) => {
	let queryString = '';
	let queryArr = Array.from(query);

	while (queryArr.length > 0 || args.length > 0) {
		queryString += (queryArr.shift() || '') + (args.shift() || '');
	}

	return db.query(queryString);
};

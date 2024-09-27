import { JSONResponse } from './JSONResponse';

const PORT = process.env.PORT;
const ok = true;

Bun.serve({
	port: PORT,
	fetch(req) {
		const url = new URL(req.url);

		const headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Access-Control-Allow-Credentials': 'true',
		};

		if (req.method === 'OPTIONS') {
			return new Response(null, { status: 200, headers });
		}

		if (req.method === 'GET') {
			if (url.pathname === '/status') {
				return new JSONResponse({ ok }, { headers });
			}
		}

		return new Response('Not Found', { status: 404, headers });
	},
});

console.log(`API active on port ${PORT}`);

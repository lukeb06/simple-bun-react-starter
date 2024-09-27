import { Hono } from 'hono';

const PORT = process.env.PORT;
const ok = true;

const app = new Hono();

app.use('*', async (c, next) => {
	c.res.headers.set('Access-Control-Allow-Origin', '*');
	c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	c.res.headers.set('Access-Control-Allow-Credentials', 'true');

	if (c.req.method === 'OPTIONS') {
		return c.text('', 200);
	}

	await next();
});

app.get('/status', c => {
	return c.json({ ok });
});

export default app;

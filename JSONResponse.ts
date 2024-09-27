export class JSONResponse extends Response {
	constructor(body: any, init?: ResponseInit) {
		super(JSON.stringify(body), {
			status: 200,
			...init,
			headers: {
				...init?.headers,
				'Content-Type': 'application/json',
			},
		});
	}
}

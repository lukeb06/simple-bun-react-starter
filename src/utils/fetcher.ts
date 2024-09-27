let API_PORT;
let API_URL = sessionStorage.getItem(btoa('API_URL'));
if (API_URL) API_URL = atob(API_URL);
let endpoint = null;

if (API_URL) endpoint = path => `${API_URL}${path}`;

const getPORT = async () => {
	const response = await fetch('/config.json');
	const { api_port } = await response.json();
	return api_port;
};

const generateAPIURL = async () => {
	API_PORT = await getPORT();
	API_URL = `${window.location.protocol}//${window.location.hostname}:${API_PORT}/`;

	sessionStorage.setItem(btoa('API_URL'), btoa(API_URL));
	return;
};

const generateEndpoint = async () => {
	if (!API_URL) await generateAPIURL();
	endpoint = path => `${API_URL}${path}`;
	return;
};

class Fetcher {
	static defaultOptions = {};
	static defaultHeaders = {};

	static async request(
		path,
		method = 'GET',
		options = {} as {
			headers?: Record<string, string>;
		},
		responseMode: 'JSON' | 'TEXT' | 'RES' = 'JSON',
	): Promise<string | Record<string, unknown> | Response> {
		if (endpoint == null) await generateEndpoint();
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(endpoint(path), {
					method,
					...Fetcher.defaultOptions,
					...options,
					headers: {
						...Fetcher.defaultHeaders,
						...options.headers,
					},
				});
				if (!response.ok) throw new Error(response.statusText);

				if (responseMode === 'RES') return resolve(response);

				const data =
					responseMode === 'TEXT' ? await response.text() : await response.json();
				resolve(data);
			} catch (e) {
				if (typeof e === 'string') return reject(new Error(e));
				if (e instanceof Error) return reject(e);
				reject(new Error('Unknown error'));
			}
		});
	}

	static get(path, options = {}, responseMode: 'JSON' | 'TEXT' | 'RES' = 'JSON') {
		return Fetcher.request(path, 'GET', options, responseMode);
	}

	static post(path, options = {}, responseMode: 'JSON' | 'TEXT' | 'RES' = 'JSON') {
		return Fetcher.request(path, 'POST', options, responseMode);
	}

	static put(path, options = {}, responseMode: 'JSON' | 'TEXT' | 'RES' = 'JSON') {
		return Fetcher.request(path, 'PUT', options, responseMode);
	}

	static delete(path, options = {}, responseMode: 'JSON' | 'TEXT' | 'RES' = 'JSON') {
		return Fetcher.request(path, 'DELETE', options, responseMode);
	}
}

export default Fetcher;

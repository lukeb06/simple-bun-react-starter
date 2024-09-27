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
	static ResponseMode = {
		JSON: 'json',
		TEXT: 'text',
		RES: 'res',
	};

	static defaultOptions = {};
	static defaultHeaders = {};

	static async request(
		path,
		method = 'GET',
		options = {},
		responseMode = Fetcher.ResponseMode.JSON,
	) {
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

				if (responseMode === Fetcher.ResponseMode.RES)
					return resolve(response);

				const data =
					responseMode === Fetcher.ResponseMode.TEXT
						? await response.text()
						: await response.json();
				resolve(data);
			} catch (e) {
				reject(e);
			}
		});
	}

	static get(path, options = {}, responseMode = Fetcher.ResponseMode.JSON) {
		return Fetcher.request(path, 'GET', options, responseMode);
	}

	static post(path, options = {}, responseMode = Fetcher.ResponseMode.JSON) {
		return Fetcher.request(path, 'POST', options, responseMode);
	}

	static put(path, options = {}, responseMode = Fetcher.ResponseMode.JSON) {
		return Fetcher.request(path, 'PUT', options, responseMode);
	}

	static delete(
		path,
		options = {},
		responseMode = Fetcher.ResponseMode.JSON,
	) {
		return Fetcher.request(path, 'DELETE', options, responseMode);
	}
}

export default Fetcher;

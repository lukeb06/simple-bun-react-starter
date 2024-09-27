import { useState, useEffect } from 'react';

import Fetcher from '@/utils/fetcher.js';

const responseModeMap = {
	JSON: Fetcher.ResponseMode.JSON,
	TEXT: Fetcher.ResponseMode.TEXT,
	RES: Fetcher.ResponseMode.RES,
};

function useAPI(url, responseMode = 'JSON') {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refresh, setRefresh] = useState(Math.random());

	const doRefresh = () => setRefresh(Math.random());

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const _data = await Fetcher.get(url, {}, responseModeMap[responseMode]);
				if (_data.error) {
					throw new Error(_data.error);
				}
				setData(_data);
				setIsLoading(false);
			} catch (error) {
				setError(error?.message || error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, refresh]);

	return { data, isLoading, error, doRefresh };
}

export default useAPI;

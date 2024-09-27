import { useState, useEffect } from 'react';

import Fetcher from '@/utils/fetcher';

function useAPI(url, responseMode: 'JSON' | 'TEXT' | 'RES' = 'JSON') {
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
				const _data = await Fetcher.get(url, {}, responseMode);
				if (_data instanceof Object && !(_data instanceof Response) && _data.error) {
					if (_data.error instanceof Error) throw _data.error;
					if (typeof _data.error === 'string') throw new Error(_data.error);
					throw new Error('Unknown error');
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

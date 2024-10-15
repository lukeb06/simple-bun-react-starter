import { useState, useEffect } from 'react';

import Fetcher from '@/utils/fetcher';

function useAPI(url: string, responseMode: 'JSON' | 'TEXT' | 'RES' = 'JSON') {
	const [data, setData] = useState<string | Record<string, unknown> | Response | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
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
				if (error instanceof Error) {
					setError(error.message);
				} else if (typeof error === 'string') {
					setError(error);
				} else {
					setError('Unknown error');
				}

				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, refresh]);

	return { data, isLoading, error, doRefresh };
}

export default useAPI;

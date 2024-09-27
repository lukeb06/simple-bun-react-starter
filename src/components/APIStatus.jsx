import useAPI from '@/hooks/use-api.js';
import LoadSpinner from '@/components/LoadSpinner.jsx';

const APIStatus = () => {
	const { data: status, error, isLoading } = useAPI('status');

	return (
		<>
			{status && !error && !isLoading ? 'API Active' : <></>}
			{isLoading && !error ? <LoadSpinner /> : <></>}
			{!isLoading && error ? 'Something went wrong...' : <></>}
		</>
	);
};

export default APIStatus;

import useAPI from '@/hooks/use-api';
import LoadSpinner from '@/components/LoadSpinner';

const APIStatus = () => {
	const { data: status, error, isLoading } = useAPI('status', 'TEXT');

	return (
		<>
			{status && !error && !isLoading ? 'API Active' : <></>}
			{isLoading && !error ? <LoadSpinner /> : <></>}
			{!isLoading && error ? 'Something went wrong...' : <></>}
		</>
	);
};

export default APIStatus;

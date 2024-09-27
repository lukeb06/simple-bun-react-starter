import React from 'react';

import APIStatus from '@/components/APIStatus.jsx';

const Home = () => {
	return (
		<>
			<h1 className="font-bold text-4xl text-center">
				<APIStatus />
			</h1>
		</>
	);
};

export default Home;

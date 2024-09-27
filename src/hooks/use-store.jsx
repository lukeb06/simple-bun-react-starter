import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [state, setState] = useState({});

	const modify = newState => {
		setState({ ...state, ...newState });
	};

	return (
		<StoreContext.Provider value={[state, modify]}>
			{children}
		</StoreContext.Provider>
	);
};

export const useStore = () => {
	return useContext(StoreContext);
};

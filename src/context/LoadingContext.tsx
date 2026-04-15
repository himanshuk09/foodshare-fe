/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const LoadingContext = createContext<any>(undefined);

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: any) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};

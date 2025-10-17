import React, { createContext, useContext, useEffect, useState } from "react";

// 🧩 Define context shape
export interface AuthContextType {
	user: any | null;
	login: (email: string, password: string) => boolean;
	logout: () => void;
	register: (data: any) => void;
}

// 🧩 Create the context with default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🧩 Provider component
export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
	const [user, setUser] = useState<any | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (email: string, password: string): boolean => {
		const stored = localStorage.getItem("user");
		if (!stored) return false;

		const parsed: any = JSON.parse(stored);
		if (parsed.email === email && parsed.password === password) {
			setUser(parsed);
			return true;
		}
		return false;
	};

	const logout = (): void => {
		localStorage.removeItem("user");
		setUser(null);
	};

	const register = (data: any): void => {
		localStorage.setItem("user", JSON.stringify(data));
		setUser(data);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};

// 🧩 Custom hook for consuming auth
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

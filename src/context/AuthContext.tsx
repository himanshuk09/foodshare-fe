import React, { createContext, useContext, useEffect, useState } from "react";

// 🧩 Define user type
export interface User {
	name?: string;
	email: string;
	password: string;
	role?: "Donor" | "NGO" | "Volunteer";
	latitude?: number;
	longitude?: number;
	avatar?: string;
}

// 🧩 Define context shape
export interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => boolean;
	logout: () => void;
	register: (data: User) => void;
}

// 🧩 Create the context with default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🧩 Provider component
export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (email: string, password: string): boolean => {
		const stored = localStorage.getItem("user");
		if (!stored) return false;

		const parsed: User = JSON.parse(stored);
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

	const register = (data: User): void => {
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

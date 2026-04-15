/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";

type Props = {
	children: React.ReactNode;
};

export default function PublicRoute({ children }: Props) {
	const user = localStorage.getItem("user");

	if (user) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [form, setForm] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	const handleLogin = () => {
		const user: any = JSON.parse(localStorage.getItem("user") ?? "");
		if (user?.email === form.email && user?.password === form.password)
			navigate("/");
		else alert("Invalid credentials");
	};

	return (
		<div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl">
			<h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
			<img
				src="https://cdn.pixabay.com/photo/2015/06/24/15/45/food-820010_1280.jpg"
				alt="login"
				className="rounded-lg mb-4"
			/>
			<input
				name="email"
				placeholder="Email"
				onChange={(e) => setForm({ ...form, email: e.target.value })}
				className="input"
			/>
			<input
				name="password"
				type="password"
				placeholder="Password"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
				className="input"
			/>
			<button
				onClick={handleLogin}
				className="btn bg-green-600 text-white w-full mt-2"
			>
				Login
			</button>
		</div>
	);
}

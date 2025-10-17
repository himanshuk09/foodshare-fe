import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirm: "",
		role: "Donor",
	});
	const [otp, setOtp] = useState("");
	const navigate = useNavigate();

	const handleChange = (e: any) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleRegister = () => {
		if (form.password !== form.confirm)
			return alert("Passwords do not match");
		alert("OTP sent to your email (mock)");
		localStorage.setItem("pendingUser", JSON.stringify(form));
	};

	const handleVerify = () => {
		const pending = JSON.parse(localStorage.getItem("pendingUser") ?? "");
		localStorage.setItem("user", JSON.stringify(pending));
		localStorage.removeItem("pendingUser");
		alert("Registration successful");
		navigate("/login");
	};

	return (
		<div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				Register
			</h2>
			<img
				src="https://cdn.pixabay.com/photo/2016/03/09/09/17/volunteer-1249898_1280.jpg"
				alt="register"
				className="rounded-lg mb-4"
			/>
			<input
				name="name"
				placeholder="Name"
				onChange={handleChange}
				className="input"
			/>
			<input
				name="email"
				placeholder="Email"
				onChange={handleChange}
				className="input"
			/>
			<input
				name="password"
				type="password"
				placeholder="Password"
				onChange={handleChange}
				className="input"
			/>
			<input
				name="confirm"
				type="password"
				placeholder="Confirm Password"
				onChange={handleChange}
				className="input"
			/>
			<select name="role" onChange={handleChange} className="input">
				<option>Donor</option>
				<option>NGO</option>
				<option>Volunteer</option>
			</select>

			<div className="flex gap-2 mt-2">
				<button
					onClick={handleRegister}
					className="btn bg-green-500 text-white"
				>
					Send OTP
				</button>
				<input
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
					placeholder="Enter OTP"
					className="input w-1/2"
				/>
				<button
					onClick={handleVerify}
					className="btn bg-blue-500 text-white"
				>
					Verify
				</button>
			</div>
		</div>
	);
}

import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";

export default function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		otp: "",
		password: "",
		confirmPassword: "",
		role: "donor",
	});
	const [otpSent, setOtpSent] = useState(false);
	const [errors, setErrors] = useState<any>({});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Real-time password matching validation
		if (name === "confirmPassword" || name === "password") {
			if (name === "confirmPassword" && value !== formData.password) {
				setErrors((prev: any) => ({
					...prev,
					confirmPassword: "Passwords do not match",
				}));
			} else if (
				name === "password" &&
				formData.confirmPassword &&
				value !== formData.confirmPassword
			) {
				setErrors((prev: any) => ({
					...prev,
					confirmPassword: "Passwords do not match",
				}));
			} else {
				setErrors((prev: any) => ({ ...prev, confirmPassword: "" }));
			}
		}
	};

	const sendOTP = () => {
		// Mock OTP sending
		alert(`OTP sent to ${formData.email}: 123456`);
		setOtpSent(true);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setErrors({ confirmPassword: "Passwords do not match" });
			return;
		}

		// Mock user creation
		const newUser: any = {
			id: Date.now(),
			...formData,
			latitude: 0,
			longitude: 0,
		};
		// mockData.users.push(newUser);
		alert("Registration successful! Please login.");
		// navigate("login");
	};

	return (
		<div className="flex gap-8 items-center">
			<div className="flex-1">
				<img
					src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600"
					alt="Food donation"
					className="rounded-2xl shadow-2xl"
				/>
				<div className="mt-6 grid grid-cols-2 gap-4">
					<img
						src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300"
						alt="Volunteers"
						className="rounded-lg shadow-lg"
					/>
					<img
						src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300"
						alt="Community"
						className="rounded-lg shadow-lg"
					/>
				</div>
			</div>

			<div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
				<h2 className="text-3xl font-bold text-gray-800 mb-6">
					Join FoodShare
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Full Name
						</label>
						<div className="relative">
							<User
								className="absolute left-3 top-3 text-gray-400"
								size={20}
							/>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
								required
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email
						</label>
						<div className="relative flex gap-2">
							<div className="relative flex-1">
								<Mail
									className="absolute left-3 top-3 text-gray-400"
									size={20}
								/>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
									required
								/>
							</div>
							<button
								type="button"
								onClick={sendOTP}
								className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
							>
								Send OTP
							</button>
						</div>
					</div>

					{otpSent && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Enter OTP
							</label>
							<input
								type="text"
								name="otp"
								value={formData.otp}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
								placeholder="123456"
								required
							/>
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<div className="relative">
							<Lock
								className="absolute left-3 top-3 text-gray-400"
								size={20}
							/>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
								required
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Confirm Password
						</label>
						<div className="relative">
							<Lock
								className="absolute left-3 top-3 text-gray-400"
								size={20}
							/>
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
									errors.confirmPassword
										? "border-red-500"
										: "border-gray-300"
								}`}
								required
							/>
						</div>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.confirmPassword}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Register as
						</label>
						<select
							name="role"
							value={formData.role}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
						>
							<option value="donor">Donor</option>
							<option value="ngo">NGO</option>
							<option value="volunteer">Volunteer</option>
						</select>
					</div>

					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
					>
						Register
					</button>
				</form>

				<p className="text-center mt-4 text-gray-600">
					Already have an account?{" "}
					<button
						// onClick={() => navigate("login")}
						className="text-green-600 hover:underline"
					>
						Login here
					</button>
				</p>
			</div>
		</div>
	);
}

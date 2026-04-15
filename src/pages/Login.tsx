/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext"; //  import loader context
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function Login() {
	const { setUser } = useAuth();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { setLoading } = useLoading(); //  loader hook

	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			setLoading(true); //  show loader
			const response = await login(credentials);

			if (response.status) {
				setUser(response);
				navigate("/feed");
			} else {
				toast(t("Invalid credentials, please try again."), {
					type: "error",
				});
			}
		} catch (error) {
			console.error("Unable to login", error);
			toast(
				t(
					"Login failed. Please check your credentials or try again later.",
				),
				{ type: "error" },
			);
		} finally {
			setLoading(false); //  hide loader (always runs)
		}
	};

	return (
		<div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto py-12 px-4">
			{/* Left Image */}
			<div className="flex-1">
				<img
					src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600"
					alt="Community help"
					className="rounded-2xl shadow-2xl w-full object-cover"
				/>
				<div className="mt-6 grid grid-cols-2 gap-4">
					<img
						src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300"
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

			{/* Right Form */}
			<div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
				<h2 className="text-3xl font-bold text-gray-800 mb-6">
					{t("Welcome Back")}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Email")}
						</label>
						<div className="relative">
							<Mail
								className="absolute left-3 top-3 text-gray-400"
								size={20}
							/>
							<input
								type="email"
								value={credentials.email}
								onChange={(e) =>
									setCredentials({
										...credentials,
										email: e.target.value,
									})
								}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
								required
							/>
						</div>
					</div>

					{/* Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Password")}
						</label>

						<div className="relative">
							{/* Left Icon */}
							<Lock
								className="absolute left-3 top-3 text-gray-400"
								size={20}
							/>

							{/* Input */}
							<input
								type={showPassword ? "text" : "password"}
								value={credentials?.password}
								onChange={(e) =>
									setCredentials({
										...credentials,
										password: e.target.value,
									})
								}
								className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
								required
							/>

							{/* Toggle Button */}
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
							>
								{showPassword ? (
									<EyeOff size={20} />
								) : (
									<Eye size={20} />
								)}
							</button>
						</div>
					</div>
					{/* Submit */}
					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
					>
						{t("Login")}
					</button>
				</form>

				{/* Register Link */}
				<p className="text-center mt-4 text-gray-600">
					{t("Don't have an account?")}{" "}
					<button
						onClick={() => navigate("/register")}
						className="text-green-600 hover:underline"
					>
						{t("Register here")}
					</button>
				</p>
			</div>
		</div>
	);
}

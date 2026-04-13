/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { registerUser, sendOtp, verifyOtp } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { useTranslation } from "react-i18next";

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
	const [otpVerified, setOtpVerified] = useState(false);
	const [errors, setErrors] = useState<any>({});
	const navigate = useNavigate();
	const { setLoading } = useLoading(); //  Loader context
	const [showPassword, setShowPassword] = useState(false);
	const { t } = useTranslation();

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

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

	//  Send OTP API call
	const sendEmailOTP = async () => {
		try {
			if (
				!formData.email ||
				!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
			)
				return alert("Please enter a valid email");

			setLoading(true); // Start loader
			const res = await sendOtp(formData.email);
			console.log("OTP Sent Successfully", res);

			setOtpSent(true);
			alert(`OTP Sent Successfully to ${formData.email}`);
		} catch (error) {
			console.error("Unable to send OTP", error);
			alert("Failed to send OTP. Please try again.");
		} finally {
			setLoading(false); // Stop loader
		}
	};

	//  Verify OTP API call
	const verifyEmailOTP = async () => {
		try {
			setLoading(true);
			const response = await verifyOtp(formData.email, formData.otp);
			console.log("Verified OTP", response);
			setOtpVerified(true);
			alert("OTP Verified!");
		} catch (error) {
			console.error("Unable to verify OTP", error);
			alert("Invalid OTP");
		} finally {
			setLoading(false);
		}
	};

	//  Register API call
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (!otpVerified) {
				alert("Please verify your email first!");
				return;
			}

			setLoading(true);
			const response = await registerUser(formData);

			if (response.status) {
				alert("Registration successful! Please login.");
				console.log("Registration successful!", response);
				navigate("/login");
			} else {
				alert("Registration failed. Try again!");
			}
		} catch (error) {
			console.error(error);
			alert("Something went wrong. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto py-12 px-4">
			{/* Left Images */}
			<div className="flex-1">
				<img
					src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600"
					alt="Food donation"
					className="rounded-2xl shadow-2xl mb-6 w-full object-cover"
				/>
				<div className="grid grid-cols-2 gap-4">
					<img
						src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300"
						alt="Volunteers"
						className="rounded-lg shadow-lg w-full object-cover"
					/>
					<img
						src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300"
						alt="Community"
						className="rounded-lg shadow-lg w-full object-cover"
					/>
				</div>
			</div>

			{/* Right Form */}
			<div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
				<h2 className="text-3xl font-bold text-gray-800 mb-6">
					{t("Join ShareABite")}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Full Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Full Name")}
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
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
								required
							/>
						</div>
					</div>

					{/* Email + Send OTP Button */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Email")}
						</label>
						<div className="relative flex items-center">
							<Mail
								className="absolute left-3 top-3 text-gray-400"
								size={20}
							/>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className={`w-full pl-10 pr-24 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 ${
									otpVerified
										? "border-green-500 bg-green-50"
										: "border-gray-300"
								}`}
								required
								disabled={otpVerified}
							/>
							{!otpVerified && (
								<button
									type="button"
									onClick={sendEmailOTP}
									className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md"
								>
									{t("Send OTP")}
								</button>
							)}
							{otpVerified && (
								<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-green-600 font-semibold">
									<CheckCircle size={18} className="mr-1" />
									{t("Verified")}
								</div>
							)}
						</div>
					</div>

					{/* OTP Input + Verify OTP Button */}
					{otpSent && !otpVerified && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								{t("Enter OTP")}
							</label>
							<div className="flex gap-2">
								<input
									type="text"
									name="otp"
									value={formData.otp}
									onChange={handleChange}
									className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
									placeholder="123456"
									required
								/>
								<button
									type="button"
									onClick={verifyEmailOTP}
									className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg"
								>
									{t("Verify OTP")}
								</button>
							</div>
						</div>
					)}

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
								name="password"
								type={showPassword ? "text" : "password"}
								value={formData.password}
								onChange={handleChange}
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
					{/* Confirm Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Confirm Password")}
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
								className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 ${
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

					{/* Role */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Register as")}
						</label>
						<select
							name="role"
							value={formData.role}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
						>
							<option value="donor">{t("Donor")}</option>
							<option value="ngo">{t("NGO")}</option>
							<option value="volunteer">{t("Volunteer")}</option>
						</select>
					</div>

					{/* Register Button */}
					<button
						type="submit"
						className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold"
						disabled={!otpVerified}
					>
						{t("Register")}
					</button>
				</form>

				<p className="text-center mt-4 text-gray-600">
					{t("Already have an account?")}{" "}
					<button
						onClick={() => navigate("/login")}
						className="text-amber-600 hover:underline"
					>
						{t("Login here")}
					</button>
				</p>
			</div>
		</div>
	);
}

import { Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function Login() {
	const [credentials, setCredentials] = useState({ email: "", password: "" });

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// Mock login
		// const user = mockData.users.find(
		// 	(u: any) => u.email === credentials.email
		// );
		// if (user) {
		// 	// setCurrentUser(user);
		// 	// navigate("home");
		// } else {
		// 	alert("Invalid credentials");
		// }
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
					Welcome Back
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email
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
							Password
						</label>
						<div className="relative">
							<Lock
								className="absolute left-3 top-3 text-gray-400"
								size={20}
							/>
							<input
								type="password"
								value={credentials.password}
								onChange={(e) =>
									setCredentials({
										...credentials,
										password: e.target.value,
									})
								}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
								required
							/>
						</div>
					</div>

					{/* Submit */}
					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
					>
						Login
					</button>
				</form>

				{/* Register Link */}
				<p className="text-center mt-4 text-gray-600">
					Don't have an account?{" "}
					<button
						// onClick={() => navigate("register")}
						className="text-green-600 hover:underline"
					>
						Register here
					</button>
				</p>
			</div>
		</div>
	);
	// return (
	// 	<div className="flex gap-8 items-center">
	// 		<div className="flex-1">
	// 			<img
	// 				src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600"
	// 				alt="Community help"
	// 				className="rounded-2xl shadow-2xl"
	// 			/>
	// 		</div>

	// 		<div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
	// 			<h2 className="text-3xl font-bold text-gray-800 mb-6">
	// 				Welcome Back
	// 			</h2>
	// 			<form onSubmit={handleSubmit} className="space-y-4">
	// 				<div>
	// 					<label className="block text-sm font-medium text-gray-700 mb-2">
	// 						Email
	// 					</label>
	// 					<div className="relative">
	// 						<Mail
	// 							className="absolute left-3 top-3 text-gray-400"
	// 							size={20}
	// 						/>
	// 						<input
	// 							type="email"
	// 							value={credentials.email}
	// 							onChange={(e) =>
	// 								setCredentials({
	// 									...credentials,
	// 									email: e.target.value,
	// 								})
	// 							}
	// 							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
	// 							required
	// 						/>
	// 					</div>
	// 				</div>

	// 				<div>
	// 					<label className="block text-sm font-medium text-gray-700 mb-2">
	// 						Password
	// 					</label>
	// 					<div className="relative">
	// 						<Lock
	// 							className="absolute left-3 top-3 text-gray-400"
	// 							size={20}
	// 						/>
	// 						<input
	// 							type="password"
	// 							value={credentials.password}
	// 							onChange={(e) =>
	// 								setCredentials({
	// 									...credentials,
	// 									password: e.target.value,
	// 								})
	// 							}
	// 							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
	// 							required
	// 						/>
	// 					</div>
	// 				</div>

	// 				<button
	// 					type="submit"
	// 					className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
	// 				>
	// 					Login
	// 				</button>
	// 			</form>

	// 			<p className="text-center mt-4 text-gray-600">
	// 				Don't have an account?{" "}
	// 				<button
	// 					// onClick={() => navigate("register")}
	// 					className="text-green-600 hover:underline"
	// 				>
	// 					Register here
	// 				</button>
	// 			</p>
	// 		</div>
	// 	</div>
	// );
}

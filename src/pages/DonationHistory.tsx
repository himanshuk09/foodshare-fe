/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Clock, Truck, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getAllPostBYDonorId } from "../services/post.service";

export default function DonationHistory() {
	const { user } = useAuth();
	const { t } = useTranslation();

	const [posts, setPosts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = async () => {
		try {
			setLoading(true);
			const res = await getAllPostBYDonorId(user?.user?._id);
			const data = res.posts || res;

			setPosts(data);
		} catch (err) {
			console.error("Error fetching posts", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [user]);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-6 text-white">
				<h1 className="text-3xl font-bold">
					{t("My Donation History")}
				</h1>
				<p className="text-sm opacity-90">
					{t("Track all your donations and their status")}
				</p>
			</div>

			{/* Loader */}
			{loading ? (
				<div className="flex justify-center py-20">
					<div className="h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
				</div>
			) : posts.length === 0 ? (
				<div className="text-center py-16 text-gray-500">
					{t("No donations found")}
				</div>
			) : (
				/* Cards */
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((post: any) => {
						const ngo = post?.assignedNGOId;

						return (
							<div
								key={post._id}
								className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
							>
								{/* Top */}
								<div className="flex justify-between items-start mb-3">
									<div>
										<h3 className="text-lg font-bold text-gray-800">
											{post.foodType}
										</h3>
										<p className="text-gray-500 text-sm line-clamp-2">
											{post.description}
										</p>
									</div>

									{/* Status Badge */}
									<span
										className={`px-2 py-1 rounded-full text-xs font-semibold ${
											post.status === "pending"
												? "bg-yellow-100 text-yellow-800"
												: post.status === "assigned"
													? "bg-blue-100 text-blue-800"
													: post.status === "picked"
														? "bg-purple-100 text-purple-800"
														: "bg-green-100 text-green-800"
										}`}
									>
										{post.status}
									</span>
								</div>

								{/* Info */}
								<div className="space-y-2 text-sm text-gray-600 mb-4">
									<p>
										<b>{t("Quantity")}:</b> {post.quantity}
									</p>
									<p>
										<b>{t("Location")}:</b> {post.location}
									</p>
									<p>
										<b>{t("NGO")}:</b>{" "}
										{ngo?.organizationName ||
											ngo?.name ||
											"N/A"}
									</p>
								</div>

								{/* Status Button */}
								<div className="mt-auto">
									{post.status === "pending" && (
										<div className="w-full bg-yellow-100 text-yellow-800 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold">
											<Clock size={18} />
											{t("Pending")}
										</div>
									)}

									{post.status === "assigned" && (
										<div className="w-full bg-blue-100 text-blue-800 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold">
											<Truck size={18} />
											{t("Assigned")}
										</div>
									)}

									{post.status === "picked" && (
										<div className="w-full bg-purple-100 text-purple-800 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold">
											<Truck size={18} />
											{t("Picked Up")}
										</div>
									)}

									{post.status === "delivered" && (
										<div className="w-full bg-green-100 text-green-800 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold">
											<CheckCircle size={18} />
											{t("Completed")}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

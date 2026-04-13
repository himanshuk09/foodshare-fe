/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Package, Users, Locate } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getAllPost } from "../services/post.service";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function PostFeed() {
	const [posts, setPosts] = useState<any>([]);
	const navigate = useNavigate();
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const [selectedPost, setSelectedPost] = useState<any>(null);
	const fetchPost = async () => {
		try {
			setLoading(true);
			const res = await getAllPost();
			setPosts(res.posts || res);
		} catch (error) {
			console.error("Unable to get posts", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPost();
	}, []);
	const [, setTick] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTick((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);
	const getRemainingTime = (expireTime: string) => {
		if (!expireTime) return "";

		const expiry = new Date(expireTime).getTime();

		if (isNaN(expiry)) return "Invalid date";

		const now = Date.now();
		const diff = expiry - now;

		if (diff <= 0) return "Expired";

		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		return `🕗 ${hours}h ${minutes}m ${seconds}s`;
	};

	const getGlowClass = (expireTime: string) => {
		if (!expireTime) return "";
		const diff = new Date(expireTime).getTime() - Date.now();

		if (diff <= 0)
			return "bg-red-600 text-white shadow-[0_0_12px_rgba(255,0,0,0.9)]";

		if (diff < 2 * 60 * 60 * 1000)
			return "bg-yellow-400 text-black shadow-[0_0_12px_rgba(255,200,0,0.9)]";

		return "bg-black/70 text-white shadow-[0_0_10px_rgba(255,255,255,0.6)]";
	};

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold text-gray-800">
				Food Donation Feed
			</h2>

			{loading ? (
				<div className="flex justify-center items-center py-20">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
				</div>
			) : posts.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-2xl shadow-lg">
					<Package className="mx-auto text-gray-400 mb-4" size={64} />
					<p className="text-gray-600 text-lg">
						No donations posted yet
					</p>
					{user?.user?.role === "donor" && (
						<button
							onClick={() => navigate("/add-post")}
							className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
						>
							Post Your First Donation
						</button>
					)}
				</div>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...posts].reverse().map((post: any) => {
						const donor = post?.donorId;
						const ngo = post?.assignedNGOId;
						const volunteer = post?.assignedVolId;

						return (
							<div
								key={post?._id}
								className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 "
							>
								<div className="relative">
									{post?.image && (
										<img
											src={post?.image}
											alt="Donation"
											className="w-full h-72 object-cover"
										/>
									)}

									{/* ⏳ Timer Overlay */}
									{!(
										post?.status === "delivered" &&
										getRemainingTime(post?.expireTime) ===
											"Expired"
									) && (
										<div
											className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-md ${getGlowClass(post?.expireTime)}`}
										>
											{getRemainingTime(post?.expireTime)}
										</div>
									)}
								</div>
								<div className="p-4 space-y-2 relative">
									<div className="flex justify-end">
										<button
											onClick={() =>
												setSelectedPost(post)
											}
											className="absolute top-2 right-2 p-2 m-2 bg-blue-100 hover:bg-blue-200 rounded-full transition cursor-pointer"
										>
											<Locate
												size={18}
												className="text-blue-600"
											/>
										</button>
									</div>
									<h3 className="text-xl font-bold text-gray-800">
										{post?.foodType}
									</h3>
									<p className="text-gray-600">
										{post?.description}
									</p>

									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Package size={16} />
										<span>Quantity: {post?.quantity}</span>
									</div>

									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Users size={16} />
										<span>Meals: {post?.meals}</span>
									</div>

									<div className="flex items-center gap-2 text-sm text-gray-600">
										<MapPin size={16} />
										<span>{post?.location}</span>
									</div>

									<div className="pt-2 border-t">
										<p className="text-sm text-gray-600">
											Donor:{" "}
											<span className="font-semibold">
												{donor?.name}
											</span>
										</p>
										{ngo && (
											<p className="text-sm text-gray-600">
												NGO:{" "}
												<span className="font-semibold">
													{ngo.organizationName ||
														ngo.name}
												</span>
											</p>
										)}
										{volunteer && (
											<p className="text-sm text-gray-600">
												Volunteer:{" "}
												<span className="font-semibold">
													{volunteer.name}
												</span>
											</p>
										)}
									</div>

									<div className="pt-2">
										<span
											className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
												post.status === "pending"
													? "bg-yellow-100 text-yellow-800"
													: post.status === "assigned"
														? "bg-blue-100 text-blue-800"
														: post.status ===
															  "picked"
															? "bg-purple-100 text-purple-800"
															: "bg-green-100 text-green-800"
											}`}
										>
											{post.status
												.charAt(0)
												.toUpperCase() +
												post.status.slice(1)}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{selectedPost && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl w-full max-w-3xl p-4 relative">
						{/* Close Button */}
						<button
							onClick={() => setSelectedPost(null)}
							className="absolute top-2 right-2 text-gray-600 hover:text-black"
						>
							✕
						</button>

						<h2 className="text-xl font-bold mb-2">
							Donation Location
						</h2>

						<div className="h-[600px] w-full rounded-lg overflow-hidden">
							<MapContainer
								center={[
									selectedPost?.latitude || 20.5937,
									selectedPost?.longitude || 78.9629,
								]}
								zoom={13}
								scrollWheelZoom={true}
								className="h-full w-full"
							>
								<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

								{selectedPost?.latitude &&
									selectedPost?.longitude && (
										<Marker
											position={[
												selectedPost?.latitude,
												selectedPost?.longitude,
											]}
										>
											<Popup>
												<div>
													<h3 className="font-bold">
														{selectedPost?.foodType}
													</h3>
													<p>
														{selectedPost?.location}
													</p>
													<a
														href={`https://www.google.com/maps/search/?api=1&query=${selectedPost?.latitude},${selectedPost?.longitude}`}
														target="_blank"
														rel="noreferrer"
														className="text-blue-600 underline text-sm"
													>
														Open in Google Maps
													</a>
												</div>
											</Popup>
										</Marker>
									)}
							</MapContainer>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

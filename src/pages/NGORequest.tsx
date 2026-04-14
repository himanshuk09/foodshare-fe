/* eslint-disable @typescript-eslint/no-explicit-any */

import { MapPin, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllUser } from "../services/user.service";
import { assignVolenteers, getAllPostBYNGOId } from "../services/post.service";
import { useLoading } from "../context/LoadingContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function NGORequests() {
	const [selectedPost, setSelectedPost] = useState<any>(null);
	const [selectedVolunteer, setSelectedVolunteer] = useState("");
	const [volunteers, setVolunteers] = useState<any[]>([]);
	const [posts, setPosts] = useState<any[]>([]);
	const [loader, setLoader] = useState(true);
	const { user } = useAuth();
	const { setLoading } = useLoading();
	const { t } = useTranslation();
	// Assign volunteer to a post
	const assignVolunteer = async () => {
		if (!selectedPost || !selectedVolunteer) {
			toast(t("Please select both post and volunteer"), { type: "info" });
			return;
		}

		try {
			setLoading(true);
			const res = await assignVolenteers(
				selectedPost._id,
				selectedVolunteer,
			);
			if (res.status) {
				toast(
					t(
						"Volunteer assigned successfully! Email notification sent.",
					),
					{
						type: "success",
					},
				);
				await fetchPosts();
				setSelectedPost(null);
				setSelectedVolunteer("");
			}
		} catch (err) {
			console.error("Unable to assign volunteer:", err);
			toast(t("Something went wrong!"), { type: "error" });
		} finally {
			setLoading(false);
		}
	};

	// Fetch volunteers
	const fetchVolunteers = async () => {
		try {
			setLoading(true);
			const data = await getAllUser("volunteer");
			setVolunteers(data || []);
		} catch (error) {
			console.error("Unable to fetch volunteers:", error);
		} finally {
			setLoading(false);
		}
	};

	// Fetch posts assigned to this NGO
	const fetchPosts = async () => {
		try {
			setLoading(true);
			setLoader(true);
			const data = await getAllPostBYNGOId(user?.user?._id);
			setPosts(data?.posts || []);
		} catch (error) {
			console.error("Unable to fetch posts:", error);
		} finally {
			setLoading(false);
			setLoader(false);
		}
	};

	useEffect(() => {
		fetchVolunteers();
		fetchPosts();
	}, [user]);

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold text-gray-800">
				{t("NGO Dashboard")}
			</h2>

			{loader ? (
				<div className="flex justify-center items-center py-20">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
				</div>
			) : posts.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-2xl shadow-lg">
					<Package className="mx-auto text-gray-400 mb-4" size={64} />
					<p className="text-gray-600 text-lg">
						{t("No donations assigned yet")}
					</p>
				</div>
			) : (
				<div className="grid md:grid-cols-4 gap-6">
					{posts.map((post: any) => (
						<div
							key={post?._id}
							className="bg-white rounded-xl shadow-lg p-6 space-y-4"
						>
							{post.image && (
								<img
									src={post?.image}
									alt="Food"
									className="w-full h-48 object-cover rounded-lg"
								/>
							)}

							<h3 className="text-xl font-bold text-gray-800">
								{post?.foodType}
							</h3>
							<p className="text-gray-600">{post?.description}</p>

							<div className="space-y-2">
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Package size={16} />
									<span>
										{t("Quantity")}: {post?.quantity} |{" "}
										{t("Meals")}: {post?.meals}
									</span>
								</div>

								<div className="flex items-center gap-2 text-sm text-gray-600">
									<MapPin size={16} />
									<span>{post?.location}</span>
								</div>

								<p className="text-sm text-gray-600">
									{t("Donor")}:{" "}
									<span className="font-semibold">
										{post?.donorId?.name}
									</span>
								</p>
								<p className="text-sm text-gray-600">
									{t("Email")}:{" "}
									<span className="font-semibold">
										{post?.donorId?.email}
									</span>
								</p>
							</div>

							{post?.assignedVolId ? (
								<div className="bg-blue-50 p-4 rounded-lg">
									<p className="text-sm font-semibold text-blue-800">
										{t("Assigned to")}:{" "}
										{post?.assignedVolId?.name}
									</p>
									<p className="text-sm text-blue-600">
										{post?.assignedVolId?.email}
									</p>
									<p className="text-sm text-blue-600">
										{t("Status")}: {post?.status}
									</p>
								</div>
							) : (
								<button
									onClick={() => setSelectedPost(post)}
									className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
								>
									{t("Assign Volunteer")}
								</button>
							)}
						</div>
					))}
				</div>
			)}

			{selectedPost && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-40">
					<div className="bg-white rounded-2xl p-6 max-w-sm w-full">
						<h3 className="text-xl font-bold text-gray-800 mb-3">
							Assign Volunteer
						</h3>
						<p className="text-gray-600 mb-3">
							Donation: {selectedPost?.foodType}
						</p>

						<div className="space-y-3">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Select Volunteer
							</label>
							<select
								value={selectedVolunteer}
								onChange={(e) =>
									setSelectedVolunteer(e.target.value)
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
							>
								<option value="">Choose a volunteer</option>
								{volunteers.map((vol) => (
									<option key={vol?._id} value={vol?._id}>
										{vol?.name} -{" "}
										{vol?.location || "Location not set"}
									</option>
								))}
							</select>

							<div className="flex gap-2 mt-3">
								<button
									onClick={assignVolunteer}
									className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm"
								>
									Assign
								</button>
								<button
									onClick={() => setSelectedPost(null)}
									className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 text-sm"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

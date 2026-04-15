/* eslint-disable @typescript-eslint/no-explicit-any */

import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../services/post.service";
import { useLoading } from "../context/LoadingContext";
import { getAllUserByRole, uploadImage } from "../services/user.service";

export default function DonateForm() {
	const [postData, setPostData] = useState<any>({
		foodType: "",
		quantity: "",
		meals: "",
		description: "",
		location: "",
		latitude: "",
		longitude: "",
		image: null,
		expireTime: "",
	});

	const { user } = useAuth();
	const { t } = useTranslation();
	const { setLoading } = useLoading();

	const [ngos, setNGOs] = useState<any>([]);
	const [previewImage, setPreviewImage] = useState<string>("");
	const [locationFetched, setLocationFetched] = useState(false);

	const fetchLocation = async () => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;

				setPostData((prev: any) => ({
					...prev,
					latitude,
					longitude,
				}));

				try {
					const response = await fetch(
						`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
						{
							headers: {
								"User-Agent": "shareabite",
							},
						},
					);

					const data = await response.json();
					const address = data.address || {};

					const city =
						address.city || address.town || address.village || "";
					const state = address.state || "";
					const country = address.country || "";

					setPostData((prev: any) => ({
						...prev,
						location: `${city}, ${state}, ${country}`,
					}));

					setLocationFetched(true);
				} catch (err) {
					console.error("Error fetching location info:", err);
					setLocationFetched(false);
				}
			},
			(error) => {
				console.warn("Geolocation error:", error);
				toast(t(error.message), { type: "info" });
				setLocationFetched(false);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0,
			},
		);
	};

	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);

			if (!postData.image && !previewImage) {
				toast(t("Please upload an image."), { type: "info" });
				return;
			}

			if (
				!postData.latitude ||
				!postData.longitude ||
				!postData.location
			) {
				toast(t("Please provide a location."), { type: "info" });
				return;
			}

			let imageUrl = postData.image || "";

			if (!imageUrl && previewImage) {
				const res = await uploadImage(previewImage);
				imageUrl = res.data?.secure_url || res.secure_url;
			}

			const newPost = {
				...postData,
				image: imageUrl,
				donorId: user.user?._id,
				status: "pending",
				createdAt: new Date().toISOString(),
				expireTime: new Date(postData.expireTime).toISOString(),
			};

			await createPost({ ...newPost });

			setPostData({
				foodType: "",
				quantity: "",
				meals: "",
				description: "",
				location: "",
				latitude: "",
				longitude: "",
				image: null,
			});
			setPreviewImage("");
			toast(t("Donation posted successfully!"), { type: "success" });
		} catch (error) {
			console.error("Unable to submit post:", error);
			toast(t("Something went wrong while posting donation."), {
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const fetchNGOs = async () => {
		try {
			setLoading(true);
			const response = await getAllUserByRole("ngo");
			setNGOs(response);
		} catch {
			console.error("unable to get NGOs");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNGOs();
		fetchLocation();
	}, []);

	if (user?.user?.role !== "donor") {
		return (
			<div className="text-center py-12">
				Only donors can create posts
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
			<h2 className="text-3xl font-bold text-gray-800 mb-6">
				{t("Donate Food")}
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Food Image */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						{t("Upload Food Image")}
					</label>
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
						{previewImage ? (
							<img
								src={previewImage}
								alt="Preview"
								className="max-h-64 mx-auto rounded-lg"
							/>
						) : (
							<div className="space-y-2">
								<Upload
									className="mx-auto text-gray-400"
									size={48}
								/>
								<p className="text-gray-600">
									{t("Click to upload food image")}
								</p>
							</div>
						)}
						<input
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="hidden"
							id="food-image"
							required
						/>
						<label
							htmlFor="food-image"
							className="inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-amber-700"
						>
							{t("Choose Image")}
						</label>
					</div>
				</div>

				{/* Food Details */}
				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Donation Type")}
						</label>
						<input
							type="text"
							value={postData?.foodType}
							onChange={(e) =>
								setPostData({
									...postData,
									foodType: e.target.value,
								})
							}
							placeholder={t(
								"e.g., Food, Clothes, Books, Medicines",
							)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Quantity")}
						</label>
						<input
							type="text"
							value={postData?.quantity}
							onChange={(e) =>
								setPostData({
									...postData,
									quantity: e.target.value,
								})
							}
							placeholder={t("e.g., 10 kg, 5 boxes")}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Expiry Time")}
						</label>
						<input
							type="datetime-local"
							value={postData?.expireTime}
							onChange={(e) =>
								setPostData({
									...postData,
									expireTime: e.target.value,
								})
							}
							min={new Date().toISOString().slice(0, 16)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Estimated Beneficiaries")}
						</label>
						<input
							type="number"
							value={postData?.meals}
							onChange={(e) =>
								setPostData({
									...postData,
									meals: e.target.value,
								})
							}
							placeholder={t("e.g., 50 people")}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Assign to NGO")}
						</label>
						<select
							value={postData?.assignedNGOId}
							onChange={(e) =>
								setPostData({
									...postData,
									assignedNGOId: e.target.value,
								})
							}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						>
							<option value="">{t("Select NGO")}</option>
							{ngos.map((ngo: any) => (
								<option key={ngo?._id} value={ngo?._id}>
									{ngo?.organizationName}
								</option>
							))}
						</select>
					</div>

					{/* Location */}
					<div>
						<label
							className="block text-sm font-medium text-gray-700 mb-2"
							onClick={fetchLocation}
						>
							{t("Pickup Location")}{" "}
							{locationFetched ? (
								<span className="text-green-600 ml-2">
									({t("Auto-detected, you can edit")})
								</span>
							) : (
								<span className="text-red-600 ml-2">
									{t("Enter manually")}
								</span>
							)}
						</label>
						<input
							type="text"
							value={postData?.location}
							onChange={(e) =>
								setPostData({
									...postData,
									location: e.target.value,
								})
							}
							placeholder={t("e.g., 123 Main St, City, Country")}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Latitude")}
						</label>
						<input
							type="number"
							step="any"
							value={postData?.latitude}
							onChange={(e) =>
								setPostData({
									...postData,
									latitude: e.target.value,
								})
							}
							placeholder="21.1458"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Longitude")}
						</label>
						<input
							type="number"
							step="any"
							value={postData?.longitude}
							onChange={(e) =>
								setPostData({
									...postData,
									longitude: e.target.value,
								})
							}
							placeholder="79.0882"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						/>
					</div>

					<div className="md:col-span-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t("Description")}
						</label>
						<textarea
							value={postData?.description}
							onChange={(e) =>
								setPostData({
									...postData,
									description: e.target.value,
								})
							}
							placeholder={t(
								"Additional details about the food...",
							)}
							rows={4}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 font-semibold"
				>
					{t("Post Donation")}
				</button>
			</form>
		</div>
	);
}

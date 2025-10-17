import { useEffect, useState } from "react";

export default function Profile() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user") ?? "")
	);
	const [form, setForm] = useState(user);
	const [image, setImage] = useState(user?.avatar || "");

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setForm((f: any) => ({
					...f,
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude,
				}));
			});
		}
	}, []);

	const handleChange = (e: any) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (event: any) => setImage(event.target.result);
		reader.readAsDataURL(file);
	};

	const handleSave = () => {
		const updated = { ...form, avatar: image };
		localStorage.setItem("user", JSON.stringify(updated));
		alert("Profile updated successfully!");
	};

	return (
		<div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
			<h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
			<div className="flex flex-col items-center mb-4">
				{image ? (
					<img
						src={image}
						alt="profile"
						className="w-24 h-24 rounded-full mb-2 object-cover"
					/>
				) : (
					<div className="w-24 h-24 bg-gray-200 rounded-full mb-2" />
				)}
				<input type="file" onChange={handleImageUpload} />
			</div>

			<input
				name="name"
				placeholder="Name"
				value={form.name}
				onChange={handleChange}
				className="input"
			/>
			<input
				name="email"
				placeholder="Email"
				value={form.email}
				onChange={handleChange}
				className="input"
			/>
			<input
				name="phone"
				placeholder="Phone"
				value={form.phone || ""}
				onChange={handleChange}
				className="input"
			/>
			<input
				name="address"
				placeholder="Address"
				value={form.address || ""}
				onChange={handleChange}
				className="input"
			/>

			<p className="text-sm text-gray-600 mt-2">
				Location: {form.latitude?.toFixed(2)},{" "}
				{form.longitude?.toFixed(2)}
			</p>

			<button
				onClick={handleSave}
				className="btn bg-green-600 text-white w-full mt-4"
			>
				Save Profile
			</button>
		</div>
	);
}

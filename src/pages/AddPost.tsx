import { useState } from "react";

export default function AddPost() {
	const user: any = JSON.parse(localStorage.getItem("user") ?? "");
	const [image, setImage] = useState("");
	const [form, setForm] = useState({
		title: "",
		description: "",
		ngo: "",
		quantity: "",
	});

	const ngos = [
		{ name: "Helping Hands NGO", id: 1 },
		{ name: "Food Relief Org", id: 2 },
		{ name: "ShareMeal Foundation", id: 3 },
	];

	const handleImage = (e: any) => {
		const reader = new FileReader();
		reader.onload = (event: any) => setImage(event.target.result);
		reader.readAsDataURL(e.target.files[0]);
	};

	const handleChange = (e: any) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = () => {
		const post = {
			...form,
			image,
			donor: user.name,
			donorEmail: user.email,
			status: "Pending",
		};
		const posts = JSON.parse(localStorage.getItem("posts") || "[]");
		posts.push(post);
		localStorage.setItem("posts", JSON.stringify(posts));
		alert("Donation post added successfully!");
	};

	return (
		<div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				Add Food Post
			</h2>
			<input
				name="title"
				placeholder="Title"
				onChange={handleChange}
				className="input"
			/>
			<textarea
				name="description"
				placeholder="Description"
				onChange={handleChange}
				className="input"
			/>
			<input
				name="quantity"
				placeholder="Quantity (e.g., 10 meals)"
				onChange={handleChange}
				className="input"
			/>
			<select name="ngo" onChange={handleChange} className="input">
				<option value="">Select NGO</option>
				{ngos.map((ngo) => (
					<option key={ngo.id} value={ngo.name}>
						{ngo.name}
					</option>
				))}
			</select>

			<input type="file" onChange={handleImage} />
			{image && <img src={image} className="rounded-lg mt-2" />}

			<button
				onClick={handleSubmit}
				className="btn bg-green-600 text-white w-full mt-4"
			>
				Submit Post
			</button>
		</div>
	);
}

// export default function Home() {
// 	return (
// 		<div className="text-center">
// 			<h1 className="text-3xl font-bold mb-4 text-green-700">
// 				Welcome to FoodShare
// 			</h1>
// 			<p className="mb-4">
// 				Connecting donors, NGOs, and volunteers to reduce food waste and
// 				feed those in need.
// 			</p>
// 			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// 				<img
// 					src="https://cdn.pixabay.com/photo/2017/08/06/11/47/people-2592231_1280.jpg"
// 					className="rounded-lg"
// 				/>
// 				<img
// 					src="https://cdn.pixabay.com/photo/2017/01/20/00/30/help-1996402_1280.jpg"
// 					className="rounded-lg"
// 				/>
// 				<img
// 					src="https://cdn.pixabay.com/photo/2020/03/04/15/23/food-4908613_1280.jpg"
// 					className="rounded-lg"
// 				/>
// 			</div>
// 		</div>
// 	);
// }
export default function Home() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl text-center">
				<h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
					Share Food, Spread Smiles
				</h1>
				<p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
					FoodShare connects{" "}
					<span className="font-semibold text-green-700">Donors</span>
					,<span className="font-semibold text-green-700"> NGOs</span>
					, and
					<span className="font-semibold text-green-700">
						{" "}
						Volunteers
					</span>{" "}
					to deliver surplus food efficiently and responsibly.
				</p>

				{/* Hero Images */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<img
						src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80"
						alt="Volunteers serving food"
						className="rounded-xl shadow-md hover:shadow-lg transition duration-300 object-cover h-64 w-full"
					/>
					<img
						src="https://images.unsplash.com/photo-1576765607924-3dbb3f5f5fbb?auto=format&fit=crop&w=1000&q=80"
						alt="Donating food"
						className="rounded-xl shadow-md hover:shadow-lg transition duration-300 object-cover h-64 w-full"
					/>
					<img
						src="https://images.unsplash.com/photo-1606851092951-8f8a1eae0f15?auto=format&fit=crop&w=1000&q=80"
						alt="Sharing meal with community"
						className="rounded-xl shadow-md hover:shadow-lg transition duration-300 object-cover h-64 w-full"
					/>
				</div>

				{/* Mission Section */}
				<section className="bg-white p-8 rounded-xl shadow-md mb-12 border border-gray-200">
					<h2 className="text-2xl font-semibold text-green-700 mb-4">
						Our Mission
					</h2>
					<p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
						Every day, good food goes to waste while many go hungry.
						FoodShare bridges this gap by connecting donors, NGOs,
						and volunteers to deliver food responsibly and
						respectfully.
					</p>
				</section>

				{/* Steps Section */}
				<section className="grid md:grid-cols-3 gap-6 mb-12">
					<div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
						<h3 className="text-xl font-semibold text-green-700 mb-2">
							1️⃣ Donate
						</h3>
						<p className="text-gray-700">
							Donors upload details about surplus food, including
							location and availability.
						</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
						<h3 className="text-xl font-semibold text-green-700 mb-2">
							2️⃣ Assign
						</h3>
						<p className="text-gray-700">
							NGOs review donations, accept them, and assign
							volunteers for pickup and delivery.
						</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
						<h3 className="text-xl font-semibold text-green-700 mb-2">
							3️⃣ Deliver
						</h3>
						<p className="text-gray-700">
							Volunteers ensure the food reaches those in need
							efficiently and safely.
						</p>
					</div>
				</section>

				{/* Call to Action */}
				<div className="mt-16">
					<h3 className="text-2xl font-semibold text-green-700 mb-4">
						Join Us Today
					</h3>
					<p className="text-gray-700 mb-6">
						Whether you are a donor, NGO, or volunteer — together,
						we can make sure no plate goes empty.
					</p>
					<button className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-800 transition">
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
}

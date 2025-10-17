export default function NGOList() {
	const ngos = [
		{
			name: "Helping Hands NGO",
			location: "Pune",
			contact: "helpinghands@ngo.com",
			phone: "9998887770",
		},
		{
			name: "Food Relief Org",
			location: "Mumbai",
			contact: "info@foodrelief.org",
			phone: "8887776665",
		},
		{
			name: "ShareMeal Foundation",
			location: "Delhi",
			contact: "contact@sharemeal.org",
			phone: "7776665554",
		},
	];

	return (
		<div className="max-w-3xl mx-auto">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				NGO Directory
			</h2>
			{ngos.map((ngo, i) => (
				<div key={i} className="bg-white p-4 rounded-lg shadow-md mb-3">
					<h3 className="text-xl font-bold text-green-700">
						{ngo.name}
					</h3>
					<p>{ngo.location}</p>
					<p>{ngo.contact}</p>
					<p>{ngo.phone}</p>
				</div>
			))}
		</div>
	);
}

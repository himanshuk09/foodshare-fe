// import { Heart, Mail, Phone, Users } from "lucide-react";

// export default function NGOList() {
// 	const ngos = [
// 		{
// 			name: "Helping Hands NGO",
// 			location: "Pune",
// 			contact: "helpinghands@ngo.com",
// 			phone: "9998887770",
// 		},
// 		{
// 			name: "Food Relief Org",
// 			location: "Mumbai",
// 			contact: "info@foodrelief.org",
// 			phone: "8887776665",
// 		},
// 		{
// 			name: "ShareMeal Foundation",
// 			location: "Delhi",
// 			contact: "contact@sharemeal.org",
// 			phone: "7776665554",
// 		},
// 	];

// 	return (
// 		<div className="space-y-6">
// 			<h2 className="text-3xl font-bold text-gray-800">
// 				Registered NGOs
// 			</h2>

// 			{ngos.length === 0 ? (
// 				<div className="text-center py-12 bg-white rounded-2xl shadow-lg">
// 					<Users className="mx-auto text-gray-400 mb-4" size={64} />
// 					<p className="text-gray-600 text-lg">
// 						No NGOs registered yet
// 					</p>
// 				</div>
// 			) : (
// 				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// 					{ngos.map((ngo: any) => (
// 						<div
// 							key={ngo.id}
// 							className="bg-white rounded-xl shadow-lg p-6 space-y-4"
// 						>
// 							<div className="flex items-center gap-4">
// 								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
// 									{ngo.profileImage ? (
// 										<img
// 											src={ngo.profileImage}
// 											alt={ngo.name}
// 											className="w-full h-full object-cover rounded-full"
// 										/>
// 									) : (
// 										<Heart
// 											className="text-green-600"
// 											size={32}
// 										/>
// 									)}
// 								</div>
// 								<div>
// 									<h3 className="text-xl font-bold text-gray-800">
// 										{ngo.orgName || ngo.name}
// 									</h3>
// 									<p className="text-sm text-gray-600">
// 										{ngo.location || "Location not set"}
// 									</p>
// 								</div>
// 							</div>

// 							{ngo.about && (
// 								<p className="text-gray-600 text-sm">
// 									{ngo.about}
// 								</p>
// 							)}

// 							<div className="flex items-center gap-2 text-sm text-gray-600">
// 								<Mail size={16} />
// 								<span>{ngo.email}</span>
// 							</div>

// 							{ngo.phone && (
// 								<div className="flex items-center gap-2 text-sm text-gray-600">
// 									<Phone size={16} />
// 									<span>{ngo.phone}</span>
// 								</div>
// 							)}
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// }
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Heart, Mail, Phone } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { getAllUser } from "../services/user.service";
import { useEffect, useState } from "react";

// Fix default marker icons
const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function NGOList() {
  const [ngos, setNGOs] = useState<any>([]);

  const fetchNGOs = async () => {
    try {
      const response = await getAllUser("ngo");
      console.log("NGOs:", response);
      setNGOs(response);
    } catch (error) {
      console.error("Unable to get NGOs", error);
    }
  };

  useEffect(() => {
    fetchNGOs();
  }, []);

  return (
    <div className="grid md:grid-cols-1 gap-6">
      {/* NGO List */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Registered NGOs</h2>
        {ngos.map((ngo: any, index: any) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
          >
            {/* Text Info */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
                {ngo.organizationName || ngo.name}
              </h3>
              <p className="text-sm text-gray-600">{ngo.location}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>{ngo.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{ngo.phone}</span>
              </div>
              <p className="text-sm text-gray-600">
                Lat: {ngo.latitude}, Lng: {ngo.longitude}
              </p>
            </div>

            {/* Image */}
            <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md">
              {ngo.avatar ? (
                <img
                  src={ngo.avatar}
                  alt={ngo.organizationName || ngo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Heart className="text-amber-600 w-full h-full p-4" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[20.5937, 78.9629]} // Centered in India
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {ngos.map((ngo: any, index: any) => (
            <Marker key={index} position={[ngo.latitude, ngo.longitude]}>
              <Popup>
                <div>
                  <h3 className="font-bold">
                    {ngo.organizationName || ngo.name}
                  </h3>
                  <p>{ngo.location}</p>
                  <p>{ngo.phone}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${ngo.latitude},${ngo.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View on Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

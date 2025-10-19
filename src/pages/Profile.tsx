import { Camera, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, uploadImage } from "../services/user.service";

export default function Profile() {
  const { updatePartialUser, user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(user?.user || null);
  const defaultUserAvatar = "https://avatar.iran.liara.run/public/25"; // for normal users/volunteers/donors
  const defaultNGOAvatar =
    "https://plus.unsplash.com/premium_photo-1674588218207-474f9ca6d3d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGluZGlhfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600";
  // for NGOs

  const [previewAvatar, setPreviewAvatar] = useState<string>(
    user?.user?.avatar ||
      (user?.user?.role === "ngo" ? defaultNGOAvatar : defaultUserAvatar)
  );
  console.log(JSON.stringify(user, null, 1));
  const [locationFetched, setLocationFetched] = useState(false);
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setPreviewAvatar(base64Image); // show preview immediately
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      let avatarUrl = previewAvatar;

      // If preview is base64 (not an existing Cloudinary URL)
      if (
        previewAvatar &&
        previewAvatar !== profile.avatar &&
        !previewAvatar.startsWith("https://")
      ) {
        const res = await uploadImage(previewAvatar);
        console.log("Uploaded Image:", res);
        avatarUrl = res.data?.secure_url || res.secure_url;
      }
      // Update local profile state
      const updatedProfile = { ...profile, avatar: avatarUrl };
      setProfile(updatedProfile);
      // Send to backend
      const res = await updateProfile(user.user._id, updatedProfile);

      updatePartialUser({ user: res?.user });
      console.log("Profile updated successfully ✅");
      setEditing(false);
    } catch (error) {
      console.error("Unable to update profile ❌", error);
    }
  };

  // Fetch current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setProfile((prev: any) => ({
            ...prev,
            latitude,
            longitude,
          }));

          // Fetch human-readable address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const address = data.address;
            const city = address.city || address.town || address.village || "";
            const state = address.state || "";
            const country = address.country || "";
            setProfile((prev: any) => ({
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
          setLocationFetched(false);
        }
      );
    }
  }, []);

  if (!user) {
    return (
      <div className="text-center py-12">Please login to view profile</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
        <button
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          {editing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {previewAvatar || profile.avatar ? (
                <img
                  src={previewAvatar || profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={64} className="text-gray-400" />
              )}
            </div>
            {editing && (
              <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700">
                <Camera size={20} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{profile.name}</h3>
            <p className="text-gray-600 capitalize">{profile.role}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={profile.phone || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            {locationFetched ? (
              <p className="text-sm text-green-600 mb-1">
                Auto-detected location (you can edit if needed)
              </p>
            ) : (
              <p className="text-sm text-red-600 mb-1">
                Unable to detect location. Please enter manually.
              </p>
            )}
            <input
              type="text"
              value={profile.location || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: e.target.value,
                })
              }
              disabled={!editing}
              placeholder="City, State"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={profile.latitude || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  latitude: parseFloat(e.target.value),
                })
              }
              disabled={!editing && locationFetched}
              placeholder="21.1458"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={profile.longitude || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  longitude: parseFloat(e.target.value),
                })
              }
              disabled={!editing && locationFetched}
              placeholder="79.0882"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>

          {profile.role === "ngo" && (
            <>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={profile.organizationName || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      organizationName: e.target.value,
                    })
                  }
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Organization
                </label>
                <textarea
                  value={profile.aboutOrganization || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      aboutOrganization: e.target.value,
                    })
                  }
                  disabled={!editing}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                />
              </div>
            </>
          )}

          {profile.role === "volunteer" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <input
                type="text"
                value={profile.availability || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    availability: e.target.value,
                  })
                }
                disabled={!editing}
                placeholder="e.g., Weekends, Evenings"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

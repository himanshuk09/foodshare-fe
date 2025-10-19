
import { useEffect, useState } from "react";
import { CheckCircle, Truck } from "lucide-react";
import { getAllPostBYVolunteerId, updatePostStatus } from "../services/post.service";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
// Import your loading context

export default function VolunteerTask() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("picked");

  const { user } = useAuth();
  const { setLoading } = useLoading(); // Access setLoading

  const fetchPosts = async () => {
    setLoading(true); // Start loader
    try {
      const data = await getAllPostBYVolunteerId(user?.user?._id);
      setPosts(data?.posts || []);
    } catch (error) {
      console.error("Unable to fetch posts:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = (postId: string) => {
    setSelectedPostId(postId);
    setSelectedStatus("picked");
    setIsModalOpen(true);
  };

  const handleConfirmStatus = async () => {
    if (!selectedPostId || !selectedStatus) return;
    setLoading(true); // Start loader while updating status
    try {
      await updatePostStatus(selectedPostId, selectedStatus);
      setIsModalOpen(false);
      await fetchPosts(); // Refresh tasks
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading(false); // Stop loader
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <Truck className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-600 text-lg">No tasks assigned yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post: any) => {
            const donor = post.donorId;
            const ngo = post.assignedNGOId;

            return (
              <div key={post._id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {post.foodType}
                    </h3>
                    <p className="text-gray-600">{post.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${post.status === "assigned"
                        ? "bg-blue-100 text-blue-800"
                        : post.status === "picked"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">Pickup Details</h4>
                    <p className="text-sm text-gray-600">Donor: {donor?.name}</p>
                    <p className="text-sm text-gray-600">Phone: {donor?.phone || "N/A"}</p>
                    <p className="text-sm text-gray-600">Location: {post.location}</p>
                    <p className="text-sm text-gray-600">Quantity: {post.quantity}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">Delivery Details</h4>
                    <p className="text-sm text-gray-600">
                      NGO: {ngo?.organizationName || ngo?.name}
                    </p>
                    <p className="text-sm text-gray-600">Phone: {ngo?.phone || "N/A"}</p>
                    <p className="text-sm text-gray-600">Location: {ngo?.location || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  {post.status === "assigned" && (
                    <button
                      onClick={() => openModal(post._id)}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                    >
                      <Truck size={20} />
                      Update Status
                    </button>
                  )}
                  {post.status === "picked" && (
                    <div
                     onClick={() => openModal(post._id)}
                    className="flex-1 bg-purple-100 text-purple-800 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold">
                      <Truck size={20} />
                      Picked Up
                    </div>
                  )}

                  {post.status === "delivered" && (
                    <div className="flex-1 bg-green-100 text-green-800 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold">
                      <CheckCircle size={20} />
                      Completed
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ STATUS UPDATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 bg-opacity-40 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Update Post Status</h3>

            <div>
              <label htmlFor="status" className="block mb-2 font-medium text-gray-700">
                Select Status
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="picked">Picked Up</option>
                <option value="delivered">Delivered to NGO</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStatus}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

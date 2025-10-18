import api from "./api";

export const createPost = async (payload: any) => {
  try {
    const response: any = await api.post("/post/", payload);
    return response.data;
  } catch (error) {
    console.error("Unable to add Post");
  }
};
export const getAllPost = async () => {
  try {
    const response: any = await api.get("/post/");
    return response.data;
  } catch (error) {
    console.error("Unable to add Post");
  }
};
export const getAllPostBYNGOId = async (id: string) => {
  try {
    const response: any = await api.get(`/post/ngo/${id}`); // ✅ await here
    return response.data; // now this will return the actual data
  } catch (error) {
    console.error("Unable to fetch posts", error);
    return null; // optional: return null on error
  }
};

export const assignVolenteers = async (
  postid: string,
  assignedVolId: string
) => {
  try {
    const response = await api.put(`/post/${postid}/assign-volunteer`, {
      assignedVolId,
    });
    return response.data;
  } catch (error) {
    console.error("Error assigning volunteer:", error);
    throw error;
  }
};

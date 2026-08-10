import api from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";


export const createPost = async (formData: FormData) => {
  const response = await api.post(
    API_ENDPOINTS.POST.CREATE_POST,
    formData
  );

  return response.data;
};

export const getPostsByUserId = async () => {
  const response = await api.get(`${API_ENDPOINTS.POST.GET_POST_BY_USER}`);
  return response.data.posts;
}
export const getAllPosts = async () => {
  const response = await api.get(`${API_ENDPOINTS.POST.GET_ALL_POSTS}`);
  return response.data.posts;
}

export const deletePost=async(id:string)=>{
  const response=await api.delete(`${API_ENDPOINTS.POST.DELETE_POST}/${id}`)
  return response.data;
}
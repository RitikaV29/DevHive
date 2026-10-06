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

export const updatePost=async(id:string,formData:FormData)=>{
  const response=await api.put(`${API_ENDPOINTS.POST.UPDATE_POST}/${id}`,formData)
  return response.data;
}

export const likePost=async(id:string)=>{
  const response=await api.post(`${API_ENDPOINTS.POST.LIKE_POST}/${id}`)
  return response.data;
}

export const toggleSavePost=async(id:string)=>{
  const response=await api.post(`${API_ENDPOINTS.POST.TOGGLE_SAVE_POST}/${id}`)
  return response.data;
}
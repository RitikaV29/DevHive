
import api from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getAllUsers = async (
  search?: string,
  skill?: string
) => {
  const response = await api.get(
    API_ENDPOINTS.USER.GET_ALL_USERS,
    {
      params: {
        search,
        skill,
      },
    }
  );

  return response.data;
};


export const getMyProfile=async()=>{

  const response=await api.get(API_ENDPOINTS.USER.PROFILE)
  return response.data;
}
export const updateMyProfile=async(formData:FormData)=>{
  const response=await api.put(API_ENDPOINTS.USER.UPDATE_PROFILE,formData)
  return response.data;
}
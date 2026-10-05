import api from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
export const createComment=async(postId:string,content:string)=>{
    const response=await api.post(`${API_ENDPOINTS.COMMENT.CREATE_COMMENT(postId)}`, {
        content
    });
    
    return response.data;
};
export const getCommentsByPostId=async(postId:string)=>{
    const response=await api.get(`${API_ENDPOINTS.COMMENT.GET_COMMENTS_BY_POST_ID(postId)}`);
    return response.data.comments;
}

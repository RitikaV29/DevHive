export const API_ENDPOINTS = {
  // ========================================
  // AUTH ENDPOINTS
  // ========================================

  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    ME:"/api/auth/me"
  },

  // ========================================
  // USER ENDPOINTS
  // ========================================

  USER: {
    PROFILE: "/api/user/profile",

    UPDATE_PROFILE: "/api/user/profile/update",

    DELETE_PROFILE: "/api/user/profile/delete",

    GET_ALL_USERS: "/api/user/getAll/profile",

    GET_SINGLE_USER: (id: string) =>
      `/api/user/${id}/getSingle/profile`,
  },

  // ========================================
  // POST ENDPOINTS
  // ========================================

  POST: {
    CREATE_POST: "/api/post/createPost",

    GET_POST_BY_USER:
      "/api/post/getPostByUserId",
    
    GET_ALL_POSTS: "/api/post/getAllPosts",  

    DELETE_POST:`/api/post/deletePost`,
  },
};
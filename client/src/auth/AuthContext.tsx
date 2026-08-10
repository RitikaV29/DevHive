import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../api/axios";


interface User {
  _id: string;
  username: string;
  name:string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
login: (data: any) => Promise<void>;
}
const AuthContext=createContext<AuthContextType |null>(null);


export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);



  const login = async(formData:any)=>{

    const response = await api.post(
      API_ENDPOINTS.AUTH.LOGIN,
      formData
    );

    setUser(response.data.user);
  };



  const getUser = async () => {
    try {
      const res = await api.get(API_ENDPOINTS.AUTH.ME
);

      setUser(res.data.user);

    } catch (error) {

      setUser(null);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    getUser();
  }, []);



  const logout = async () => {

    try {

      await api.post(  API_ENDPOINTS.AUTH.LOGOUT);

      setUser(null);
  

    } catch (error) {

      console.log(error);

    }

  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
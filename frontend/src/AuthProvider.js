import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  
  const loginAction = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/signin`,data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
     
      });
      const res = response.data;
      console.log("res:",res);  
      console.log("check:",res);
      if (res) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/home");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const API_URL = "https://67c3acde89e47db83dd23f18.mockapi.io/:endpoint"; // ✅ Đổi API URL

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch(API_URL);
      const users = await res.json();
      const foundUser = users.find(u => u.username === username && u.password === password);

      if (!foundUser) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("token", foundUser.id);
      setUser(foundUser);
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (newUser) => {
    try {
      const res = await fetch("https://67c3acde89e47db83dd23f18.mockapi.io/:endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
  
      if (!res.ok) throw new Error("Registration failed");
  
      const createdUser = await res.json();
      setUser(createdUser);  // ✅ Cập nhật user mới
      console.log("User created:", createdUser);
  
      alert("Registration successful");
      navigate("/profile"); // ✅ Chuyển hướng đến profile
    } catch (error) {
      console.error("Register error:", error);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch(`${API_URL}/${token}`); // ✅ Fetch theo ID
      if (!res.ok) throw new Error("User not found");
      const userData = await res.json();
      setUser(userData);
    } catch (error) {
      console.error("Fetch profile error:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

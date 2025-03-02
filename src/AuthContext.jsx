import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Updated MockAPI URL
  const API_URL = "https://json-server-8ruu.onrender.com/";

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
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
  
      if (res.ok) {
        const addedUser = await res.json(); // Nhận lại dữ liệu người dùng đã được thêm
        alert("Đăng ký thành công");
        navigate("/"); // Chuyển hướng về trang đăng nhập
      } else {
        alert("Đăng ký không thành công");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch(`${API_URL}/${token}`);
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

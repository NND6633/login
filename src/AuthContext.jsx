import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();
      const foundUser = users.find(u => u.username === username && u.password === password);

      if (!foundUser) {
        alert("Invalid credentials");
        return; // ⛔ Ngăn chặn lưu token nếu sai thông tin
      }

      localStorage.setItem("token", foundUser.id);
      setUser(foundUser);
      navigate("/profile");  // ✅ Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (newUser) => {
    try {
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      alert("Registration successful");
      navigate("/");  // ✅ Chuyển hướng về Sign In sau khi đăng ký
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
      const res = await fetch(`https://mockapi.io/clone/67c3acde89e47db83dd23f19`);
      if (!res.ok) throw new Error("User not found"); // ⛔ Kiểm tra nếu token không hợp lệ
      const userData = await res.json();
      setUser(userData);
    } catch (error) {
      console.error("Fetch profile error:", error);
      logout(); // ⛔ Nếu lỗi, đăng xuất người dùng
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

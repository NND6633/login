import React, { useState } from "react";
import { Card, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", username: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Email must contain @";
    }
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validate()) {
      try {
        await register({ username: form.username, email: form.email, password: form.password });
        message.success("Sign Up Successful");
        navigate("/");
      } catch (error) {
        message.error("Sign Up Failed");
      }
    } else {
      message.error("Please fix the errors");
    }
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-100">
        <img src="./image/signup.jpg" alt="Signup Illustration" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-1 items-center justify-center min-h-screen p-8">
        <Card title="Welcome to ITEL...!" className="w-full max-w-md text-center border-0">
          <div className="space-y-4">
            <div>
              <p className="text-left font-semibold">Email Address</p>
              <Input type="text" placeholder="Enter your Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <p className="text-left font-semibold">Username</p>
              <Input type="text" placeholder="Enter your Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>
            <div>
              <p className="text-left font-semibold">Password</p>
              <Input.Password placeholder="Enter your password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div>
              <p className="text-left font-semibold">Confirm Password</p>
              <Input.Password placeholder="Confirm your password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
            <Button onClick={handleSignUp} className="w-32 bg-purple-600 text-white hover:bg-purple-700 rounded-full">
              Sign Up
            </Button>
            <p>
              Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>Sign In</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
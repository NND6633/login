import React, { useState } from 'react';
import { Card, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!form.email.includes('@')) {
      newErrors.email = 'Email must contain @';
    }
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      message.success('Sign Up Successful');
      navigate('/');
    } else {
      message.error('Please fix the errors');
    }
  };
    // Tính năng đăng nhập với Google (dummy):
    const handleGoogleLogin = () => {
      // TODO: Tích hợp Google OAuth
      message.info('Login with Google clicked!');
    };
  return (
    <div className="flex flex-row min-h-screen">
      <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-100">
        <img src="./image/signup.jpg" alt="Signup Illustration" className="w-full h-[100vh] object-cover" />
      </div>
      <div className="flex flex-1 items-center justify-center min-h-screen p-8">
        <Card title="Welcome to ITEL...!" className="w-full max-w-md text-center border-0">
          <div className="space-y-4">
            <div className="flex justify-center w-full">
              <div className="flex w-64 justify-center items-center rounded-full overflow-hidden bg-gradient-to-r from-purple-300 to-purple-400 p-0.5">
                <Button onClick={() => navigate('/')} className="w-1/2 bg-transparent text-white font-semibold hover:bg-purple-100 rounded-full text-xs py-1">
                  Sign In
                </Button>
                <Button className="w-1/2 bg-purple-600 text-white font-semibold hover:bg-purple-700 rounded-full text-xs py-1">
                  Sign Up
                </Button>
              </div>
            </div>
            <p className="text-gray-500 max-w-xs mx-auto">ITEL is your companion and powerful assistant in the IT industry.</p>
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full rounded-md border border-[#d3d3d3] py-2 text-blue-600 hover:border-[#c0c0c0]"
              icon={<span className="mr-2">+</span>}
            >
              Sign Up with Google
            </Button>

            {/* Hoặc thêm khoảng trống và chữ "Or login with email" */}
            <div className="flex items-center justify-center">
              <div className="w-1/4 h-px bg-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">Or login with email</span>
              <div className="w-1/4 h-px bg-gray-300" />
            </div>
            <div>
              <p className="text-left font-semibold">Email Address</p>
              <Input type="text" placeholder="Enter your Email Address" className="rounded-full" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <p className="text-left font-semibold">Username</p>
              <Input type="text" placeholder="Enter your Username" className="rounded-full" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>
            <div>
              <p className="text-left font-semibold">Password</p>
              <Input.Password placeholder="Enter your password" className="rounded-full" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <Button onClick={handleSignUp} className="w-32 bg-purple-600 text-white hover:bg-purple-700 rounded-full">
              Sign Up
            </Button>
            <div>
              <p className="text-left text-xs text-gray-500">
                By clicking 'Continue', you acknowledge that you have read and accept the&nbsp;
                <a href="/terms" className="text-blue-600 underline">Terms of Service</a> and&nbsp;
                <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
          
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

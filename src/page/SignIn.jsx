import React, { useState } from 'react';
import { Card, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateInputs()) {
      message.success('Sign in successful');
      // Add sign-in logic here
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
    <div className="flex min-h-screen">
      {/* Left: Illustration */}
      <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-100">
        <img
          src="./image/signin.jpg"
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-8">
        <Card
          title="Welcome to ITEL...!"
          className="w-full max-w-md p-4 text-center border-0"
          headStyle={{ borderBottom: 'none' }}
        >
          <div className="space-y-6">
            {/* Sign In / Sign Up Toggle */}
            <div className="flex justify-center w-full">
              <div className="flex w-64 justify-center items-center rounded-full overflow-hidden bg-gradient-to-r from-purple-300 to-purple-400 p-0.5">
                <Button className="w-1/2 bg-purple-600 text-white font-semibold hover:bg-purple-700 rounded-full text-xs py-1">
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="w-1/2 bg-transparent text-white font-semibold hover:bg-purple-100 rounded-full text-xs py-1"
                >
                  Sign Up
                </Button>
              </div>
            </div>

            {/* Info Text */}
            <p className="text-center text-gray-500 max-w-xs leading-6">
              ITEL is your companion and powerful assistant in the IT industry.
            </p>
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full rounded-md border border-[#d3d3d3] py-2 text-blue-600 hover:border-[#c0c0c0]"
              icon={<span className="mr-2">+</span>}
            >
              Sign In with Google
            </Button>


            {/* Hoặc thêm khoảng trống và chữ "Or login with email" */}
            <div className="flex items-center justify-center">
              <div className="w-1/4 h-px bg-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">Or login with email</span>
              <div className="w-1/4 h-px bg-gray-300" />
            </div>
            {/* Username Input */}
            <div>
              <p className="text-left font-semibold">User name</p>
              <Input
                type="text"
                placeholder="Enter your User name"
                className={`rounded-full ${errors.username ? 'border-red-500' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            {/* Password Input */}
            <div>
              <p className="text-left font-semibold">Password</p>
              <Input.Password
                placeholder="Enter password"
                className={`rounded-full ${errors.password ? 'border-red-500' : ''}`}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </div>
              <span className="text-blue-600 cursor-pointer">Forgot Password?</span>
            </div>

            {/* Sign In Button */}
            <Button 
              onClick={handleSignIn} 
              className="w-32 bg-purple-600 text-white hover:bg-purple-700 rounded-full"
            >
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;

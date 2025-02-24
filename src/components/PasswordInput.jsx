import React from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const PasswordInput = ({ value, onChange, error, placeholder }) => {
  return (
    <div>
      <p className="text-left font-semibold">Password</p>
      <Input.Password
        placeholder={placeholder || "Enter password"}
        className={`rounded-full ${error ? 'border-red-500' : ''}`}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PasswordInput;

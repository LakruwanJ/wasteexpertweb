import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../apiService';
import loginImage from '../Images/Secure login-bro.svg'; // Replace with actual collector image
import logo from '../Images/Logo.png';

const CollectorLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.collectorLogin(formData);
      if (response.data.status) {
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        navigate('/collector-dashboard');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert('Error logging in');
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-gray-100">
      <div className="flex flex-1 items-center justify-center p-4 md:p-6">
        <img src={loginImage} alt="Illustration" className="max-w-xs lg:max-w-md md:mr-8" />
      </div>
      <div className="flex flex-1 items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
          <div className="flex justify-center mb-8">
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              <img src={logo} alt="Logo" className="h-10" />
            </a>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Login as Collector
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollectorLogin;

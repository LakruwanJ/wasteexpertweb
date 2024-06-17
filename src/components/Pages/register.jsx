import React from 'react';
import registerImage from '../Images/Mobile login-amico.svg';
import { Link } from 'react-router-dom';
import logo from '../Images/Logo.png';

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-gray-100">
      <div className="flex flex-1 items-center justify-center p-4 md:p-6">
        <img src={registerImage} alt="Illustration" className="max-w-xs lg:max-w-md md:mr-8" />
      </div>
      <div className="flex flex-1 items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">Create an Account</h2>
            <div className="flex justify-center mb-8">
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              <img src={logo} alt="Logo" className="h-10" />
            </a>
          </div>
          </div>
          <form className="mt-8 space-y-6">
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
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
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Register
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

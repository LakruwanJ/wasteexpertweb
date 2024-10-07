import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateUserForm({ open, onClose, usertype }) {

  const tsu = (text) => toast.success(text, {
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const ter = (text) => toast.error(text, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    address: '',
    phoneNum: '',
    email: '',
    role: '',
    jobs: '',
    vehicalNo: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const addNewUser = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('formData:', formData);

    let link;

    switch (usertype) {
      case 'Admin':
        link = 'http://localhost:3001/addAdmin/addAdmin';
        break;
      case 'Collector':
        link = 'http://localhost:3001/addCollector/addCollector';
        break;
      case 'Dispatcher':
        link = 'http://localhost:3001/addDispatcher/addDispatcher';
        break;
      default:
        console.error('Invalid user type:', usertype);
        return; // Exit the function early if usertype is invalid
    }

    try {
      const response = await axios.post(link, formData);
      console.log(response.data);
      tsu('New ' + usertype + ' Added');
      setFormData({
        username: '',
        password: '',
        fullName: '',
        address: '',
        phoneNum: '',
        email: '',
        role: '',
        jobs: '',
        vehicalNo: '',
      });
    } catch (error) {
      console.error('Error sending schedule:', error);

      ter('Error Adding New ' + usertype);
      // Handle specific error scenarios here (e.g., retry logic, user feedback)
    } finally {
      console.log('Data sent (or error occurred)'); // Informative message regardless of success or failure
    }
  };

  return (
    <div className={`w-full h-full bg-gray-600/45 absolute  flex-row items-center justify-center left-0 top-0 z-50 transition-transform ${open ? "flex" : "hidden"}`} >
      <div className="bg-white rounded-xl relative w-1/2 p-4">

        <button className=" absolute right-2 top-2" onClick={onClose}>

          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512"><path fill="#ff4d4d" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        </button>

        <form onSubmit={addNewUser}>
          <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
            Username
          </label>
          <div className="relative my-6">
            <input type='text' name='username' value={formData.username} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
              Enter Username
            </label>
          </div>

          <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
            Password
          </label>
          <div className="relative my-6">
            <input type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
              Enter Password
            </label>
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-slate-500 hover:text-emerald-500">{showPassword ? <i>Hide</i> : <i>Show</i>}</button>
          </div>

          <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
            Full Name
          </label>
          <div className="relative my-6">
            <input type='text' name='fullName' value={formData.fullName} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
              Enter Full Name
            </label>
          </div>

          <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
            Address
          </label>
          <div className="relative my-6">
            <input type='text' name='address' value={formData.address} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
              Enter Address
            </label>
          </div>

          <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
            Mobile Number
          </label>
          <div className="relative my-6">
            <input type='text' name='phoneNum' value={formData.phoneNum} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
              Enter Mobile Number
            </label>
          </div>

          <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
            E-mail
          </label>
          <div className="relative my-6">
            <input type='email' name='email' value={formData.email} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
              Enter e-mail
            </label>
          </div>

          {usertype == 'Admin' && (
            <div>
              <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                Role
              </label>
              <div className="relative my-6">
                <input type='text' name='role' value={formData.role} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                  Enter Role
                </label>
              </div>

              <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                Jobs
              </label>
              <div className="relative my-6">
                <input type='text' name='jobs' value={formData.jobs} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                  Enter Jobs
                </label>
              </div>
            </div>
          )}

          {usertype == 'Collector' && (
            <div>
              <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                Vehical Number
              </label>
              <div className="relative my-6">
                <input type='text' name='vehicalNo' value={formData.vehicalNo} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                  Enter vehical Number
                </label>
              </div>
            </div>
          )}

          <button Type="submit" className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-emerald-200 transition duration-300 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
            <span className="relative only:-mx-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" alt="a">
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V256c0-13.3-10.7-24-24-24z" /></svg>
            </span>
            <span>Add New {usertype}</span>
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default CreateUserForm
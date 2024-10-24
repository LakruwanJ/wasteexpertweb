import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//data
import { tsu, ter } from '../Functions/ResponseToste';

const EditUserForm = ({ user, onClose, onUpdate, usertype }) => {
  const [username, setUsername] = useState(user.username);
  const [fullName, setFullName] = useState(user.fullName);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [phoneNum, setPhoneNum] = useState(user.phoneNum);
  const [role, setRole] = useState(user.role);
  const [jobs, setJobs] = useState(user.jobs);
  const [vehicalNo, setVehicalNo] = useState(user.vehicalNo);

  const updateUser = async (e) => {
    e.preventDefault();

    const formData = {
      _id: user._id,
      username,
      fullName,
      address,
      email,
      phoneNum,
      role,
      jobs,
    };
    console.log(formData);

    let link;

    // Setting API endpoint based on usertype
    switch (usertype) {
      case "Admin":
        link = "http://localhost:3001/addAdmin/updateAdmin";
        break;
      case "Collector":
        link = "http://localhost:3001/addCollector/updateCol";
        break;
      case "Dispatcher":
        link = "http://localhost:3001/addDispatcher/updateDis";
        break;
      default:
        console.error("Invalid user type:", usertype);
        return;
    }

    try {
      const response = await axios.post(link, formData);
      console.log(response.data);
      tsu('S');

    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <div
      className={`w-full h-full bg-gray-600/45 absolute fixed flex items-center justify-center left-0 top-0 z-50 transition-transform`}
    >
      <div className="bg-white rounded-xl relative w-1/2 p-4">
        <button className="absolute right-2 top-2" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="15"
            viewBox="0 0 384 512"
          >
            <path
              fill="#ff4d4d"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </button>
        <h2 className="text-xl font-medium text-slate-700">
          Edit User : {username}
        </h2>
        <br />
        <hr />
        <br />
        <form onSubmit={updateUser}>
          <label className="block text-md font-medium leading-4 text-gray-900">
            Full Name
          </label>
          <div className="relative my-6">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <label className="block text-md font-medium leading-4 text-gray-900">
            Address
          </label>
          <div className="relative my-6">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <label className="block text-md font-medium leading-4 text-gray-900">
            Email
          </label>
          <div className="relative my-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <label className="block text-md font-medium leading-4 text-gray-900">
            Phone Number
          </label>
          <div className="relative my-6">
            <input
              type="text"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              required
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {usertype == 'Admin' && (
            <div>
              <label className="block text-md font-medium leading-4 text-gray-900">
                Role
              </label>
              <div className="relative my-6">
                <input type='text' name='role' value={role} onChange={(e) => setRole(e.target.value)} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                  Enter Role
                </label>
              </div>

              <label className="block text-md font-medium leading-4 text-gray-900">
                Jobs
              </label>
              <div className="relative my-6">
                <input type='text' name='jobs' value={jobs} onChange={(e) => setJobs(e.target.value)} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                  Enter Jobs
                </label>
              </div>
            </div>
          )}

          {usertype == 'Collector' && (
            <div>
              <label className="block text-md font-medium leading-4 text-gray-900">
                Vehical Number
              </label>
              <div className="relative my-6">
                <input type='text' name='vehicalNo' value={vehicalNo} onChange={(e) => setVehicalNo(e.target.value)} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                  Enter vehical Number
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded"
          >
            Update {usertype}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;

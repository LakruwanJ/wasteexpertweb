import React, { useState } from "react";
import userImg from "../Images/user.png"


function Profile(usertype, user) {
  usertype = "Admin"
  user = {
    "_id": "6704c5b48bb0740417f3deea",
    "username": "sasithmj",
    "fullName": "sss",
    "address": "sss",
    "email": "test1234@gmail.com",
    "phoneNum": "sss",
    "role": "sss",
    "jobs": "sss"
  }

  const [file, setFile] = useState(null);

  const [imageSrc, setImageSrc] = useState(userImg);

  const [formData, setFormData] = useState({
    password: '',
    confirmpassword: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const ChangePassword = (event) => {
    event.preventDefault();
    if (formData.password != formData.confirmpassword) {
      alert('Passwords do not match!');
    } else {
      // Add password change logic here
      console.log("Password changed:", formData.password);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {

  };

  return (
    <div>
      <section>
        <div className="container px-6 m-6">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-5">
            <figure className="p-6 pb-0 text-center">
                <span className="relative inline-flex h-30 w-30 items-center justify-center rounded-full text-white">
                  <img
                    src={imageSrc}
                    alt="user name"
                    title="user name"
                    width="200"
                    height="200"
                    className="max-w-full rounded-full"
                  />
                </span>
              </figure>
              <br></br>


              <center>


                <div className="relative my-6 inline-flex w-full items-center gap-2 rounded border border-slate-200 text-sm text-slate-500">
                  <input
                    onChange={handleFileChange}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="peer order-2 [&::file-selector-button]:hidden"
                  />
                  <label
                    onClick={handleUpload}
                    for="file-upload"
                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300"
                  >
                    {" "}
                    Upload a file{" "}
                  </label>
                </div>

              </center>
            </div>
            <div className="col-span-4 lg:col-span-7">

              <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                Username
              </label>
              <div className="relative my-6">
                <input disabled type='text' name='username' value={user.username} className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
              </div>

              <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                Full Name
              </label>
              <div className="relative my-6">
                <input disabled type='text' name='fullName' value={user.fullName} className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
              </div>

              <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                Address
              </label>
              <div className="relative my-6">
                <input disabled type='text' name='address' value={user.address} className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
              </div>

              <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                Mobile Number
              </label>
              <div className="relative my-6">
                <input disabled type='text' name='phoneNum' value={user.phoneNum} className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
              </div>

              <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                E-mail
              </label>
              <div className="relative my-6">
                <input disabled type='email' name='email' value={user.email} className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
              </div>

              {usertype == 'Admin' && (
                <div>
                  <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                    Role
                  </label>
                  <div className="relative my-6">
                    <input disabled type='text' name='role' value={user.role} className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                  </div>

                  <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                    Jobs
                  </label>
                  <div className="relative my-6">
                    <input disabled type='text' name='jobs' value={user.jobs} className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                  </div>
                </div>
              )}

              {usertype == 'Collector' && (
                <div>
                  <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                    Vehical Number
                  </label>
                  <div className="relative my-6">
                    <input disabled type='text' name='vehicalNo' value={user.vehicalNo} className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                  </div>
                </div>
              )}

              <br></br><hr></hr><br></br>
              <u><label htmlFor="price" className="block text-md font-medium leading-6 text-gray-900">
                Change Password
              </label></u><br></br>

              <form onSubmit={ChangePassword}>
                <label className="block text-md font-medium leading-4 text-gray-900">
                  Enter Password
                </label>
                <div className="relative my-6">
                  <input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-slate-500 hover:text-emerald-500">{showPassword ? <i>Hide</i> : <i>Show</i>}</button>
                </div>

                <label className="block text-md font-medium leading-4 text-gray-900">
                  Confirm Password
                </label>
                <div className="relative my-6">
                  <input type={showPassword ? 'text' : 'password'} name='confirmpassword' onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 text-slate-500 hover:text-emerald-500">{showPassword ? <i>Hide</i> : <i>Show</i>}</button>
                </div>

                <button type="submit" className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-emerald-200 transition duration-300 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                  <span className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" alt="a">
                      <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V256c0-13.3-10.7-24-24-24z" />
                    </svg>
                  </span>
                  Change Password
                </button>
              </form>


            </div>
          </div>
        </div>
      </section>


    </div >
  )
}

export default Profile

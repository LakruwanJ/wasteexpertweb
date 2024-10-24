import React, { useState, useEffect } from "react";
import userImg from "../Images/user.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//data
import { tsu, ter } from '../Functions/ResponseToste';

function Profile() {
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    address: "",
    phoneNum: "",
    email: "",
    role: "", // Only applicable for admin
  });
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmpassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [proPic, setProPic] = useState("");
  
  useEffect(() => {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded._id;
        const userType = decoded.userType; // Get userType from decoded token

        const fetchUserData = async () => {
          try {
            let response;
            // Use appropriate endpoint based on userType
            switch (userType) {
              case "admin":
                response = await axios.post(
                  "http://localhost:3001/admin/getAdminDetails",
                  { id: userId },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                break;
              case "collector":
                response = await axios.post(
                  "http://localhost:3001/collector/getCollectorDetails",
                  { id: userId },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                break;
              case "dispatcher":
                response = await axios.post(
                  "http://localhost:3001/dispatcher/getDispatcherDetails",
                  { id: userId },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                break;
              default:
                throw new Error("Unknown user type");
            }

            if (response.data.status) {
              setUser(response.data.user); // Assuming your response has a user object
            } else {
              console.error(
                "Failed to fetch user data:",
                response.data.message
              );
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        fetchUserData(); // Call the function to fetch user data
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const ChangePassword = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token); // Decode the token to get the user ID
      const userType = decoded.userType; // Get userType from decoded token

      let endpoint; // Define the endpoint variable

      // Determine the endpoint based on userType
      switch (userType) {
        case "admin":
          endpoint = "http://localhost:3001/admin/changePassword";
          break;
        case "collector":
          endpoint = "http://localhost:3001/collector/changePassword";
          break;
        case "dispatcher":
          endpoint = "http://localhost:3001/dispatcher/changePassword";
          break;
        default:
          throw new Error("Unknown user type");
      }

      const response = await axios.post(
        endpoint,
        {
          _id: decoded._id, // Include the user ID
          oldPassword: formData.oldPassword, // Ensure oldPassword is added to the state
          newPassword: formData.password, // Use new password from form data
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status) {
        setMessage("Password changed successfully.");
        setFormData({ password: "", confirmpassword: "", oldPassword: "" }); // Reset form
      } else {
        setMessage(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      setMessage("Error occurred while changing password.");
    }
  };

  const updateProfileImage = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);
    axios
      .post(`http://localhost:3001/image?user=${user.username}`, formData)
      .then(({ data }) => {
        tsu('Profile Picture Update Successfully');
      })
      .catch(() => {
        ter('Error Adding Profile Picture');
      });
      window.location.reload();
  };

  //pro pic
  const imageUrl = "http://localhost:3001/uploads/users/" + user.username + ".png";
 


  const img = new Image();
  img.onload = function () {
    console.log("Image available: Yes");
    setProPic(imageUrl)
  };
  img.onerror = function () {
    console.log("Image available: Not");
    setProPic(userImg)
  };

  // Always attempt to load the image
  img.src = imageUrl;

  return (
    <div>
      <section>
        <div className="container px-6 m-6">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-5">
              <figure className="p-6 pb-0 text-center">
                <span className="relative inline-flex h-30 w-30 items-center justify-center rounded-full text-white">
                  <img
                    src={proPic} // Keeping the default image
                    alt="user name"
                    title="user name"
                    width="200"
                    height="200"
                    className="max-w-full rounded-full"
                  />
                </span>
              </figure>
              <br />
              <center>
                <div className="relative my-6 inline-flex w-full items-center gap-2 rounded border border-slate-200 text-sm text-slate-500">
                  <input
                    id="file-upload"
                    accept="image/*"
                    onChange={updateProfileImage}
                    name="file-upload"
                    type="file"
                    className="peer order-2 [&::file-selector-button]:hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300"
                  >
                    Upload a file
                  </label>
                </div>
              </center>
            </div>
            <div className="col-span-4 lg:col-span-7">
              <label
                htmlFor="username"
                className="block text-md font-medium leading-4 text-gray-900"
              >
                Username
              </label>
              <div className="relative my-6">
                <input
                  disabled
                  type="text"
                  name="username"
                  value={user.username || ""}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              <label
                htmlFor="fullName"
                className="block text-md font-medium leading-4 text-gray-900"
              >
                Full Name
              </label>
              <div className="relative my-6">
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName || ""}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              <label
                htmlFor="address"
                className="block text-md font-medium leading-4 text-gray-900"
              >
                Address
              </label>
              <div className="relative my-6">
                <input
                  type="text"
                  name="address"
                  value={user.address || ""}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              <label
                htmlFor="phoneNum"
                className="block text-md font-medium leading-4 text-gray-900"
              >
                Mobile Number
              </label>
              <div className="relative my-6">
                <input
                  type="text"
                  name="phoneNum"
                  value={user.phoneNum || ""}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              <label
                htmlFor="email"
                className="block text-md font-medium leading-4 text-gray-900"
              >
                E-mail
              </label>
              <div className="relative my-6">
                <input
                  disabled
                  type="email"
                  name="email"
                  value={user.email || ""}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              {user.userType === "admin" && (
                <>
                  <label
                    htmlFor="role"
                    className="block text-md font-medium leading-4 text-gray-900"
                  >
                    Role
                  </label>
                  <div className="relative my-6">
                    <input
                      disabled
                      type="text"
                      name="role"
                      value={user.role || ""}
                      className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                </>
              )}
              <br /><hr /><br />

              {/* Change Password Section */}
              <h2 className="mt-8 text-lg font-medium leading-6 text-gray-900">
                Change Password
              </h2>
              <div className="relative my-6">
                <label
                  htmlFor="oldPassword"
                  className="block text-md font-medium leading-4 text-gray-900"
                >
                  Old Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none"
                />
              </div>

              <div className="relative my-6">
                <label
                  htmlFor="password"
                  className="block text-md font-medium leading-4 text-gray-900"
                >
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none"
                />
              </div>

              <div className="relative my-6">
                <label
                  htmlFor="confirmpassword"
                  className="block text-md font-medium leading-4 text-gray-900"
                >
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none"
                />
              </div>

              <div className="flex">
                <button
                  onClick={ChangePassword}
                  className="ml-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
              <p className="mt-2 text-center text-red-600">{message}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;

import React, { useRef, useState } from "react";

function Profile() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const fileInputRef = useRef(null);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Handle password reset logic here
      setMessage("Password has been reset successfully!");
    } else {
      setMessage("Passwords do not match.");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex items-start justify-center mb-6">
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer group"
            onClick={handleImageClick}
          >
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-semibold">
                Change Image
              </span>
            </div>
          </div>
          <div className="ml-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value="John Doe"
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <input
              type="text"
              value="Role"
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              value="+1234567890"
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value="johndoe@example.com"
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <form onSubmit={handlePasswordReset}>
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-emerald-50 px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
            >
              Reset Password
            </button>

            {message && <p className="mt-4 text-red-500 text-sm">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

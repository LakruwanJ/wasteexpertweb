import React, { useState } from 'react';

const ProfileModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleSaveChanges = () => {
    // Handle saving changes, e.g., updating password in database
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    onClose(); // Close the modal after saving changes
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
        <div className="flex flex-col space-y-4">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              className="h-24 w-24 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Admin"
            />
          </div>
          {/* Admin Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              // Example: Add value and onChange handlers for name
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              // Example: Add value and onChange handlers for email
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              // Example: Add value and onChange handlers for phone
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          {/* Save Changes Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

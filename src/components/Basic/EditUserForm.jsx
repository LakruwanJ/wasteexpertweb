
import React, { useState } from "react";
import axios from 'axios';

const EditUserForm = ({ user, onClose, onUpdate }) => {
    const [username, setUsername] = useState(user.username);
    const [fullName, setfullName] = useState(user.fullName);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [phoneNum, setPhoneNum] = useState(user.phoneNum);
    const [role, setRole] = useState(user.role);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage("");

        try {
            const response = await axios.put(`http://localhost:3001/users/${user._id}`, {
                username,
                email,
                phoneNum,
                role,
            });

            if (response.data.status) {
                setStatusMessage("User updated successfully!");
                onUpdate(response.data.user); // Assuming the updated user object is returned
            } else {
                setStatusMessage("Failed to update user.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setStatusMessage("Error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`w-full h-full bg-gray-600/45 absolute fixed flex items-center justify-center left-0 top-0 z-50 transition-transform`} >
            <div className="bg-white rounded-xl relative w-1/2 p-4">
                <button className=" absolute right-2 top-2" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512"><path fill="#ff4d4d" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                </button>
                <h2 className="text-xl font-medium text-slate-700">Edit User : User Name - {username}</h2><br></br><hr></hr><br></br>
                <form onSubmit={handleSubmit}>
                    <label className="block text-md font-medium leading-4 text-gray-900">
                        Full Name
                    </label>
                    <div className="relative my-6">
            <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setfullName(e.target.value)}
                        required
                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    /></div>

                    <label className="block text-md font-medium leading-4 text-gray-900">
                        Address</label>
                    <div className="relative my-6">
            <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    /></div>

                    <label className="block text-md font-medium leading-4 text-gray-900">
                        Email</label>
                    <div className="relative my-6">
            <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    /></div>

                    <label className="block text-md font-medium leading-4 text-gray-900">
                        Phone Number</label>
                    <div className="relative my-6">
            <input
                        type="number"
                        value={phoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                        required
                        maxLength="10" 
                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    /></div>

                    <label className="block text-md font-medium leading-4 text-gray-900">
                        Role</label>
                    <div className="relative my-6">
            <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    /></div>

                    <button
                        type="submit"
                        className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Updating..." : "Update User"}
                    </button>

                    {statusMessage && <p className="mt-2 text-red-500">{statusMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default EditUserForm;

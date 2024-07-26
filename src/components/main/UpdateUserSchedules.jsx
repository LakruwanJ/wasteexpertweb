import React from "react";

function UpdateUserSchedules({ open, onClose, markerIndex, markerData }) {
    // Extract UserId and WasteType from markerData
    const userId = markerData?.UserId || "N/A"; // Fallback to "N/A" if UserId is not available
    const wasteTypes = markerData?.WasteType || []; // Fallback to an empty array if WasteType is not available

    return (
        <div className={`w-full h-full bg-gray-600/45 absolute flex-row items-center justify-center left-0 top-0 z-50 transition-transform ${open ? "flex" : "hidden"}`}>
            <div className="bg-white rounded-xl relative w-1/2 p-4">
                {/* Modal header */}
                <header id="header-1a" className="flex items-center gap-4">
                    <h3 className="flex-1 text-xl font-medium text-slate-700">
                        Collect Waste
                    </h3>
                    <button
                        onClick={onClose}
                        className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                        aria-label="close dialog"
                    >
                        <span className="relative only:-mx-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" role="graphics-symbol" aria-labelledby="title-79 desc-79">
                                <title id="title-79">Icon title</title>
                                <desc id="desc-79">A more detailed description of the icon</desc>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </button>
                </header>
                <br />
                {/* Modal body */}
                <div id="content-1a" className="flex-1 overflow-auto">
                    <h2><b>Location Number:</b> {markerIndex} &nbsp; | &nbsp; <b>User ID:</b> {userId}</h2>
                    <hr /><br />
                    <h3>Waste Types:</h3>
                    <ul>
                        {wasteTypes.length > 0 ? (
                            wasteTypes.map((waste, index) => (
                                <li key={index}>

                                    <div className="relative my-6">
                                        <input value={waste.quantity} id="id-b02" type="text" name="id-b02" placeholder="your name" className="peer relative h-10 w-full border-b border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                                        <label htmlFor="id-b02" className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                                        {waste.wastetype}
                                        </label>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>No waste types available.</li>
                        )}
                    </ul>
                    {/*    <!-- Component: Plain basic input  --> */}

                </div>
                <br />
                {/* Modal actions */}
                <div className="flex justify-start gap-2">
                    <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                        <span>Collect</span>
                    </button>
                    <button className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                        <span>Decline</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateUserSchedules;

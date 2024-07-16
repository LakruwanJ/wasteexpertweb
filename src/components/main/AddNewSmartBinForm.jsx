import React, { useState, useEffect } from 'react';
import SelectMenu from '../Basic/FormEliments/SelectMenu';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocCheckInArea from '../Functions/LocCheckInArea';

function AddNewSmartBinForm({ onAreaChange, onReloadMap }) {

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
        area: '',
        locationLat: '',
        locationLng: '',
        garbageTypes: '',
        fillLevel: '0',
    });

    const areas = [
        { name: "Area 1" },
        { name: "Area 2" },
        { name: "Area 3" },
        { name: "Area 4" },
    ];

    const garbagetype = [
        { value: 1, name: 'Glass' },
        { value: 2, name: 'Plastics' },
        { value: 3, name: 'Paper' },
        { value: 3, name: 'Organic' },
        { value: 3, name: 'Metal' },

    ];

    const handleChange = (event) => {
        const { name, type, checked } = event.target;

        if (type === 'checkbox') {
            const selectedGarbageTypes = formData.garbageTypes.split(',');

            if (checked) {
                selectedGarbageTypes.push(event.target.value);
            } else {
                const index = selectedGarbageTypes.indexOf(event.target.value);
                selectedGarbageTypes.splice(index, 1);
            }

            setFormData((prevData) => ({
                ...prevData,
                garbageTypes: selectedGarbageTypes.join(','),
            }));
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : event.target.value,
        }));

        if (name === 'area') {
            onAreaChange(event.target.value);
        }

    };

    const handleAddSmartBin = async (event) => {
        event.preventDefault();
        console.log('Form data:', formData);

        if (LocCheckInArea({ checkLat: formData.locationLat, checkLng: formData.locationLng, checkarea: formData.area })) {
            try {
                const response = await axios.post('http://localhost:3001/smartbin/smartbin', { formData });
                console.log(response.data); // Assuming your response has data
                tsu('New Smart Bin Added');
                onReloadMap(); // Trigger reload after successful addition
                //clear form
                setFormData({
                    area: '',
                    locationLat: '',
                    locationLng: '',
                    garbageTypes: '',
                    fillLevel: '0',
                });
                const radiobuttons = document.querySelectorAll('input[type="radio"]');
                radiobuttons.forEach((radio) => radio.checked = false);
            } catch (error) {
                console.error('Error adding schedule:', error);
                ter('Error Adding Smart Bin')
            }

        } else {
            ter('Entered Location Not in Selected Area')
        }




        // try {
        //     axios.post('http://localhost:3001/smartbin/smartbin', { formData })
        //         .then(result => console.log(result))
        //         .catch(error => {
        //             console.error('Error sending schedule:', error);
        //             // Handle specific error scenarios (explained later)
        //         });

        //     console.log('Data sent'); // Moved after the Axios call
        // } catch (error) {
        //     console.error('Unhandled error:', error);
        // }

    };


    return (
        <div class="items-center md:mt-8">
            <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 p-6 border-2">
                <form onSubmit={handleAddSmartBin}>
                    <label for="price" class="block text-md font-medium leading-4 text-gray-900">
                        Select Area
                    </label>
                    <div>
                        <SelectMenu Items={areas} NameVar="area" Title="Select Area" ValueVar={formData.area} OnChangeVar={handleChange} />
                    </div>

                    <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                        Location
                    </label>
                    <div className="relative my-6">
                        <input type='text' name='locationLat' value={formData.locationLat} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                        <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                            Latitude
                        </label>
                    </div>
                    <div className="relative my-6">
                        <input type='text' name='locationLng' value={formData.locationLng} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                        <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500  peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                            Longitude
                        </label>
                    </div>

                    <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900 pb-5">
                        Select Garbage Types
                    </label>
                    <div>
                        {garbagetype.map((type) => (
                            <div className="relative flex flex-wrap items-center">
                                <input
                                    className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                                    type="radio" name="garbageTypes" value={type.name} onChange={handleChange} />
                                <label className="cursor-pointer pl-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                                    htmlFor="id-c01" key={type.value}>
                                    {type.name}
                                </label>
                                <svg
                                    className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-labelledby="title-1 description-1"
                                    role="graphics-symbol"
                                >
                                    <title id="title-1">Circle Shape</title>
                                    <desc id="description-1">
                                        Circle shape to indicate whether the radio input is checked or
                                        not.
                                    </desc>
                                    <circle cx="8" cy="8" r="4" />
                                </svg>
                            </div>
                        ))}
                    </div>

                    <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />

                    <button Type="submit" className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-emerald-200 transition duration-300 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                        <span className="relative only:-mx-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" alt="a">
                            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V256c0-13.3-10.7-24-24-24z" /></svg>
                        </span>
                        <span>Add New Smart Bin</span>
                    </button>

                    <ToastContainer
                    />
                </form>
            </div>
        </div>
    )
}

export default AddNewSmartBinForm

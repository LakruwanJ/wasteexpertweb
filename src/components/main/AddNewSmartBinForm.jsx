import React, { useState, useEffect } from 'react';
import SelectMenu from '../Basic/FormEliments/SelectMenu';
import axios from 'axios';

function AddNewSmartBinForm() {

    const [formData, setFormData] = useState({
        area: '',
        location: '',
        collector: '',
        garbageTypes: '',
    });

    const areas = [
        {
            name: "Area 1",
            content: "a,a,a,a,a"
        },
        {
            name: "Area 2",
            content: "a,a,a,a,a"
        },
        {
            name: "Area 3",
            content: "a,a,a,a,a"
        },
    ];

    const garbagetype = [
        { value: 1, name: 'Glass' },
        { value: 2, name: 'Plastics' },
        { value: 3, name: 'Paper' },

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
    };

    const handleAddSchedule = async (event) => {
        event.preventDefault();
        console.log('Form data:', formData);

        try {
            axios.post('', { formData })
                .then(result => console.log(result))
                .err(err => console.log(err))

            console.error('EData sent');

            // ... (handle response)
        } catch (error) {
            console.error('Error adding schedule:', error);
        }

        // setFormData({
        //     area: '',
        //     date: '',
        //     collector: '',
        //     garbageTypes: '',
        // });

        // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        // checkboxes.forEach((checkbox) => checkbox.checked = false);
    };


    return (
        <div class="items-center md:mt-8">
            <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 p-6 border-2">
                <form onSubmit={handleAddSchedule}>
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
                        <input type='text' name='locationLan' value={formData.locationLan} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
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
                                <input className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                                    type="checkbox" name="garbageTypes" value={type.name} onChange={handleChange} />
                                <label className="cursor-pointer pl-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                                    htmlFor="id-c01" key={type.value}>
                                    {type.name}
                                </label>
                                <svg className="pointer-events-none absolute left-0 top-1 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                                    viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" aria-labelledby="title-1 description-1" role="graphics-symbol" >
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
                                    />
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
                </form>
            </div>
        </div>
    )
}

export default AddNewSmartBinForm

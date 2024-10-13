import React, { useState, useEffect } from 'react';
import SelectMenu from '../Basic/FormEliments/SelectMenu';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//data
import { areas } from '../Data/AreaNames';
import { tsu, ter } from '../Functions/ResponseToste';
//functions
import GetAreaForLoc from '../Functions/GetAreaForLoc';
import GetQuantityByCate from '../Functions/GetQuantityByCate';

function AddNewScheduleForm({ onAreaChange, onReloadMap }) {
    const [formData, setFormData] = useState({
        area: '',
        date: '',
        collector: '',
        locations: [],
        quantity: []
    });

    //get collectors
    const [colData, setColData] = useState([]);
    const fetchData = async (callback) => {
        try {
            const response = await axios.post('http://localhost:3001/addCollector/getAllCol'); // Use Axios for GET request
            setColData(response.data.collectors);
            callback();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //map collectors
    const collectors = [];
    colData.forEach(item => {
        collectors.push({
            name: item.username,
            vehicalNo: item.vehicalNo,
            value: item._id
        });
    });

    useEffect(() => {
        fetchData(() => { });
        fetchScheduleWaste();
    }, []);

    const handleChange = (event) => {
        const { name, type, checked } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : event.target.value,
        }));

        if (name === 'area') {
            setFormData(prevData => ({
                ...prevData,
                locations: []
            }));

            onAreaChange(event.target.value);

            if (event.target.value == 'Area 1') {
                setFormData(prevData => ({
                    ...prevData,
                    locations: sortedScheduleWaste.Area1,
                    quantity: GetQuantityByCate(sortedScheduleWaste.Area1)
                }));
            }
            if (event.target.value == 'Area 2') {
                setFormData(prevData => ({
                    ...prevData,
                    locations: sortedScheduleWaste.Area2,
                    quantity: GetQuantityByCate(sortedScheduleWaste.Area2)
                }));
            }
            if (event.target.value == 'Area 3') {
                setFormData(prevData => ({
                    ...prevData,
                    locations: sortedScheduleWaste.Area3,
                    quantity: GetQuantityByCate(sortedScheduleWaste.Area3)
                }));
            }
            if (event.target.value == 'Area 4') {
                setFormData(prevData => ({
                    ...prevData,
                    locations: sortedScheduleWaste.Area4,
                    quantity: GetQuantityByCate(sortedScheduleWaste.Area4)
                }));
            }
            console.log(formData.locations)
        }
    };

    //sort Schedules according to areas while fetching
    const [sortedScheduleWaste, setSortedScheduleWaste] = useState({
        Area1: [],
        Area2: [],
        Area3: [],
        Area4: [],
    });
    const fetchScheduleWaste = async () => {
        try {
            const response = await axios.post('http://localhost:3001/schedule/getAllScheduleWaste');
            const allScheduleWaste = response.data.allScheduleWaste;

            const sortedData = {
                Area1: [],
                Area2: [],
                Area3: [],
                Area4: [],
            };

            allScheduleWaste.forEach((item) => {
                const area = GetAreaForLoc({ checkLat: item.location.lat, checkLng: item.location.lng });

                console.log(area);
                if (area) {
                    sortedData[area].push(item);
                }
            });

            setSortedScheduleWaste(sortedData);
            console.log(sortedScheduleWaste)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddSchedule = async (event) => {
        event.preventDefault();
        console.log('Form data:', formData);

        if (true) {
            try {
                const response = await axios.post('http://localhost:3001/schedulePickup/newschedulepickup', { formData });

                //update db - http://localhost:3001/schedulee/upsateschedule
                for (const location of formData.locations) {
                    await updateScheduleDatabase(location["id"],formData.date);
                }

                tsu('New Schedule Pickup Added');
                onReloadMap(); // Trigger reload after successful addition
                //clear form
                setFormData({
                    area: '',
                    date: '',
                    collector: '',
                    locations: [],
                    quantity: []
                });
                //resetmap selected area
                onAreaChange();


            } catch (error) {
                console.error('Error Adding schedule:', error);
                ter('Error Adding schedule Pickup')
            }
        } else {
            ter('err')
        }
    };

    const updateScheduleDatabase = async (id,date) => {
        try {
            const response = await axios.post('http://localhost:3001/schedule/updateScheduleState', { id,date });
            console.log('Schedule updated:', response.data);
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
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
                        Select Date
                    </label>
                    <div className="relative my-6">
                        <input type='date' name='date' value={formData.date} onChange={handleChange} required className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                        <label for="id-date07" className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                            Date
                        </label>
                    </div>

                    <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900">
                        Select Collector
                    </label>
                    <SelectMenu Items={collectors} NameVar="collector" Title="Select Collector" ValueVar={formData.collector} OnChangeVar={handleChange} />

                    <label htmlFor="price" className="block text-md font-medium leading-4 text-gray-900 pb-5">
                        Select Garbage Types
                    </label>

                    <div className="p-3">
                        <button className="block w-full rounded-lg bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-600">
                            Add New Schedule Pickup
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddNewScheduleForm;

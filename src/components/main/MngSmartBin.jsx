import React, { useState, useEffect } from 'react';
import BinCard from '../Basic/BinCard';
import axios from 'axios';


function MngSmartBin() {

    const [smartbins, setSmartbins] = useState([]);

    //fetch smart bins from db
    const fetchSmartBin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/smartbin/getSmartBin');
            setSmartbins(response.data.smartbins);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchSmartBin(() => { });
    }, []);

    return (
        <div className="container mx-auto p-4">
            {console.log(smartbins)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {smartbins.map((bin) => (
                    <BinCard binData={bin} />
                ))}

            </div>
        </div>
    )
}

export default MngSmartBin

import React from 'react';
// Images
import foodbin from '../Images/foodbinL.png';
import glassbin from '../Images/glassbinL.png';
import metalbin from '../Images/metalbinL.png';
import paperbin from '../Images/paperbinL.png';
import plasticbin from '../Images/plasticbinL.png';

function BinCard({ binData }) {
    const { area, garbageTypes, fillLevel } = binData;

    // Determine the image based on the garbage type
    const getImage = () => {
        switch (garbageTypes.toLowerCase()) {
            case 'organic':
                return foodbin;
            case 'glass':
                return glassbin;
            case 'metal':
                return metalbin;
            case 'paper':
                return paperbin;
            case 'plastics':
                return plasticbin;
            default:
                return null; // Return null if no matching type is found
        }
    };

    return (
        <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
            <div className="p-6">
                <header className="mb-4">
                    <h3 className="text-xl font-medium text-slate-700">
                        {area}
                    </h3>
                    <p className="text-slate-400">
                        Type: {garbageTypes}
                    </p>

                    {/* Show image */}
                    {getImage() && (
                        <img
                            src={getImage()}
                            alt={`${garbageTypes} bin`}
                            className="mx-auto my-4 h-20"
                        />
                    )}

                    <p className="text-slate-400">
                        Fill Level: {(fillLevel * 100).toFixed(0)}%
                    </p>
                </header>
            </div>
        </div>
    );
}

export default BinCard;

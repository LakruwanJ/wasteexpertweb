import React from 'react'

function Button({ btnInfo }) {
    return (
        <>
            {/*<!-- Component: Base primary elevated button --> */}
            <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-emerald-200 transition duration-300 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                
                <span className="relative only:-mx-5">{btnInfo.icon}</span>
                <span>{btnInfo.name}</span>
            </button>
            {/*<!-- End Base primary elevated button --> */}
        </>
    )
}

export default Button

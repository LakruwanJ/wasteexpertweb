import React from "react";
import CreateUserForm  from "./CreateUserForm";

function NewUser({ name }) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <>
      <CreateUserForm open={open} onClose={() => setOpen(false)} usertype={name}/>
      <button
        onClick={() => setOpen(true)}
        className="overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-white text-center text-slate-500 shadow-md shadow-slate-200 p-4 items-center"
      >
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          <span>Add New {name}</span>
        </div>
      </button>
      {/*<!-- End E-commerce card --> */}
    </>
  );
}

export default NewUser

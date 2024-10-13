import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import userImg from "../Images/user.png"
import axios from 'axios';

function UserCard({ user, type }) {
  const [isShowing, setIsShowing] = useState(false)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false) // For loading state
  const [sendStatus, setSendStatus] = useState(null) // To show success or error message
  const wrapperRef = useRef(null)

  // Modal closing when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  // Handle body scroll and focus trap when modal is open
  useEffect(() => {
    let html = document.querySelector("html")

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden"

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        const modal = document.querySelector("#modal")

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0]
        const focusableContent = modal.querySelectorAll(focusableElements)
        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false)
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9

          if (!isTabPressed) {
            return
          }

          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus()
              e.preventDefault()
            }
          }
        })

        firstFocusableElement.focus()
      } else {
        html.style.overflowY = "visible"
      }
    }
  }, [isShowing])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    setSendStatus(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          subject,
          message,
        }),
      })

      if (response.ok) {
        setSendStatus("Email sent successfully!")
      } else {
        setSendStatus("Failed to send email. Please try again.")
      }
    } catch (error) {
      setSendStatus("Error occurred. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  //handle delete
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    let _id = user._id;
    console.log("user Id",_id)

    if (confirmed) {
      try {
        let response;
  
        switch (type) {
          case 'Admin':
            response = await axios.post('http://localhost:3001/addadmin/deleteAdmin', { _id });
            if (response.data.status) {
              console.log("Admin deleted successfully");
              // Handle success, e.g., refresh the page or update the UI
            } else {
              console.error("Failed to delete admin:", response.data.message);
            }
            break;
  
          case 'Collector':
            response = await axios.post('http://localhost:3001/addCollector/deleteCol', { _id });
            if (response.data.status) {
              console.log("Collector deleted successfully");
              // Handle success
            } else {
              console.error("Failed to delete collector:", response.data.message);
            }
            break;
  
          case 'Dispatcher':
            console.log(_id)
            response = await axios.post('http://localhost:3001/adddispatcher/deleteDis', { _id });
            if (response.data.status) {
              console.log("Dispatcher deleted successfully");
              // Handle success
            } else {
              console.error("Failed to delete dispatcher:", response.data.message);
            }
            break;
  
          // case 'Resident':
          //   response = await axios.post('http://localhost:3001/resident/deleteResident', { _id });
          //   if (response.data.status) {
          //     console.log("Resident deleted successfully");
          //     // Handle success
          //   } else {
          //     console.error("Failed to delete resident:", response.data.message);
          //   }
          //   break;
  
          default:
            console.error("Invalid user type");
            break;
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  ;

  return (
    <>
    {console.log("user",user._id)}

      {/* User Card Component */}
      <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
        <figure className="p-6 pb-0 text-center">
          <span className="relative inline-flex h-30 w-30 items-center justify-center rounded-full text-white">
            <img
              src={user.image || userImg}
              alt="user name"
              title="user name"
              width="120"
              height="120"
              className="max-w-full rounded-full"
            />
          </span>
        </figure>
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
              {user.username}
            </h3>
            <p className="text-slate-400">{user.role || user.vehicalNo}</p>
          </header>
          <p>{user.jobs}</p>
        </div>

        {/* phoneNum */}
        <div className="flex justify-end p-6 pt-0 pb-2">
          <button
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-50 px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
          >
            <span>{user.phoneNum || "Mobile Number"}</span>
          </button>
        </div>

        {/* Email Button with Modal Trigger */}
        <div className="flex justify-end p-6 pt-0 pb-2">
          <button
            onClick={() => setIsShowing(true)}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-50 px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
          >
            <span>{user.email || "email"}</span>
          </button>
        </div>

        {/* Other Buttons */}
        <div className="flex justify-end gap-2 p-6 pt-0">
          <button className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none">
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none"
          >
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Modal Component */}
      {isShowing &&
        ReactDOM.createPortal(
          <div
            className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
            aria-labelledby="header-1a content-1a"
            aria-modal="true"
            tabIndex="-1"
            role="dialog"
          >
            {/* Modal */}
            <div
              className="flex max-h-[90vh] w-11/12 max-w-2xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
              ref={wrapperRef}
              id="modal"
              role="document"
            >
              {/* Modal header */}
              <header id="header-1a" className="flex items-center gap-4">
                <h4 className="flex-1 text-xl font-medium text-slate-700">
                  Send email to:  {user.email}
                </h4>
                <button
                  onClick={() => setIsShowing(false)}
                  className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none"
                  aria-label="close dialog"
                >
                  <span className="relative only:-mx-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      role="graphics-symbol"
                      aria-labelledby="title-79 desc-79"
                    >
                      <title id="title-79">Icon title</title>
                      <desc id="desc-79">
                        A more detailed description of the icon
                      </desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </button>
              </header>
              {/* Modal body */}
              <form onSubmit={handleSubmit}>
                <label htmlFor="subject" className="block text-md font-medium leading-4 text-gray-900">
                  Subject
                </label>
                <div className="relative my-6">
                  <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    placeholder="Enter subject"
                  />
                </div>
                <label htmlFor="message" className="block text-md font-medium leading-4 text-gray-900">
                  Message
                </label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows="5"
                  className="peer relative my-2 w-full rounded border border-slate-200 px-4 py-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  placeholder="Write your message"
                ></textarea>
                <button
                  type="submit"
                  className="mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 py-2 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Email"}
                </button>
                {sendStatus && <p className="mt-2 text-sm text-red-500">{sendStatus}</p>}
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default UserCard

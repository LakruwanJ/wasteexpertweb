import React, { useState } from "react";
import SideNav from "../main/SideNav";

const navItems = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18M3 9h18M3 15h18M3 21h18"
          />
        </svg>
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: <i class="fa-solid fa-id-card"></i>,
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9.75V3M12 9.75L7.75 7.5M12 9.75L16.25 7.5M12 14.25V21M12 14.25L7.75 16.5M12 14.25L16.25 16.5M7.75 7.5L3 9.75L7.75 16.5M7.75 16.5L12 14.25M16.25 7.5L21 9.75L16.25 16.5M16.25 16.5L12 14.25"
          />
        </svg>
      ),
    },
  ];

const Home = () => {

    const [selectedNavItem, setSelectedNavItem] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedNavItem) {
      case "Dashboard":
        return <div>Dashboard Content</div>;
      case "Profile":
        return <div>Profile Content</div>;
      case "Settings":
        return <div>Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };


    return (

    <div className="flex flex-col lg:flex-row">
      <SideNav navItems={navItems} onNavItemSelect={setSelectedNavItem}/>
      <main className="flex-1 p-6 mt-16 lg:mt-0 lg:ml-72"> {/* Added mt-16 for mobile and lg:mt-0 for large screens */}
      {renderContent()}
      </main>
    </div>
        
    );
};

export default Home;

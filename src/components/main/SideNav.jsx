import React, { useState } from 'react';
import logo from '../Images/Logo.png';

const SideNav = ({ navItems, onNavItemSelect }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <>
      {/* Mobile trigger */}
      <button
        title="Side navigation"
        type="button"
        className={`fixed left-6 top-6 z-40 block h-10 w-10 rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen ? "opacity-100 transform rotate-45" : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? "true" : "false"}
        aria-controls="nav-menu-1"
        onClick={handleToggleSidebar}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"></span>
          <span className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition-all duration-300"></span>
          <span className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"></span>
        </div>
      </button>

      {/* Side Navigation */}
      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a
          className="flex items-center gap-2 whitespace-nowrap p-6 text-xl font-medium focus:outline-none"
          href="#"
        >
          <img src={logo} alt="Logo" />
        </a>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              {navItems &&
                navItems.map((item, index) => (
                  <li className="px-3" key={index}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavItemSelect(item.label);
                        handleToggleSidebar(); // Close sidebar after clicking item
                      }}
                    >
                      <div className="flex items-center self-center">
                        {item.icon}
                      </div>
                      <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                        {item.label}
                      </div>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Backdrop */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors lg:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
    </>
  );
};

export default SideNav;

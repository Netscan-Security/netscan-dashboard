import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BarChartBig, Bug, Crosshair } from "lucide-react";

const Sidebar: React.FC = () => {
  const sidebarData = [
    {
      name: "Dashboard",
      icon: BarChartBig,
      path: "/",
    },
    {
      name: "Targets",
      icon: Crosshair,
      path: "/targets",
    },
    {
      name: "Vulnerabilities",
      icon: Bug,
      path: "/vulnerabilities",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex flex-col bg-white w-fit">
        <div className="px-6 pt-8">
          <img src="/brand/logo/logo-brand.svg" alt="Brand Logo" />
        </div>
        <div className="flex flex-col flex-grow gap-1 p-4">
          {sidebarData.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center w-full px-3 py-2 font-semibold transition duration-150 ease-in-out rounded-md group text-gray-950 hover:bg-blue-100 hover:text-blue-600
                ${isActive && "bg-blue-100 text-blue-600"}
                `
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-6 h-6 text-gray-500 group-hover:text-blue-400 ${
                      isActive && "text-blue-400"
                    }`}
                  />
                  <span className={`ml-4 ${isActive && "text-blue-600"}`}>
                    {item.name}
                  </span>
                </>
              )}
              {/* <item.icon className="w-6 h-6 text-gray-500 group-hover:text-blue-400" />
              <span className="ml-4">{item.name}</span> */}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;

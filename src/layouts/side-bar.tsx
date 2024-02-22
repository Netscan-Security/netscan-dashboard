import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChartBig,
  Bug,
  Crosshair,
  LifeBuoy,
  LogOut,
  Settings,
} from "lucide-react";

// Local imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col justify-between p-4 bg-white w-fit">
        <div>
          <div className="px-2 py-4">
            <img
              src="/brand/logo/logo-brand.svg"
              alt="Brand Logo"
              className="hidden sm:block"
            />
            <img
              src="/netscan-logo.svg"
              alt="Brand Logo"
              className="block sm:hidden"
            />
          </div>
          <div className="flex flex-col flex-grow gap-1 ">
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
                    <span
                      className={`ml-4 ${
                        isActive && "text-blue-600"
                      } hidden sm:block`}
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `flex items-center w-full px-3 py-2 font-semibold transition duration-150 ease-in-out rounded-md group text-gray-950 hover:bg-blue-100 hover:text-blue-600
              ${isActive && "bg-blue-100 text-blue-600"}
              `
            }
          >
            {({ isActive }) => (
              <>
                <LifeBuoy
                  className={`w-6 h-6 text-gray-500 group-hover:text-blue-400 ${
                    isActive && "text-blue-400"
                  }`}
                />
                <span
                  className={`ml-4 ${
                    isActive && "text-blue-600"
                  } hidden sm:block`}
                >
                  Support
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center w-full px-3 py-2 font-semibold transition duration-150 ease-in-out rounded-md group text-gray-950 hover:bg-blue-100 hover:text-blue-600
              ${isActive && "bg-blue-100 text-blue-600"}
              `
            }
          >
            {({ isActive }) => (
              <>
                <Settings
                  className={`w-6 h-6 text-gray-500 group-hover:text-blue-400 ${
                    isActive && "text-blue-400"
                  }`}
                />
                <span
                  className={`ml-4 ${
                    isActive && "text-blue-600"
                  } hidden sm:block`}
                >
                  Settings
                </span>
              </>
            )}
          </NavLink>
          <SidebarAccount />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

const SidebarAccount = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 py-3 border-t">
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/22730819?v=4" />
        <AvatarFallback>JM</AvatarFallback>
      </Avatar>
      <div className="hidden sm:block">
        <h2 className="text-sm font-semibold">Jackson Makinda</h2>
        <p className="text-xs">jackson@netscan.security </p>
      </div>
      <LogOut
        onClick={() => {
          const logout = confirm("Are you sure you want to logout?");
          if (logout) {
            navigate("/sign-in");
          }
        }}
        className="hidden ml-5 text-red-600 cursor-pointer sm:block"
      />
    </div>
  );
};

export default Sidebar;

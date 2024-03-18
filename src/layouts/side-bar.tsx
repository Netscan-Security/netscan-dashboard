import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  BarChartBig,
  Bug,
  LifeBuoy,
  LogOut,
  Settings,
  PcCase,
  User2,
} from "lucide-react";

// Local imports
import { Button } from "@/components/ui/button";
import { useAuth } from "@/shared/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Sidebar: React.FC = () => {
  const sidebarData = [
    {
      name: "Dashboard",
      icon: BarChartBig,
      path: "/",
    },
    {
      name: "Users",
      icon: User2,
      path: "/users",
    },
    {
      name: "Hosts",
      icon: PcCase,
      path: "/hosts",
    },
    {
      name: "Vulnerabilities",
      icon: Bug,
      path: "/vulnerabilities",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="fixed flex flex-col justify-between h-full p-2 bg-white sm:p-4 xl:p-6 w-[70px] sm:w-fit">
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
              className="block w-10 sm:hidden"
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
      <div className="flex flex-col flex-grow p-2 sm:p-4 xl:p-6 ml-[70px] sm:ml-[300px]">
        <Outlet />
      </div>
    </div>
  );
};

const SidebarAccount = () => {
  const { user, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex items-center gap-3 py-3 border-t">
      <Avatar>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>
          {`${user?.firstName?.[0]}${user?.lastName?.[0]}`}
        </AvatarFallback>
      </Avatar>
      <div className="hidden sm:block">
        <h2 className="text-sm font-semibold">{`${user?.firstName} ${user?.lastName}`}</h2>
        <p className="text-xs">{user?.email}</p>
      </div>
      <Dialog open={openModal} onOpenChange={(open) => setOpenModal(open)}>
        <DialogTrigger asChild>
          <LogOut
            onClick={() => setOpenModal(true)}
            className="hidden ml-5 text-red-600 cursor-pointer sm:block"
          />
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">Logout</h2>
            <p className="text-sm text-center">
              Are you sure you want to logout?
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="destructive"
                onClick={() => {
                  logout();
                  setOpenModal(false);
                }}
              >
                Logout
              </Button>
              <Button variant="secondary" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;

"use client";

import { usePathname, useRouter } from "next/navigation";
import useGetSession from "../../Hooks/useGetSession";
import LogoButton from "../LogoButton/LogoButton";
import LogOutButton from "../LogOutButton";
import { navLinks } from "./sidebar.description";
import SidebarItem from "./SidebarItem";
import { locationPath } from "../../utils/constants";
import RTButton from "../../shared/RTButton";

export default function Sidebar({
  expandedSidebar,
  setExpandedSidebar,
  showLogo,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const loginButtons = [
    {
      label: "Login",
      onClick: () => router.push(locationPath.login),
      disabled: pathname === locationPath.login,
    },
    {
      label: "Register",
      onClick: () => router.push(locationPath.register),
      disabled: pathname === locationPath.register,
    },
  ];

  const { session, isLoading } = useGetSession();

  return (
    <div className="h-full bg-white z-50">
      {showLogo && (
        <div className="h-[75px] flex items-center ml-[25px]">
          <LogoButton setExpandedSidebar={setExpandedSidebar} />
        </div>
      )}
      <nav className="h-full flex flex-col bg-white border-r shadow-sm px-3">
        <div className="flex flex-col  items-center text-start px-3">
          {navLinks?.map(({ name, link, icon }) => {
            return (
              <SidebarItem
                key={name}
                text={name}
                icon={icon}
                expanded={expandedSidebar}
                alert={true}
                link={link}
              />
            );
          })}
        </div>
        <div className="w-full flex flex-col justify-between mt-6 px-2 gap-2">
          {isLoading ? (
            ""
          ) : session ? (
            <LogOutButton className="flex xsm:hidden px-5" />
          ) : (
            loginButtons?.map(({ label, onClick, disabled }) => {
              return (
                <RTButton
                  key={label}
                  onClick={onClick}
                  disabled={disabled}
                  className="block xsm:hidden px-5"
                >
                  {label}
                </RTButton>
              );
            })
          )}
        </div>
      </nav>
    </div>
  );
}

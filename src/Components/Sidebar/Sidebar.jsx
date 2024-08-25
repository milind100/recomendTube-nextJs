"use client";

import LogoButton from "../LogoButton/LogoButton";
import { navLinks } from "./sidebar.description";
import SidebarItem from "./SidebarItem";

export default function Sidebar({
  expandedSidebar,
  setExpandedSidebar,
  showLogo,
}) {
  return (
    <div className="h-full bg-white ">
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
      </nav>
    </div>
  );
}

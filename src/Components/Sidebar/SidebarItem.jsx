"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({ icon, text, link, expanded, disabled }) => {
  const pathname = usePathname();
  return (
    <Link
      href={`${disabled ? "#" : link}`}
      className={`
    relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer 
    ${
      pathname === link
        ? "bg-gray-100 text-orange-500"
        : "hover:bg-gray-100 text-black"
    }
`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all text-base font-semibold ${
          expanded ? "w-40 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </Link>
  );
};

export default SidebarItem;

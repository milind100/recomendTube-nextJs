"use client";
import { usePathname, useRouter } from "next/navigation";
import { locationPath } from "../../utils/constants";
import RTButton from "../../shared/RTButton";
import LogoButton from "../LogoButton/LogoButton";
import LogOutButton from "../LogOutButton";
import useGetSession from "../../Hooks/useGetSession";

const Navbar = ({ setExpandedSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { session, isLoading } = useGetSession();

  // const isAuthenticated = false;

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

  return (
    <div className="h-[60px] bg-white w-full  flex px-2 sm:px-[25px] items-center justify-between relative top-0 left-0 text-base z-50">
      {/* navbutton container  */}

      <LogoButton setExpandedSidebar={setExpandedSidebar} />
      <div className="flex h-full items-center "></div>

      <div className="flex gap-2">
        {isLoading ? (
          ""
        ) : session ? (
          <div className="flex justify-center items-center h-full gap-2 ">
            <span className="bg-yellow-300 p-1  px-2  text-xs xsm:text-sm rounded-xl font-bold">
              <span className="text-red-600">@</span>
              {session?.username}
            </span>
            <LogOutButton className="hidden xsm:flex" />
          </div>
        ) : (
          loginButtons?.map(({ label, onClick, disabled }) => {
            return (
              <RTButton
                key={label}
                onClick={onClick}
                disabled={disabled}
                className="hidden xsm:block"
              >
                {label}
              </RTButton>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Navbar;

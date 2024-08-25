"use client";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import ToastProvider from "./ToastProvider";

const showFloatNavPath = [
  "watch",
  "create-playlist",
  "login",
  "register",
  "forgot-password",
  "verify-email",
  "playlist",
];

const MainLayoutWrapper = ({ children }) => {
  const [inPageSidebar, setInpageSidebar] = useState(true);
  const [floatSidebar, setfloatSidebar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);

  const pathname = usePathname();

  // Update screenWidth on window resize
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showSideNav = !(
    showFloatNavPath?.includes(pathname.split("/")[1]) || screenWidth < 430
  );

  useEffect(() => {
    setInpageSidebar(true);
    setfloatSidebar(false);
  }, [pathname]);

  return (
    <div className="min-h-screen min-w-full relative">
      <div className="fixed w-screen">
        <Navbar
          setExpandedSidebar={!showSideNav ? setfloatSidebar : setInpageSidebar}
        />
      </div>
      {!showSideNav && (
        <div
          onClick={() => setfloatSidebar(false)}
          className={`absolute top-0 left-0 z-40 flex w-full h-full bg-black bg-opacity-25 overscroll-none overflow-hidden ${
            floatSidebar ? "visible" : "hidden"
          }`}
        />
      )}

      <div
        className={`absolute transition-all overflow-hidden top-0 h-screen z-50  
          ${floatSidebar ? "left-0" : "-left-72"}`}
      >
        <Sidebar
          expandedSidebar={floatSidebar}
          setExpandedSidebar={setfloatSidebar}
          showLogo={true}
        />
      </div>
      <div className="flex">
        {showSideNav ? (
          <div className="mt-[60px]">
            <Sidebar
              expandedSidebar={inPageSidebar}
              setExpandedSidebar={setInpageSidebar}
              showLogo={false}
            />
          </div>
        ) : (
          <div />
        )}

        <div className="px-2 h-[calc(100vh-60px)] mt-[60px] w-screen overflow-y-auto">
          <ToastProvider>{children}</ToastProvider>
        </div>
      </div>
    </div>
  );
};

export default MainLayoutWrapper;

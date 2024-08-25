import Image from "next/image";

const AuthPagesLAyout = ({ children }) => {
  return (
    <div
      // initial={{ opacity: 0, scale: 0.5 }}
      // animate={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 0.2 }}
      className="flex  w-screen  justify-center px-5 md:px-20 pb-10"
    >
      <div className="w-[500px] hidden md:flex flex-col gap-0 justify-center items-center ">
        <div className="relative w-2/3 h-2/3">
          <Image alt="" src="/logoName.png" className="object-fit" fill />
        </div>
        <h1>
          A platform where you can create playlist collection of youtube videos
          and share the playlist to your colligues and friends for study purpose
        </h1>
      </div>
      <div className="w-full md:w-1/2 flex justify-center px-0 lg:px-12">
        <div className="bg-white shadow-md  rounded-lg p-6 sm:px-10 lg:px-15 pt-6 pb-8 mt-4  w-full flex flex-col justify-between min-h-[570px] max-w-[500px] ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPagesLAyout;

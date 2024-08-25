import Image from "next/image";

const MainLogo = ({ onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="h-full flex items-center justify-center cursor-pointer"
    >
      <div className="flex justify-center items-center h-[30px] bg-yellow-200 p-3 px2 rounded-2xl">
        <Image
          alt=""
          src="/mainLogo.png"
          className="object-contain"
          width={35}
          height={15}
        />
        <span className="font-bold text-sm  space-x-0 ">
          Recomend<span className="text-red-500 ">Tube</span>
        </span>
      </div>
    </div>
  );
};

export default MainLogo;

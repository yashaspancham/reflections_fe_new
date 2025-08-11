import Image from "next/image";

const SideBarMenu = () => {
  return (
    <div className="fixed lg:sticky z-10 left-0 bottom-0 lg:top-0 bg-blue-800 h-20 min-w-full lg:min-w-[200px] lg:h-[100vh]">
      <div className="flex lg:pt-20 lg:flex-col max-lg:gap-10 sm:gap-5 items-center max-lg:justify-center">
        <button className="flex items-center justify-center gap-5 lg:w-[100%] hover:cursor-pointer max-lg:mt-5 max-lg:p-3 lg:py-5 rounded-md  text-md sm:text-lg lg:text-2xl text-white max-lg:bg-blue-900 hover:bg-blue-900">
          <Image
            src={"/icons/profileIcon.png"}
            alt="Profile Icon"
            width="40"
            height="40"
            className="max-sm:hidden"
          />
          <div>Profile</div>
        </button>
        <button className="flex items-center justify-center gap-5 lg:w-[100%] hover:cursor-pointer max-lg:mt-5 max-lg:p-3 lg:py-5 rounded-md  text-md sm:text-lg lg:text-2xl text-white max-lg:bg-blue-900 hover:bg-blue-900">
          <Image
            src={"/icons/entryIcon.png"}
            alt="Entries Icon"
            width="40"
            height="40"
            className="max-sm:hidden"
          />
          <div>Entries</div>
        </button>
        <button className="flex items-center justify-center gap-5 lg:w-[100%] hover:cursor-pointer max-lg:mt-5 max-lg:p-3 lg:py-5 rounded-md  text-md sm:text-lg lg:text-2xl text-white max-lg:bg-blue-900 hover:bg-blue-900">
          <Image
            src={"/icons/mediaIcon.png"}
            alt="Media Icon"
            width="40"
            height="40"
            className="max-sm:hidden"
          />
          <div>Media</div>
        </button>
      </div>
    </div>
  );
};

export default SideBarMenu;

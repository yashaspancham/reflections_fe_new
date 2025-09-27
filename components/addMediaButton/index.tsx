"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getColor } from "@/utils/getColorForSideMenu";
import { uploadToS3 } from "@/APIs/S3/s3"; // adjust the path if needed


interface AddMediaButtonProps {
  setUrlList: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddMediaButton: React.FC<AddMediaButtonProps> = ({ setUrlList }) => {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [disableButton, setDisableButton] = useState(false);

  const handleClick = () => {
    setDisableButton(true);
    fileInputRef.current?.click();
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setDisableButton(false);
    if (!file) {
      return
    };
    setDisableButton(true);
    const result = await uploadToS3(file);
    console.log("Uploaded file:", result);
    if (result !== undefined) {
      setUrlList((prev: any) => [...prev, result])
    }
    setDisableButton(false);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <button
        disabled={disableButton}
        onClick={handleClick}
        className={`z-10 fixed right-5 lg:right-20 bottom-36 sm:bottom-24 lg:bottom-10
          ${disableButton ? "bg-gray-500" : `${getColor(pathname)[2]} ${getColor(pathname)[1]}`}
           py-1 px-2 lg:px-3 lg:py-2 rounded-xl 
          hover:cursor-pointer`}
      >
        <p className="text-white text-5xl">+</p>
      </button>
    </div>
  );
};

export default AddMediaButton;
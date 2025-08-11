import { entryType } from "@/utils/types";
import Image from "next/image";

type EntryCardProps = {
  entry: entryType;
};

const EntryCard = ({ entry }:EntryCardProps) => {
  return (
    <div
      className="flex flex-row md:flex-col max-md:py-5 max-md:gap-2 md:gap-3 max-md:border-b-1 max-md:mt-2 max-md:border-black md:max-w-[250px] max-h-[450px] p-3 md:p-5 md:bg-gray-50 md:rounded-lg hover:cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out"
    >
      <Image
        src={"/defaultImageForEntry.png"}
        alt="coveriamgeForentry"
        width="200"
        height="200"
        className="rounded-lg"
      />
      <div className="flex flex-col gap-2 md:gap-4">
        <p className="text-lg font-bold truncate max-[321px]:max-w-[150px] max-[280px]:max-w-[100px] max-[400px]:max-w-[200px]">
          {entry.title}
        </p>
        <p className="text-sm text-gray-500">
          Created at: {new Date(entry.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          Updated at: {new Date(entry.updatedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 max-h-[100px] overflow-hidden">
          {entry.content}
        </p>
      </div>
    </div>
  );
};
export default EntryCard;

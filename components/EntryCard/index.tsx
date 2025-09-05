import { entryType } from "@/utils/types";

type EntryCardProps = {
  entry: entryType;
};

const EntryCard = ({ entry }: EntryCardProps) => {
  return (
    <div
      className={`
        flex flex-row md:flex-col gap-3 w-full
        border-b md:border-0 md:max-w-[250px] md:max-h-[450px] md:h-[450px]
        py-3 md:p-5 md:bg-gray-50 md:rounded-lg
        hover:cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out
      `}
    >
      <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 md:w-[200px] md:h-[200px]">
        <img
          src={!entry.url ? "/defaultImageForEntry.png" : entry.url}
          alt="coverImageForEntry"
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-1 md:gap-2 flex-1">
        <p className="text-sm md:text-lg font-bold truncate max-w-[200px] md:max-w-full">
          {entry.title}
        </p>

        <div className="text-xs md:text-sm text-gray-500">
          <p>Created: {new Date(entry.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(entry.lastUpdated).toLocaleDateString()}</p>
        </div>

        <p className="text-gray-700 text-sm md:text-base max-h-[80px] md:max-h-[100px] overflow-hidden">
          {entry.content}
        </p>
      </div>
    </div>
  );
};
export default EntryCard;

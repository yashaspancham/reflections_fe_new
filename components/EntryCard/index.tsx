import { entryType } from "@/utils/types";

type EntryCardProps = {
  entry: entryType;
};

const EntryCard = ({ entry }: EntryCardProps) => {
  return (
    <div
      className={`
      flex flex-row max-md:px-1 md:flex-col max-md:py-5 gap-2 md:gap-3 max-md:w-full
      max-md:border-b-1 max-md:mt-2 max-md:border-black md:max-w-[250px] md:max-h-[450px] md:h-[450px] md:p-5 md:bg-gray-50
      md:rounded-lg hover:cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out
      `}
    >
      <div
        className="
        self-center
      max-[400px]:min-h-[100px] max-[400px]:h-[100px] max-[400px]:w-[100px] max-[400px]:max-w-[100px] 
       min-h-[200px] h-[200px]  w-[200px] min-w-[200px]
        flex items-center justify-center"
      >
        <img
          src={!entry.url ? "/defaultImageForEntry.png" : entry.url}
          alt="coveriamgeForentry"
          className="rounded-lg max-[400px]:max-h-[100px] max-[400px]:max-w-[100px]  max-h-[200px] max-w-[200px] "
        />
      </div>
      <div className="flex flex-col  gap-1 md:gap-2 max-md:w-fit">
        <p className="text-md md:text-lg font-bold truncate overflow-hidden max-sm:max-w-[200px] max-[400px]:max-w-[120px] max-[350px]:max-w-[50px]">
          {entry.title}
        </p>
        <div>
          <p className="text-sm text-gray-500 max-sm:text-xs">
            Created at: {new Date(entry.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 max-sm:text-xs">
            Updated at: {new Date(entry.lastUpdated).toLocaleDateString()}
          </p>
        </div>
        <p className="text-gray-700 max-h-[100px] overflow-hidden max-sm:text-sm">
          {entry.content}
        </p>
      </div>
    </div>
  );
};
export default EntryCard;

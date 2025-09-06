import { toasting } from "@/utils/toast";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";


const SearchEntries = ({
  setSearchString,
  searchString,
  handleSearchChange,
}: any) => {
  const searchParams = useSearchParams();
  const handleSearchOnChange = (e: any) => {
    if (e.target.value.length <= 30) {
      setSearchString(e.target.value);
    } else {
      toasting("max 30 chars", "warning");
    }
  };
  useEffect(() => {
    const searchStringInUrl=searchParams.get("search")||"";
    setSearchString(searchStringInUrl);
  }, []);

  return (
    <div className="">
      <div className="relative">
        <input
          type="text"
          value={searchString}
          onChange={(e) => handleSearchOnChange(e)}
          onKeyDown={(e) => handleSearchChange(e)}
          placeholder="🔍 Search entries..."
          className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>
    </div>
  );
};
export default SearchEntries;

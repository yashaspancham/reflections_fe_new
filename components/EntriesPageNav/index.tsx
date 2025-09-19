"use client";

import { useEffect, useState } from "react";

const PagesNavEntries = ({ entriesDetails }: any) => {
  const [loaded, setLoaded] = useState(false);
  let url: any;
  if (typeof window !== "undefined") {
    const fullUrl = window.location.href;
    url = fullUrl.split("?")[0];
  }
  useEffect(() => {
    setLoaded(true);
  }, []);

  const urlForSearchAndSort = (): string => {
    let urlEnd: string =
      entriesDetails.next_page !== null
        ? entriesDetails.next_page
        : entriesDetails.prev_page;
    if (urlEnd === null) {
      return "";
    }
    urlEnd = urlEnd.split("?")[1];
    let urlEndTemp = urlEnd.split("&");
    urlEnd =
      urlEndTemp.length === 3
        ? urlEndTemp[1] + "&" + urlEndTemp[2]
        : urlEndTemp[0] + "&" + urlEndTemp[1];
    return urlEnd;
  };

  
  return (
    loaded &&
    entriesDetails &&
    Object.keys(entriesDetails).length > 0 && (
      <div className="flex gap-2 items-center">
        {entriesDetails?.prev_page && (
          <button
            onClick={() => {
              // alert(`prev: ${url}?${entriesDetails.prev_page.split("?")[1]}`);
              window.location.href = `${url}?${
                entriesDetails.prev_page.split("?")[1]
              }`;
            }}
            className="p-3 bg-blue-900 rounded-lg text-white hover:cursor-pointer hover:bg-blue-800"
          >
            Prev
          </button>
        )}

        {[...Array(entriesDetails.total_pages)].map((_, i) => (
          <button
            onClick={() => {
              if (entriesDetails.current_page !== i + 1) {
                window.location.href = `${url}?page=${
                  i + 1
                }&${urlForSearchAndSort()}`;
                // console.log(`${url}?page=${i + 1}&${urlForSearchAndSort()}`);
              }
            }}
            className={`hover:cursor-pointer rounded-[50%] ${
              entriesDetails.current_page === i + 1
                ? "text-white hover:bg-blue-800 bg-blue-900 p-1.5"
                : "p-2 text-blue-900 hover:bg-gray-100"
            }`}
            key={i}
          >
            {i + 1}
          </button>
        ))}

        {entriesDetails.next_page !== null && (
          <button
            onClick={() => {
              window.location.href = `${url}?${
                entriesDetails.next_page.split("?")[1]
              }`;
            }}
            className="p-3 bg-blue-900 rounded-lg text-white hover:cursor-pointer hover:bg-blue-800"
          >
            Next
          </button>
        )}
      </div>
    )
  );
};

export default PagesNavEntries;

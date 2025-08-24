"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EntryCard from "@/components/EntryCard";
import SideBarMenu from "@/components/SideBarMenu";
import AddEntryButton from "@/components/addEntryButton";
import { getAllEntries } from "@/APIs/Entry/entry";
import PagesNavEntries from "@/components/PageNav";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [entries, setEntries] = useState([]);
  const [entriesDetails, setEntriesDetails] = useState<any>({});
  const searchParams = useSearchParams();
  useEffect(() => {
    setLoaded(true);
    let pagenumebr;
    const pagenumebrStr = searchParams.get("page");
    if (pagenumebrStr === null) {
      pagenumebr = 1;
    } else {
      pagenumebr = Number(pagenumebrStr);
    }
    // console.log("pagenumebr: ", pagenumebr);
    getAllEntries(pagenumebr).then((res) => {
      setEntries(res.entries);
      setEntriesDetails(res);
    });
  }, []);

  return (
    loaded && (
      <main className="w-full h-full z-0 lg:flex">
        <SideBarMenu />
        <div className="mb-[100px] max-md:mb-[200px] z-1 default flex flex-col h-full w-full items-center justify-center xl:p-20 lg:p-16 md:p-12 sm:p-8">
          <div className="mb-[100px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-8 md:place-items-center">
            {entries.length === 0 ? (
              <p>No entries</p>
            ) : (
              entries.map((item, index) => (
                <div key={index}>
                  <EntryCard entry={item} />
                </div>
              ))
            )}
          </div>
        <PagesNavEntries entriesDetails={entriesDetails} />
        </div>
        <AddEntryButton />
      </main>
    )
  );
}

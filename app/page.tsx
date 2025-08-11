

import React from "react";
import { journalEntries } from "@/temp/tempData";
import EntryCard from "@/components/EntryCard";
import SideBarMenu from "@/components/SideBarMenu";
import AddEntryButton from "@/components/addEntryButton";
export default function Home() {
  return (
    <main className="w-full h-full z-0 lg:flex">
      <SideBarMenu />
      <div className="z-1 default flex flex-col h-full w-full items-center justify-center xl:p-20 lg:p-16 md:p-12 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-8 place-items-center">
          {journalEntries.map((item, index) => (
            <div key={index}>
              <EntryCard entry={item} />
            </div>
          ))}
        </div>
      </div>
      <AddEntryButton />
    </main>
  );
}

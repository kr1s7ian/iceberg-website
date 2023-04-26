import React, { ChangeEvent, useEffect } from "react";
import { EntryManager } from "../useEntryManager";
import Entry, { EntryMeta } from "./entry";

export default function Outliner({
  entriesManager,
}: {
  entriesManager: EntryManager;
}) {
  return (
    <div className="bg-blue-950 border-2 border-black collapse w-0 sm:w-10/12 sm:visible md:w-6/12">
      <h1 className="text-center text-xs text-white bg-black">Outliner</h1>
      <div className="flex flex-row items-center justify-evenly border-1 border-black">
        <button
          className="bg-zinc-900 w-full text-white opacity-75 hover:opacity-100"
          onClick={() => entriesManager.addEntry("new entry", 0, 0)}
        >
          add
        </button>
        <button
          className="bg-zinc-900 w-full text-white opacity-75 hover:opacity-100"
          onClick={() => entriesManager.clearEntries()}
        >
          clear
        </button>
      </div>
      {entriesManager.entriesList.map((entry) => {
        return (
          <input
            className="p-1 mt-1 w-full"
            key={entry.id}
            value={entry.text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              entriesManager.updateEntry(
                entry.id,
                e.target.value,
                entry.x,
                entry.y
              );
              console.log(e.target.value);
              console.log(entry.id);
            }}
          ></input>
        );
      })}
    </div>
  );
}

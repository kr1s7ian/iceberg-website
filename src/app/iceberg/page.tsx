"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Entry, { EntryMeta } from "./components/entry";
import { useEntryManager } from "./useEntryManager";
import Outliner from "./components/outliner";

export default function Page() {
  const entryManager = useEntryManager();

  const saveEntries = () => {
    let json = JSON.stringify(entryManager.entriesList);
    navigator.clipboard.writeText(json);
    console.log(json);
  };

  const [jsonToLoad, SetjsonToLoad] = useState<string>("");

  return (
    <div>
      <div className="flex flex-column space-x-1 p-2">
        <button className="p-1 bg-white rounded-sm" onClick={saveEntries}>
          save
        </button>
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            SetjsonToLoad(e.target.value)
          }
        ></input>
        <button
          className="p-1 bg-white rounded-sm"
          onClick={() => entryManager.loadEntries(jsonToLoad)}
        >
          load
        </button>
      </div>

      <div className="flex flex-row">
        <Outliner entriesManager={entryManager}></Outliner>
        <div>
          {entryManager.entriesList.map((entry: EntryMeta) => {
            return (
              <Entry
                key={entry.id}
                entry={entry}
                onRemove={() => entryManager.removeEntry(entry.id)}
                onChange={entryManager.updateEntry}
              ></Entry>
            );
          })}
        </div>

        <div>
          <Image
            src="https://i.redd.it/7evxqcw8hoe51.png"
            width={1920}
            height={1080}
            alt="failed to load iceberg bg"
            className="w-max min-w-max"
          ></Image>
        </div>
      </div>
    </div>
  );
}

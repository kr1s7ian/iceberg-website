import { useState } from "react";
import { EntryMeta } from "./components/entry";
import { uuid } from "uuidv4";

export type EntryManager = ReturnType<typeof useEntryManager>;

export const useEntryManager = () => {
  const [entriesList, setEntriesList] = useState<EntryMeta[]>([]);

  const addEntry = (text: string, x: number, y: number) => {
    const id = uuid();
    const newEntry: EntryMeta = { text, x, y, id };
    setEntriesList([...entriesList, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntriesList(entriesList.filter((entry) => entry.id !== id));
  };

  const updateEntry = (id: string, text: string, x: number, y: number) => {
    let newEntriesList = entriesList.slice();
    let found = newEntriesList.find((entry) => entry.id == id);
    if (found) {
      found.text = text;
      found.x = x;
      found.y = y;
      setEntriesList(newEntriesList);
    }
  };

  const clearEntries = () => {
    setEntriesList([]);
  };

  const loadEntries = (json: string) => {
    const loaded: EntryMeta[] = JSON.parse(json);
    setEntriesList(loaded);
  };

  return {
    entriesList,
    addEntry,
    updateEntry,
    removeEntry,
    clearEntries,
    loadEntries,
  };
};

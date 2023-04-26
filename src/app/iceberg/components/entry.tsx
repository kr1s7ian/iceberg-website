"use client";
import React, { ChangeEvent, useState } from "react";
import Draggable from "react-draggable";
import { DraggableEvent } from "react-draggable";
import { AiFillDelete } from "react-icons/ai";

export interface EntryMeta {
  text: string;
  x: number;
  y: number;
  id: string;
}

export default function Entry({
  entry,
  onRemove,
  onChange,
}: {
  entry: EntryMeta;
  onRemove: (id: string) => void;
  onChange: (id: string, text: string, x: number, y: number) => void;
}) {
  const [length, setLength] = useState<number>(8);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: entry.x,
    y: entry.y,
  });

  const handleDrag = (e: any, ui: any) => {
    setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
  };
  return (
    <Draggable
      position={position}
      onStop={(e: DraggableEvent) => {
        onChange(entry.id, entry.text, position.x, position.y);
      }}
      onDrag={handleDrag}
      defaultPosition={{ x: entry.x, y: entry.y }}
    >
      <div className="absolute items-center text-center flex flex-row bg-transparent hover:cursor-move">
        <AiFillDelete
          className="mr-1 text-red-600 opacity-25 hover:opacity-100 cursor-pointer"
          onClick={() => onRemove(entry.id)}
        ></AiFillDelete>
        <input
          className="bg-transparent text-sm rounded-sm text-white outline-transparent p-1 font-bold hover:underline underline-offset-2 decoration-2 hover:cursor-move"
          maxLength={64}
          size={length}
          type="text"
          value={entry.text}
          spellCheck={false}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLength(e.target.value.length);
            onChange(entry.id, e.target.value, entry.x, entry.y);
          }}
        ></input>
      </div>
    </Draggable>
  );
}

"use client";
import React, { useState } from "react";

function InputWithCounter(props) {
  const [text, setText] = useState("");
  const maxLength = 50;

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        className="w-full p-2 border rounded-md"
        placeholder={props.ph}
        required={props.isRequired}
      />
      <span className="absolute right-2 bottom-1 text-xs text-gray-500">
        {text.length}/{maxLength}
      </span>
    </div>
  );
}

export default InputWithCounter;

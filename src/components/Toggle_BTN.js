"use client";
import { useState } from "react";

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`px-4 py-2 rounded-2xl text-white ${
        isOn ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {isOn ? "ON" : "OFF"}
    </button>
  );
}

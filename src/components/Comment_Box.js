"use client";
import React, { useState } from "react";

function CommentBox() {
  const [text, setText] = useState("");
  const maxLength = 100;

  return (
    <div>
      <br />
      <textarea
        id="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        style={{ width: "300px", height: "100px", resize: "both" }}
        className="border-1 border-gray-400 rounded-sm"
      />
      <div style={{ fontSize: "14px", color: "gray" }}>
        {text.length}/{maxLength}
      </div>
    </div>
  );
}

export default CommentBox;

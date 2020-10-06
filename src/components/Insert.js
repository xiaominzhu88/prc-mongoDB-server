import React from "react";
import Content from "./Content.js";

const Insert = ({
  title,
  text,
  changeTitle,
  changeText,
  content,
  sendData,
}) => {
  return (
    <div>
      <form id="postData">
        <input
          onChange={changeTitle}
          value={title}
          type="text"
          placeholder="title"
        />
        <input
          onChange={changeText}
          value={text}
          type="text"
          placeholder="text"
        />

        <button onClick={sendData}>Save to DB</button>
      </form>

      <div>
        <Content content={content} />
      </div>
    </div>
  );
};

export default Insert;

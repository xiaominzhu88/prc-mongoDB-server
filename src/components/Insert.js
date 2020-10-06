import React from "react";
import Content from "./Content.js";
import Info from "./Info.js";

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
        <input onChange={changeTitle} value={title} type="text" />
        <input onChange={changeText} value={text} type="text" />

        <button onClick={sendData}>Send</button>
      </form>

      <div>
        <Content content={content} />
      </div>
    </div>
  );
};

export default Insert;

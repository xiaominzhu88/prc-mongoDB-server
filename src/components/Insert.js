import React from "react";
//import {Route} from 'react-router-dom'

const Insert = ({
  title,
  text,
  changeTitle,
  changeText,
  showData,

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

      <div onClick={(index) => showData(index)}>
        <ul>
          {content.map((item, i) => {
            return (
              <li key={i}>
                Title: {item.title} Text: {item.text} -- {item._id}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Insert;

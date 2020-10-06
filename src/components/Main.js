import React from "react";

const Main = ({ getAndInsertMongoData, data, setName, setAge, update }) => {
  return (
    <div>
      <div>
        <button onClick={getAndInsertMongoData}>Click me first!</button>
        <p>Insert to mongoDB: {JSON.stringify(data)}</p>
      </div>
      <div>
        <input
          placeholder="enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="enter age"
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={update}>update </button>
      </div>
    </div>
  );
};

export default Main;

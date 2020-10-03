import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const getAndInsertMongoData = async () => {
    await fetch("/info")
      .then((res) => res.json())
      .then((res) => {
        console.log("res: ", res); // name, age, _id
        setData(res.ops);
      })
      .catch((e) => console.log("error,", e));
  };

  const update = async () => {
    const result = await fetch("/info", {
      method: "post",
      body: JSON.stringify({ name, age }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("RES: ", res);
      })

      .catch((e) => console.log("error,", e));
    return result;
  };

  return (
    <div className="App">
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
}

export default App;

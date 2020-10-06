import React, { useState } from "react";
import "./App.css";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Insert from "./components/Insert.js";
import Main from "./components/Main.js";

function App() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // Main page
  // get inserted constant data from server
  const getAndInsertMongoData = async () => {
    await fetch("/info")
      .then((res) => res.json())
      .then((res) => {
        setData(res.ops);
      })
      .catch((e) => console.log("error,", e));
  };

  const update = async () => {
    const result = await fetch("/info", {
      method: "POST",
      body: JSON.stringify({ name, age }), // send input value with 'name and age' to server
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // get updated value from server (res.send())
        return res.json();
      })
      .then((data) => console.log("response-data: ", data))

      .catch((e) => console.log("error,", e));
    return result;
  };

  // Insert Page

  const sendData = async (e) => {
    e.preventDefault();
    const resultData = await fetch("/posts", {
      method: "POST",
      body: JSON.stringify({ title, text }), // post input value to server,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json()) // get response back as content (DB use insertOne) with '_id' created from mongo
      .then((data) => {
        setContent([...data.ops, ...content]); // render all content
        setTitle("");
        setText("");
      })

      .catch((e) => console.log("error,", e));
    return resultData;
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/main">Main</Link>
            </li>
            <li>
              <Link to="/posts">Insert Page</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/main">
            <Main
              getAndInsertMongoData={getAndInsertMongoData}
              data={data}
              setName={setName}
              setAge={setAge}
              update={update}
            />
          </Route>
          <Route path="/posts">
            <Insert
              title={title}
              text={text}
              changeTitle={(e) => setTitle(e.target.value)}
              changeText={(e) => setText(e.target.value)}
              content={content}
              sendData={sendData}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

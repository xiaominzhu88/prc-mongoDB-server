const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/prc";
const WRITECONCERN = { w: 1, wtimeout: 2000 };

const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });

// Main page

app.get("/info", (req, res) => {
  try {
    client.connect((err, db) => {
      // get constant inserted data
      db.db("prc")
        .collection("test1")
        .insertOne(
          {
            name: "Lola",
            age: 10,
          },
          WRITECONCERN
        )
        .then((mongoResponse) => {
          res.status(200);
          res.send({
            // send data to frontend Main Page for 'click me first' button
            ops: mongoResponse.ops,
          });
        })
        .catch((err) => {
          console.log("mongo error: ", err);

          throw new Error(err.message);
        });
      console.log("connected to mongoDB!");
    });
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
});

app.post("/info", (req, res) => {
  console.log("index-REQ-body: ", req.body); // get input value from Main page with 'update DB' button,
  try {
    client.connect((err, db) => {
      const update = { $set: { name: req.body.name, age: req.body.age } };
      db.db("prc")
        .collection("test1")
        .updateOne(
          //  update constant data contains name 'Lola' into input value from frontend in mongoDB
          // 只update 第一个匹配
          {
            name: "Lola",
          },
          update,
          WRITECONCERN,
          (err) => {
            if (err) {
              throw new Error(err);
            }
          }
        );
    });
  } catch (e) {
    client.close();
    res.status(500);
    res.send(e.message);
  }
  res.send({
    // send updated value back to frontend
    ops: req.body,
  });
});

//  Insert Page

app.post("/posts", (req, res) => {
  console.log("REQ_BODY: ", req.body); // get input value from frontend
  try {
    client.connect((err, db) => {
      db.db("prc")
        .collection("content")
        .insertOne(
          {
            title: req.body.title,
            text: req.body.text,
          },
          WRITECONCERN
        )
        .then((contentResponse) => {
          console.log("content-response: ", contentResponse.ops);
          res.status(200);
          // send value back to frontend with '_id' from mongoDB
          res.send({
            ops: contentResponse.ops,
          });
        })
        .catch((err) => {
          console.log("mongo error: ", err);
          throw new Error(err.message);
        });
      console.log("connected!");
    });
  } catch (e) {
    client.close();
    res.status(500);
    res.send(e.message);
  }
});

app.listen(3002);

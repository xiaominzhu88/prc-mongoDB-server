const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/prc";
const WRITECONCERN = { w: 1, wtimeout: 2000 };

const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });

app.get("/info", (req, res) => {
  client.connect((err, db) => {
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
        console.log("mongo-response: ", mongoResponse);
        res.status(200);
        res.send({
          ops: mongoResponse.ops,
        });
      })
      .catch((err) => {
        console.log("mongo error: ", err);

        throw new Error(err.message);
      });
    console.log("connected to mongoDB!");
  });
});

app.post("/info", (req, res) => {
  console.log("index-REQ-body: ", req.body);
  client.connect((err, db) => {
    const update = { $set: { name: req.body.name, age: req.body.age } };
    db.db("prc")
      .collection("test1")
      .updateOne(
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
});

app.post("/posts", (req, res) => {
  console.log("REQ_BODY: ", req.body);

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
});

app.listen(3002);

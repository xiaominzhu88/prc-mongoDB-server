const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/prc";
const WRITECONCERN = { w: 1, wtimeout: 2000 };

const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
app.get("/message", (req, res) => {
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
        return res.send({
          ops: mongoResponse.ops,
        });
      });
    if (err) {
      console.log("mongo error: ", err);
      res.status(500);

      throw err;
    }
    console.log("connected to mongoDB!");
  });
});

app.post("/message", (req, res) => {
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

app.listen(3002);

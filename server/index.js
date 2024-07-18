const express = require("express");
const mysql = require("mysql");
const app = express();
const colors = require("colors");
const cors = require("cors");
const Port = 5000;

app.use(cors());
app.use(express.json());


//database connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "#aditya_2004",
  database: "passwordmanager",
});
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`.yellow.bold);
});

app.get("/", (req, res) => {
  res.send("Server is Live😄");
});


//route to add passwords
app.post("/addpasswords", (req, res) => {
  const { password, title } = req.body;


  //inserting values into database
  db.query(
    "INSERT INTO passwords (passwords , title) VALUES (?,?)",
    [password, title],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("Failed to insert values");
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

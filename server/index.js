const express = require("express");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const Port = 5000;

app.use(cors());
app.use(express.json());

dotenv.config();

const { encrypt, decrypt } = require("./EncryptionHandler");
//database connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: process.env.DB_Name,
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

  const hashedPassword = encrypt(password);
  //inserting values into database
  db.query(
    "INSERT INTO passwords (passwords , title, iv) VALUES (?,?,?)",
    [hashedPassword.password, title, hashedPassword.iv],
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

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords", (err, result) => {
    if (err) {
      console.log(err);
      console.log("Failed to fetch data");
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

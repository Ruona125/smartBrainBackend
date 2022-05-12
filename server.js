const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
// const { response } = require("express");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const PORT = 5000;

const db = knex({
  client: "pg",
  // connection: {
  //   host: process.env.POSTGRES_HOST,
  //   user: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DB,
  // },
  connection: process.env.POSTGRES_URI,
});
// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("its working");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

/*
/ ----> res = this is working
/signin --> POST =success/fail
/register --> POST = user
/profile/:userId --> Get = user
/image --> PUT --> user
 */

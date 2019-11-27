const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const app = express();
const path = require("path");

const db = require("./config/keys").mongoURI;

mongoose.Promise = global.Promise;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

const users = require("./routes/api/users");
app.use("/api/users", users);

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`Server up and running on port ${port}`);
});

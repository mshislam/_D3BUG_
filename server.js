const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const app = express();
const db = require("./config.json").db.mongoURI;
console.log(db);
mongoose.Promise = global.Promise;
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());
require("./routes/api/passport.js")(passport);

const users = require("./routes/api/users");
require("./routes/api/translate.js");
app.use("/api/users", users);

const translate = require("./routes/api/translate");
app.use("/api/translate", translate);

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = require("./config.json").port;
app.listen(port, (req, res) => {
  console.log(`Server up and running on port ${port}`);
});

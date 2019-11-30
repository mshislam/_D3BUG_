const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config.json").jwt.secretOrKey;
const passport = require("passport");

router.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log(Email);
    const user = await User.findOne({ Email: Email });
    console.log(Email);
    if (!user) {
      return res.status(404).json({ error: "Email does not exist" });
    }
    const match = bcrypt.compareSync(Password, user.Hashed_password);
    if (match) {
      const payload = {
        id: user._id,
        Email: user.Email
      };
      const token = jwt.sign(payload, tokenKey, { expiresIn: "4h" });
      res.json({ data: `Bearer ${token}` });
    } else {
      return res.status(400).send({ error: "Wrong password" });
    }
  } catch (e) {
    console.log(e);
  }
});
router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (user) return res.status(400).json({ error: "Email already exists" });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.Password, salt);
    req.body.Hashed_password = hashedPassword;
    const newUser = await User.create(req.body);
    const Z = await User.findOne({ _id: newUser._id });
    res.json({ msg: "User created successfully", data: Z });
  } catch (error) {
    console.log(error);
    res.status(422).send({ error: "Can not create user" });
  }
});
router.post(
  "/addcategory",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const Category = req.body.Category;
    if (req.user.Categories.includes(Category)) {
      return res.json({ msg: "Category already exists" });
    } else {
      const id = req.user._id;
      await User.updateOne({ _id: id }, { $push: { Categories: Category } });
      return res.json({ msg: "done" });
    }
  }
);

router.post(
  "/removecategory",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { Categories: req.body.Category } }
    );
    return res.json({ msg: "done" });
  }
);
router.post(
  "/addWord",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    for (var i = 0; i < req.user.Vocabulary.length; i++) {
      if (
        req.user.Vocabulary[i].Category == req.body.Category &&
        req.user.Vocabulary[i].Word == req.body.Word
      ) {
        return res
          .status(400)
          .send({ error: "The Word already exists in current Category" });
      }
    }

    const X = {
      Word: req.body.Word,
      Translation: req.body.Translation,
      From: req.body.From,
      To: req.body.To,
      Category: req.body.Category
    };
    await User.updateOne({ _id: req.user._id }, { $push: { Vocabulary: X } });

    return res.json({ msg: "done" });
  }
);
router.post(
  "/removeword",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const Wid = req.body.Wid;
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { Vocabulary: { _id: Wid } } }
    );

    return res.json({ msg: "done" });
  }
);
router.put(
  "/updateword",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await User.updateOne(
      {
        _id: req.user._id,
        "Vocabulary._id": req.body.Wid,
        "Vocabulary.Category": req.body.Category
      },
      { $set: { "Vocabulary.$.Translation": req.body.Translation } }
    );

    return res.json({ msg: "done" });
  }
);
router.get(
  "/Words",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var result = [];
    for (var i = 0; i < req.user.Vocabulary.length; i++) {
      if (req.user.Vocabulary[i].Category == req.body.Category) {
        result.push(req.user.Vocabulary[i]);
      }
    }

    return res.json({ data: result });
  }
);
router.get(
  "/quiz",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Vocabulary.length < 3) {
      return res.status(400).send({ error: "Not enough words to take quiz" });
    }
    var result = [];
    for (var i = 0; i < req.user.Vocabulary.length; i++) {
      if (req.user.Vocabulary[i].Category == req.body.Category) {
        var MCQ = [];
        MCQ[0] = req.user.Vocabulary[i].Translation;
        for (var j = 1; j < 3; j++) {
          var r = Math.floor(Math.random() * req.user.Vocabulary.length);
          if (req.user.Vocabulary[r].Translation == MCQ[0]) {
            j--;
            continue;
          } else MCQ[j] = req.user.Vocabulary[r].Translation;
        }
        const k = {
          Word: req.user.Vocabulary[i].Word,
          Translation: req.user.Vocabulary[i].Translation,
          MCQ: shuffle(MCQ)
        };
        result.push(k);
      }
    }
    if (result.length < 2) {
      return res.status(400).send({ error: "Not enough words to take quiz" });
    }
    return res.json({ data: result });
  }
);
router.get("/finduser/:id", async (req, res) => {
  const X = await User.findOne({ _id: req.params.id });

  res.json({ data: X });
});

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
//5de13d1b7a07e63914601a1c

module.exports = router;

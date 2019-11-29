const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const passport = require("passport");

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

module.exports = router;

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const projectId = require("../../config.json").cloudTranslation.Key;
console.log(projectId);
// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Instantiates a client
const translate = new Translate({ key: projectId });





router.get(
  "/quicktranslate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const text =req.body.text;
    const target =req.body.target;
    const [translation] = await translate.translate(text, target);
    return res.json({ translation: translation});
  });



router.get(
  "/detectLanguage",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const text = req.body.text;
    let [detections] = await translate.detect(text);
  detections = Array.isArray(detections) ? detections : [detections];
  return res.json({ detections: detections});

  });


router.get('/', (req, res) => res.send('Hello World!'));
router.get(
  "/listLanguages",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const [languages] = await translate.getLanguages();
    return res.json({ Languages: languages});
  }
);

// listLanguages();
module.exports = router;

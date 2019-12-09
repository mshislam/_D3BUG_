const express = require("express");
const router = express.Router();
const projectId = require("../../config.json").cloudTranslation.Key;
const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate({ key: projectId });

router.post("/quicktranslate", async (req, res) => {
  const text = req.body.text;
  const target = req.body.target;
  const [translation] = await translate.translate(text, target);
  return res.json({ translation: translation });
});

router.post("/detectLanguage", async (req, res) => {
  const text = req.body.text;
  let [detections] = await translate.detect(text);
  detections = Array.isArray(detections) ? detections : [detections];
  return res.json({ detections: detections });
});

router.get("/listLanguages", async (req, res) => {
  const [languages] = await translate.getLanguages();
  return res.json({ Languages: languages });
});

module.exports = router;

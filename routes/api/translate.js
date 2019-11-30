/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const projectId = require("../../config.json").cloudTranslation.Key;
// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Instantiates a client
const translate = new Translate({ key: projectId });

async function quickStart() {
  // The text to translate
  const text = "guten morgen";

  // The target language
  const target = "en";

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}

async function listLanguages() {
  // Lists available translation language with their names in English (the default).
  const [languages] = await translate.getLanguages();

  console.log("Languages:");
  languages.forEach(language => console.log(language));
}
async function detectLanguage() {
  const text = "guten morgen";

  let [detections] = await translate.detect(text);
  detections = Array.isArray(detections) ? detections : [detections];
  console.log("Detections:");
  detections.forEach(detection => {
    console.log(`${detection.input} => ${detection.language}`);
  });
}
detectLanguage();

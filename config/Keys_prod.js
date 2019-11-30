module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  publicKey: process.env.VAPID_PUBLIC_KEY
};

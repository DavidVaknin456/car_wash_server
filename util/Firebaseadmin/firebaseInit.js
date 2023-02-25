const admin = require("firebase-admin");

const serviceAccount = require("./car-wash-6e2ab-firebase-adminsdk-q8nqw-b76baba2c9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

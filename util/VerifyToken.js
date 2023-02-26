const { getAuth } = require("firebase-admin/auth");
const res = require("express/lib/response");

const verifyToken = async (token) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    console.log(decodedToken.email);
    console.log(decodedToken.uid);
    return decodedToken.uid;
  } catch (error) {
    console.log(error);
    console.log("invalid token");
    return 403; // or return null or some other value indicating failure
  }
};

module.exports = verifyToken;

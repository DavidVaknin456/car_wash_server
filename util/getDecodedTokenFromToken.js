const { getAuth } = require("firebase-admin/auth");
const res = require("express/lib/response");

const getDecodedTokenFromToken = async (req) => {
  try {
    const idToken = req.header("authorization").split(" ")[1];
    return await getAuth().verifyIdToken(idToken);
  } catch (error) {
    console.log(error);
    console.log("invalid token");
    return 403; // or return null or some other value indicating failure
  }
};

module.exports = getDecodedTokenFromToken;

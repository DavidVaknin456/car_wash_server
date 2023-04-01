const { getAuth } = require("firebase-admin/auth");
const res = require("express/lib/response");

const getUserIdFromToken = async (req) => {
  try {
    const idToken = req.header("authorization").split(" ")[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);
    console.log(decodedToken.email);
    //console.log(decodedToken.uid);
    return decodedToken.uid;
  } catch (error) {
    console.log(error);
    console.log("invalid token");
    return 403; // or return null or some other value indicating failure
  }
};

module.exports = getUserIdFromToken;

const { Pool } = require("pg");
const express = require("express");
const admin = require("../util/Firebaseadmin/firebaseInit");
const { getAuth } = require("firebase-admin/auth");
const router = express.Router();

const pool = new Pool({
  user: "newuser",
  host: "localhost",
  database: "car_wash",
  password: "password",
  port: 5432, // default port for PostgreSQL is 5432
});

router.use(express.json());

// Handle POST request to create a new user
router.post("/users", async (req, res) => {
  const { name, role } = req.body;
  let uid = "";
  let email = "3";
  const idToken = req.header("authorization").split(" ")[1];
  console.log(idToken);

  await getAuth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      uid = decodedToken.uid;
      console.log(decodedToken.email);
    })
    .catch((error) => {
      console.log(error);
      console.log("invalid token");
      return res.sendStatus(403);
    });
  // const { uid } = req.user; // Firebase authentication user ID

  try {
    //Verify user authentication using Firebase Admin SDK
    // const decodedToken = await admin.auth().verifyIdToken(uid);
    // const { email } = decodedToken;

    // Insert the new user into the `users` table
    const query = "INSERT INTO users ( uid, name, role) VALUES ($1, $2, $3)";
    const values = [uid, name, role];

    try {
      // ...
      await pool.query(query, values);
      // ...
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user" });
    }

    // Return the new user information to the client-side
    res.status(201).json({ uid, name, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;

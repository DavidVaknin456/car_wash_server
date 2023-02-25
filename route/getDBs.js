const express = require("express");
const router = express.Router();
const pool = require("../db/dbInit");
const uuid = require("uuid");
const admin = require("../util/Firebaseadmin/firebaseInit");

// // Handle POST request to create a new user
// router.post("/users", async (req, res) => {
//   const { name, role, uid } = req.body;
//   // const { uid } = req.user; // Firebase authentication user ID
//   // const { uid } = req.user; // Firebase authentication user ID
//
//   try {
//     // Verify user authentication using Firebase Admin SDK
//     // const decodedToken = await admin.auth().verifyIdToken(uid);
//     // const { email } = decodedToken;
//
//     // Generate new user ID using a library like `uuid` or `shortid`
//     const id = uuid.v4(); // or shortid.generate()
//
//     // Insert the new user into the `users` table
//     const query =
//       "INSERT INTO users (id, uid, name, role) VALUES ($1, $2, $3, $4)";
//     const values = [id, uid, name, role];
//     await pool.query(query, values);
//
//     // Return the new user information to the client-side
//     res.status(201).json({ id, uid, name, role });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating user" });
//   }
// });
//
// module.exports = router;

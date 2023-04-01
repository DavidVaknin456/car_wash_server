const express = require("express");
const router = express.Router();
const pool = require("../db/dbInit");
const getUserIdFromToken = require("../util/getUserIdFromToken");

router.use(express.json());

// Handle POST request to create a new user
router.post("/users", async (req, res) => {
  const { name, role } = req.body;
  const uid = await getUserIdFromToken(req);

  console.log("uid: ", uid);

  if (uid === 403) res.status(403).send("Forbidden");
  try {
    // Insert the new user into the `users` table
    const query = "INSERT INTO users ( uid, name, role) VALUES ($1, $2, $3)";
    const values = [uid, name, role];

    try {
      await pool.query(query, values);
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

router.get("/get_user", async (req, res) => {
  const uid = await getUserIdFromToken(req);

  console.log("uid: ", uid);
  if (uid === 403) res.status(403).send("Forbidden");

  pool.query(`SELECT * FROM users WHERE uid = '${uid}'`, (error, results) => {
    if (error) throw error;
    if (results.rows.length === 0) {
      res.status(200).send(false);
    } else {
      console.log(results.rows[0]);
      res.status(200).send(results.rows[0]);
    }
  });
});
module.exports = router;

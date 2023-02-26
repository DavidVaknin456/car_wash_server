const express = require("express");
const pool = require("../db/dbInit");
const verifyToken = require("../util/VerifyToken");
const router = express.Router();

router.use(express.json());

// Handle POST request to create a new user
router.post("/users", async (req, res) => {
  const { name, role } = req.body;
  const idToken = req.header("authorization").split(" ")[1];

  const uid = await verifyToken(idToken);
  console.log(uid);

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

router.get("/if_reg", async (req, res) => {
  const idToken = req.header("authorization").split(" ")[1];

  const uid = await verifyToken(idToken);
  if (uid === 403) res.status(403).send("Forbidden");
  console.log(uid);
  const checkIfValueExists = async (tableName, columnName, value) => {
    const query = `SELECT COUNT(*) FROM ${tableName} WHERE ${columnName} = $1`;
    const result = await pool.query(query, [value]);
    return parseInt(result.rows[0].count) > 0;
  };

  const tableName = "users";
  const columnName = "uid";
  const exists = await checkIfValueExists(tableName, columnName, uid);

  res.status(200).send(exists);
});

router.get("/get_user", async (req, res) => {
  const idToken = req.header("authorization").split(" ")[1];

  const uid = await verifyToken(idToken);
  if (uid === 403) res.status(403).send("Forbidden");
  console.log(uid);

  pool.query(`SELECT * FROM users WHERE uid = '${uid}'`, (error, results) => {
    if (error) throw error;

    console.log(results);
    res.status(200).send(results.rows[0]);
  });
});
module.exports = router;

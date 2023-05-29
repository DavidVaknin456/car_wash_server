const express = require("express");
const router = express.Router();
const pool = require("../db/dbInit");
const getUserIdFromToken = require("../util/getUserIdFromToken");
const getDecodedTokenFromToken = require("../util/getDecodedTokenFromToken");

router.use(express.json());

router.post("/add_order", async (req, res) => {
  const { id, fixType, carNum } = req.body;
  console.log(fixType, ":", carNum);
  const decodedToken = await getDecodedTokenFromToken(req);

  console.log("uid: ", decodedToken.uid);
  if (decodedToken.uid === 403) res.status(403).send("Forbidden");
  try {
    const query =
      "INSERT INTO public.orders (customer_id, status, fix_type, carNum, costumer_email) VALUES ($1, $2, $3, $4, $5)";
    const values = [id, "pending", fixType, carNum, decodedToken.email];

    try {
      await pool.query(query, values);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating order" });
    }

    res.status(201).json({ id, fixType });
  } catch (error) {
    console.error(error);
  }
});

router.get("/get_orders", async (req, res) => {
  const uid = await getUserIdFromToken(req);

  console.log(uid);
  if (uid === 403) res.status(403).send("Forbidden");

  const sqlQuery = "SELECT * FROM orders";

  pool.query(sqlQuery, (error, results) => {
    if (error) throw error;
    if (results.rows.length === 0) {
      res.status(200).send(false);
    } else {
      console.log(results.rows);
      res.status(200).send(results.rows);
    }
  });
});

router.post("/add_to_my_orders", async (req, res) => {
  const { orderId } = req.body;
  console.log("orderId: ", orderId);
  const decodedToken = await getDecodedTokenFromToken(req);

  if (decodedToken.uid === 403) res.status(403).send("Forbidden");

  const column1 = "worker_uid";
  const column2 = "status";
  const sqlQuery = `UPDATE orders SET ${column1} = $1, ${column2} = $2 WHERE id = $3`;

  pool.query(
    sqlQuery,
    [decodedToken.uid, `In Progress by: ${decodedToken.email}`, orderId],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.log(results.rows);
        res.status(200).send(results.rows);
      }
    }
  );
});

router.post("/done_orders", async (req, res) => {
  const { orderId } = req.body;
  console.log("orderId: ", orderId);
  const decodedToken = await getDecodedTokenFromToken(req);

  if (decodedToken.uid === 403) res.status(403).send("Forbidden");

  const column = "status";
  const sqlQuery = `UPDATE orders SET ${column} = $1 WHERE id = $2`;

  pool.query(
    sqlQuery,
    [`Done by: ${decodedToken.email}`, orderId],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.log(results.rows);
        res.status(200).send(results.rows);
      }
    }
  );
});

router.get("/get_my_orders", async (req, res) => {
  const uid = await getUserIdFromToken(req);

  console.log(uid);
  if (uid === 403) res.status(403).send("Forbidden");

  const sqlQuery = `SELECT * FROM orders WHERE uid = '${uid}`;

  pool.query(sqlQuery, (error, results) => {
    if (error) throw error;
    if (results.rows.length === 0) {
      res.status(200).send(false);
    } else {
      console.log(results.rows);
      res.status(200).send(results.rows);
    }
  });
});

module.exports = router;

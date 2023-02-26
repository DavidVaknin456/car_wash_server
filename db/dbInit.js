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

module.exports = pool;

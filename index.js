const express = require("express");
const PORT = process.env.PORT || 8080;
const basicGet = require("./route/basic");
const db = require("./route/reqUsers");
const orders = require("./route/reqOrder");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/", basicGet);
app.use("/", db);
app.use("/", orders);

app.listen(PORT, () => console.log(`listening on  ${PORT}`));

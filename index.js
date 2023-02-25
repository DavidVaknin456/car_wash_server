const express = require("express");
const PORT = process.env.PORT || 8080;
const basicGet = require("./route/basic");
const db = require("./db/dbInit");
const app = express();

app.use("/", basicGet);
app.use("/", db);

app.listen(PORT, () => console.log(`listening on  ${PORT}`));

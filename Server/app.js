const http = require("http");
const path = require("path");
const rootDir = require("./common/path");
const dotEnv = require("dotenv");
const express = require("express");
dotEnv.config({ path: path.join(rootDir, "config", "config.env") });
require("./common/db");
const badyParser = require("body-parser");
const app = express();
const httpServer = http.createServer(app);
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "*");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});
const BaseRouter = require("./routes/index");
const Validator = require("./validator/Validator");
const jwt = require("jsonwebtoken");
const { socks } = require("./io");
app.use(badyParser.urlencoded({ extended: false }));
app.use("/api", BaseRouter);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log("server running on port 3000");
});
socks(httpServer);

const express = require("express");
const app = express();
const port = process.env.port ?? 5500;
const path = require("path");
const rootPath = path.resolve();

console.log(rootPath);
app.use(express.static(rootPath));

app.listen(port, console.log(`server is listening:${port} `));

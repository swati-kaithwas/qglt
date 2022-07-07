const express = require("express");
const nodeRouter = express.Router();

nodeRouter.get("/", (req, res) => {
  res.send("Note Get Request");
});
nodeRouter.post("/", (req, res) => {
  res.send("Note post Request");
});
module.exports = nodeRouter;

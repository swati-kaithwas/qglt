const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes");
const nodeRouter = require("./routes/nodeRoutes");
const mongoose = require("mongoose");
app.use(express.json());

app.use("/users", userRouter);
app.use("/node", nodeRouter);

app.get("/", (req, res) => {
  res.send("hello swati");
});
mongoose
  // "mongodb+srv://cluster0.4xf6l.mongodb.net/myFirstDatabase"
  .connect(
    "mongodb+srv://admin:admin@cluster0.xbfel.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("start no 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

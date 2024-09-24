const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/authroutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.error("Could not connect to db", error.message);
  });
app.use(bodyParser.json());
app.use(express.json());
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

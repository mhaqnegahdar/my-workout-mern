require("dotenv").config();
const express = require("express");

// express app
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.get("/", (req, res) => {
  res.json({ msg: "This is a test message" });
});
//listen
app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

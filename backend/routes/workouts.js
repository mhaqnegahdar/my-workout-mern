const express = require("express");

// instance of the route obj
const route = express.Router();

// handling reaquests

// GET all workouts
route.get("/", (req, res) => {
  res.json({ msg: "This is a test message" });
});

// GET a workout
route.get("/:id", (req, res) => {});

// POST a workout
route.post("/", (req, res) => {});

// DELETE a workout
route.delete("/:id", (req, res) => {});

//UPDATE a workout
route.patch("/:id", (req, res) => {});

module.exports = route;

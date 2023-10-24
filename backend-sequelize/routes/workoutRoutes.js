const router = require("express").Router();

// GET all workouts
router.get("/", (req, res) => {
  res.json({ msg: "all workouts" });
});

// POST new workout
router.post("/", (req, res) => {
  res.json({ msg: "Post a new workout" });
});

//GET single workout
router.get("/:id", (req, res) => {
  res.json({ msg: "Get one workout" });
});

//DELETE single workout
router.delete("/:id", (req, res) => {
  res.json({ msg: "Delete a workout" });
});

//UPDATE single workout
router.patch("/:id", (req, res) => {
  res.json({ msg: "Updated a workout" });
});

module.exports = router;

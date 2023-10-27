const Workout = require("../models/workoutModel");

// GET all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user.toJSON()._id;

  try {
    const workouts = await Workout.findAll({
      where: { user_id },
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const user_id = req.user.toJSON()._id;

  //   if fields were empty
  let emptyFields = [];

  !title ? emptyFields.push("title") : null;
  !load ? emptyFields.push("load") : null;
  !reps ? emptyFields.push("reps") : null;

  if (emptyFields.length > 0) {
    res
      .status(400)
      .json({ error: "Please fill in the empty fields!", emptyFields });
    return;
  }

  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.toJSON()._id;

  try {
    const workout = await Workout.findOne({
      where: {
        id: id,
        user_id,
      },
    });
    // If didn't exists
    if (!workout) {
      res.status(404).json({ error: "No such workout" });
      return;
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWourkout = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.toJSON()._id;

  const numericId = parseInt(id, 10); // Convert to a number

  if (isNaN(numericId)) {
    res.status(404).json({ error: "Invalid workout ID" });
    return; // Exit the function
  }

  try {
    const deletedCount = await Workout.destroy({
      where: { id: numericId, user_id },
    });

    if (deletedCount === 0) {
      res.status(404).json({ error: "No such workout" });
      return; // Exit the function
    }

    res.status(200).json({ _id: numericId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//UPDATE a workout
const updateWourkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;
  const user_id = req.user.toJSON()._id;

  const numericId = parseInt(id, 10); // Convert to a number

  if (isNaN(numericId)) {
    res.status(404).json({ error: "Invalid workout ID" });
    return; // Exit the function
  }

  try {
    const [rowCount] = await Workout.update(
      { title, load, reps },
      { where: { id: numericId, user_id } }
    );

    if (rowCount === 0) {
      res.status(404).json({ error: "No such workout" });
      return;
    }

    // Find the updated record
    const updatedRecord = await Workout.findOne({ where: { id: numericId, user_id } });

    if (!updatedRecord) {
      res.status(404).json({ error: "No such workout" });
      return;
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getSingleWorkout,
  deleteWourkout,
  updateWourkout,
};

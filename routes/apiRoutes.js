const router = require("express").Router();
const Workout = require("../models/workout");

// GET last workout
router.get("/api/workouts", async (req, res) => {
  try {
    Workout.find({})
      .sort({ date: -1 })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// POST a new workout
router.post("/api/workouts", async ({ body }, res) => {
  try {
    Workout.create(body).then((dbWorkout) => {
      res.json(dbWorkout);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// PUT a new exercise into a workout
router.put("/api/workouts/:id", async ({ body, params }, res) => {
  try {
    const workoutId = params.id;
    let savedExercises = [];

    // GET all currently saved exercises in the user's current workout
    Workout.find({_id: workoutId})
      .then(dbWorkout => {
        console.log(dbWorkout);

      })
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

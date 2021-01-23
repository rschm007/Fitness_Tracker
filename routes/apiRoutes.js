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
    Workout.create({}).then((dbWorkout) => {
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
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body }},
      // runValidators to ensure new exercises meet schema requirements
      { new: true, runValidators: true }
    )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

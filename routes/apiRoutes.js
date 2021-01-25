const router = require("express").Router();
const Workout = require("../models/workout");

// GET all previous workouts
router.get("/api/workouts", async (req, res) => {
  try {
    Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
      },
    ]).then((dbWorkout) => {
      res.status(200).json(dbWorkout);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// GET one workout within a range (last 7 days)
router.get("/api/workouts/range", async (req, res) => {
  try {
    // use aggregate function to dynamically add up and return total duration for each workout
    Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
      },
    ])
      .sort({ day: -1 })
      .limit(7)
      // return found results
      .then((dbWorkout) => {
        res.status(200).json(dbWorkout);
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
      res.status(200).json(dbWorkout);
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
      { $push: { exercises: body } },
      // runValidators to ensure new exercises meet schema requirements
      { new: true, runValidators: true }
    ).then((dbWorkout) => {
      res.status(200).json(dbWorkout);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      name: {
        type: String,
        required: true,
      },
    },
    {
      type: {
        type: String,
        required: true,
      },
    },
    {
      weight: {
        type: Number,
      },
    },
    {
      sets: {
        type: Number,
      },
    },
    {
      reps: {
        type: Number,
      },
    },
    {
      duration: {
        type: Number,
        required: true,
      },
    },
  ],
});

// TO DO: Virtuals for adding total duration of workout

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

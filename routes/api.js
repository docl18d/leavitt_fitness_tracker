const path = require("path");
const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(data => {
    res.json(data);
  })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post('/api/workouts', (req, res) => {
  db.Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.put('/api/workouts/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  db.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: body } })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.get('/api/workouts/range', (req, res) => {
 db.Workout.aggregate( [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } ,

      }
    },

 ] )
  .sort({_id: -1}).limit(7)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/api/workouts/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  db.Workout.findOneAndUpdate(
    { id },
    { $push: { exercises: body } },
    { new: true },
  )

    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
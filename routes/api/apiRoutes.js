const router = require('express').Router();
const { Workout } = require('../../models')


router.get("/workouts", (req, res) => {
    Workout.find({})
    .then(dbWorkout => {
        console.log("data", dbWorkout)
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

router.put("/workouts/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body

    Workout.findOneAndUpdate({ _id: id }, {$push:{ exercises: body }})
    .then(data => {
        console.log(data)
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.post("/workouts", (req, res) => {
    Workout.create({})
    .then(data => {
        console.log(data)
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

router.get("/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
    .then(data => {
        console.log(data)
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err)
    })
})


module.exports = router;
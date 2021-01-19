// Server Dependencies
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

// Database Connection Request
require('dotenv/config');
const connectDB = require("./config/connectDB.js")

//Bring in models
const db = require("./models");

// Create an instance of the express app.
let app = express();

// Added so body parser can handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Host Static Files so css and js files can be retrieved
app.use(express.static(path.join(__dirname, '/public')));

// Set the port of our application, process.env.PORT lets the port be set by Heroku
let PORT = process.env.PORT || 3008;

//Set up routes and endpoints//

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get("/stats", (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

//Middleware//

//GET Requests


app.get("/api/workouts", (req,res) => {
  db.Workout.find({}).sort({day:-1}).limit(1)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

app.get("/api/workouts/range", (req,res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});



//PUT Requests

app.put("/api/workouts/:id", (req,res) => {

let urlData = req.params;
let data = req.body;
  db.Workout.updateOne( {_id: urlData.id }, {$push: {exercises:  [
    {
    "type" : data.type,
    "name" : data.name,
    "duration" : data.duration,
    "distance" : data.distance,
    "weight" : data.weight,
    "reps" : data.reps,
    "sets" : data.sets
    }
  ] 
}}).then(dbUpdate => {
  res.json(dbUpdate);
})
.catch(err => {
  res.json(err);
});

});


//POST Requests

app.post("/api/workouts", (req,res) => {

  let data = req.body;

  db.Workout.create({
    day: new Date().setDate(new Date().getDate())
}).then(dbUpdate => {
      res.json(dbUpdate);
    })
    .catch(err => {
      res.json(err);
    });
});

// Starts the server to begin listening
app.listen(PORT, function(){
  console.log("Server listening on: http://localhost:" + PORT);
});

// heroku deploy address https://leavitt-fitness-tracker.herokuapp.com  //
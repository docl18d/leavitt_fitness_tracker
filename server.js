const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const exerciseRoutes = require("./routes/exercises");
// const workoutRoutes = require("./routes/workouts");
const apiRoutes = require("./routes/api");
const viewRoutes = require("./routes/views");

const app = express();
const PORT = process.env.PORT || 3005;
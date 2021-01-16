const express = require("express");
const logger = require("morgan")
const mongoose = require("mongoose");

// setting up Express App
const app = express();
const PORT = process.env.PORT || 3008;

app.use(logger("dev"));

  // Sets up the Express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Sets up db mongo
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})

// Creating Routes
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// Starts the server to begin listening
app.listen(PORT, function(){
    console.log(`App listening on Port ${PORT}!`);
});
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3008;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => console.log('connected to db'))
.catch(err=> console.error('an error has occured', err));

// routes
app.use(require("./routes"));
app.use(require("./routes/homeRoutes.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
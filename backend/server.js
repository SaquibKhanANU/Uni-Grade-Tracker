require("dotenv").config();

const express = require("express");
const universityGradesRouter = require("./routes/UniversityGradesRoute");
const mongoose = require("mongoose");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/universityGrade", universityGradesRouter);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB and listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assessmentSchema = new Schema({
  name: String,
  assessmentPercentage: {
    type: Number,
    default: 0,
  },
  gradePercentage: {
    type: Number,
    default: 0,
  },
});

const courseSchema = new Schema({
  name: String,
  assessments: [assessmentSchema],
});

const yearSchema = new Schema({
  name: String,
  courses: [courseSchema],
});

const universitySchema = new Schema({
  name: String,
  years: [yearSchema],
});

const UniversityGrades = mongoose.model("UniversityGrades", universitySchema);

module.exports = UniversityGrades;

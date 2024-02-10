const UniversityGradesModel = require("../models/UniversityGradesModel");
const mongoose = require("mongoose");

// get all university grades
const getAllUniversityGrades = async (req, res) => {
  try {
    const universityGrades = await UniversityGradesModel.find();
    res.status(200).json(universityGrades);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get one university grades
const getUniversityGrade = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No workout with that id");
  }
  try {
    const universityGrade = await UniversityGradesModel.findById(id);
    res.status(200).json(universityGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Route to fetch all years for a specific university
const getSpecificUniversityYears = async (req, res) => {
  try {
    const universityId = req.params.universityId;
    const university = await UniversityGradesModel.findById(universityId);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    const years = university.years.map((year) => ({
      _id: year._id,
      name: year.name,
    }));
    res.json(years);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one year courses for a specific university
const getSpecificYearCourses = async (req, res) => {
  try {
    const universityId = req.params.universityId;
    const yearId = req.params.yearId;
    const university = await UniversityGradesModel.findById(universityId);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    const year = university.years.find((year) => year._id == yearId);
    if (!year) {
      return res.status(404).json({ message: "Year not found" });
    }
    const courses = year.courses.map((course) => ({
      _id: course._id,
      name: course.name,
      assessments: course.assessments,
    }));
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create university grades
const createUniversityGrade = async (req, res) => {
  const universityGrades = new UniversityGradesModel(req.body);
  try {
    await universityGrades.save();
    res.status(201).json(universityGrades);
  } catch {
    res.status(400).json({ message: error.message });
  }
};

// delete university grades
const deleteUniversityGrade = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No grade with that id");
  }
  try {
    const universityGrade = await UniversityGradesModel.findByIdAndDelete(id);
    res.status(200).json(universityGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update university grades
const updateUniversityGrade = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No workout with that id");
  }

  try {
    const universityGrade = await UniversityGradesModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
    res.status(200).json(universityGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUniversityGrades,
  getUniversityGrade,
  getSpecificUniversityYears,
  getSpecificYearCourses,
  createUniversityGrade,
  deleteUniversityGrade,
  updateUniversityGrade,
};

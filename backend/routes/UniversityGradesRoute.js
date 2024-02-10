const express = require("express");
const router = express.Router();

const {
  getAllUniversityGrades,
  getUniversityGrade,
  createUniversityGrade,
  deleteUniversityGrade,
  updateUniversityGrade,
  getSpecificUniversityYears,
  getSpecificYearCourses,
} = require("../controllers/UniversityGradesController");

// get all university grades
router.get("/", getAllUniversityGrades);

// get one university grades
router.get("/:id", getUniversityGrade);

// Route to fetch all years for a specific university
router.get('/:universityId/years', getSpecificUniversityYears);

// get one year courses for a specific university
router.get('/:universityId/:yearId/courses', getSpecificYearCourses);

// create university grades
router.post("/", createUniversityGrade);

// delete university grades
router.delete("/:id", deleteUniversityGrade);

// update university grades
router.patch("/:id", updateUniversityGrade);




module.exports = router;

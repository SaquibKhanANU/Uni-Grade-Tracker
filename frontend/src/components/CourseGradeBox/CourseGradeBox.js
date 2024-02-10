import "./CourseGradeBox.css";
import React from "react";

const CourseGradeBox = ({ title, value }) => {
  return (
    <div className="course-grade-box">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default CourseGradeBox;

import "./Dashboard.css";
import { React, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import CourseGradeBox from "../../components/CourseGradeBox/CourseGradeBox";
import CourseGradeTable from "../../components/CourseGradeTable/CourseGradeTable";
import axios from "axios";

const Dashboard = () => {
  const [universitiesData, setUniversitiesData] = useState([]);
  const [yearsData, setYearsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState("");

  useEffect(() => {
    // Fetch all universities
    axios
      .get("/api/universityGrade")
      .then((response) => {
        setUniversitiesData(response.data);
      })
      .catch((error) => console.error("Error fetching universities:", error));
  }, []);

  const handleUniversityChange = (universityId) => {
    // Fetch years for selected university
    setSelectedUniversityId(universityId); // Update selected university ID
    axios
      .get(`/api/universityGrade/${universityId}/years`)
      .then((response) => {
        setYearsData(response.data);
      })
      .catch((error) => console.error("Error fetching years:", error));
  };

  const handleYearSelect = (yearId) => {
    // Find the selected year object from yearsData
    axios
      .get(`/api/universityGrade/${selectedUniversityId}/${yearId}/courses`)
      .then((response) => {
        setCoursesData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching years:", error));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <Sidebar
          data={{ universities: universitiesData, years: yearsData }}
          functions={{
            onUniversitySelect: handleUniversityChange,
            onYearSelect: handleYearSelect,
          }}
        />{" "}
      </div>
      <div>
        <div className="dashboard-gradeboxs">
          <CourseGradeBox title="GPA" value="3.4" />
          <CourseGradeBox title="WAM" value="80%" />
          <CourseGradeBox title="CREDITS" value="24" />
        </div>
        <div className="dashboard-table">
          <CourseGradeTable data={coursesData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownArrow from "@mui/icons-material/KeyboardArrowDown";
import SingleCourseGradeTable from "./SingleCourseGradeTable";

export default function CourseGradeTable({ data }) {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpandRow = (rowName) => {
    setExpandedRow(expandedRow === rowName ? null : rowName);
  };

  const handleEdit = (rowName) => {
    // Handle edit action here
    console.log("Edit row:", rowName);
  };

  const handleDelete = (rowName) => {
    // Handle delete action here
    console.log("Delete row:", rowName);
  };

  function calculateWAMForCourse(course) {
    let totalWeightedMarks = 0;
    let totalWeight = 0;
  
    course.assessments.forEach(assessment => {
      const weightedMark = (assessment.assessmentPercentage / 100) * (assessment.gradePercentage / 100);
      totalWeightedMarks += weightedMark;
    });
  
    const wam = totalWeightedMarks
    return wam;
  }
  

  return (
    <div
      style={{ height: "350px", overflowY: "auto" }}
      className="gradetable-container"
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: `var(--pink)` }}>
            <TableRow>
              <TableCell>Course Code</TableCell>
              <TableCell align="right">WAM</TableCell>
              <TableCell align="right">GPA</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="gradetable-body">
            {data.map((row) => (
              <React.Fragment key={row.name}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    height: 20,
                    backgroundColor: "#f5f5f5",
                  }}
                  className="gradetable-row"
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{calculateWAMForCourse(row)}</TableCell>
                  <TableCell align="right">{}</TableCell>
                  <TableCell align="right">{}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleExpandRow(row.name)}
                      aria-label="expand"
                    >
                      <DownArrow />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEdit(row.name)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row.name)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {expandedRow === row.name && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <SingleCourseGradeTable data={row.assessments} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

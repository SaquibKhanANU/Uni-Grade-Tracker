import { React } from "react";


const Sidebar = ({ data, functions }) => {
  const { universities, years } = data;
  const { onUniversitySelect, onYearSelect } = functions;

  return (
    <div className="sidebar-container">
      <div className="sidebar-elements">
        <p>University</p>
        <div className="sidebar-dropdown">
          <div className="dropdown-content">
            {universities.map((university) => (
              <button
                key={university._id}
                onClick={() => onUniversitySelect(university._id)}
              >
                {university.name}
              </button>
            ))}
          </div>
        </div>
        <p>Year</p>
        <div className="sidebar-dropdown">
          <div className="dropdown-content">
            {years.map((year) => (
              <button key={year._id} onClick={() => onYearSelect(year._id)}>
                {year.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

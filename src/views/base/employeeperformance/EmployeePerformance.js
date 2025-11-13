/*
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
function EmployeePerformance() {
  const navigate = useNavigate();
 
  const [week, setWeek] = useState("");
  const [employees, setEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
 
 
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployees();
  }, []);
 
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
 
    const sorted = [...employees].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
 
    setEmployees(sorted);
    setSortConfig({ key, direction });
  };
 
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "";
  };
 
  const handleNavigate = (emp, mode) => {
    navigate("/theme/performancemetrics", { state: { employee: emp, mode } });
  };
 
 
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  return (
    <div className="container">
      <div className="text-dark">
        <h5>PERFORMANCE DETAILS</h5>
      </div>
 
      <div className="card shadow-sm">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex justify-content-start">
              <input
                type="text"
                className="form-control w-25 me-3"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
 
              <input
                type="week"
                className="form-control w-auto me-3"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                title="Select Week"
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/theme/performancemetrics")}
            >
              <i className="bi bi-plus-circle me-2" /> Add Performance
            </button>
          </div>
 
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                    Emp ID {getSortIcon("id")}
                  </th>
                  <th onClick={() => handleSort("firstName")} style={{ cursor: "pointer" }}>
                    Full Name {getSortIcon("firstName")}
                  </th>
                  <th onClick={() => handleSort("designation")} style={{ cursor: "pointer" }}>
                    Designation {getSortIcon("designation")}
                  </th>
                  <th onClick={() => handleSort("manager")} style={{ cursor: "pointer" }}>
                    Manager {getSortIcon("manager")}
                  </th>
                  <th onClick={() => handleSort("score")} style={{ cursor: "pointer" }}>
                    Score {getSortIcon("score")}
                  </th>
                  <th onClick={() => handleSort("period")} style={{ cursor: "pointer" }}>
                    Evaluation Period {getSortIcon("period")}
                  </th>
                  <th onClick={() => handleSort("rank")} style={{ cursor: "pointer" }}>
                    Rank {getSortIcon("rank")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
 
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.firstName + " " + emp.lastName}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.manager}</td>
                    <td>{emp.score}</td>
                    <td>{emp.period}</td>
                    <td>{emp.rank}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        title="Edit"
                        onClick={() => handleNavigate(emp, "edit")}
                      >
                        <i className="bi bi-pencil-square text-white"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        title="View"
                        onClick={() => handleNavigate(emp, "view")}
                      >
                        <i className="bi bi-eye text-white"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          <nav>
            <ul className="pagination justify-content-end mt-2 ">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
 
export default EmployeePerformance;
*/

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";


function EmployeePerformance() {
  const navigate = useNavigate();

  const [week, setWeek] = useState("");
  const [employees, setEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);


  // ✅ Fetch Performance Data
  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true);

      try {
        // If week selected, extract week number and year
        let url = "http://127.0.0.1:8000/api/performance/summary/";
        if (week) {
          const [year, weekNumber] = week.split("-W");
          url += `?week=${weekNumber}&year=${year}`;
        }

        const token = localStorage.getItem("token"); // optional if using JWT
        console.log("📡 Fetching performance summary from:", url);

        const response = await axiosInstance.get(url);

        console.log("✅ Response from backend:", response.data);


        // 🧠 Merge and remove duplicates by emp_id
        const merged = [...response.data.top_3, ...response.data.weak_3];

        const uniqueData = merged.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.emp_id === item.emp_id)
        );

        const sortedUnique = uniqueData.sort((a, b) => b.average_score - a.average_score);
        setEmployees(sortedUnique);


      } catch (error) {
        console.error("Error fetching performance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [week]);

  // ✅ Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...employees].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setEmployees(sorted);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const handleNavigate = (emp, mode) => {
    navigate("/theme/performancemetrics", {
      state: {
        employee: emp,
        mode,
        evaluation_id: emp.evaluation_id || emp.latest_evaluation_id || emp.id
      }
    });
  };


  // ✅ Search filter
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.emp_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="text-dark">
        <h5>PERFORMANCE DETAILS</h5>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex justify-content-start">
              <input
                type="text"
                className="form-control w-25 me-3"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <input
                type="week"
                className="form-control w-auto me-3"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                title="Select Week"
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/theme/performancemetrics")}
            >
              <i className="bi bi-plus-circle me-2" /> Add Performance
            </button>
          </div>

          {/* ✅ Table */}
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th onClick={() => handleSort("emp_id")} style={{ cursor: "pointer" }}>
                    Emp ID {getSortIcon("emp_id")}
                  </th>
                  <th onClick={() => handleSort("full_name")} style={{ cursor: "pointer" }}>
                    Full Name {getSortIcon("full_name")}
                  </th>
                  <th>Department</th>
                  <th onClick={() => handleSort("average_score")} style={{ cursor: "pointer" }}>
                    Score {getSortIcon("average_score")}
                  </th>
                  <th>Evaluation Period</th>
                  <th onClick={() => handleSort("rank")} style={{ cursor: "pointer" }}>
                    Rank {getSortIcon("rank")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="d-flex justify-content-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                          style={{ width: "3rem", height: "3rem" }}
                        ></div>
                      </div>
                      <div className="mt-2 fw-bold text-primary">Loading records...</div>
                    </td>
                  </tr>
                ) : filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.emp_id}>
                      <td>{emp.emp_id}</td>
                      <td>{emp.full_name}</td>
                      <td>{emp.department_name}</td>
                      <td>{emp.total_score}</td>
                      <td>{emp.evaluation_period || "-"}</td>
                      <td>{emp.rank || "-"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          title="Edit"
                          onClick={() => handleNavigate(emp, "edit")}
                        >
                          <i className="bi bi-pencil-square text-white"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          title="View"
                          onClick={() => handleNavigate(emp, "view")}
                        >
                          <i className="bi bi-eye text-white"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (

                  <tr>
                    <td colSpan="7" className="text-center">
                      No performance records found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePerformance;

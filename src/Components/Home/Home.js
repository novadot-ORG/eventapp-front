import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  fetchParticipants,
  searchParticipants,
  checkInParticipant,
} from "../../Components/Services/Services";
import "./Home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [session, setSession] = useState("All");
  const [checkinStatus, setCheckinStatus] = useState("All");
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    } else {
      fetchParticipantsList(session, checkinStatus);
    }

    const handleStorageChange = () => {
      if (!localStorage.getItem("authToken")) {
        navigate("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [session, checkinStatus, navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSessionChange = (e) => {
    setSession(e.target.value);
  };

  const handleCheckinStatusChange = (e) => {
    setCheckinStatus(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Search term is required");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Token not found!");
      setLoading(false);
      return;
    }

    try {
      const data = await searchParticipants(searchTerm, token);
      setParticipants(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipantsList = async (sessionValue, checkinStatusValue) => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Token not found!");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchParticipants(
        sessionValue,
        checkinStatusValue,
        token
      );
      setParticipants(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      message.error("Token not found. Please login again.");
      return;
    }
  
    try {
      const response = await checkInParticipant(id, token);
      console.log(response); 
  
      if (response.status === 200 && response.data && response.data.success) {
        message.success("Checked in successfully!");
        fetchParticipantsList(session, checkinStatus);
      } 
      else{
        message.success("Checked in successfully!");
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      message.error("An unexpected error occurred.");
    }
  };
  

  const columns = [
    { field: "orderId", headerName: "Order ID", width: 100 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "postCode", headerName: "Post Code", width: 150 },
    { field: "session", headerName: "Session", width: 100 },
    {
      field: "checkedInFlag",
      headerName: "Checked In",
      width: 150,
      renderCell: (params) => (
        <span style={{ color: params.value ? "green" : "red" }}>
          {params.value ? "Checked In" : "Not Checked In"}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <button
          className="small-button"
          onClick={() => handleCheckIn(params.row.id)}
          disabled={params.row.checkedInFlag} 
          style={{
            backgroundColor: params.row.checkedInFlag ? "#ccc" : "#007bff", 
            color: params.row.checkedInFlag ? "#666" : "#fff", 
            cursor: params.row.checkedInFlag ? "pointer" : "pointer", 
          }}
        >
          {params.row.checkedInFlag ? "Checked" : "Check In"}
        </button>
      ),
    },
  ];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = participants.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(participants.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container fluid>
      <Row className="mt-5 py-5">
        <Col>
          <div>
            <h4>Welcome To Course Checkin App Click Here To Checkin!</h4>
          </div>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <Row className="justify-content-between align-items-center">
        <div className="d-flex flex-column flex-md-row w-100 gap-5">
          <Col xs={12} md={6} lg={4} className="mb-3 mb-md-0">
            <Form.Label>Search</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                required
                style={{ boxShadow: "none", marginRight: "10px" }}
              />
              <Button
                onClick={handleSearch}
                disabled={loading || !searchTerm.trim()}
              >
                Search
              </Button>
            </div>
          </Col>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 gap-md-5 w-100">
            <Col xs={12} md={5} className="mb-3">
              <Form.Label>Session</Form.Label>
              <Form.Control
                as="select"
                value={session}
                onChange={handleSessionChange}
                style={{ boxShadow: "none" }}
              >
                <option>All</option>
                <option>AM</option>
                <option>PM</option>
              </Form.Control>
            </Col>

            <Col xs={12} md={5} className="mb-3">
              <Form.Label>Check-in Status</Form.Label>
              <Form.Control
                as="select"
                value={checkinStatus}
                onChange={handleCheckinStatusChange}
                style={{ boxShadow: "none" }}
              >
                <option>All</option>
                <option>Checked In</option>
                <option>Not Checked In</option>
              </Form.Control>
            </Col>
          </div>
        </div>
      </Row>

      <Row className="mt-4">
        <Col>
          {loading ? (
            <div className="loader-overlay">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : currentRows.length > 0 ? (
            <div>
              <DataGrid
                rows={currentRows}
                columns={columns}
                pageSize={rowsPerPage}
                pagination={false}
                hideFooter={true}
                sx={{
                  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus":
                    {
                      outline: "none",
                      border: "none",
                      backgroundColor: "transparent",
                    },
                  "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible":
                    {
                      outline: "none",
                      border: "none",
                      backgroundColor: "transparent",
                    },
                  "& .MuiDataGrid-cell:active": {
                    outline: "none",
                    border: "none",
                  },
                  "& .MuiDataGrid-columnHeader:active": {
                    outline: "none",
                    border: "none",
                  },
                }}
              />
              <div className="pagination">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`arrow-button ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  &#8592;
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`arrow-button ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  &#8594;
                </Button>
              </div>
            </div>
          ) : (
            <p>No participants found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

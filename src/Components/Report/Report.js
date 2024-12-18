import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  fetchPmParticipants,
  fetchAmParticipants,
  fetchThirdSessionAmParticipants,
  fetchThirdSessionPmParticipants,
} from "../../Components/Services/Services";
import "./Report.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const Report = ({ isSidebarOpen }) => {
  const [amParticipants, setAmParticipants] = useState(null);
  const [pmParticipants, setPmParticipants] = useState(null);
  const [thirdSessionParticipants, setThirdSessionParticipants] = useState(null);
  const [thirdSessionParticipantsPm, setThirdSessionParticipantsPm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
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
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);

     
      const pmData = await fetchPmParticipants();
      const amData = await fetchAmParticipants();
      const thirdAmData = await fetchThirdSessionAmParticipants();
      const thirdPmData = await fetchThirdSessionPmParticipants();

      
      setPmParticipants(pmData);
      setAmParticipants(amData);
      setThirdSessionParticipants(thirdAmData);
      setThirdSessionParticipantsPm(thirdPmData);
    } catch (error) {
      console.error("Error fetching session data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const checkedInData = {
    labels: ["AM CheckedIn", "PM CheckedIn"],
    datasets: [
      {
        data: [amParticipants || 0, pmParticipants || 0],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const sessionData = {
    labels: ["Session AM", "Session PM"],
    datasets: [
      {
        data: [thirdSessionParticipants || 0, thirdSessionParticipantsPm || 0],
        backgroundColor: ["#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const totalParticipantsCheckedIn = (amParticipants || 0) + (pmParticipants || 0);
  const totalParticipantsSessions = (thirdSessionParticipants || 0) + (thirdSessionParticipantsPm || 0);

  return (
    <Container fluid>
      <Row className="mt-5 py-5">
        {loading ? (
          <Col xs={12} className="loader-overlay">
            <Spinner animation="border" variant="primary" />
          </Col>
        ) : (
          <>
            <Col xs={12} sm={6} md={6} className="mb-3">
              <Card className="text-center">
                <Card.Body>
                  <div style={{ height: "200px", position: "relative" }}>
                    <Pie data={checkedInData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                  <h5>AM: {amParticipants} | PM: {pmParticipants}</h5>
                  <h6>Total Checked In: {totalParticipantsCheckedIn}</h6>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={6} className="mb-3">
              <Card className="text-center">
                <Card.Body>
                  <div style={{ height: "200px", position: "relative" }}>
                    <Pie data={sessionData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                  <h5>AM: {thirdSessionParticipants} | PM: {thirdSessionParticipantsPm}</h5>
                  <h6>Total Participants: {totalParticipantsSessions}</h6>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Report;

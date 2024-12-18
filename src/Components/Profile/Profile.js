import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Profile.css";

const Profile = ({ isSidebarOpen }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Container fluid>
      <Row className="mt-5 py-5">
        <Col>
          <section className="section profile">
            <div className="row">
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img
                      src="assets/img/profile-img.jpg"
                      alt="Profile"
                      className="rounded-circle"
                    />
                    <h2>Testing</h2>
                    <h3>Testing</h3>
                  </div>
                </div>
              </div>

              <div className="col-xl-8">
                <div className="card">
                  <div className="card-body pt-3">
                    <ul className="nav nav-tabs nav-tabs-bordered">
                      <li className="nav-item">
                        <button
                          className="nav-link active" 
                          data-bs-toggle="tab"
                          data-bs-target="#profile-edit"
                        >
                          Edit Profile
                        </button>
                      </li>

                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-change-password"
                        >
                          Change Password
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content pt-2">
                      <div
                        className="tab-pane fade show active profile-edit pt-3" 
                        id="profile-edit"
                      >
                        <form>
                          <div className="row mb-3">
                            <label
                              htmlFor="profileImage"
                              className="col-md-4 col-lg-3 col-form-label"
                            >
                              Profile Image
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <img
                                src="assets/img/profile-img.jpg"
                                alt="Profile"
                                className="img-thumbnail"
                              />
                              <div className="pt-2 d-flex gap-3">
                                <a
                                  href="#"
                                  className="btn btn-primary btn-sm"
                                  title="Upload new profile image"
                                >
                                  <i className="bi bi-upload"></i> Upload
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-danger btn-sm"
                                  title="Remove my profile image"
                                >
                                  <i className="bi bi-trash"></i> Remove
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label
                              htmlFor="fullName"
                              className="col-md-4 col-lg-3 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="fullName"
                                type="text"
                                className="form-control"
                                id="fullName"
                                placeholder="Name"
                              />
                            </div>
                          </div>

                          <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>

                      <div
                        className="tab-pane fade pt-3"
                        id="profile-change-password"
                      >
                        <form>
                          <div className="row mb-3">
                            <label
                              htmlFor="currentPassword"
                              className="col-md-4 col-lg-3 col-form-label"
                            >
                              Current Password
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="password"
                                type="password"
                                className="form-control"
                                id="currentPassword"
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label
                              htmlFor="newPassword"
                              className="col-md-4 col-lg-3 col-form-label"
                            >
                              New Password
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="newpassword"
                                type="password"
                                className="form-control"
                                id="newPassword"
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label
                              htmlFor="renewPassword"
                              className="col-md-4 col-lg-3 col-form-label"
                            >
                              Re-enter New Password
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="renewpassword"
                                type="password"
                                className="form-control"
                                id="renewPassword"
                              />
                            </div>
                          </div>

                          <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                              Change Password
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

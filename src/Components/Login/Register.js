import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { registerUser } from "../../Components/Services/Services";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(formData.username, formData.password);
      console.log("Response Data:", data);

      const basicAuthHeader = `Basic ${btoa(
        `${formData.username}:${formData.password}`
      )}`;

      localStorage.setItem("userId", data.id);
      localStorage.setItem("authHeader", basicAuthHeader);

      message.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
      message.error(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4"></div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Sign Up
                      </h5>
                    </div>

                    {errorMessage && (
                      <div className="alert alert-danger">{errorMessage}</div>
                    )}

                    <form
                      className="row g-3 needs-validation"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Username
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="yourUsername"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={{ boxShadow: "none" }}
                          />
                          <div className="invalid-feedback">
                            Please enter your username.
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          style={{ boxShadow: "none" }}
                        />
                        <div className="invalid-feedback">
                          Please enter your password!
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary w-100"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <div
                              className="spinner-border text-light"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Register"
                          )}
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Already have an account? <Link to="/">Login</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;

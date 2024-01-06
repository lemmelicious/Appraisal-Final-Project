import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username && !password) {
      setError("Username and password are required.");
      return;
    }

    if (!username) {
      setError("Username is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (username.length < 5) {
      setError("Username should be at least 5 characters long.");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password should be at least 8 and not greater than 30 characters having one uppercase letter and one special character."
      );
      return;
    }

    const configuration = {
      method: "post",
      url: "http://localhost:8000/api/register",
      data: {
        username,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        history.push("/login");
      })
      .catch((error) => {
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <div
      className="login-register-form"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <div
        className="login-register-box"
        style={{
          width: "300px",
          padding: "20px",
          backgroundColor: "black",
          border: "1px solid white",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "white",
          }}
        >
          Register
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "white" }}>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              style={{
                marginBottom: "8px",
                border: "1px solid white",
                borderRadius: "4px",
                padding: "8px",
                width: "100%",
                color: "black",
                backgroundColor: "white",
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                marginBottom: "8px",
                border: "1px solid white",
                borderRadius: "4px",
                padding: "8px",
                width: "100%",
                color: "black",
                backgroundColor: "white",
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
              marginTop: "10px",
              backgroundColor: "red",
            }}
          >
            Register
          </Button>
        </Form>

        <div
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "white",
          }}
        >
          Already have an account? <Link to="/login">Login now!</Link>
        </div>
      </div>
    </div>
  );
}

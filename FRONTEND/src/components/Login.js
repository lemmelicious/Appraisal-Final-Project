import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Login({ handleLogin, isAuthenticated }) {
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
      setError("Please enter your username");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    const configuration = {
      method: "post",
      url: "http://localhost:8000/api/login",
      data: {
        username,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        handleLogin(result.data.token);
        history.push("/vehicle-list");
      })
      .catch((error) => {
        setError("Invalid username or password.");
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
          className="login-header"
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "30px",
          }}
        >
          LOGIN
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
                color: "black", // Changed text color to black
                backgroundColor: "white", // Changed background color to white
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
                color: "black", // Changed text color to black
                backgroundColor: "white", // Changed background color to white
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
            Login
          </Button>
        </Form>

        <div
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "white",
          }}
        >
          Don't have an account? <Link to="/register">Register now!</Link>
        </div>
      </div>
    </div>
  );
}

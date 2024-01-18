import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "./Login.css";

function Login() {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const login = async () => {
    try {
      setLoading(true); // Set loading to true on login attempt

      const response = await fetch("http://localhost:4000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userInfo));
        dispatch({ type: "USER", payload: data.userInfo });
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2>Instamern</h2>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          onClick={() => login()}
          className={`btn-large waves-effect waves-light #42a5f5 blue darken-1 ${
            loading ? "disabled" : ""
          }`}
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;

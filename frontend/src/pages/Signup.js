import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = () => {
    setLoading(true);

    fetch("http://localhost:4000/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.error) {
          alert(data.error);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Registration error:", error);
        alert("An unexpected error occurred. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2>Instamern</h2>
        <input
          type="text"
          placeholder="Enter fullname"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => register()}
          className={`btn-large waves-effect waves-light #42a5f5 blue darken-1`}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Signup"}
        </button>
      </div>
    </div>
  );
}

export default Signup;

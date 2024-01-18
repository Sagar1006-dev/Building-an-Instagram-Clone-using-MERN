import React, { useContext } from "react";
import "./NavBar.css";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const menuList = () => {
    if (state) {
      return [
        <li key="create-post">
          <Link to="/create-post">Create Post</Link>
        </li>,
        <li key="profile">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="logout">
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "LOGOUT" });
              navigate("/login");
            }}
            className="btn-large waves-effect waves-light #42a5f5 blue darken-1"
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="signup">
          <Link to="/signup">Signup</Link>
        </li>,
        <li key="login">
          <Link to="/login">Login</Link>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left">
          Instamern
        </Link>
        <ul id="nav-mobile" className="right">
          {menuList()}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

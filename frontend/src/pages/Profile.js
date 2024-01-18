import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Profile.css";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/myposts", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.myposts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div className="profile-container">
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80"
            alt={`Profile of ${state ? state.fullName : "User"}`}
          />
        </div>
        <div>
          <h4>{state ? state.fullName : "Loading..."}</h4>
          <div className="info-section">
            <h6>{posts.length} posts</h6>
            <h6>60 followers</h6>
            <h6>70 followings</h6>
          </div>
        </div>
      </div>
      <div className="gallery-container">
        {posts.map((post) => (
          <img
            key={post._id}
            className="post"
            src={post.imgUrl}
            alt={`Post by ${state ? state.fullName : "User"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;

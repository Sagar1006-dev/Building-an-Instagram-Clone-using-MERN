import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/posts", {
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        console.log(data);

        // Check if data.allPosts is defined and an array
        if (data && data.allPosts && Array.isArray(data.allPosts)) {
          setPosts(data.allPosts);
        } else {
          console.error("Data or data.allPosts is undefined or not an array");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const deletePost = (postId) => {
    fetch(`http://localhost:4000/delete-post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Filtering out the deleted post from the current posts state
        const newPosts = posts.filter((item) => item._id !== data.result._id);
        // Updating the state with the new posts array
        setPosts(newPosts);
      })
      .catch((error) => {
        console.error("Error deleting post:", error.message);
        // Handle error, show a user-friendly message or take appropriate action
      });
  };
  
  return (
    <div className="home-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div className="card home-card" key={post._id}>
            <h5>
              {post.author.fullName}{" "}
              <i
                onClick={() => deletePost(post._id)}
                className="material-icons"
                style={{ float: "right", color: "red",cursor: "pointer" }}
              >
                X
              </i>
            </h5>
            <div className="card-image">
              <img src={post.imgUrl} alt={`Post by ${post.author.fullName}`} />
            </div>
            <div className="card-content">
              <h6>{post.title}</h6>
              <p>{post.content}</p>
              <input type="text" placeholder="Add comment" />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

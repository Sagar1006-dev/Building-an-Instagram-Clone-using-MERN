import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submitData = async () => {
    try {
      // Check if title and content are not empty
      if (!title || !content) {
        alert("Mandatory fields cannot be empty");
        return;
      }

      setLoading(true);

      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "instamern");
      imageData.append("cloud_name", "sagaracoder");

      // Upload image to Cloudinary
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/sagaracoder/image/upload",
        {
          method: "post",
          body: imageData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      console.log("Cloudinary response:", cloudinaryData);

      if (!cloudinaryResponse.ok) {
        throw new Error(
          `Cloudinary upload failed. Status: ${cloudinaryResponse.status}`
        );
      }

      setUrl(cloudinaryData.url); // Set the URL after successful upload
    } catch (error) {
      console.error("Error during fetch:", error.message);
      console.log(
        "An error occurred while creating the post. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (url) {
        try {
          console.log("Image uploaded successfully:", url);

          // Create post on your server
          const createPostResponse = await fetch(
            "http://localhost:4000/create-post",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                title: title,
                content: content,
                imgUrl: url,
              }),
            }
          );

          if (!createPostResponse.ok) {
            throw new Error(
              `Post creation failed. Status: ${createPostResponse.status}`
            );
          }

          const postData = await createPostResponse.json();
          if (postData.error) {
            alert(`Post creation error: ${postData.error}`);
          } else {
            console.log(postData);
            navigate("/");
          }
        } catch (error) {
          console.error("Error during fetch:", error.message);
          console.log(
            "An error occurred while creating the post. Please try again later."
          );
        }
      }
    };

    fetchData();
  }, [url, title, content, navigate]);

  return (
    <div className="card input-filed post-container">
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #42a5f5 blue darken-1">
          <span>Upload image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        onClick={() => submitData()}
        className="btn-large waves-effect waves-light #42a5f5 blue darken-1"
        disabled={loading}
      >
        {loading ? "Creating Post..." : "Create Post"}
      </button>
    </div>
  );
}

export default CreatePost;

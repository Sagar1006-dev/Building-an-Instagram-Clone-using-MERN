# Instagram Clone using MERN Stack

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

This project is an Instagram clone built using the MERN (MongoDB, Express.js, React, Node.js) stack. It aims to replicate the core features of the popular social media platform, allowing users to share photos, follow others, and engage with content.

## Features

- User Authentication: Sign up, log in, and log out functionality.
- Post Creation: Users can upload photos and share them with their followers.
- Feed: A personalized feed displaying posts from the users a person is following.
- Likes and Comments: Users can interact with posts by liking and commenting.
- User Profiles: View and edit user profiles, including profile pictures and bio.
- Follow/Unfollow: Users can follow and unfollow each other.

## Technologies

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** CSS (or any styling framework of choice)


## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sagar1006-dev/Building-an-Instagram-Clone-using-MERN
   cd Instagram-Clone

   # Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Set up the environment variables:
Create a .env file in the server directory and add the following:
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret

# Run the server
cd server
npm start

# Run the client
cd ../client
npm start
The application should now be running. Open your browser and navigate to http://localhost:3000.

Usage
Sign Up:

Create an account by providing a username, email, and password.
Log In:

Log in with your username and password.
Create a Post:

Upload photos and add captions to share with your followers.
Explore:

Discover and engage with posts from users you follow in your feed.
Interact:

Like and comment on posts to interact with other users.

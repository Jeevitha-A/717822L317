import React, { useEffect, useState } from "react";
import axios from "axios";

const SocialMediaApp = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI0MjQzLCJpYXQiOjE3NDI2MjM5NDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU3MjEwMWQ2LTI0NjEtNDk5Ni04Mzc5LTQ3NGVlOGEyN2I4NyIsInN1YiI6IjcxNzgyMmwzMTdAa2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0gY29sbGVnZSBvZiBlbmdpbmVlcmluZyIsImNsaWVudElEIjoiNTcyMTAxZDYtMjQ2MS00OTk2LTgzNzktNDc0ZWU4YTI3Yjg3IiwiY2xpZW50U2VjcmV0IjoianFaR2p3eHBLV3FoUFhPdyIsIm93bmVyTmFtZSI6IkplZXZpdGhhIiwib3duZXJFbWFpbCI6IjcxNzgyMmwzMTdAa2NlLmFjLmluIiwicm9sbE5vIjoiNzE3ODIyTDMxNyJ9.PexmzT-x6ULnW9lqY-g2QrephWhGuXA2B9oes__lMK8";
    localStorage.setItem("accessToken", token);
    console.log("Token stored in localStorage!");

    const fetchData = async () => {
      const savedToken = localStorage.getItem("accessToken");
      console.log("Stored Token:", savedToken);

      try {
        
        const response = await axios.get("http://20.244.56.144/test/users", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        console.log("Data fetched:", response.data);

        
        const usersArray = Object.entries(response.data.users).map(
          ([id, name]) => ({ id, name })
        );

        setUsers(usersArray);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Response Data:", err.response.data);
          setError(`Failed to fetch data: ${err.response.data.message}`);
        } else {
          console.error("Error Details:", err.toJSON ? err.toJSON() : err);
          setError("Network error or server unavailable");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1>Social Media User List</h1>

      {loading && <p>Loading...</p>}
      {error && <p >{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id} >
            {user.id}: {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMediaApp;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function GetUser() {
  let params = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const response = await fetch(`/users/${id}`);
        const data = await response.json();
        console.log("data:", data);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(params.userId);
  }, [params.userId]);

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default GetUser;

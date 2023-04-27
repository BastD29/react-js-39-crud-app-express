import React, { useState, useEffect } from "react";

function DeleteUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const _users = users.filter((user) => user.id !== id);
        // alert("Are you sure you want to delete this user?");
        setUsers(_users);
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default DeleteUser;

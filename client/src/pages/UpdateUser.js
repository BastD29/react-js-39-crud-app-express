import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateUser() {
  let params = useParams();

  const [user, setUser] = useState({});

  // 1. retrieve the user with corresponding id
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

  // 2. submitting new data for corresponding id
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/users/${params.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      });
      const data = await response.json();
      console.log("data:", data);
      setUser(data);
      alert("User updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          name="name"
          type="text"
          value={user.name || ""}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={user.email || ""}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Update user</button>
    </form>
  );
}

export default UpdateUser;

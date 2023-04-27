const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// const users = [
//   { id: 1, name: "John Doe", email: "john.doe@example.com" },
//   { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
//   { id: 3, name: "Bob Smith", email: "bob.smith@example.com" },
// ];

const users = [];

// get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// get user by id
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const user = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(user);
  res.json(user);
});

// update user by id
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

// delete user by id
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }
  users.splice(userIndex, 1);
  res.send("User deleted");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

import express from "express";

const app = express();

const users = [
  { id: "1", name: "Franco", city: "Londres" },
  { id: "2", name: "Francisco", city: "Londres" },
  { id: "3", name: "Marla", city: "BuenosAires" },
];

// localhost:8080/users?city=Londres&age=29
app.get("/users", (req, res) => {
  const { city } = req.query;

  if (city) {
    res.send(users.filter((u) => u.city === city));
  } else {
    res.send(users);
  }
});

app.get("/users/:id/", (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;

  const user = users.find((u) => u.id === id);

  res.send(user);
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

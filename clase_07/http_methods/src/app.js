import express from "express";

const app = express();
app.use(express.json());

let users = [];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const userData = {
    ...req.body,
    id: users.length,
  };

  if (!req.body.username || !req.body.email) {
    return res.status(400).send({ error: "Missing parameters" });
  }

  users = [...users, userData];

  res.status(201).send(users);
});

app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  if (!req.body.username || !req.body.email) {
    return res.status(400).send({ error: "Missing parameters" });
  }

  users = users.map((u) => {
    if (userId === u.id) {
      return {
        ...req.body,
        id: u.id,
      };
    }

    return u;
  });

  res.send(users);
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  users = users.filter((u) => u.id !== userId);

  res.send(users);
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

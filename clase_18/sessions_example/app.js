import express from "express";
import session from "express-session";

const app = express();
app.use(
  session({
    secret: "mi-secreto",
    saveUninitialized: true,
    resave: true,
  })
);

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;

    return res.send(`Cantidad de visitas ${req.session.counter}`);
  }

  req.session.counter = 1;
  res.send("Bienvenido!");
});

app.use(express.json());
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== "user" && password !== "password") {
    return res.status(401).send("Login failed!");
  }

  req.session.user = username;
  req.session.isAdmin = true;

  res.send("login successful");
});

function authenticate(req, res, next) {
  if (req.session.user === "user" && req.session.isAdmin) {
    return next();
  }

  return res.status(401).send("Error de autenticación");
}

app.get("/privado", authenticate, (req, res) => {
  res.send("Usuario logueado");
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }

    res.send("Logout OK!");
  });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

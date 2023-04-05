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

app.get("/", (req, res) => {
  let message = "";
  const { user } = req.query;

  if (user && !req.session.user) {
    req.session.user = user;
  }

  if (req.session.user) {
    message = `Te damos la bienvenida ${req.session.user}.`;
  } else {
    message = "Te damos la bienvenida.";
  }

  if (!req.session.viewCount) {
    req.session.viewCount = 1;
    return res.send(message);
  } else {
    req.session.viewCount++;
  }

  message += ` Visitaste la página ${req.session.viewCount} veces`;

  res.send(message);
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

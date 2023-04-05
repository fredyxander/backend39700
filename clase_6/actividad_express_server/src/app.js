import express from "express";

const app = express();

app.get("/bienvenida", (req, res) => {
  res.send(`<p style='color:blue'>Bienvenid@!</p>`);
});

app.get("/usuario", async (req, res) => {
  res.send({
    firstName: "Ale",
    lastName: "Suarez",
    age: 29,
    email: "ale@gmail.com",
  });
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

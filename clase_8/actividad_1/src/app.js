import express from "express";
import petsRouter from "./routes/pets.router.js";
import usersRouter from "./routes/users.router.js";
import path from "path";
import { fileURLToPath } from "url";

// Debemos crear nuestra propia variable __dirname a través de este método si usamos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

/**
 * Definimos nuestra ruta estática para que el directorio /public sea accesible
 * desde http://localhost:8080/ (URL base)
 * Nótese que, por defecto, si no especifico la ruta del archivo el servidor buscará
 * un index.html. De forma que http://localhost:8080/ me devolverá el mismo archivo
 * que http://localhost:8080/index.html
 */
app.use(express.static(__dirname + "/../public"));

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

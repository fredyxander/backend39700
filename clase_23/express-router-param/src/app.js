import express from "express";
import { petRouter } from "./routes/pets.routes.js";

const app = express();
const port = 8080;

//midlewares
app.use(express.json());

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//routes
app.use("/api/pets",petRouter);
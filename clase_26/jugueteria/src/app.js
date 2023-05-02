import express from "express";
import { options } from "./config/config.js";
import { ToysRouter } from "./rutas/juguetes.routes.js";
import { usersRouter } from "./rutas/users.routes.js";
import { CategoryRouter } from "./rutas/categories.routes.js";

const app = express();
const port = options.server.port;

//middleware
app.use(express.json());

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//rutas
app.use("/api/toys", ToysRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", CategoryRouter);
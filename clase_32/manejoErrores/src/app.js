import express from "express";
import { usersRouter } from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const port = 8080;
const app =express();

//middlewares
app.use(express.json());

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//router
app.use("/api/users", usersRouter);
app.use(errorHandler);
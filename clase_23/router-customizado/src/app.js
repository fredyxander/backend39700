import express from "express";
import { UserRouter } from "./routes/user.routes.js";

const app = express();
const port = 8080;

//midlewares
app.use(express.json());

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//instancias del router
const userRouter = new UserRouter();

//routes
app.use("/api/users",userRouter.getRouter());
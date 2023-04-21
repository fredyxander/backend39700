import express from "express";
import { UserRouter } from "./routes/user.routes.js";
import { SessionRouter } from "./routes/session.routes.js";

const app = express();
const port = 8080;

//midlewares
app.use(express.json());

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//instancias del router
const userRouter = new UserRouter();
const sessionRouter  = new SessionRouter();

//routes
app.use("/api/users",userRouter.getRouter());
app.use("/api/sessions",sessionRouter.getRouter());
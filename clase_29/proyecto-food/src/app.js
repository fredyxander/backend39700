import express from "express";
import { options } from "./config/options.js";
import cors from "cors";

import { usersRouter } from "./routes/users.routes.js";
import { businessRouter } from "./routes/business.routes.js";
import { ordersRouter } from "./routes/orders.routes.js";

const port = options.server.port || 8080;
const app = express();

//middlewares
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}))

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//routes
app.use("/api/users", usersRouter);
app.use("/api/business", businessRouter);
app.use("/api/orders", ordersRouter);
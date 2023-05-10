import express from "express";
import { contactsRouter } from "./routes/contacts.routes.js";
import {connectDB} from "./config/dbConnection.js";
import { options } from "./config/config.js";

const port = options.server.port || 8080;
const app = express();

//middlewares
app.use(express.json());

app.listen(port,()=>console.log(`Server listening on port ${port}`));

connectDB();

//routes
app.use("/api/contacts", contactsRouter);
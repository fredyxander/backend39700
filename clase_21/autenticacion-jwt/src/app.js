import express from "express";
import path from "path";
import { __dirname } from "./utils.js";
import {AuthRouter} from "./routes/auth.routes.js";

const app = express();
const port = 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use("/api/sessions", AuthRouter);

app.listen(port,()=>console.log(`Server on port ${port}`));
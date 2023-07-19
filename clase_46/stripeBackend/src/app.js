import express from "express";
import cors from "cors";
import { paymentRouter } from "./routes/payment.routes.js";

const port = 8080;
const app = express();

app.use(cors());

app.listen(port,()=>console.log(`Server ok`));

app.use("/api/payments", paymentRouter);
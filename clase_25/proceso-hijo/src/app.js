import express from "express";
import {fork} from "child_process";
import { operacionCompleja } from "./process/childProcess.js";
import { __dirname } from "./utils.js";
import path from "path";

const app = express();
const port = 8080;

app.listen(port,()=>console.log(`Server listening on port ${port}`));

app.get("/suma-bloqueante",(req,res)=>{
    const resultado = operacionCompleja();
    res.send(`El resultado de la suma es ${resultado}`);
});

app.get("/suma-nobloqueante",(req,res)=>{
    const child = fork(path.join(__dirname,"/process/childProcess.js"));//creamos el proceso hijo
    child.send("start");
    child.on("message",(result)=>{
        res.send(`El resultado de la suma es ${result}`);
    })
})

app.get("/",(req,res)=>{
    res.send("bienvenido");
});
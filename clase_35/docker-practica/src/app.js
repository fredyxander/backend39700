import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.port || 8080;
const app = express();

// console.log(`Soy un proceso secundario ${process.pid}`);
app.listen(port,()=>console.log(`Servidor corriendo en el puerto ${port} en el proceso ${process.pid}`));

app.get("/",(req,res)=>{
    res.send("hola desde docker");
});

app.get("/sencilla",(req,res)=>{
    let sum=0;
    for(let i=0;i<1000000;i++){
        sum +=i
    };
    res.send({sum});
});

app.get("/compleja",(req,res)=>{
    let sum=0;
    for(let i=0;i<5e8;i++){
        sum +=i
    };
    res.send({sum});
});

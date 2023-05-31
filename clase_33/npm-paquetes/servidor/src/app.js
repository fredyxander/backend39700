import express from "express";
import {sumar, potencia} from "matematicas-coder";

const port = 8080;
const app = express();

app.listen(port,()=>console.log('server ok'));

app.get("/",(req,res)=>{
    const {numero1, numero2} = req.query;
    const resultado = sumar(parseInt(numero1),parseInt(numero2));
    res.json({status:"success", message:`El resultado de la suma es ${resultado}`});
});
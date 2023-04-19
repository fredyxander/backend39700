import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(cookieParser());

app.listen(port,()=>console.log(`Server listening on port ${port}`));

let users = [
    {email:"freddy5210@gmail.com", password:"1234"}
]
//routes
app.post("/login",(req,res)=>{
    const {email, password} = req.body;
    const user = users.find(u=>u.email === email);
    if(user){
        if(user.password === password){
            const token = jwt.sign({email},"secretToken");
            res.cookie("token-cookie",token, {httpOnly:true}).json({status:"success"});
        }
    } else {
        res.status(400).json({message:"El usuario no existe"});
    }
});

app.get("/profile",(req,res)=>{
    const token = req.cookies["token-cookie"];
    const info = jwt.verify(token,"secretToken");
    if(info){
        res.json({message:`Tu correo es ${info.email}`});
    } else {
        res.status(401).json({message:"autenticacion invalida"})
    }
});
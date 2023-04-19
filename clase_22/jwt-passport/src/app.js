import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import {authenticate, authorize} from "./middlewares/autheticate.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(cookieParser());

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//configuracion de passport
initializePassport();
app.use(passport.initialize());


let users = [
    {email:"freddy5210@gmail.com", password:"1234", role:"superadmin"}
]
//routes
app.post("/login",(req,res)=>{
    const {email, password} = req.body;
    const user = users.find(u=>u.email === email);
    if(user){
        if(user.password === password){
            const token = jwt.sign({email, role:user.role},"secretToken");
            res.cookie("token-cookie",token, {httpOnly:true}).json({status:"success"});
        }
    } else {
        res.status(400).json({message:"El usuario no existe"});
    }
});

app.get("/users", authenticate("jwt"), authorize("superadmin") , (req,res)=>{
    res.json({message:`acceso concedido ${req.user.email}`});
});
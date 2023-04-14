import {Router} from "express";
import { generateToken, validateToken } from "../utils.js";

const router = Router();

let users=[];

router.post("/signup",(req,res)=>{
    const {name,email, password} = req.body;
    const user = users.find(u=>u.email === email);
    if(user){
        return res.json({message:"El usuario ya esta registrado"});
    }
    users.push(req.body);
    //generamos el token
    const accessToken = generateToken({name,email});
    res.json({accessToken});
});

router.get("/profile",validateToken,(req,res)=>{
    res.json({message:req.user})
});

export {router as AuthRouter};
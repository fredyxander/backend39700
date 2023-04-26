import {Router} from "express";
import {UserManagerMongo} from "../daos/managers/userManagerMongo.js";
import { UserModel } from "../daos/models/user.model.js";
import passport from "passport";
import { isValidPassword, createHash } from "../utils.js";
import jwt from "jsonwebtoken";
import { options } from "../config/options.js";

const router = Router();
const userManager = new UserManagerMongo(UserModel);

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userManager.getUserByEmail(email);
        if(user){
            //validar la contraseña
            if(isValidPassword(password,user)){
                //generar el token
                const token = jwt.sign({_id:user._id,first_name: user.first_name, email:user.email, role:user.role},options.server.secretToken, {expiresIn:"24h"});
                res.cookie(options.server.cookieToken, token,{
                    httpOnly:true
                }).redirect("/products")
            } else {
                res.send(`<div>Credenciales invalidas, <a href="/login">Intente de nuevo</a></div>`);
            }
        } else {
            res.send(`<div>el usuario no esta registrado, <a href="/signup">Registrarse</a></div>`);
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/signup",async(req,res)=>{
    try {
        const {first_name,last_name,email,password} = req.body;
        const user = await userManager.getUserByEmail(email);
        if(!user){
            let role='user';
            if (email.endsWith("@coder.com")) {
                role = "admin";
            }
            const newUser={
                first_name,
                last_name,
                email,
                password:createHash(password),
                role
            };
            const userCreated = await userManager.addUser(newUser);
            const token = jwt.sign({_id:userCreated._id,first_name: userCreated.first_name, email:userCreated.email, role:userCreated.role}, options.server.secretToken , {expiresIn:"24h"} );
            res.cookie(options.server.cookieToken, token,{
                httpOnly:true
            }).redirect("/products");
        } else {
            res.send(`<div>el usuario ya esta registrado, <a href="/login">Loguearse</a></div>`);
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.post("/logout",(req,res)=>{
    console.log("recibido")
    req.logout(()=>{
        res.clearCookie(options.server.cookieToken).json({status:"success", message:"sesion finalizada"});
    });
});

export { router as authRouter};
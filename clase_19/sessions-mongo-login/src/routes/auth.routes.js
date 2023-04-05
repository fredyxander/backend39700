import {Router} from "express";
import { UserModel } from "../models/user.models.js";

const router = Router();

//rutas de autenticacion
router.post("/signup",async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email:email});
        // console.log("user", user);
        if(!user){
            //si no existe el usuario lo registramos
            const newUser = await UserModel.create({email, password});
            req.session.user=newUser.email;
            // res.send("usuario logueado");
            return res.redirect("/profile");
        }
        //si ya existe enviamos un mensaje que el usuario ya existe
        res.send(`Usuario ya registrado <a href="/login">Incia sesion</a>`);
    } catch (error) {
        console.log(error);
    }
});

router.post("/logout",(req,res)=>{
    req.session.destroy(error=>{
        if(error) return res.send("La sesion no se pudo cerrar");
        res.redirect("/");
    });
});

export {router as AuthRouter};
import {Router} from "express";
import { UserModel } from "../models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

//rutas de autenticacion
router.post("/signup",async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email:email});
        // console.log("user", user);
        if(!user){
            //si no existe el usuario lo registramos
            const newUser ={
                email,
                password:createHash(password)
            }
            const userCreated = await UserModel.create(newUser);
            req.session.user=userCreated.email;
            // res.send("usuario logueado");
            return res.redirect("/profile");
        }
        //si ya existe enviamos un mensaje que el usuario ya existe
        res.send(`Usuario ya registrado <a href="/login">Incia sesion</a>`);
    } catch (error) {
        console.log(error);
    }
});

router.post("/login",async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email:email});
        // console.log("user", user);
        if(user){
            //si existe el usuario, verificar la contraseña
            if(isValidPassword(user,password)){
                req.session.user=user.email;
                // res.send("usuario logueado");
                return res.send("login exitoso")
            } else {
                res.send(`Credenciales invalidas`);
            }
        }
        //si no existe enviamos un mensaje que el usuario no esta resgistrado
        res.send(`Usuario no registrado, <a href="/signup">registrarse</a>`);
    } catch (error) {
        console.log(error);
    }
})

router.post("/forgot",async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email:email});
        if(user){
            user.password = createHash(password);
            const userUpdate = await UserModel.findOneAndUpdate({email:user.email}, user);
            res.send("contraseña actualizada");
        } else {
            req.send("El usuario no esta registrado")
        }
    } catch (error) {
        res.send("No se pudo restaurar la contraseña")
    }
});

router.post("/logout",(req,res)=>{
    req.session.destroy(error=>{
        if(error) return res.send("La sesion no se pudo cerrar");
        res.redirect("/");
    });
});

export {router as AuthRouter};
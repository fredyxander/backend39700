import {Router} from "express";
import { UserModel } from "../models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

//rutas de autenticacion
router.post("/signup",passport.authenticate("signupStrategy",{
    failureRedirect:"/failure-signup"
}),(req,res)=>{
    res.send("usuario registrado");
});

router.get("/failure-signup",(req,res)=>{
    res.send("No fue posible registrar el usuario");
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
            const userUpdate = await UserModel.findOneAndUpdate({email:user.email}, user,{new:true});
            res.send("contraseña actualizada");
        } else {
            req.send("El usuario no esta registrado")
        }
    } catch (error) {
        res.send("No se pudo restaurar la contraseña")
    }
});

router.get("/logout",(req,res)=>{
    //rq.logOut elimina la propiedad req.user y limpia la sesion de autenticacion actual
    req.logOut(error=>{
        if(error){
            return res.send("no se pudo cerrar la sesion");
        }else {
            //req.session.detroy elimina la sesion del usuario de la memoria del servidor y de la base de datos
            req.session.destroy(err=>{
                if(err) return res.send("no se pudo cerrar la sesion");
                res.send("sesion finalizada")
            })
        }
    })
});

export {router as AuthRouter};
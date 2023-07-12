import passport from "passport";
import LocalStrategy  from "passport-local";
import { UserModel } from "../daos/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

export const initializePassport = ()=>{
    //Estrategia de registro
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField:"email",
            passReqToCallback:true
        },
        async(req,username,password,done)=>{
            try {
                // console.log(req.file);
                const {name} = req.body;
                const user = await UserModel.findOne({email:username});
                if(user){
                    return done(null,false)
                }
                //crear el usuario
                let rol='user';
                if (username.endsWith("@coder.com")) {
                    rol = "admin";
                }
                //si no existe el usuario lo registramos
                const newUser = {
                    name,
                    email:username,
                    password:createHash(password),
                    rol,
                    avatar:req.file.path
                };
                // console.log(newUser)
                const userCreated = await UserModel.create(newUser);
                return done(null,userCreated)
            } catch (error) {
                console.log(error.message);
                return done(error);
            }
        }
    ));

    //estrategia de login con passport-local
    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField:"email"
        },
        async (username, password, done)=>{
            try {
                const user = await UserModel.findOne({email:username});
                if(!user){
                    return done(null, false);
                }
                //usuario existe, validar contraseña
                if(!isValidPassword(password, user)) return done(null, false);
                //modificar last_connection del usuario que se loguea
                user.last_connection = new Date();
                const userUpdated = await UserModel.findByIdAndUpdate(user._id,user);
                return done(null, userUpdated);
            } catch (error) {
                return done(error);
            }
        }
    ));

    //serializacion y deserializacion
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    });//sesion {cookie, passport:user:id}

    passport.deserializeUser(async(id,done)=>{
        const userDB = await UserModel.findById(id);
        done(null, userDB)
    });//req.user = userDB
}
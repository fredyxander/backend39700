import passport from "passport";
import LocalStrategy from "passport-local";
import { UserModel } from "../models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";

const initializedPassport = ()=>{
    passport.use("signupStrategy",new LocalStrategy(
        {
            usernameField:"email",
            passReqToCallback:true
        },
        async(req,username, password, done)=>{
            try {
                const {name,age} = req.body;
                const user = await UserModel.findOne({email:username});
                if(user){
                    return done(null,false)
                }
                //si no existe en la db
                const newUser ={
                    name,
                    age,
                    email:username,
                    password:createHash(password)
                };
                const userCreated = await UserModel.create(newUser);
                return done(null,userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));


    //serializar y deserializar usuarios
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await UserModel.findById(id);
        return done(null, user);//req.user = user
    });
}

export {initializedPassport}
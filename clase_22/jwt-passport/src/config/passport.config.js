import passport from "passport";
import jwt from "passport-jwt";

const jwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;//Extraer token desde cookies, header, params, body

export const initializePassport = ()=>{
    passport.use("jwt", new jwtStrategy(
        {
            jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:"secretToken"
        },
        async(jwt_payload, done)=>{
            try {
                return done(null,jwt_payload)
            } catch (error) {
                return done(error)
            }
        }
    ))
};

export const cookieExtractor = (req)=>{
    let token = null;
    //verificar si hay cookies dentro del objeto req y si hay, vamos el token de la cookie
    if(req && req.cookies){
        token= req.cookies["token-cookie"];
    }
    return token;
}

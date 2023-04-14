import * as url from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY="tokenSecretKey";

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync()) //kahsgd1278ahjsd
};

export const isValidPassword=(user,loginPassword)=>{
   return bcrypt.compareSync(loginPassword,user.password);
}

export const generateToken = (user)=>{
    const token = jwt.sign(user,SECRET_KEY,{
        expiresIn:"60s"
    });
    return token;
}

export const validateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.sendStatus(401);
    //Bearer token =>split ["Bearer", "token"]
    const token = authHeader.split(" ")[1];
    // console.log(token)
    jwt.verify(token,SECRET_KEY,(err,info)=>{
        if(err) return res.sendStatus(401);
        req.user =info;
        next();
    });
}
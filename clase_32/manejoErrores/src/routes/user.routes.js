import {Router} from "express";
import { CustomError } from "../services/customError.service.js";//funcion para generar el error
import { EError } from "../enums/EError.js";//tipos de errores
import { generateUserErrorInfo } from "../services/userErrorInfo.js";//mensaje personalizado
import { generateUserErrorParam } from "../services/userErrorParam.js";

const router = Router();

const users = [];

router.get("/",(req,res)=>{
    res.json({status:"success", data:users});
});

router.post("/",(req,res)=>{
    const {first_name, last_name, email} = req.body;
    if(!first_name || !last_name || !email){
        CustomError.createError({
            name:"User create error",
            cause:generateUserErrorInfo(req.body),
            message:"Error creando el usuario",
            errorCode:EError.INVALID_JSON
        });
    };
    const newUser = {
        id:users.length+1,
        first_name,
        last_name,
        email
    };
    users.push(newUser);
    res.json({status:"success", data:newUser});
});

router.get("/:uid",(req,res)=>{
    const {uid} = req.params;
    const userId = parseInt(uid);
    if(Number.isNaN(userId)){
        CustomError.createError({
            name:"user get by id error",
            cause:generateUserErrorParam(uid),
            message:"Error obteniendo el usuario por el id",
            errorCode:EError.INVALID_PARAM
        });
    }
    const userFound = users.find(u=>u.id === userId);
    if(userFound){
        res.json({status:"succes", data:userFound});
    } else {
        res.json({status:"error", message:"usuario no encontrado"});
    }
});

export { router as usersRouter};
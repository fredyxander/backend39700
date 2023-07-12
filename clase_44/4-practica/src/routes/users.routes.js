import { Router } from "express";
import {UserModel} from "../daos/models/user.model.js";
import { checkRole, checkAuthenticated } from "../middlewares/auth.js";
import { uploaderDocument } from "../utils.js";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]) , async(req,res)=>{
    try {
        const userId = req.params.uid;
        //verificar si el usuario existe en la base de datos
        const user = await UserModel.findById(userId);
        const userRol = user.rol;
        //validar si el usuario ya subio todos los docuemntos, entonces puede ser un ususario premium
        if(user.documents.length<3 && user.status !== "completo"){
            return res.json({status:"error", message:"El usuario no ha subido todos los documentos"});
        }
        if(userRol === "user"){
            user.rol = "premium"
        } else if(userRol === "premium"){
            user.rol = "user"
        } else {
            return res.json({status:"error", message:"no es posible cambiar el role del usuario"});
        }
        await UserModel.updateOne({_id:user._id},user);
        res.send({status:"success", message:"rol modificado"});
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al cambiar el rol del usuario"})
    }
});

router.put("/:uid/documents", checkAuthenticated , uploaderDocument.fields([{name:"identificacion",maxCount:1}, {name:"domicilio",maxCount:1},{name:"estadoDeCuenta",maxCount:1}]), async(req,res)=>{
    try {
        const userId = req.params.uid;
        const user = await UserModel.findById(userId);
        if(user){
            console.log(req.files);
            const identificacion = req.files['identificacion']?.[0] || null;
            const domicilio = req.files['domicilio']?.[0] || null;
            const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
            const docs = [];
            if(identificacion){
                docs.push({name:"identificacion",reference:identificacion.filename});
            }
            if(domicilio){
                docs.push({name:"domicilio",reference:domicilio.filename});
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta",reference:estadoDeCuenta.filename});
            }
            if(docs.length === 3){
                user.status = "completo";
            } else {
                user.status = "incompleto";
            }
            user.documents = docs;
            const userUpdated = await UserModel.findByIdAndUpdate(user._id,user);
            res.json({status:"success", message:"documentos actualizados"});

            // const docs = req.files.map(doc=>({name:doc.originalname, reference:doc.filename}));
            // user.documents = docs;
            // user.status="completo";
            // const userUpdated = await UserModel.findByIdAndUpdate(user._id,user);
            // res.json({status:"success", message:"documentos actualizados"});
        } else {
            res.json({status:"error", message:"no es posible cargar los documentos"})
        }
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al cargar los documentos"})
    }
});

export {router as usersRouter};
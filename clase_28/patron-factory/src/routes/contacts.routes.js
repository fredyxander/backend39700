import { Router } from "express";
import { contactsDao } from "../dao/factory.js";

const router = Router();

router.get("/",async(req,res)=>{
    try {
        const contacts = await contactsDao.get();
        res.json({status:"success", payload:contacts});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try {
        const contactCreated = await contactsDao.post(req.body);
        res.json({status:"success", payload:contactCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

export {router as contactsRouter}
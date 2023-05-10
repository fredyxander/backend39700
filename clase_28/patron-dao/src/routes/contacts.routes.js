import { Router } from "express";
import {ContactsMemory} from "../dao/managers/memory/contacts.memory.js";
import {ContactsMongo} from "../dao/managers/mongo/contacts.mongo.js";

const router = Router();

const contactsService = new ContactsMemory();

router.get("/",async(req,res)=>{
    try {
        const contacts = await contactsService.get();
        res.json({status:"success", payload:contacts});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try {
        const contactCreated = await contactsService.post(req.body);
        res.json({status:"success", payload:contactCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

export {router as contactsRouter}
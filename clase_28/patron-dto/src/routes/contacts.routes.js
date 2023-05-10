import { Router } from "express";
import { contactsDao } from "../dao/factory.js";
import { CreateContactDto, GetContactDto } from "../dao/dto/contact.dto.js";

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
        const contactDto = new CreateContactDto(req.body);
        const contactCreated = await contactsDao.post(contactDto);
        res.json({status:"success", payload:contactCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.get("/:id",async(req,res)=>{
    try {
        const contact = await contactsDao.getById(req.params.id);
        const result = new GetContactDto(contact);
        res.json({status:"success", payload:result});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

export {router as contactsRouter}
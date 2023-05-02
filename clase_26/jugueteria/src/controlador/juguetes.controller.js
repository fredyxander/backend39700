import { getToys, saveToy } from "../servicio/juguetes.service.js";

export const getToysController = (req,res)=>{
    const result = getToys();
    res.json({status:"success", data: result});
}

export const saveToyController = (req,res)=>{
    const result = saveToy(req.body);
    res.json({status:"success", data:result});
}
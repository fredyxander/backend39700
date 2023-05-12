import { businessDao } from "../dao/index.js";

export const getAllBusiness = async(req,res)=>{
    try {
        const business = await businessDao.getAllBusiness();
        res.send({status:"success", payload:business});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};

export const getBusinessById = async(req,res)=>{
    try {
        const business = await businessDao.getBusinessById(req.params.bid);
        res.send({status:"success", payload:business});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};

export const createBusiness = async(req,res)=>{
    try {
        const businessCreated = await businessDao.createBusiness(req.body);
        res.send({status:"success", payload:businessCreated});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};

export const addProduct = async(req,res)=>{
    try {
        const businessId = req.params.bid;
        const product = req.body;
        if(!product.titulo || !product.precio){
            return res.send({status:"error", message:"campos incompletos del producto"});
        }
        //verificamos que el negocio exista
        const business = await businessDao.getBusinessById(businessId);
        business.productos.push(product);
        const businessUpdated = await businessDao.updateBusiness(businessId,business);
        res.send({status:"success", payload:businessUpdated});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};
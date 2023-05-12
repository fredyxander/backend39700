import { usersDao } from "../dao/index.js";

export const getUsers = async(req,res)=>{
    try {
        const users = await usersDao.getUsers();
        res.send({status:"success", payload:users});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};

export const getUserById = async(req,res)=>{
    try {
        const user = await usersDao.getUserById(req.params.uid);
        res.send({status:"success", payload:user});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};

export const saveUser = async(req,res)=>{
    try {
        const userCreated = await usersDao.saveUser(req.body);
        res.send({status:"success", payload:userCreated});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};
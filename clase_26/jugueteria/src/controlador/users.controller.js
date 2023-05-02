//importar las funciones de la capa de servicio
import { getUsers } from "../servicio/users.service.js";

export const getUsersController = (req,res)=>{
    //llamado a la funcion del servicio
    const users = getUsers();
    res.json({status:"success", data:users});
};
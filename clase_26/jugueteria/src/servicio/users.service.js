//importaciones de la capa de persistencia
import {get} from "../persistencia/users.js";

export const getUsers = ()=>{
    const users = get();
    return users;
};
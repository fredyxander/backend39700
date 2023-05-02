import {get, save} from "../persistencia/juguetes.js";

export const getToys = ()=>{
    const toys = get();
    return toys;
};

export const saveToy = (toy)=>{
    const result = save(toy);
    return result;
};
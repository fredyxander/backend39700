let toys = [];

export const get = ()=>{
    return toys;
};

export const save = (toy)=>{
    toys.push(toy);
    return "juguete guardado";
};
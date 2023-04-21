import {Router} from "express";

const router = Router();

let pets=[];

router.param("pet",(req,res,next,valorPet)=>{
    const expressionRegular = /^[a-zA-Z\s]+$/;
    if(expressionRegular.test(valorPet)){
        const pet = pets.find(i=>i.name === valorPet);
        if(pet){
            req.pet =pet;
        } else {
            req.pet=null;
        }
        next();
    } else {
        res.status(400).send("parametro invalido");
    }
});

router.post("/",(req,res)=>{
    const newPet = req.body;
    pets.push(newPet);
    res.send("mascota agregada");
});

router.get("/",(req,res)=>{
    res.json({pets});
});

//rutas con el parametro :pet
router.get("/:pet",(req,res)=>{
    // const pet = req.params.pet;
    res.json({status:"success",pet:req.pet});
});

router.put("/:pet",(req,res)=>{
    // const pet = req.params.pet;
    if(req.pet){
        req.pet.adopted=true;
        res.json({pet:req.pet})
    } else {
        res.json({message:"no se encontro la mascota"})
    }
});

export {router as petRouter};
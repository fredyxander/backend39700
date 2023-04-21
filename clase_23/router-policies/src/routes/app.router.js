import { Router } from "express";
import jwt from "jsonwebtoken";

class AppRouter{
    #router;

    constructor(){
        this.#router = Router();
        this.init();
    };

    //funcion para retornar el router principal
    getRouter(){
        return this.#router;
    };

    init(){};

    get(path, policies, ...callbacks){
        this.#router.get(path, this.#handlePolicies(policies) , this.#addcustomResponse ,this.#applyCallbacks(callbacks));
    };

    post(path, policies, ...callbacks){
        this.#router.post(path, this.#handlePolicies(policies)  ,this.#addcustomResponse, this.#applyCallbacks(callbacks));
    };

    put(path, policies, ...callbacks){
        this.#router.put(path, this.#handlePolicies(policies)  ,this.#addcustomResponse, this.#applyCallbacks(callbacks));
    };

    delete(path, policies, ...callbacks){
        this.#router.delete(path, this.#handlePolicies(policies)  ,this.#addcustomResponse,this.#applyCallbacks(callbacks));
    };

    //(req,res)=>{}   =>callback de la peticion.
    #applyCallbacks(callbacks){
        //mapear los callbacks uno a uno,obteniendo sus parametros
        //...params = [req,res,next]
        return callbacks.map(callback => async(...params)=>{
            try {
                //this => [userRouter,petRouter,productRouter]
                //params [req,res,next]
                await callback.apply(this, params)
            } catch (error) {
                console.log(error);
                //params[1] igual al objeto res
                params[1].status(500).send(error.message);
            }
        })
    };

    #addcustomResponse(req,res,next){
        res.sendSuccess = (payload)=>res.json({status:"success", payload});
        res.sendClientError = (error)=> res.status(400).json({status:"error",error:error.message})
        next();
    };

    #handlePolicies(roles){
        return (req,res,next)=>{
            if(roles.includes("public")){
                next();
            }
            const authHeader = req.headers.authorization;
            // "authorization": "Bearer <token>"
            if(!authHeader){
                return res.status(401).json({status:"error", message:"Debes autenticarte"});
            }
            //Obtenemos el token del encabezado
            const token = authHeader.split(" ")[1];
            //validamos el token, extraer la info del token
            jwt.verify(token, "CoderToken",(error,info)=>{
                if(error) return res.status(401).json({status:"error", message:"no authorizado"});
                if(!roles.includes(info.role)){
                    return res.status(403).json({status:"error", message:"Acceso prohibido"});
                }
                req.user=info;
                next();
            });
        }
    }

}

export {AppRouter};
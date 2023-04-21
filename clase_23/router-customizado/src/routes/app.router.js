import { Router } from "express";

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

    get(path,...callbacks){
        this.#router.get(path, this.#addcustomResponse ,this.#applyCallbacks(callbacks));
    };

    post(path,...callbacks){
        this.#router.post(path, this.#addcustomResponse, this.#applyCallbacks(callbacks));
    };

    put(path,...callbacks){
        this.#router.put(path, this.#addcustomResponse, this.#applyCallbacks(callbacks));
    };

    delete(path,...callbacks){
        this.#router.delete(path,this.#addcustomResponse,this.#applyCallbacks(callbacks));
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
    }

}

export {AppRouter};
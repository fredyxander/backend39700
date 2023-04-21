import { AppRouter } from "./app.router.js";
import jwt from "jsonwebtoken";

class SessionRouter extends AppRouter{
    //hacemos uso de init para inicializar las rutas de los usuarios.
    init(){
        this.post("/login",["public"],(req,res)=>{
            const user = {
                email:req.body.email,
                role:req.body.role
            };
            const token = jwt.sign(user,"CoderToken");
            res.sendSuccess({token});
        });
    }
};

export {SessionRouter};
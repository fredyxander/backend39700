import { AppRouter } from "./app.router.js";

class UserRouter extends AppRouter{
    //hacemos uso de init para inicializar las rutas de los usuarios.
    init(){
        //this.get es equivalente router.get
        this.get("/",(req,res)=>{
            res.send("hola desde router personalizado");
        });

        this.get("/otraruta",(req,res)=>{
            res.json({message:"hola soy otra ruta"});
        });

        this.get("/respuesta-personalizada",(req,res)=>{
            res.sendSuccess("soy una respuesta personalizada");
        });

        this.get("/respuesta-exitosa",(req,res)=>{
            res.sendSuccess({nombre:"pepe",role:"admin"});
        });

        this.get("/respuesta-fallida",(req,res)=>{
            res.sendClientError(new Error("no se pudo encontrar el usuario"));
        });
    }
};

export {UserRouter};
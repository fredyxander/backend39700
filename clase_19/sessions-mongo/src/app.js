import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const port = 8080;

//configuracion de la session
app.use(session({
    store: MongoStore.create({
        mongoUrl:"AGREGAR RUTA BASE DE DATOS",
        ttl:60
    }),
    secret:"claveSecreta",
    resave:true,
    saveUninitialized:true
}));

app.listen(port,()=>console.log(`Server listening on port ${port}`));

app.get("/login",(req,res)=>{
    req.session.user = "usuarioTesting";
    res.send("sesion iniciada");
});

app.get("/privada",(req,res)=>{
    if(req.session.user){
        // console.log(req.session);
        res.send("ruta privada");
    } else {
        res.send("no tienes acceso");
    }
});
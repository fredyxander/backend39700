import express from "express";
import {transporter} from "./config/gmail.js";
import path from "path";
import {__dirname} from "./utils.js";
import { twilioClient, twilioPhone } from "./config/twilio.js";

const port = 8080;
const app = express();

app.listen(port,()=>console.log(`Server listening on port ${port}`));


const emailTemplate = `<div>
        <h1>Bienvenido!!</h1>
        <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <img width="100px" src="cid:mono" />
        <a href="https://www.google.com/">Explorar</a>
</div>`;

app.post("/registro",async(req,res)=>{
    try {
        //logica del registro
        const contenido = await transporter.sendMail({
            //estructura del correo
            from:"ecommerce tienda de pepito",
            to:"freddy5210@gmail.com",
            subject:"Registro exitoso",
            html:emailTemplate,
            attachments:[
                {
                    filename:"divertido.jpg",
                    path:path.join(__dirname,"/images/divertido.jpg"),
                    cid:"mono"
                },
                {
                    filename:"archivo.pdf",
                    path:path.join(__dirname,"/images/archivo.pdf")
                }
            ]
        });
        console.log("contenido", contenido);
        res.json({status:"success", message:"Registro y envio de correo exitoso"});
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al registrar al usuario"})
    }
});

app.post("/twilio-coder", async(req,res)=>{
    try {
        //creamos el mensaje que vamos a enviar
        const message = await twilioClient.messages.create({
            body:"Su compra se realizo correctamente",
            from: twilioPhone,
            to:"+573507850462"
        });
        console.log("message:", message);
        res.json({status:"success", message:"compra exitosa y envio de sms exitoso"})
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al realizar la compra"})
    }
});

app.post("/compra", async(req,res)=>{
    try {
        const {nombre, producto} = req.query;
        //creamos el mensaje que vamos a enviar
        const message = await twilioClient.messages.create({
            body:`Gracias, ${nombre}, tu solicitud del producto ${producto} ha sido aprobada`,
            from: twilioPhone,
            to:"+57 350 7850462"
        });
        console.log("message:", message);
        res.json({status:"success", message:"compra exitosa y envio de sms exitoso"})
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al realizar la compra"})
    }
});
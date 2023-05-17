import nodemailer from "nodemailer";
import {options} from "./options.js";

//credenciales de la cuenta de gmail que usamos para enviar y recibir los correos
const adminEmail=options.gmail.adminAccount;
const adminPass=options.gmail.adminPass;

//configuracion del canal de comunicacion entre nodejs y gmail
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:adminEmail,
        pass:adminPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export {transporter}
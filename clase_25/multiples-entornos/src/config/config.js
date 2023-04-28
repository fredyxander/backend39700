import dotenv from "dotenv";
import { __dirname } from "../utils.js";
import path from "path";

const environment = process.argv.slice(2)[0];
const pathEnvironment = environment === "prod" ? path.join(__dirname,"../.env.production") : path.join(__dirname,"../.env.development");
// console.log(pathEnvironment);

dotenv.config({
    path: pathEnvironment
});
// // console.log(process.env);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const CORREO_ADMIN = process.env.CORREO_ADMIN;
const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;

export const config = {
    server:{
        port:PORT,
    },
    mongo:{
        url:MONGO_URL
    },
    auth:{
        account: CORREO_ADMIN,
        pass: PASSWORD_ADMIN
    }
}
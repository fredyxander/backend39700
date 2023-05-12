import mongoose from "mongoose";
import { ordersCollection, usersCollection } from "../../constants/index.js";

const usersSchema = new mongoose.Schema({
    nombre:String,
    correo:String,
    rol: String,
    pedidos:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref: ordersCollection
        }
    ]
});

export const usersModel = mongoose.model(usersCollection,usersSchema);
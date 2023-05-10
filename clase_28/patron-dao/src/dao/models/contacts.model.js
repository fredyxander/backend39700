import mongoose from "mongoose";

const contactsCollection = "contacts";

const contactsSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

export const contactsModel = mongoose.model(contactsCollection,contactsSchema);
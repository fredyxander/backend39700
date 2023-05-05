import mongoose from "mongoose";
class ConnectionDB{
    static #instance;
    constructor(){
        mongoose.connect("mongodb+srv://fredy:coder@coderbackend.d0kaklh.mongodb.net/singletonDB?retryWrites=true&w=majority")
    }

    static async getInstance(){
        if(ConnectionDB.#instance){
            console.log("ya estabas conectado")
            return ConnectionDB.#instance;
        } else {
            this.#instance = new ConnectionDB();
            console.log("ahora estas conectado a la base de datos");
            return this.#instance;
        }
    }
}

export {ConnectionDB}
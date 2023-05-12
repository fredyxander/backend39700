import { usersModel } from "../models/users.model.js";

export class UsersMongo{
    constructor(){
        this.model = usersModel;
    };

    async getUsers(){
        try {
            const users = await this.model.find();
            return users;
        } catch (error) {
            console.log(error.message);
            throw new Error("hubo un error al obtener los usuarios");
        }
    };

    async getUserById(id){
        try {
            const user = await this.model.findById(id);
            if(!user){
                throw new Error("el usuario no existe");
            }
            return user;
        } catch (error) {
            console.log(error.message);
            throw new Error("hubo un error al obtener el usuario");
        }
    };

    async saveUser(user){
        try {
            const userCreated = await this.model.create(user);
            return userCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error("hubo un error al crear el usuario");
        }
    };

    async updateUser(id,user){
        try {
            const userUpdate = await this.model.findByIdAndUpdate(id,user,{new:true});
            return userUpdate;
        } catch (error) {
            console.log(error.message);
            throw new Error("hubo un error al crear el usuario");
        }
    };
}
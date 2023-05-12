import { connectDB } from "../config/dbConnection.js";
import { UsersMongo } from "./managers/users.mongo.js";
import { BusinessMongo } from "./managers/businnes.mongo.js";
import { OrdersMongo } from "./managers/orders.mongo.js";

connectDB();
export const usersDao = new UsersMongo();
export const businessDao = new BusinessMongo();
export const ordersDao = new OrdersMongo();
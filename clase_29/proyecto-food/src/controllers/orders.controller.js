import { ordersDao } from "../dao/index.js";
import { usersDao } from "../dao/index.js";
import { businessDao } from "../dao/index.js";
import {v4 as uuidv4} from 'uuid';

export const getAllOrders = async(req,res)=>{
    try {
        const orders = await ordersDao.getAllOrders();
        res.send({status:"success", payload:orders});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};

export const getOrderById = async(req,res)=>{
    try {
        const orderId = req.params.oid;
        const order = await ordersDao.getOrderById(orderId);
        res.send({status:"success", payload:order});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};

export const createOrder = async(req,res)=>{
    try {
        const {userId,businessId,products} = req.body;
        const user = await usersDao.getUserById(userId);
        const business = await businessDao.getBusinessById(businessId);
        const productsOrder = business.productos.filter(product=>products.includes(product.id));
        const total = productsOrder.reduce((acc,i)=>{
            acc+=i.precio;
            return acc
        },0);
        const id = uuidv4();
        //crear la orden
        const newOrder = {
            numeroOrden:id,
            negocio:businessId,
            usuario:userId,
            productos: products,
            precioTotal:total,
            estado:"pendiente"
        }
        const orderCreated = await ordersDao.createOrder(newOrder);
        res.send({status:"success", payload:orderCreated});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};

export const resolveOrder = async(req,res)=>{
    try {
        const orderId = req.params.oid;
        const order = await ordersDao.getOrderById(orderId);
        order.estado = "completado";
        const orderUpdated = await ordersDao.updateOrder(orderId,order);
        res.send({status:"success", payload:orderUpdated});
    } catch (error) {
        res.send({status:"error", message:error.message});
    }
};
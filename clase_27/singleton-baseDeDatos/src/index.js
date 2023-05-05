import { ConnectionDB } from "./connectionDB.js";

const primeraInstancia = ConnectionDB.getInstance();

const segundoInstancia = ConnectionDB.getInstance();

const terceraInstancia = ConnectionDB.getInstance();
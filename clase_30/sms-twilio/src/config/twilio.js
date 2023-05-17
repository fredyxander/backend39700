import twilio from "twilio";
import {options} from "./options.js";

//agregar las credenciales para usar el servicio de twilio
const twilioAccountId=options.twilio.twilioId;
const twilioToken=options.twilio.twilioToken;

//twilio phone
export const twilioPhone=options.twilio.twilioPhone;

//creacion del cliente de twilio
export const twilioClient = twilio(twilioAccountId,twilioToken);
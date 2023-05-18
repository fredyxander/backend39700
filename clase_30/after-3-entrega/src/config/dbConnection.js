import mongoose from "mongoose";

try {
  await mongoose.connect("Ruta de la base de datos");
  console.log("conexión a la base de datos de manera exitosa");
} catch (error) {
    console.log(`Hubo un error conectandose a la base ${error}`);
}
import multer from "multer";

/**
 * diskStorage es una estrategia de almacenamiento que podemos utilizar con el middleware
 * de Multer, la cual sirve para guardar archivos en el sistema de archivos local
 *
 * Como opciones, seteamos la ruta en donde vamos a almacenar los archivos, así como
 * un callback que determina el nombre del archivo a guardar en función de la request y el archivo
 * original (en ese caso usaremos el nombre del archivo original)
 */
const storage = multer.diskStorage({
  destination: "./public/img",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Exportamos un middleware creado con multer que usa el motor de almacenamiento que creamos
export const uploader = multer({ storage });

import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

let messages = [];

const app = express();
app.use(urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);
app.use(express.static(__dirname + "/public"));

/**
 * app.listen() retorna una instancia de nuestro servidor http.
 * Esta instancia la vamos a necesitar para crear nuestro servidor de sockets, por lo que la guardamos en una variable.
 * */
const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

/** Creamos nuestro servidor de sockets utilizando nuestro servidor http */
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  socket.emit("chat-messages-updated", messages);

  // Asimismo, el callback que se ejecuta al recibir una conexión, recibe como parámetro un objeto socket.
  // Este objeto socket puede emitir y recibir eventos. En este caso estamos escuchando el evento "message",
  // asociando un callback al mismo. Este callback tiene como argumento la data enviada en el mensaje
  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("input-message", (data) => {
    socketServer.emit("input-message", data);
  });

  socket.on("chat-message", (data) => {
    const newMessage = {
      socketId: socket.id,
      message: data,
    };

    messages = [...messages, newMessage];
    socketServer.emit("chat-messages-updated", messages);
  });
});

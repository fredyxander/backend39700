import { Command } from "commander";

const program = new Command();

program
.option("-d","variable de debug",false)
.option("-p <port>","puerto de la aplicacion",8080)
.option("-l <languaje>","idioma de la aplicacion","es")
.requiredOption(
    "-u <user>",
    "usuario que ejecuta la aplicacion",
    "no se recibio un usuario"
)

program.parse();

console.log("args", program.opts());
console.log("otros argumentos", program.args);
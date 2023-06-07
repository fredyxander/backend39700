import express from "express";
import cluster from "cluster";
// console.log(cluster.isPrimary);
import os from "os";

const numeroCpus = os.cpus().length;
// // console.log(numeroCpus);
const port = 8080;

if(cluster.isPrimary){
    console.log(`soy el proceso principal ${process.pid} generando procesos secundarios`);
    //generando procesos secundarios (workers)
    for(let i=0;i<numeroCpus;i++){
        //por cada nucleo creamos un proceso secundario
        cluster.fork();
    }
    cluster.on("exit",(worker)=>{
        console.log(`El proceso secundario ${worker.process.pid} dejo funcionar`);
        cluster.fork();
    });
} else {
    const app = express();
    // console.log(`Soy un proceso secundario ${process.pid}`);
    app.listen(port,()=>console.log(`Servidor corriendo en el puerto ${port} en el proceso ${process.pid}`));

    app.get("/sencilla",(req,res)=>{
        let sum=0;
        for(let i=0;i<100000;i++){
            sum +=i
        };
        res.send({sum});
    });

    app.get("/compleja",(req,res)=>{
        let sum=0;
        for(let i=0;i<5e7;i++){
            sum +=i
        };
        res.send({sum});
    });
}
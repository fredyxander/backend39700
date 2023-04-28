process.on("exit",()=>{
    console.log("La aplicacion finalizo")
});

process.on("uncaughtException",(error,origin)=>{
    console.log(`hubo un error: ${error} ${origin}`);
});

funcionQuenoExista();
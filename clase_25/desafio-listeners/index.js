process.on("exit",(code)=>{
    if(code === -4){
        return console.log("Proceso finalizado por argumentación inválida en una función")
    } else {
        console.log("La aplicacion finalizo correctamente");
    }
});

const listNumbers = (...numbers)=>{
    console.log(numbers);
    let error="";
    numbers.forEach(item=>{
        //validar que el tipo de dato no sea numerico
        if(isNaN(parseInt(item))){
            error="invalid parameters"
        }
    })
    console.log({
        error,
        data:numbers.map(i=>typeof i)
    });
    if(error){
        process.exit(-4)
    }
};

listNumbers(1,true,3,"palabra");
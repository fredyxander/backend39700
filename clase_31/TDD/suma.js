let testPasados = 0;
let totalTest = 4;
const sumar = (...nums)=>{
    // console.log(nums);
    if(!nums.length ) return 0;
    if(nums.some(elm=>typeof elm !== "number")) return null;
    return nums.reduce((acc,i)=>acc+i,0);
}

//1
console.log("1 prueba. La función debe devolver null si algún parámetro no es numérico");
let resultado = sumar(1,"2");
if(resultado === null){
    console.log("---1 prueba paso")
    testPasados++;
} else {
    console.log("---1 prueba no paso, se esperaba recibir dos parametros numericos")
};

//2
console.log("2 prueba. La función debe devolver 0 si no se pasó ningún parámetro");
let resultado2 = sumar();
if(resultado2 === 0){
    console.log("---2 prueba paso")
    testPasados++;
} else {
    console.log("---2 prueba no paso, se esperaba recibir dos parametros")
};

//3
console.log("3 prueba. La función debe poder realizar la suma correctamente");
let resultado3 = sumar(3,5);
if(resultado3 === 8){
    console.log("---3 prueba paso")
    testPasados++;
} else {
    console.log("---3 prueba no paso, se esperaba recibir un resultado = a 8")
};

//4
console.log("4 prueba. La función debe poder hacer la suma con cualquier cantidad de números.");
let resultado4 = sumar(3,5,2,10);
if(resultado4 === 20){
    console.log("---4 prueba paso")
    testPasados++;
} else {
    console.log("---4 prueba no paso, se esperaba recibir un resultado = a 20")
};

console.log("******************")
if(testPasados === totalTest){
    console.log("todas las prubas pasaron")
} else {
    console.log(`Numero de pruebas pasadas ${testPasados} de un total ${totalTest}`);
}
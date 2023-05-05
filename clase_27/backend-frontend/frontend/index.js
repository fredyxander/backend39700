function getUsers(){
    fetch("http://localhost:8080/api/users")
    .then((response)=>{
        return response.json()
    })
    .then((dataJson)=>{
        console.log(dataJson)
    });
};

function addUser(){
    fetch("http://localhost:8080/api/users",{
        headers:{
            "Content-type": "application/json"
        },
        method:"post",
        body:JSON.stringify({
            name:"juanito",
            email:"juanito@gmail.com"
        })
    })
    .then((response)=>{
        return response.json()
    })
    .then((dataJson)=>{
        console.log(dataJson)
    });
}
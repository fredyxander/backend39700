console.log("hola coders");

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const formValues = {
        email:loginForm.email.value,
        password:loginForm.password.value
    };
    // console.log("formulario enviado", formValues);
    const response = await fetch("/login",{
        method:"post",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(formValues)
    });
    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data);
    localStorage.setItem("token",data.accessToken);
});

const getProfileBtn = document.getElementById("getProfile");

getProfileBtn.addEventListener("click",async()=>{
    const response = await fetch("/profile",{
        method:"get",
        headers:{
            'Content-type':'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data);
});
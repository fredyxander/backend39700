console.log("index.js")
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click",()=>{
    console.log("hey")
    fetch("/api/sessions/logout",{
        method:"post"
    }).then((response)=>{
        console.log(response)
        return response.json()
    })
    .then(()=>{
        window.location.href="/login"
    });
});
import express from "express";
import cors from "cors";

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors({
    origin:"http://127.0.0.1:5500"
}));

app.listen(port,()=>console.log(`Server listening on port ${port}`));

let users =[
    {
        name:"pepe",
        email:"pepe@gmail.com"
    }
];
app.get("/api/users", (req,res)=>{
    res.json({status:"success", users});
});

app.post("/api/users",(req,res)=>{
    const newUser = req.body;
    users.push(newUser);
    res.json({status:"success", message:"usuario agregado"});
});
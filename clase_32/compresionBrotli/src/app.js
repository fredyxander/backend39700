import express from "express";
import compression from "express-compression";

const port = 8080;
const app = express();

app.listen(port,()=>console.log(`Server listening on port ${port}`));

app.get("/endpoint-normal",(req,res)=>{
    res.send("palabra ".repeat(200000));
});

app.get("/endpoint-brotli", compression({brotli:{enabled:true,zlib:{}}}) , (req,res)=>{
    res.send("palabra ".repeat(200000));
});
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/get-cookie", (req, res) => {
  res.send(req.cookies);
});

app.post("/set-cookie", (req, res) => {
  const user = req.body["client-name"];
  const email = req.body["client-email"];
  // const { "client-name": user, "client-email": email } = req.body;

  res.cookie(user, email, { maxAge: 10000 }).redirect("/");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

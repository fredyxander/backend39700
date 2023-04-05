import cookieParser from "cookie-parser";
import express from "express";

const app = express();
app.use(cookieParser("mi-secreto"));

const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

app.get("/set-cookie", (req, res) => {
  res
    .cookie("coder_cookie", "Esta es una coder cookie", {
      maxAge: thirtyDaysInMs,
    })
    .send("Cookie set");
});

app.get("/get-cookies", (req, res) => {
  res.send(req.cookies);
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("coder_cookie").send("Cookie deleted");
});

app.get("/set-signed-cookies", (req, res) => {
  res
    .cookie("signed_cookie", "Esta es una cookie firmada!", {
      maxAge: thirtyDaysInMs,
      signed: true,
    })
    .send("Signed cookie set");
});

app.get("/get-signed-cookies", (req, res) => {
  res.send(req.signedCookies);
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

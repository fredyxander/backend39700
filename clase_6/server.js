const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hello world!!!!!!!");
  res.end();
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});

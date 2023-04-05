const socket = io();

socket.emit("message", "Mensaje desde frontend!");

socket.on("message", (data) => {
  console.log(data);
});

socket.on("input-changed", (data) => {
  const receivedTextInput = document.getElementById("received-text-input");
  receivedTextInput.innerHTML = data;
});

const textInput = document.getElementById("text-input");
textInput.addEventListener("input", (ev) => {
  socket.emit("input-changed", ev.target.value);
});

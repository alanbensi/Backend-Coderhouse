const socket = io();
console.log (socket, "entrando nuevo usuario");


socket.on ("products", products => {
    document.getElementById("productsClient").innerText = products
}) 

const express = require ("express"); 
const exphbs = require ("express-handlebars");
const app = express();
const { Server } = require("socket.io");
const path = require("path");
const cartsRouter = require ("./Routes/carts/carts");
const productsRouter = require ("./Routes/products/products");
const viewsRouter = require ("./Routes/views/views");
const ProductManager = require ("./productManager");

app.engine ("handlebars", exphbs.engine());
app.set('views', path.join(__dirname, "./views"))
app.set ("view engine", "handlebars");


// Middlewares
app.use (express.json());
app.use (express.urlencoded({extended:true}))
app.use (express.static(path.join(__dirname, "/public")));

app.use ('/', viewsRouter);
app.use ('/api/products', productsRouter);
app.use ('/api/carts', cartsRouter);


const httpServer = app.listen (8080, ()=> console.log ("app running on port 8080"));

httpServer.on ("error", error => console.log (error));

const socketServer = new Server(httpServer);


const manager = new ProductManager(path.join(__dirname, "./Routes/products/products.json"))

app.get ("/realTimeProducts", (req,res) => {
    socketServer.on ("connection", async socket => {
        console.log ("CLIENTE NUEEVO")
        const allProducts = await manager.getProducts(); 
        socketServer.sockets.io ("products", socket =>{
            res.render ("realTimeProducts", {allProducts:allProducts});
        })
    });
    res.render ("realTimeProducts", {});
} )




module.exports = httpServer;
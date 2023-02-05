const { Router } = require ("express");
const viewsRouter = Router();
// const httpServer = require ("../../app");
// const { Server } = require ("socket.io");
// const io = new Server (httpServer);
const ProductManager = require ("../../productManager");
const manager = new ProductManager ("./src/Routes/products/products.json");

viewsRouter.get('/', async (req, res) => {
    const allProducts = await manager.getProducts();
    res.render('home', {allProducts: allProducts, styles: "home.css"});
});

// viewsRouter.get ("/realTimeProducts", (req,res) => { 
//     io.on("changingProducts", socket => {
//         console.log("nuevo cliente conectado");
//         res.render('realTimeProducts', {});
//     })
// })


module.exports = viewsRouter;
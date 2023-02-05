const { Router } = require ("express");
const viewsRouter = Router();
const ProductManager = require ("../../productManager");
const manager = new ProductManager ("./src/Routes/products/products.json");



viewsRouter.get('/', async (req, res) => {
    const allProducts = await manager.getProducts();
    res.render('home', {allProducts: allProducts, styles: "home.css"});
});


viewsRouter.get ("/realTimeProducts", (req,res) => {
    
})

module.exports = viewsRouter;
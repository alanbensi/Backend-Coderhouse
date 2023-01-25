const express = require ("express"); 
const server = express();
const ProductManager = require ("./productManager");
const manager = new ProductManager("./src/products.json")
server.get ('/', (req , res) => {
    res.send ('Ruta raiz');
});

server.get ('/products', async (req,res) => {
    const limit = req.query.limit;
    const allProducts = await manager.getProducts();
    if (limit) {
        const newArrayLimit= allProducts.slice(0, limit);
        res.send (newArrayLimit);
    }else {
        res.send(allProducts);
    }
})

server.get ('/products/:pid', async (req,res)=> {
    const productId = req.params.pid;
    const product = await manager.getProductByID(parseInt(productId));
    res.send (product);
})

server.listen (8080, ()=> console.log ("Server running on port 8080"));7

server.on ("error", error => console.log (error));

console.log (ProductManager)
const { Router } = require("express");
const productsRouter = Router();
const ProductManager = require("../../productManager");
const manager = new ProductManager("./src/Routes/products/products.json");

productsRouter.get("/", async (req, res) => {
    const limit = req.query.limit;
    const allProducts = await manager.getProducts();
    if (limit) {
        const newArrayLimit= allProducts.slice(0, limit);
        res.send (newArrayLimit);
    }else {
        res.send({status: "Success", products: allProducts}); // TRAE TODOS LOS PRODUCTOS. DEBERIA QUEDAR ESTE, DESPUES VER SI PIDE LIMIT
    }
});

productsRouter.get ("/:pid", async (req,res) => {
    const productId = req.params.pid;
    const product = await manager.getProductByID(parseInt(productId));
    res.send({ status: "Success", product: product });
})

productsRouter.post ("/", async (req, res) => {
    const product = req.body;
    const newProduct = await manager.addProducts(product.title, product.description, product.price, product.thumbnail, product.code, product.stock); 
    res.send ({status: "Success", newProduct: newProduct});
    res.status(400).send ({status: "Error", message: "The request has an error"}); 
})

productsRouter.put ("/:pid", async (req,res) => {
    const idProduct = req.params.pid;
    const oldProduct = req.body; 
    const updateProduct = await manager.updateProduct (parseInt (idProduct), oldProduct.field, oldProduct.value); 
    res.send ({status: "Success", product: updateProduct});
})

productsRouter.delete ("/:pid", async (req,res) => {
    const idProduct = req.params.pid; 
    const deleteProduct = await manager.deleteProduct (parseInt(idProduct));
    res.send ({status: "Success", product: deleteProduct});
})


module.exports = productsRouter;
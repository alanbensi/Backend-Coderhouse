const { Router } = require("express");
const productsRouter = Router();
const ProductManager = require("../../productManager");
const manager = new ProductManager("./src/Routes/products/products.json");

productsRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const allProducts = await manager.getProducts();
        if (limit) {
            if (limit < allProducts.length) {
                const newArrayLimit = allProducts.slice(0, limit);
                res.send({status:"Success", newArrayLimit});
            }else {
                res.status(400).send ({status: "Error", message:"There isnt exist that quantity of products"})
            }
        } else {
            res.send({ status: "Success", products: allProducts }); 
        }
    } catch (error) {
        res.status(400).send ({status: "Error", message: error})
    }
});

productsRouter.get ("/:pid", async (req,res) => {
    try {
        const productId = req.params.pid;
        const product = await manager.getProductByID(parseInt(productId));
        res.send({ status: "Success", product: product });
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error. The product wasn´t found" })
    }
})

productsRouter.post ("/", async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await manager.addProducts(product.title, product.description, product.price, product.thumbnail, product.code, product.stock); 
        res.send ({status: "Success", newProduct: newProduct});
    } catch (error) {
        res.status(400).send ({status: "Error", message: "The request has an error"}); 
    }
})

productsRouter.put ("/:pid", async (req,res) => {
    try {
        const idProduct = req.params.pid;
        const oldProduct = req.body; 
        const updateProduct = await manager.updateProduct (parseInt (idProduct), oldProduct.field, oldProduct.value); 
        res.send ({status: "Success", product: updateProduct});
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" })
    }
})

productsRouter.delete ("/:pid", async (req,res) => {
    try {
        const idProduct = req.params.pid; 
        if (!idProduct) {
            throw new Error ("Error. The product doesn´t exists");
        } else {
            const deleteProduct = await manager.deleteProduct (parseInt(idProduct));
            res.send ({status: "Success", product: deleteProduct});
        }
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" })
    }
})


module.exports = productsRouter;
const { Router } = require ("express");
const cartsRouter = Router();
const CartManager = require ("../../cartsManager");
const manager = new CartManager ("./src/Routes/carts/carts.json"); 

cartsRouter.get ("/:cid", async (req,res) => {
    try {
        const cartID = req.params.cid; 
        const getCartByID = await manager.getCartByID (parseInt(cartID));    
        res.send ({status: "Success", carts: getCartByID});
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" })
    }
});

cartsRouter.post ("/", async (req,res) => {
    try {
        const newCart = await manager.addCarts();
        res.send ({status: "Success", cart: newCart}); 
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" })
    }
})

cartsRouter.post ("/:cid/products/:pid", async (req,res) => {
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const addProductInCart = await manager.addNewProductInCart (parseInt(cartID), parseInt(productID));
        res.send ({status:"Success", addProductInCart: addProductInCart})
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" })
    }
})

module.exports = cartsRouter;

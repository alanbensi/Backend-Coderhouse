const { Router } = require ("express");
const cartsRouter = Router();

cartsRouter.get ("/",(req,res) => {
    res.send ("FUNCIONAAAA");
});

module.exports = cartsRouter;

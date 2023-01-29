const express = require ("express"); 
const app = express();
const cartsRouter = require ("./Routes/carts/carts");
const productsRouter = require ("./Routes/products/products");


app.get ('/', (req , res) => {
    res.send ('Ruta raiz');
});

// Middlewares
app.use (express.json());
app.use (express.urlencoded({extended:true}))

app.use ('/api/products', productsRouter);
app.use ('/api/carts', cartsRouter);


// app.get ('/products', async (req,res) => {
//     const limit = req.query.limit;
//     const allProducts = await manager.getProducts();
//     if (limit) {
//         const newArrayLimit= allProducts.slice(0, limit);
//         res.send (newArrayLimit);
//     }else {
//         res.send(allProducts);
//     }
// })

// app.get ('/products/:pid', async (req,res)=> {
//     const productId = req.params.pid;
//     const product = await manager.getProductByID(parseInt(productId));
//     res.send (product);
// })

app.listen (8080, ()=> console.log ("app running on port 8080"));7

app.on ("error", error => console.log (error));


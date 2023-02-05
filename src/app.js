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

app.listen (8080, ()=> console.log ("app running on port 8080"));7

app.on ("error", error => console.log (error));


const express = require ("express"); 
const exphbs = require ("express-handlebars");
const app = express();
const path = require("path");
const cartsRouter = require ("./Routes/carts/carts");
const productsRouter = require ("./Routes/products/products");
const viewsRouter = require ("./Routes/views/views");


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



app.listen (8080, ()=> console.log ("app running on port 8080"));

app.on ("error", error => console.log (error));


class ProductManager { 
    products; 

    constructor() {
        this.products = [];
    }
    
    addProducts(title, description, price, thumbnail, code, stock) {
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } 
        if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock) {
            this.products.push(newProduct)
        } else {
            console.log ("Error. Please complete all the fields")
        }
    }
    
    getProducts () {
        console.log (this.products);
    }
}

let producto = new ProductManager ("fideos"); 
producto.getProducts();
producto.addProducts("TITULO", "DESCRIPTION", "PRICE", "THUMBNAIL", 4558, 257);
producto.getProducts();

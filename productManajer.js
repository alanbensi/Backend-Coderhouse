class ProductManager { 
    products; 

    constructor() {
        this.products = [];
    }
    
    addProducts(title, description, price, thumbnail, code, stock) {
        let newProduct = {
            id: this.addNewId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } 
        if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock && this.validateCode(code)) {
            this.products.push(newProduct);
            console.log("The product was succesfully added")
        } else {
            console.log ("Error. Please complete all the fields")
        }
    }
    
    getProducts () {
        console.log (this.products);
    }

    getProductByID (id) {
        let idProducto = this.products.find (product => product.id === id);
        if (!idProducto) {
            console.log ("Error. There aren´t products with this ID");
        } else {
            console.log (idProducto);
        }
    }

    validateCode (code) {
        let result = true; 
        let existCode = this.products.find (product => product.code === code);
        if (existCode) { 
            result = false;
            console.log ("This code already exists! Please change the code of the new product");
        }
        return result;
    }

    addNewId () {
        return this.products.length +1;
    }
}

let producto = new ProductManager (); 

producto.getProducts();
producto.addProducts("Rice", "ABC", 50, "abc.jpg", 4558, 257);
producto.addProducts("Pasta", "abc", 150, "abc.jpg", 4559, 257);
producto.addProducts("Meet", "abc", 200, "abc.jpg", 4559, 257);
producto.getProducts();

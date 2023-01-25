const fs = require ('fs');

class ProductManager { 
    products;
    path;

    constructor(path) {
        this.path = path;
    }

    async addProducts(title, description, price, thumbnail, code, stock) {

        const getProducts = await this.getProducts(); //array con todos los productos
        let newProduct = {
            id: await this.addNewId(getProducts),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } 
        try {
            if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock &&  await this.validateCode(code, getProducts)) {
                console.log ("hola", getProducts)
                getProducts.push(newProduct);
                console.log("The product was succesfully added");
                fs.promises.writeFile(this.path, JSON.stringify(getProducts))
            } else {
                console.log("Error. Please complete all the fields");
            }
        } catch (error) {
            console.log (error)
        }
    }
    
    async getProducts () {
        try {
            const allProducts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(allProducts);
        } catch (error) {
            console.log(error);
        }
    }

    async getProductByID (id) {
        const getProducts = await this.getProducts();
        const idProducto = getProducts.find (product => product.id === id);
        if (!idProducto) {
            return "Error. This product is not found";
        } else {
            console.log (idProducto);
            return idProducto;
        }
    }

    async validateCode (code, getProducts) {
        let result = true; 
        let existCode = getProducts.find (product => product.code === code);
        if (existCode) { 
            result = false;
            console.log ("This code already exists! Please change the code of the new product");
        }
        return result;
    }

    addNewId (getProducts) {
        let newID; 
        if (getProducts.length === 0 ){
            newID = 1
        } else {
            newID = getProducts[getProducts.length-1].id + 1;
        }
        return newID;
    }

    async updateProduct (id, field, value) {
        const getProducts = await this.getProducts();
        const idProducto = getProducts.find(product => product.id === id);
        if (!idProducto) {
            console.log("Error. This product is not found");
        } else {
            idProducto[field] = value;
            await fs.promises.writeFile(this.path, JSON.stringify(getProducts));
            console.log (idProducto, "producto modificado");
            return idProducto
        }
        //get by id que retorna el obj. Product.field = value
    }

    async deleteProduct (id) {
        const allProducts = await this.getProducts();
        const newAllProducts = allProducts.filter (product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newAllProducts));
        //get all products. Hacer un filter sobre ese array para que devuelva todos menos el que tiene ese id.  
    }
}


const run = async () => {
    let product = new ProductManager ("./src/products.json"); 
}

run (); 


module.exports = ProductManager;
// console.log (product.updateProduct(2,"price", 50000), "ESTE ES EL UPDATE");

// product.deleteProduct (3);


// product.getProducts();
// // product.addProducts("Pasta", "abc", 150, "abc.jpg", 4559, 257);
// // product.addProducts("Meet", "abc", 200, "abc.jpg", 4559, 257);
// product.getProductByID(1);

// product.updateProduct(1, "price", 2000)
// console.log (product.updateProduct(1, price, 478999999));
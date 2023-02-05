const fs = require('fs');

class CartManager {
    carts; 
    productsInCart;
    path;

    constructor (path) {
        this.path = path;
    }
    
    
    async addCarts (){
        const getCarts = await this.getCarts();
        let newCart = {
            id: await this.createNewID (),
            products: []
        }
        try {
            if (newCart.id && newCart.products) {
                getCarts.push(newCart);
                console.log("The cart was succesfully added");
                await fs.promises.writeFile(this.path, JSON.stringify(getCarts));
            } else {
                console.log("Error. Please complete all the fields");
            }
        } catch (error) {
            console.log (error); 
        }
    }
    
    async getCarts() {
        try {
            const allCarts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(allCarts);
        } catch (error) {
            console.log(error);
        }
    }

    async getCartByID (id) {
        const getCarts = await this.getCarts();
        const cartID = getCarts.find(product => product.id === id);
        if (!cartID) {
            return "Error. This product is not found";
        } else {
            return cartID;
        }
    }

    async createNewID () {
        const getAllCarts = await this.getCarts();
        let newID;
        if (getAllCarts.length === 0) {
            newID = 1
        } else {
            newID = getAllCarts[getAllCarts.length - 1].id + 1;
        }
        return newID;
    }

    async addNewProductInCart (cartID, productID){
        const getCarts = await this.getCarts (); 
        const cartID2 = getCarts.findIndex (item => item.id === cartID); 
        let newProduct;
        const cart = getCarts[cartID2];
        if (cart.products.length > 0 && cart.products.some(item => item.product === productID)) {
            const findProductId = cart.products.find((e) => e.product === productID);
            if (findProductId) {
                findProductId.quantity = findProductId.quantity + 1;
            }else {
                newProduct = {
                    product: productID,
                    quantity: 1
                }
                cart.products.push(newProduct);
            }
        } else {
            newProduct = {
                product: productID,
                quantity: 1
            }
            cart.products.push(newProduct);
        }
        if (cartID2 && productID) {
            await fs.promises.writeFile(this.path, JSON.stringify(getCarts));
        }
    }
}

const manager = new CartManager("./src/Routes/carts/carts.json"); 

module.exports = CartManager;

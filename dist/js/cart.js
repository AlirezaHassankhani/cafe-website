import products from "./products.js";
class Cart {
    cart = [];
    addProductToCart(ID) {
        let hasProduct = this.cart.some((itme) => itme.id === ID);
        console.log("in");
        if (hasProduct) {
            this.cart = this.cart.map((item) => {
                if (item.id == ID) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
            console.log("on");
        }
        else {
            let { id, title, price } = products.find((product) => product.id == ID);
            this.cart.push({ id, title, price, count: 1 });
        }
    }
    deleteProduct(ID) {
        this.cart = this.cart.filter((item) => item.id != ID);
    }
    setCart(cart) {
        this.cart = cart;
    }
    getCart() {
        return this.cart;
    }
    getLength() {
        return this.cart.length;
    }
}
export default Cart;

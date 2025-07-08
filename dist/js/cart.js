import products from "./products.js";
class Cart {
    cart = [];
    addProductToCart(ID) {
        let hasProduct = this.cart.some((itme) => itme.id === ID);
        if (hasProduct) {
            this.cart = this.cart.map((item) => {
                if (item.id == ID) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
        }
        else {
            let { id, title, price, name, src: { thumbnail } } = products.find((product) => product.id == ID);
            this.cart.push({ id, title, price, name, src: thumbnail, count: 1 });
        }
    }
    deleteProduct(ID) {
        this.cart = this.cart.map((items) => {
            if (items.id == ID) {
                if (items.count > 1) {
                    return { ...items, count: items.count - 1 };
                }
                else {
                    return items;
                }
            }
            else {
                return items;
            }
        });
    }
    deleteFormCart(ID) {
        this.cart = this.cart.filter(item => item.id != ID);
    }
    setCart(cart) {
        this.cart = cart;
    }
    getCart() {
        return this.cart;
    }
    getProductCount(ID) {
        return this.cart.find((item) => item.id == ID)?.count;
    }
    totalProduct() {
        let totalProduct = 0;
        this.cart.forEach((item) => (totalProduct += item.count));
        return totalProduct;
    }
    calcTotalPrice() {
        let totalPrice = 0;
        this.cart.forEach((item) => {
            totalPrice += item.price * item.count;
        });
        return totalPrice;
    }
}
export default Cart;

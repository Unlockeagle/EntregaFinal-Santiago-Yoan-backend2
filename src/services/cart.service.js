import cartRepository from "../repositories/cart.repository.js";

class CartService {
    async createCart() {
        return await cartRepository.createCart();
    }
    async findCart() {
        return await cartRepository.getCarts();
    }
    async findCartById(cid) {
        return await cartRepository.getCartById(cid);
    }
    async deleteCart(cid) {
        return await cartRepository.deleteCart(cid);
    }
    async addProductToCart(cid, pid, quantity = 1) {
        // para añadir productos al carrito

        const cart = await cartRepository.getCartById(cid);

        if (!cart) {
            throw new Error("Carrito no existe");
        }

        const product = await cart.products.find((item) => item.product._id.toString() === pid.toString());

        if (!product) {
            cart.products.push({ product: pid, quantity });
            cartRepository.updateCart(cid, cart);
        } else {
            product.quantity += quantity;
            cartRepository.updateCart(cid, cart);
        }

        return cart;
    }
    async emptyCart(cid) {
        const cart = await cartRepository.getCartById(cid);

        await cartRepository.updateCart(cid, (cart.products = []));
        cartRepository.saveTo(cart);
    }
    async updateQuantityProductToCart(cid, pid, quantity) {
        const cart = await cartRepository.getCartById(cid);
        if (!cart) {
            throw new Error("Carrito no existe");
        }
        const product = cart.products.find((item) => item.product.equals(pid));
        if (product) {
            product.quantity += quantity;
            cartRepository.saveTo(cart);
        }
        return product;
    }
    async deleteProductFromCart(cid, pid) {
        const cart = await cartRepository.getCartById(cid);
        const product = cart.products.find((item) => item.product.equals(pid));
        console.log(product);
    }
}

export default new CartService();

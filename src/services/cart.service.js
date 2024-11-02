import cartRepository from "../repositories/cart.repository.js";
import ticketRepository from "../repositories/ticket.repository.js";
import productRepository from "../repositories/product.repository.js";

import CounterModel from "../models/counter.model.js";

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
            await cartRepository.updateCart(cid, cart);
        } else {
            product.quantity += quantity;
            await cartRepository.updateCart(cid, cart);
        }

        return cart;
    }
    async emptyCart(cid) {
        const cart = await cartRepository.getCartById(cid);

        cart.products = [];
        await cartRepository.updateCart(cid, cart);
    }
    async updateQuantityProductToCart(cid, pid, quantity) {
        const cart = await cartRepository.getCartById(cid);
        if (!cart) {
            throw new Error("Carrito no existe");
        }
        const product = await cart.products.find((item) => item.product._id.toString() === pid.toString());
        if (product) {
            product.quantity += quantity;
            await cartRepository.updateCart(cid, cart);
        }
        return product;
    }
    async deleteProductFromCart(cid, pid) {
        const cart = await cartRepository.getCartById(cid);

        if (cart) {
            const productIndex = await cart.products.findIndex((item) => item.product._id.toString() === pid.toString());

            if (productIndex !== 1) {
                await cart.products.splice(productIndex, 1);
                return await cartRepository.updateCart(cid, cart);
            }
        } else {
            throw new Error("Error al eliminar producto del carrito");
        }
    }
    async finalizePurchase(cid) {
        const cart = await cartRepository.getCartById(cid);

        const unprocessedProducts = [];

        let totalProducts = 0;
        //actualizamos el stock
        for (const item of cart.products) {
            if (item.product.stock >= item.quantity) {
                await productRepository.updateProduct(item.product._id, {
                    stock: item.product.stock - item.quantity,
                });
                await this.deleteProductFromCart(cid, item.product._id);
                totalProducts += item.quantity * item.product.price;
            } else {
                unprocessedProducts.push(item.product._id);
            }
        }

        // let products = cart.products.forEach(async (products) => {
        //     if (products.product.stock >= products.quantity) {
        //         await productRepository.updateProduct(products.product._id, {
        //             stock: products.product.stock - products.quantity,
        //         });
        //         await this.deleteProductFromCart(cid, products.product._id);
        //         totalProducts += products.quantity * products.product.price;
        //         // Falata aqui ir sacando los productos del carrito que si tienen disponibilidad
        //         // Y actualizar los nuevos stocks
        //         console.log(products);

        //         return totalProducts;
        //         //console.log("si hay stock");
        //     } else {
        //         return unprocessedProducts.push(products.product._id);
        //         //console.log("no hay stock");
        //     }
        // });

        //Observamos el contador
        const counter = await CounterModel.findOne({ title: "conuterTicket" });

        const counterUpdate = await CounterModel.findOneAndUpdate({ counter: counter.counter + 1 });

        const ticket = {
            code: counter.counter + 1,
            purchase_datetime: Date.now(),
            amount: parseFloat(totalProducts.toFixed(2)),
            purchaser: "email",
        };

        console.log("unprocessedProducts");
        console.log(unprocessedProducts);
        return ticket;
    }
}

export default new CartService();

import ticketRepository from "../repositories/ticket.repository.js";
import cartService from "../services/cart.service.js";


class CartController {
    async createCart(req, res) {
        try {
            const cart = await cartService.createCart();
            res.status(201).send({ message: "Carrito creado con exito", cart: cart });
        } catch (error) {
            res.status(400).send({ messsage: "Error en el servidor al crear carrito", error: error.message });
        }
    }
    async getCarts(req, res) {
        try {
            const carts = await cartService.findCart();
            res.status(200).send({ message: "Carts obtenidos con exito", carts: carts });
        } catch (error) {
            res.status(400).send({ messsage: "Error en el servidor al obtener carritos", error: error.message });
        }
    }
    async getCartById(req, res) {
        try {
            const cid = req.params.cid;
            const cart = await cartService.findCartById(cid);
            res.status(200).send({ message: "Carrito obtenido exitosamente", cart: cart });
        } catch (error) {
            res.status(400).send({ messsage: "Error en el servidor al obtener carrito por Id", error: error.message });
        }
    }
    async deleteCart(req, res) {
        try {
            const cid = req.params.cid;
            await cartService.deleteCart(cid);
            res.status(201).send({ message: "Carrito eliminado exitosamente" });
        } catch (error) {
            res.status(500).send({ messsage: "Error en el servidor al eliminar carrito por Id", error: error.message });
        }
    }
    async addProductToCart(req, res) {
        try {
            const cid = req.params.cid;
            const quantity = req.body.quantity;
            const pid = req.body.product;

            await cartService.addProductToCart(cid, pid, quantity);
            res.status(201).send({ message: "Producto agregado en el carrito exitosamente" });
        } catch (error) {
            res.status(400).send({ messsage: "Error en el servidor añadir producto en el carrito", error: error.message });
        }
    }
    async emptyCart(req, res) {
        try {
            const cid = req.params.cid;
            await cartService.emptyCart(cid);
            res.status(201).send({ message: "Carrito vaciado exitosamente" });
        } catch (error) {
            res.status(400).send({ messsage: "Error en el servidor al vaciar carrito", error: error.message });
        }
    }
    async updateQuantity(req, res) {
        try {
            const cid = req.params.cid;
            const quantity = req.body.quantity;
            const pid = req.body.product;

            await cartService.updateQuantityProductToCart(cid, pid, quantity);
            res.status(201).send({ message: "Cantidad actualizada exitosamente" });
        } catch (error) {
            res.status(400).send({ messsage: "Error en el servidor al actualizar quantity en carrito", error: error.message });
        }
    }
    async deleteProductFromCart(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.body.product;

            const deleted = await cartService.deleteProductFromCart(cid, pid);
            res.status(201).send({ message: "Producto eliminado exitosamente del carrito", deleted: deleted });
        } catch (error) {
            res.status(400).send({ messsage: "Error en el servidor al eliminar producto del carrito", error: error.message });
        }
    }
    async finalizePurchase(req, res) {
        const cid = req.params.cid;
        const { email } = req.user

        const ticket = await cartService.finalizePurchase(cid);
        ticket.purchaser = email
        const ticketFinal = await ticketRepository.create(ticket);
        console.log(ticketFinal);


        
        

        res.send({ message: "Nueva orden recibida", ticket: ticketFinal});
    }
}

export default new CartController();

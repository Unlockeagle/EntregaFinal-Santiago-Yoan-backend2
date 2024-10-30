import CartDao from "../dao/cart.dao.js";

class CartRepository {
    async createCart() {
        return await CartDao.save();
    }
    async getCarts() {
        return await CartDao.find();
    }

    async getCartById(cid) {
        return await CartDao.findById(cid);
    }
    async deleteCart(cid) {
        return await CartDao.delete(cid);
    }
    async updateCart(cid, dataCart) {
        return await CartDao.update(cid, dataCart);
    }
}

export default new CartRepository();

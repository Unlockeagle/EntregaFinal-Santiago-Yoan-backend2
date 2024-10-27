import CartModel from "../models/cart.model.js";

class CartDao {
    async save() {
        const cart = new CartModel({ products: [] });
        return await cart.save();
    }
    async saveTo(obj) {
        return await obj.save();
    }
    async find() {
        return await CartModel.find();
    }
    async findById(cid) {
        return await CartModel.findById(cid);
    }
    async findOne(query) {
        return await CartModel.findOne(query);
    }
    async update(cid, dataCart) {
        return await CartModel.findByIdAndUpdate(cid, dataCart, { new: true });
    }
    async delete(cid) {
        return await CartModel.findByIdAndDelete(cid);
    }
}

export default new CartDao();

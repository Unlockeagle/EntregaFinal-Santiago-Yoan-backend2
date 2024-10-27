import ProductModel from "../models/product.model.js";

// Los metodos de la db (mongo DB)
class ProductDao {
    async find(query, options) {
        //pasar query y params a paginate para filtar los datos
        return await ProductModel.paginate(query, options);
    }
    async findOne(query) {
        return await ProductModel.findOne(query);
    }
    async findById(id) {
        return await ProductModel.findById(id);
    }
    async save(productData) {
        const product = new ProductModel(productData);
        return await product.save();
    }
    async update(id, productData) {
        return await ProductModel.findByIdAndUpdate(id, productData, { new: true }); // Este opción retorna el documento actualizado;
    }
    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

export default new ProductDao();
// Se debe crear una instancia de la clase

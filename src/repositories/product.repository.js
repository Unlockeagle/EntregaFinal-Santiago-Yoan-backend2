import ProductDao from "../dao/product.dao.js";

class ProductRepository {
    async createProduct(productData) {
        return await ProductDao.save(productData);
    }
    async getProducts(query, options) {
        return await ProductDao.find(query, options);
    }
    async getProductById(id) {
        return await ProductDao.findById(id);
    }
    async getProductByCategory(category) {
        return await ProductDao.findOne({ category: category });
    }
    async getProductByCode(productData) {
        return await ProductDao.findOne({ code: productData.code });
    }
    async updateProduct(id, productData) {
        return await ProductDao.update(id, productData);
    }
    async deleteProduct(id) {
        return await ProductDao.delete(id);
    }
}

export default new ProductRepository();
// Se debe crear una instancia de la clase
// es para que se vea mejor al momento de usar el repository

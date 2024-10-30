import productRepository from "../repositories/product.repository.js";
import { productDto, fiterCategoryDto, paginateOptionsDto } from "../dto/product.dto.js";
class ProductService {
    async registerProduct(datosProducto) {
        const existsProductByCode = await productRepository.getProductByCode(datosProducto);
        if (existsProductByCode) {
            throw new Error("Error el codigo ya esta en uso");
        }

        const product = await productRepository.createProduct(productDto(datosProducto));

        return product;
    }
    async getProducts(query) {
        let category = query.category;
        let limit = parseInt(query.limit, 10) || 10;
        let page = parseInt(query.page, 10) || 1;
        let sort = query.sort;

        const arrayProducts = await productRepository.getProducts( fiterCategoryDto(category), paginateOptionsDto(limit, page, sort));
        
        return arrayProducts
    }
    async getProductById(id) {
        const product = await productRepository.getProductById(id);
        if (!product) {
            throw new Error("Error id no encontrado");
        }
        return product
    }
    async deleteProduct(id) {
        const existsProduct = await productRepository.getProductById(id);
        if (!existsProduct) {
            throw new Error("Error id no encontrado");
        }
        return await productRepository.deleteProduct(id);
    }
    async updateProduct(id, productData) {
        const existsProduct = await productRepository.getProductById(id);
        if (!existsProduct) {
            throw new Error("Error id no encontrado");
        }
        return await productRepository.updateProduct(id, productData);
    }
}

export default new ProductService();

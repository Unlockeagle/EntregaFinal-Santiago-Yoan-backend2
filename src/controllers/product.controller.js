import productService from "../services/product.service.js";

class ProductController {
    async createProduct(req, res) {
        try {
            const product = await productService.registerProduct(req.body);
            res.status(201).send({ message: "Producto registrado exitosamente", product: product });
        } catch (error) {
            res.status(500).send({ message: "Error al registar producto", error: error.message });
        }
    }
    async getProducts(req, res) {
        try {
            const query = req.query;
            const product = await productService.getProducts(query);

            res.status(200).json({
                status: "success",
                data: product,
                prevLink: product.hasPrevPage ? `/api/products?page=${product.prevPage}` : "",
                nextLink: product.hasNextPage ? `/api/products?page=${product.nextPage}` : "",
            });
        } catch (error) {
            res.status(500).send({ message: "Error al obtener productos", error: error.message });
        }
    }
    async getProductsById(req, res) {
        try {
            const id = req.params.id;

            const product = await productService.getProductById(id);
            res.status(200).send({ message: "producto obtenido exitosamente", product: product });
        } catch (error) {
            res.status(500).send({ message: "Error al obtener el producto", error: error.message });
        }
    }
    async deleteProduct(req, res) {
        try {
            const id = req.params.id;

            const product = await productService.deleteProduct(id);
            res.status(200).send({ message: "producto eliminado exitosamente", product: product });
        } catch (error) {
            res.status(500).send({ message: "Error al obtener el producto", error: error.message });
        }
    }
    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const productData = req.body;

            const product = await productService.updateProduct(id, productData);
            res.status(201).send({ message: "producto actualizado con exito", product: product });
        } catch (error) {
            res.status(501).send({ message: "Error al actualizar el producto", error: error.message });
        }
    }
}

export default ProductController;

import { $api } from "../http";

export default class ProductService {
    static async fetchProducts() {
        return $api.get(`/product/get-products`);
    }

    static async getProductById(id) {
        return $api.get(`/product/${id}`);
    }

    static async addProduct(product) {
        return $api.post(`/product/add-product`, product);
    }
}
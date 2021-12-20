import ProductAPI, { DataCreateProduct } from "../../interface/api/productAPI";
import AxiostAPI from "../config";
const resource = "product";
const getListProduct = () => {
    return AxiostAPI(false).get(`${resource}/list`);
};
const createProduct = (data: DataCreateProduct) => {
    return AxiostAPI(false).post(`${resource}/create`, data);
};
const getProduct = (_id: string) => {
    return AxiostAPI(false).get(`${resource}/${_id}`);
};
const productAPI: ProductAPI = {
    getListProduct,
    createProduct,
    getProduct,
};
export default productAPI;

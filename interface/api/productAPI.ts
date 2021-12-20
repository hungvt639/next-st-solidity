import { AxiosResponse } from "axios";
import { Product } from "..";

export interface DataCreateProduct {
    name: string;
    description: string;
    price: string;
}

export default interface ProductAPI {
    getListProduct: () => Promise<AxiosResponse<Product[]>>;
    createProduct: (data: DataCreateProduct) => Promise<AxiosResponse<Product>>;
    getProduct: (_id: string) => Promise<AxiosResponse<Product>>;
}

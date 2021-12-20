import { AxiosResponse } from "axios";
export interface BlogInterface {
    _id: string;
    title: string;
    slug: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}
export interface DataCreateBlog {
    title: string;
    content: string;
}
export default interface BlogAPI {
    getDataBlog: (slug: String) => Promise<AxiosResponse<BlogInterface>>;
    createBlog: (data: DataCreateBlog) => Promise<AxiosResponse<BlogInterface>>;
    getListBlog: () => Promise<AxiosResponse<BlogInterface[]>>;
}

import BlogAPI, { DataCreateBlog } from "../../interface/api/blogAPI";
import AxiostAPI from "../config";
const resource = "blog";
const getDataBlog = (slug: String) => {
    return AxiostAPI(false).get(`${resource}/${slug}`);
};
const createBlog = (data: DataCreateBlog) => {
    return AxiostAPI(false).post(`${resource}/create`, data);
};
const getListBlog = () => {
    return AxiostAPI(false).get(`${resource}`);
};
const blogAPI: BlogAPI = {
    getDataBlog,
    createBlog,
    getListBlog,
};
export default blogAPI;

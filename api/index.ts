import API from "../interface/api";
import blogAPI from "./repository/blogAPI";
import locationsAPI from "./repository/LocationsAPI";
import productAPI from "./repository/productAPI";
const API: API = {
    location: locationsAPI,
    blog: blogAPI,
    product: productAPI,
};

export default API;

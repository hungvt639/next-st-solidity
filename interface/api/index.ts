import BlogAPI from "./blogAPI";
import LocationsAPI from "./LocationsAPI";
import ProductAPI from "./productAPI";
export default interface API {
    location: LocationsAPI;
    blog: BlogAPI;
    product: ProductAPI;
}

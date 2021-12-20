import LocationsAPI from "../../interface/api/LocationsAPI";
import AxiostAPI from "../config";
const resource = "api";
const getListProvinces = () => {
    return AxiostAPI(false).get(`${resource}/locations`);
};
const getListDistricts = (id: number) => {
    return AxiostAPI(false).get(`${resource}/locations/${id}`);
};
const getListWards = (id: number) => {
    return AxiostAPI(false).get(`${resource}/district/${id}`);
};

const locationsAPI: LocationsAPI = {
    getListProvinces,
    getListDistricts,
    getListWards,
};
export default locationsAPI;

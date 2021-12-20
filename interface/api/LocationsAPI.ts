import { AxiosResponse } from "axios";

export interface ResponseGetListProvinces {}
export interface ResponseGetListDistricts {}
export interface ResponseGetListWards {}

export default interface LocationsAPI {
    getListProvinces: () => Promise<AxiosResponse<ResponseGetListProvinces>>;
    getListDistricts: (
        id: number
    ) => Promise<AxiosResponse<ResponseGetListDistricts>>;
    getListWards: (id: number) => Promise<AxiosResponse<ResponseGetListWards>>;
}

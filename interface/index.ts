import { BigNumber } from "ethers";

export interface UserInterface {
    displayName?: string | undefined | null;
    email?: string | undefined | null;
    photoURL?: string | undefined | null;
    uid?: string | undefined | null;
    phoneNumber?: string | undefined | null;
    providerId?: string | undefined | null;
    keywords?: string | undefined | null;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: string;
    created_at: string;
    updated_at: string;
}
export interface ProductSale{
    data:Product
    chuSoHuu: string
    id: BigNumber
    isSold: boolean
    itemURL: string
    nguoiTao: string
    price: BigNumber
}

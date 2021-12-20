import API from "../../api";
import { BlogInterface } from "../../interface/api/blogAPI";
import Header from "../../components/Header";
import Link from "next/link";
import { BLOG } from "../../config/constRouter";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { marketAddress, NFTAddress } from "../../config";
import MARKET from "../../artifacts/contracts/Market.sol/Market.json";
import { Product, ProductSale } from "../../interface";
import { AxiosResponse } from "axios";
import { message } from "antd";
import Web3Modal from "web3modal";

const MyProduct = () => {
    const [data, setData] = useState<ProductSale[]>([]);
    useEffect(() => {
        async function getData() {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();

            const productContract = new ethers.Contract(
                marketAddress,
                MARKET.abi,
                signer
            );
            const data = await productContract.getMyItem();
            const items = await Promise.all(
                data.map(async (d: any) => {
                    const res: AxiosResponse<Product> =
                        await API.product.getProduct(d.itemURL);
                    return { ...d, data: res.data };
                })
            );
            setData(items);
        }
        getData();
    }, []);
    return (
        <>
            <Header />
            <div className="w-full max-w-screen-xl mx-auto">
                <h1>Danh sách các Product</h1>
                <div className="flex flex-row">
                    {data.map((product: ProductSale) => (
                        <div
                            className="w-40 border m-5 cursor-pointer"
                            key={product.data._id}
                        >
                            <h1>Tên: {product.data.name}</h1>
                            <p>Mô tả: {product.data.description}</p>
                            <p>Giá: {product.data.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyProduct;

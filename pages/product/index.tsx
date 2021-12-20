import API from "../../api";
import { BlogInterface } from "../../interface/api/blogAPI";
import Header from "../../components/Header";
import Web3Modal from "web3modal";

import Link from "next/link";
import { BLOG, MY_PRODUCT } from "../../config/constRouter";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { marketAddress, NFTAddress } from "../../config";
import MARKET from "../../artifacts/contracts/Market.sol/Market.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import { Product, ProductSale } from "../../interface";
import { AxiosResponse } from "axios";
import { message } from "antd";
import { useRouter } from "next/router";

const ProductList = ({ data }: { data: ProductSale[] }) => {
    // console.log("data_", data);
    const router = useRouter();
    const [productBuy, setProductBuy] = useState<ProductSale>();
    async function buy() {
        if (!productBuy) {
            message.error("Vui lòng chọn sản phẩm muốn mua");
        } else {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();

            const productContract = new ethers.Contract(
                marketAddress,
                MARKET.abi,
                signer
            );
            const createSale = await productContract.muaHang(productBuy.id, {
                value: productBuy.price,
            });
            await createSale.wait();
            message.success("Mua hàng thành công");
            router.push(MY_PRODUCT);
        }
    }

    return (
        <>
            <Header />
            <div className="w-full max-w-screen-xl mx-auto">
                <h1>Danh sách các Product</h1>
                <div className="flex flex-row">
                    {data.map((product: ProductSale) => (
                        <div
                            style={{
                                borderWidth:
                                    productBuy?.id === product.id ? 3 : 1,
                            }}
                            onClick={() => setProductBuy(product)}
                            className="w-40 border m-5 cursor-pointer"
                            key={product.data._id}
                        >
                            <h1>Tên: {product.data.name}</h1>
                            <p>Mô tả: {product.data.description}</p>
                            <p>Giá: {product.data.price}</p>
                        </div>
                    ))}
                </div>
                <button onClick={buy} className="border mx-5 py-2 px-5">
                    Mua hàng
                </button>
            </div>
        </>
    );
};

ProductList.getInitialProps = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const marketContract = new ethers.Contract(
        marketAddress,
        MARKET.abi,
        provider
    );
    const NFTContract = new ethers.Contract(NFTAddress, NFT.abi, provider);

    const data = await marketContract.getItemSale();
    const items = await Promise.all(
        data.map(async (d: any) => {
            const _id = await NFTContract.tokenURI(d.idItem);
            const res: AxiosResponse<Product> = await API.product.getProduct(
                _id
            );
            return { ...d, data: res.data };
        })
    );
    return { data: items };
};

export default ProductList;

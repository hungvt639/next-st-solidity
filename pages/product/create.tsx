import type { NextPage } from "next";
import { DataCreateProduct } from "../../interface/api/productAPI";
import { useState } from "react";
import API from "../../api";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import MARKET from "../../artifacts/contracts/Market.sol/Market.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import { marketAddress, NFTAddress } from "../../config";
import Header from "../../components/Header";
import errorAPI from "../../utils/errorAPI";
import { message } from "antd";
import { useRouter } from "next/router";
import { LIST_PRODUCT } from "../../config/constRouter";
const CreateProduct: NextPage = () => {
    const router = useRouter();
    const [product, setProduct] = useState<DataCreateProduct>({
        name: "",
        description: "",
        price: "",
    });
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (typeof window.ethereum === "undefined") {
            console.log("Not ethereum");
            return;
        }
        try {
            const res = await API.product.createProduct(product);
            createSale(res.data._id);
        } catch (e) {
            errorAPI(e);
        }
    }
    async function createSale(id: string) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        // const MarketContract = new ethers.Contract(
        //     marketAddress,
        //     MARKET.abi,
        //     signer
        // );

        const NFTContract = new ethers.Contract(NFTAddress, NFT.abi, signer);
        let ct = await NFTContract.createToken(id);
        let tx = await ct.wait();

        debugger;
        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber();
        console.log(tx);

        // const phi = await MarketContract.phiBanHang();
        // // // const p = parseFloat(ethers.utils.formatEther(phi))
        // const price = ethers.utils.parseUnits(product.price, "ether");

        // let transaction = await MarketContract.createItemForMarket(
        //     NFTAddress,
        //     tokenId,
        //     price,
        //     {
        //         value: phi,
        //     }
        // );
        // await transaction.wait();
        // message.success("Tạo mới sản phẩm thành công");
        // router.push(LIST_PRODUCT);
    }

    return (
        <>
            <Header />
            <div>
                <h1>Create Product</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Name:
                        <input
                            className="ml-5 outline-none border border-zinc-200 border-solid px-3 py-1"
                            value={product.name}
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                            id="name"
                            placeholder="Name product"
                        />
                    </label>
                    <label htmlFor="description">
                        Description:
                        <input
                            className="ml-5 outline-none border border-zinc-200 border-solid px-3 py-1"
                            value={product.description}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    description: e.target.value,
                                })
                            }
                            id="description"
                            placeholder="Description product"
                        />
                    </label>
                    <label htmlFor="price">
                        Price:
                        <input
                            type="number"
                            className="ml-5 outline-none border border-zinc-200 border-solid px-3 py-1"
                            value={product.price}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    price: e.target.value,
                                })
                            }
                            id="price"
                            placeholder="Price product"
                        />
                    </label>
                    <div>
                        <button
                            type="submit"
                            className="border border-zinc-200 border-solid px-3 py-1"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateProduct;

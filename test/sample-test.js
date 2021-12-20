const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
    it("Should return the new greeting once it's changed", async function () {
        const Market = await hre.ethers.getContractFactory("Market");
        const market = await Market.deploy();
        await market.deployed();
        console.log("Market address:", market.address);

        const NFT = await hre.ethers.getContractFactory("NFT");
        const nft = await NFT.deploy(market.address);
        await nft.deployed();
        console.log("NFT address:", nft.address);

        const x = await nft.createToken("abc");
        const y = await x.wait();
        console.log("y_", y);
    });
});

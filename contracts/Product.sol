// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract Products{
    Product[] public listProduct;

    struct Product{
        string _id;
        address creater;
    }
    function addProduct(string memory _id) public{
        Product memory p=Product(_id, msg.sender);
        listProduct.push(p);
    }
    function getListProduct() public view returns(Product[] memory){
        console.log(listProduct[0]._id);
        return listProduct;
    }
}
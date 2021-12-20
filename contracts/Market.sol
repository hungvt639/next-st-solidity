// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract Market is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tongItem;
    Counters.Counter private _soItemDaBan;

    address payable owner;
    uint256 public phiBanHang = 0.025 ether;

    struct Item {
        uint id;
        address NFTContract;
        uint idItem;
        address payable nguoiTao;
        address payable chuSoHuu;
        uint price;
        bool isSold;
    }

    mapping(uint =>Item) itemList;

    constructor() {
        owner = payable(msg.sender);
    }

    //even
    event CreateItem(uint id,address NFTContract, uint itemURL, address payable nguoiTao,address payable chuSoHuu, uint price, bool isSold);


    //function
    function getPhiBanHang()public view returns(uint256){
        return phiBanHang;
    }

    function createItemForMarket(address _NFTContract, uint _tokenID, uint _price) public payable nonReentrant{
        require(_price>0, "Gia ban phai lon hon 0");
        require(phiBanHang<=msg.value, "Phi giao dich k du");
        _tongItem.increment();
        uint256 newItemId = _tongItem.current();
        itemList[newItemId] = Item(newItemId,_NFTContract, _tokenID, payable(msg.sender), owner, _price, false);
        IERC721(_NFTContract).transferFrom(msg.sender, address(this), _tokenID);
        emit CreateItem(newItemId,_NFTContract, _tokenID, payable(msg.sender), owner, _price, false);
    }

    function getItemSale() public view returns(Item[] memory){
        uint tongItem = _tongItem.current();
        uint daBan = _soItemDaBan.current();
        uint conLai = tongItem-daBan;
        uint j = 0;
        Item[] memory items = new Item[](conLai);
        for(uint i = 1; i <= tongItem; i++){
            if(itemList[i].chuSoHuu == owner){
                Item storage currentItem = itemList[i];
                items[j] = currentItem;
                j++;
            }
        }
        return items;
    }

    function muaHang(address _NFTContract, uint _itemId)public payable {
        uint tokenId = itemList[_itemId].idItem;
        require(itemList[_itemId].price == msg.value, "So tien khong chinh xac");
        IERC721(_NFTContract).transferFrom(address(this), msg.sender, tokenId);
        itemList[_itemId].nguoiTao.transfer(msg.value);
        itemList[_itemId].chuSoHuu = payable(msg.sender);
        itemList[_itemId].isSold = true;
        _soItemDaBan.increment();
    }

    function getMyItem() public view returns(Item[] memory){
        uint tongItem = _tongItem.current();
        uint dem = 0;
        uint j = 0;
        for(uint i = 1; i <= tongItem; i++){
            if(itemList[i].chuSoHuu == payable(msg.sender) && itemList[i].isSold == true ){
                dem++;
            }
        }
        Item[] memory items = new Item[](dem);
        for(uint i = 1; i <= tongItem; i++){
            if(itemList[i].chuSoHuu == payable(msg.sender) && itemList[i].isSold == true ){
                Item storage currentItem = itemList[i];
                items[j] = currentItem;
                j++;
            }
        }
        return items;
    }
}
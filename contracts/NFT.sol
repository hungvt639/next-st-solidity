// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage{
    event abc(uint id);
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address _marketAddr;

    constructor(address marketAddress) ERC721("Metaverse Tokens", "METT") {
        _marketAddr = marketAddress;
    }

    function createToken(string memory idURL) public returns(uint){
        console.log(idURL);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, idURL);
        setApprovalForAll(_marketAddr, true);
        emit abc(newItemId);
        return newItemId;
    }
}
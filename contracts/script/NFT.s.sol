// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/NFT.sol";

contract NFTScript is Script {
    function setup() public {}

    function run() public {
        vm.startBroadcast();

        NFT nftContract = new NFT("myFirstNFT", "NFT", "https://example.com");

        vm.stopBroadcast();
    }
}

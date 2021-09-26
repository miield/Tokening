// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GenerateToken is ERC20 {
    constructor(address _owner, string memory name, string memory symbol, uint256 totalSupply) ERC20(name, symbol) {
       _mint(_owner, totalSupply); 
    }

}
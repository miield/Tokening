// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract TokenFactory {
    
    address internal owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    GenerateToken internal userToken;
    
    // template for each token created
    struct Token {
        address tokenAddress;
        string tokenName;
        string tokenSymbol;
        uint tokenTotalSupply;
        bool isExist;
    }
    
    mapping(address => Token) internal tokenDetails;
    
    event TokenCreated(address walletAddress, string name, string symbol, uint amount);
    event TokenNewName(string newName);
    
    Token[] internal allTokens;
    
    modifier onlyAdmin() {
        require(msg.sender == owner, "You're not the owner");
        _;
    }
    
    function createToken(address walletAddress, string memory name, string memory symbol, uint totalSupply) public returns(Token memory) {
        require(walletAddress == msg.sender, "Enter your current address");
        require(tokenDetails[walletAddress].isExist == false, "You're not allowed");
        require(walletAddress != address(0), "Invalid address");
        userToken = new GenerateToken(msg.sender, name, symbol, totalSupply);
        Token storage newToken = tokenDetails[walletAddress];
        newToken.tokenAddress = walletAddress;
        newToken.tokenName = name;
        newToken.tokenSymbol = symbol;
        newToken.tokenTotalSupply = totalSupply;
        newToken.isExist = true;
        allTokens.push(newToken);
        emit TokenCreated(walletAddress,name, symbol, totalSupply);
        return newToken;
    }
    
    function viewToken() public view returns(Token memory) {
        require(tokenDetails[msg.sender].isExist == true, "You need to create a token first");
        require(msg.sender != address(0), "Invalid address");
        return tokenDetails[msg.sender];
    }
    
    function viewAllToken() public view onlyAdmin returns(Token[] memory) {
        return allTokens;
    }
    
}

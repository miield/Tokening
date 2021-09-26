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
    Token public createdT = tokenDetails[msg.sender];

    event TokenCreated(address walletAddress, string name, string symbol, uint amount, bool isExist);
    event ViewCreatedToken(Token);
    
    Token[] internal allTokens;
    
    modifier onlyAdmin() {
        require(msg.sender == owner, "You're not the owner");
        _;
    }
    
    function createToken(
        // address walletAddress, 
        string memory name, 
        string memory symbol, 
        uint totalSupply
        ) public returns(Token memory) {
        // require(walletAddress == msg.sender, "Enter your current address");
        require(tokenDetails[msg.sender].isExist == false, "You're not allowed");
        require(msg.sender != address(0), "Invalid address");
        userToken = new GenerateToken(msg.sender, name, symbol, totalSupply);
        Token storage newToken = tokenDetails[msg.sender];
        newToken.tokenAddress = msg.sender;
        newToken.tokenName = name;
        newToken.tokenSymbol = symbol;
        newToken.tokenTotalSupply = totalSupply;
        newToken.isExist = true;
        allTokens.push(newToken);
        emit TokenCreated(msg.sender, name, symbol, totalSupply, true);
        return newToken;
    }
    
    function viewToken() public view returns(Token memory) {
        require(tokenDetails[msg.sender].isExist == true, "You need to create a token first");
        require(msg.sender != address(0), "Invalid address");
        // emit ViewCreatedToken(tokenDetails[msg.sender]);
        return tokenDetails[msg.sender];
    }
    
    function viewAllToken() public view onlyAdmin returns(Token[] memory) {
        return allTokens;
    }
    
}

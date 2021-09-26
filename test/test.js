const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const asserttruffle = require("truffle-assertions");
require('chai').use(require('chai-as-promised')).should()

describe("Test TokenFactory variables", async function() {
  let TokenFactory, tokenFactory, signer1, signer2, signer3, obj;
  before(async function() {
     // Deploy the contract
     TokenFactory = await ethers.getContractFactory("TokenFactory");
     tokenFactory = await TokenFactory.deploy();
     const signers = await ethers.getSigners();
     signer1 = signers[0];
     signer2 = signers[1];
     signer3 = signers[2];

    obj = {
      tokenAddress: signer2.address,
      tokenName: "Dassy",
      tokenSymbol: "DKT",
      tokenTotalSupply: 10000,
      isExist:true
    }

    const tokens = [
      {
        tokenAddress: signer2.address,
        tokenName: "Efunroye",
        tokenSymbol: "ETK",
        tokenTotalSupply: 55000,
        isExist:true
      },
      {
        tokenAddress: signer3.address,
        tokenName: "Abiola",
        tokenSymbol: "ATN",
        tokenTotalSupply: 2500000,
        isExist:true
      }
    ];
  });

  it("Should return a token created", async function () {
    const cToken = await tokenFactory.connect(signer2).createToken(obj.tokenAddress, obj.tokenName, obj.tokenSymbol, obj.tokenTotalSupply);
    const newT = await tokenFactory.connect(signer2).viewToken();
    assert.equal(newT.tokenAddress, signer2.address, 'tokenAddress is correct')
    assert.equal(newT.tokenName, 'Dassy', 'tokenName is correct')
    assert.equal(newT.tokenSymbol, 'DKT', 'tokenSymbol is correct')
    assert.equal(newT.tokenTotalSupply, 10000, 'tokenTotalSupply is correct')
    assert.equal(newT.isExist, true, 'isExist is correct')
  });

  it("Should return all tokens", async function () {
    const vToken = await tokenFactory.connect(signer1).viewAllToken();
    // console.log(vToken);
    assert.equal(vToken.tokenName, 'Dassy', 'tokenName is correct');
    expect(vToken.map(tokens=>({title}))).to.include({title:"Blah"});
    // vToken.forEach(item => {
    //   assert.equal(item.tokenAddress, signer2.address)
    //   assert.equal(item.tokenName, 'Dassy')
    //   assert.equal(item.tokenSymbol, 'DKT')
    //   assert.equal(item.tokenTotalSupply, 10000)
    //   assert.equal(item.isExist, true)
    // });
  });

  it("Should revert for invalid address", async function () {
   await tokenFactory.connect(signer3).viewToken().should.be.rejected;
   await tokenFactory.connect(signer2).viewAllToken().should.be.rejected;
  });
});
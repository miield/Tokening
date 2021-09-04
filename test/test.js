const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test TokenFactory variables", async function() {
  let TokenFactory, tokenFactory, signer1, obj;
  before(async function() {
    // Deploy the contract
    TokenFactory = await ethers.getContractFactory("TokenFactory");
    tokenFactory = await TokenFactory.deploy();
    const signers = await ethers.getSigners();
    signer1 = signers[1];
    // deployedFactory = await tokenFactory.deployed();
  });


  it("Should return a token created", async function () {
    obj = {
      tokenAddress: signer1.address,
      tokenName: "Dassy",
      tokenSymbol: "DKT",
      tokenTotalSupply: 10000,
      isExist:true
    }

    const cToken = await tokenFactory.connect(signer1).createToken(signer1.address, "Dassy", "DKT", 10000);
    //const newT = await tokenFactory.connect(signer1).viewToken();
    //console.log(cToken);
    expect(await tokenFactory.connect(signer1).viewToken()).to.equal(obj);
  });



  // it("Should return the correct balance", async function () {
  //   const signers = await ethers.getSigners();
  //   const deployerAdd = signers[0].address;
  //   expect(await token.balanceOf(deployerAdd)).to.equal("100000000");
  // });
});
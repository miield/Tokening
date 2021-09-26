const hre = require("hardhat");

async function main() {
  // deploy the contract
  const TokenFactory = await hre.ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();

  // await tokenFactory.deployed(); // normal
  const deployedContract = await tokenFactory.deployed();

  console.log("tokenFactory deployed to:", deployedContract.address);

  // get the signers and get a signer
  const signers = await ethers.getSigners();
  let signer = signers[0];
  console.log(signer.address, "original");

  // create new token and emit the event
  const tkn = await deployedContract.connect(signer).createToken("Oyindamola", "OYT", 250000);
  //const tokening = await tkn.wait();
  //console.log(tokening.events[1].args.toString());  

  // view token details by the token owner and emit the event
  // const vToken = await deployedContract.connect(signer).viewToken();
  //const viewTk = await vToken.wait();
  //console.log(viewTk.events[0].args.toString());

  // view all tokens created by onlyOwner
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

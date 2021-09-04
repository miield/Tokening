// importing ABIcode from the artifacts ../artifacts/contracts/ERC20Factory.sol/TokenFactory.json
import {byteCode} from './abi.js'
console.log('ABI', byteCode)


// connecting to rinkeby testnet
let provider = ethers.getDefaultProvider('rinkeby'); 

// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
// const signer = provider.getSigner()

// Look up the current block number
provider.getBlockNumber().then(data => console.log(data))
//console.log(provide);

// testing address balance
let address = "0x48Fb2333a75a6C2B7Ca06C052b5e9E77d4D9D806";
provider.getBalance(address).then((balance) => {
    // balance is a BigNumber (in wei); format is as a sting (in ether)
    let etherString = ethers.utils.formatEther(balance);
    console.log("Balance: " + etherString);
});



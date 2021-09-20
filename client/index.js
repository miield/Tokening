
const createTokenBtn = document.getElementById('create-token')
let abiCode  = '../artifacts/contracts/ERC20Factory.sol/TokenFactory.json'
// import {byteCode} from '../client/abi.js'
// console.log('ABI', byteCode)

let  _contract, _abiCode, _contractAddress, _provider;



// connecting to rinkeby testnet
//let provider = ethers.getDefaultProvider('rinkeby'); 

// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
// const signer = provider.getSigner()

// Look up the current block number
// provider.getBlockNumber().then(data => console.log(data))
//console.log(provide);

// testing address balance from the tetnet
// let address = "0x48Fb2333a75a6C2B7Ca06C052b5e9E77d4D9D806";
// provider.getBalance(address).then((balance) => {
//     // balance is a BigNumber (in wei); format is as a sting (in ether)
//     let etherString = ethers.utils.formatEther(balance);
//     console.log("Balance: " + etherString);
// //});

//token factory url
let tokenFactory = '../artifacts/contracts/ERC20Factory.sol/TokenFactory.json'

//const {ethers:etherst} = ethers
//console.log(etherst.etherst) 

//fetch token token factory  abi plus other needed details
async function fetchTokenFactory (){
 await window.ethereum.request({method:'eth_requestAccounts'})
   let result =  await fetch(tokenFactory);
   let data = await result.json()
   _abiCode = data.abi;
   
}


//console.log('etheressss', ethers)

//fetchTokenFactory();



const requestAccount = async ()=> {
  await window.ethereum.request({method:'eth_requestAccounts'})
}
const createToken  = async ()=>{
  if(typeof window.ethereum !=='undefined'){
    await requestAccount()
    _provider = new ethers.providers.Web3Provider(window.ethereum)
    //console.log(_provider, 'provider')
    //get all signers
    const signer = _provider.getSigner()
 //   console.log('signerrr obj', signer)
 // console.log(_abiCode)
  //this allows us to instantiate our contract so as to get access to the methods/function in our contract
  let contract =  await new ethers.Contract(
      '0xfD8b7D36144be2DBc1eebB41e9be21c19c70032b', //contract address
      _abiCode.abi, //abi code 
      signer//signer object
  )
console.log(contract)

 let res =  await contract.createToken('Test', 'TST', 100)
 console.log('ress', res)

  }
}
async function connect (){
  await getAbiCode()
  
    console.log(_abiCode.abi, 'abi cod')
    //get provider object 
   

}


//window.addEventListener('load', async function (){await connect()})

const connectWallet = ()=>{

}
const getAbiCode =async()=>{
  let res =  await fetch(abiCode)
let myAbi = res.json()
_abiCode = await myAbi

}
window.onload = async function() {
connect()

};


//Event Liseteniers

createTokenBtn.addEventListener('click', createToken)



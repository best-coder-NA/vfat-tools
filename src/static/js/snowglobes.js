/*!
* YieldFarming
* Boilerplate for a Static website using EJS and SASS
* https://yieldfarming.info
* @author Jongseung Lim -- https://yieldfarming.info
* Copyright 2021. MIT Licensed.
*/
$(function () {
  consoleInit();
  start(main);
});

function pairmatch(p, t0, t1) {
  return ( p.token0.symbol.toLowerCase() == t0.toLowerCase() || p.token1.symbol.toLowerCase() == t0.toLowerCase() ) && 
         ( p.token0.symbol.toLowerCase() == t1.toLowerCase() || p.token1.symbol.toLowerCase() == t1.toLowerCase() )
}

async function main() {

  const App = await init_ethers();

  //ABIs
  const SNOWGLOBE_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_token", "internalType": "address" }, { "type": "address", "name": "_governance", "internalType": "address" }, { "type": "address", "name": "_timelock", "internalType": "address" }, { "type": "address", "name": "_controller", "internalType": "address" }] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "available", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "controller", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "decreaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "subtractedValue", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "uint256", "name": "_amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "depositAll", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "earn", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getRatio", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "governance", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "harvest", "inputs": [{ "type": "address", "name": "reserve", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "increaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "addedValue", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "max", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "min", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setController", "inputs": [{ "type": "address", "name": "_controller", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setGovernance", "inputs": [{ "type": "address", "name": "_governance", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setMin", "inputs": [{ "type": "uint256", "name": "_min", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setTimelock", "inputs": [{ "type": "address", "name": "_timelock", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "timelock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract IERC20" }], "name": "token", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "sender", "internalType": "address" }, { "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "_shares", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdrawAll", "inputs": [] }]
  const ICEQUEEN_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_snowball", "internalType": "contract Snowball" }, { "type": "address", "name": "_devfund", "internalType": "address" }, { "type": "address", "name": "_treasury", "internalType": "address" }, { "type": "uint256", "name": "_snowballPerBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_startBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_bonusEndBlock", "internalType": "uint256" }] }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "EmergencyWithdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "type": "address", "name": "previousOwner", "internalType": "address", "indexed": true }, { "type": "address", "name": "newOwner", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Recovered", "inputs": [{ "type": "address", "name": "token", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "BONUS_MULTIPLIER", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "add", "inputs": [{ "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "address", "name": "_lpToken", "internalType": "contract IERC20" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "bonusEndBlock", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "devFundDivRate", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "devfund", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "emergencyWithdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getMultiplier", "inputs": [{ "type": "uint256", "name": "_from", "internalType": "uint256" }, { "type": "uint256", "name": "_to", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "massUpdatePools", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "pendingSnowball", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "address", "name": "_user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "lpToken", "internalType": "contract IERC20" }, { "type": "uint256", "name": "allocPoint", "internalType": "uint256" }, { "type": "uint256", "name": "lastRewardBlock", "internalType": "uint256" }, { "type": "uint256", "name": "accSnowballPerShare", "internalType": "uint256" }], "name": "poolInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "poolLength", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "renounceOwnership", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "set", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setBonusEndBlock", "inputs": [{ "type": "uint256", "name": "_bonusEndBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setDevFundDivRate", "inputs": [{ "type": "uint256", "name": "_devFundDivRate", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setSnowballPerBlock", "inputs": [{ "type": "uint256", "name": "_snowballPerBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setTreasuryDivRate", "inputs": [{ "type": "uint256", "name": "_treasuryDivRate", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract Snowball" }], "name": "snowball", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "snowballPerBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "startBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalAllocPoint", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "transferOwnership", "inputs": [{ "type": "address", "name": "newOwner", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "treasury", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "treasuryDivRate", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateDevfund", "inputs": [{ "type": "address", "name": "_devfund", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updatePool", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateTreasury", "inputs": [{ "type": "address", "name": "_treasury", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }, { "type": "uint256", "name": "rewardDebt", "internalType": "uint256" }], "name": "userInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }]
  const PGL_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "payable": false, "inputs": [] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Burn", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Mint", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Swap", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0In", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1In", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount0Out", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1Out", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Sync", "inputs": [{ "type": "uint112", "name": "reserve0", "internalType": "uint112", "indexed": false }, { "type": "uint112", "name": "reserve1", "internalType": "uint112", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DOMAIN_SEPARATOR", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "MINIMUM_LIQUIDITY", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "PERMIT_TYPEHASH", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "amount0", "internalType": "uint256" }, { "type": "uint256", "name": "amount1", "internalType": "uint256" }], "name": "burn", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "factory", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint112", "name": "_reserve0", "internalType": "uint112" }, { "type": "uint112", "name": "_reserve1", "internalType": "uint112" }, { "type": "uint32", "name": "_blockTimestampLast", "internalType": "uint32" }], "name": "getReserves", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "initialize", "inputs": [{ "type": "address", "name": "_token0", "internalType": "address" }, { "type": "address", "name": "_token1", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "kLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "liquidity", "internalType": "uint256" }], "name": "mint", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "nonces", "inputs": [{ "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "permit", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price0CumulativeLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price1CumulativeLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "skim", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "swap", "inputs": [{ "type": "uint256", "name": "amount0Out", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Out", "internalType": "uint256" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "bytes", "name": "data", "internalType": "bytes" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "sync", "inputs": [], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "token0", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "token1", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "from", "internalType": "address" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }]
  const PNG_STAKING_ABI = [{ "inputs": [{ "internalType": "address", "name": "_rewardsToken", "type": "address" }, { "internalType": "address", "name": "_stakingToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Recovered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newDuration", "type": "uint256" }], "name": "RewardsDurationUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "earned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "exit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getRewardForDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastTimeRewardApplicable", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastUpdateTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "notifyRewardAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "periodFinish", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "recoverERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rewardPerToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardPerTokenStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "rewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_rewardsDuration", "type": "uint256" }], "name": "setRewardsDuration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "stakeWithPermit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stakingToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userRewardPerTokenPaid", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

  //contracts
  const SNOWGLOBE_SUSHI_ADDR = "0x751089F1bf31B13Fa0F0537ae78108088a2253BF";
  const SNOWGLOBE_PNG_ADDR = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
  const SNOWGLOBE_ETH_ADDR = "0x586554828eE99811A8ef75029351179949762c26";
  const SNOWGLOBE_LINK_ADDR = "0x00933c16e06b1d15958317C2793BC54394Ae356C";
  const SNOWGLOBE_USDT_ADDR = "0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605";
  const ICEQUEEN_ADDR = "0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375";
  const SNOWGLOBE_WBTC_ADDR = "0x39BE35904f52E83137881C0AC71501Edf0180181";

  //pangolin pairs
  const SUSHI_AVAX_ADDR = "0xd8B262C0676E13100B33590F10564b46eeF652AD";
  const SNOB_AVAX_ADDR = "0xa1c2c3b6b120cbd4cec7d2371ffd4a931a134a32";
  const PNG_AVAX_ADDR = "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367";
  const ETH_AVAX_ADDR = "0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65";
  const LINK_AVAX_ADDR = "0xbbc7fff833d27264aac8806389e02f717a5506c9";
  const USDT_AVAX_ADDR = "0x9EE0a4E21bd333a6bb2ab298194320b8DaA26516";
  const WBTC_AVAX_ADDR = "0x7a6131110b82dacbb5872c7d352bfe071ea6a17c";

  //tokens
  const SPGL_SUSHI_ADDRESS = "0x751089f1bf31b13fa0f0537ae78108088a2253bf";
  const SPGL_PNG_ADDRESS = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
  const SPGL_ETH_ADDRESS = "0x586554828eE99811A8ef75029351179949762c26";
  const SPGL_LINK_ADDRESS = "0x00933c16e06b1d15958317C2793BC54394Ae356C";
  const SPGL_USDT_ADDRESS = "0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605";
  const SPGL_WBTC_ADDRESS = "0x39BE35904f52E83137881C0AC71501Edf0180181";
  const SNOB_ADDRESS = "0xC38f41A296A4493Ff429F1238e030924A1542e50";

  //LP URLs
  const SUSHI_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc";
  const SNOB_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xC38f41A296A4493Ff429F1238e030924A1542e50";
  const PNG_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x60781c2586d68229fde47564546784ab3faca982";
  const ETH_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15";
  const LINK_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/avax/0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651";
  const USDT_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/avax/0xde3a24028580884448a5397872046a019649b084";
  const WBTC_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/avax/0x408d4cd0adb7cebd1f1a1c33a0ba2098e1295bab";

  // TVL URLS
  const SUSHI_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x14ec55f8B4642111A5aF4f5ddc56B7bE867eB6cC"
  const SNOB_AVAX_TVL = "https://info.pangolin.exchange/#/account/0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375"
  const PNG_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x6A803904b9eA0Fc982fBB077c7243c244Ae05a2d"
  const ETH_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x953853590b805A0E885A75A3C786D2aFfcEEA3Cf"
  const LINK_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x974Ef0bDA58C81F3094e124f530eF34fe70dc103"
  const USDT_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x74dB28797957a52a28963F424dAF2B10226ba04C"
  const WBTC_AVAX_TVL = "https://info.pangolin.exchange/#/account/0xA362A10Ba6b59eE113FAa00e41E01C0087dd9BA1"

  // Compounds Per Day
  const DAILY_COMPOUNDS = 6

  const approveSUSHI = async function () {
    return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_SUSHI_ADDR, SUSHI_AVAX_ADDR, App)
  }
  const stakeSUSHI = async function () {
    return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_SUSHI_ADDR, 1, SUSHI_AVAX_ADDR, App)
  }
  const withdrawSUSHI = async function () {
    return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_SUSHI_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
  }
  const approvePNG = async function () {
    return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_PNG_ADDR, PNG_AVAX_ADDR, App)
  }
  const stakePNG = async function () {
    return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_PNG_ADDR, 1, PNG_AVAX_ADDR, App)
  }
  const withdrawPNG = async function () {
    return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_PNG_ADDR, 1, SPGL_PNG_ADDRESS, App)
  }
  const approveETH = async function () {
    return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_ETH_ADDR, ETH_AVAX_ADDR, App)
  }
  const stakeETH = async function () {
    return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_ETH_ADDR, 1, ETH_AVAX_ADDR, App)
  }
  const withdrawETH = async function () {
    return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_ETH_ADDR, 1, SPGL_ETH_ADDRESS, App)
  }
  const approveLINK = async function () {
    return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_LINK_ADDR, LINK_AVAX_ADDR, App)
  }
  const stakeLINK = async function () {
    return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_LINK_ADDR, 1, LINK_AVAX_ADDR, App)
  }
  const withdrawLINK = async function () {
    return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_LINK_ADDR, 1, SPGL_LINK_ADDRESS, App)
  }
  const approveUSDT = async function() {
    return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_USDT_ADDR, USDT_AVAX_ADDR, App)
  }
  const stakeUSDT= async function() {
    return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_USDT_ADDR, 1, USDT_AVAX_ADDR, App)
  }
  const withdrawUSDT = async function() {
    return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_USDT_ADDR, 1, SPGL_USDT_ADDRESS, App)
  }
  const approveWBTC = async function() {
    return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_WBTC_ADDR, WBTC_AVAX_ADDR, App)
  }
  const stakeWBTC= async function() {
    return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_WBTC_ADDR, 1, WBTC_AVAX_ADDR, App)
  }
  const withdrawWBTC = async function() {
    return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_WBTC_ADDR, 1, SPGL_WBTC_ADDRESS, App)
  }
  const signer = App.provider.getSigner()

  //Tokens
  const SUSHI_AVAX_TOKEN = new ethers.Contract(SUSHI_AVAX_ADDR, ERC20_ABI, signer)
  const PNG_AVAX_TOKEN = new ethers.Contract(PNG_AVAX_ADDR, ERC20_ABI, signer)
  const ETH_AVAX_TOKEN = new ethers.Contract(ETH_AVAX_ADDR, ERC20_ABI, signer)
  const SNOB_AVAX_TOKEN = new ethers.Contract(SNOB_AVAX_ADDR, ERC20_ABI, signer)
  const LINK_AVAX_TOKEN = new ethers.Contract(LINK_AVAX_ADDR, ERC20_ABI, signer)
  const USDT_AVAX_TOKEN = new ethers.Contract(USDT_AVAX_ADDR, ERC20_ABI, signer)
  const WBTC_AVAX_TOKEN = new ethers.Contract(WBTC_AVAX_ADDR, ERC20_ABI, signer)

  const SPGL_SUSHI_TOKEN = new ethers.Contract(SPGL_SUSHI_ADDRESS, ERC20_ABI, signer)
  const SPGL_PNG_TOKEN = new ethers.Contract(SPGL_PNG_ADDRESS, ERC20_ABI, signer)
  const SPGL_ETH_TOKEN = new ethers.Contract(SPGL_ETH_ADDRESS, ERC20_ABI, signer)
  const SPGL_LINK_TOKEN = new ethers.Contract(SPGL_LINK_ADDRESS, ERC20_ABI, signer)
  const SPGL_USDT_TOKEN = new ethers.Contract(SPGL_USDT_ADDRESS, ERC20_ABI, signer)
  const SPGL_WBTC_TOKEN = new ethers.Contract(SPGL_WBTC_ADDRESS, ERC20_ABI, signer)

  const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)

  //Contracts
  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)

  // wallet info
  const snobTotalSupply = await SNOB_TOKEN.totalSupply()
  const pendingSNOBTokensPool1 = await ICEQUEEN_CONTRACT.pendingSnowball(1, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool2 = await ICEQUEEN_CONTRACT.pendingSnowball(2, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool3 = await ICEQUEEN_CONTRACT.pendingSnowball(3, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool4 = await ICEQUEEN_CONTRACT.pendingSnowball(4, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool5 = await ICEQUEEN_CONTRACT.pendingSnowball(5, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool6 = await ICEQUEEN_CONTRACT.pendingSnowball(6, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool7 = await ICEQUEEN_CONTRACT.pendingSnowball(7, App.YOUR_ADDRESS)
  const claimableSnowballs = pendingSNOBTokensPool1 / 1e18 + pendingSNOBTokensPool2 / 1e18 + pendingSNOBTokensPool3 / 1e18 + pendingSNOBTokensPool4 / 1e18 + pendingSNOBTokensPool5 / 1e18 + pendingSNOBTokensPool6 / 1e18 + pendingSNOBTokensPool7 / 1e18;
  const currentSNOBTokens = await SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const snowballMultiplier = await ICEQUEEN_CONTRACT.BONUS_MULTIPLIER()
  const blockRate = await ICEQUEEN_CONTRACT.snowballPerBlock()
  const snowballsPerBlock = blockRate
  const blockNumber = await App.provider.getBlockNumber();
  const currentBlock = await App.provider.getBlock(blockNumber);
  const yesterdayBlock = await App.provider.getBlock(blockNumber - 15000);
  const secondsInDay = 86400;
  const blocks24hrs = (secondsInDay / (currentBlock.timestamp - yesterdayBlock.timestamp)) * 15000;

  const prices = await getAvaxPrices();
  const snobPrice = prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'] ? prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'].usd : 0;
  const marketCapDisplay = `$${new Intl.NumberFormat('en-US').format(snobTotalSupply / 1e18 * snobPrice)}`
  $('#value-market').append(`$${snobPrice.toFixed(3)}`)
  $('#value-marketcap').append(`${marketCapDisplay}`)
  $('#snob-supply').append(`${(snobTotalSupply / 1e18).toLocaleString()}`)
  $('#snob-supply-max').append(`18,000,000`)
  $('#snob-per-block').append(`${snowballsPerBlock / 1e18}`)
  $('#snob-block-pday').append(`${(snowballsPerBlock / 1e18 * 15000).toLocaleString()}`)
  $('#blocks-24-hrs').append(`~${Math.round(blocks24hrs).toLocaleString()}`)

  document.getElementById('wallet-copy').addEventListener('click', ()=>{
    navigator.clipboard.writeText(`${App.YOUR_ADDRESS}`).then(function() {
      console.log('Snowball Platform: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Snowball Platform: Could not copy text: ', err);
    });
  });





  let walletAddres = `${App.YOUR_ADDRESS}`;
  $('#wallet-address').html(`${walletAddres}`);

  if (currentSNOBTokens / 1e18 > 0 || claimableSnowballs > 0) {
    $('#account-info').show();
    $('#snob-info').show();
    $('#value-snob').append(`${(currentSNOBTokens / 1e18 + claimableSnowballs).toFixed(4)}`);
    $('#value-usd').append(`${((currentSNOBTokens / 1e18 + claimableSnowballs) * snobPrice).toFixed(2)}`);
    $('#wallet').append(`${(currentSNOBTokens / 1e18).toFixed(4)}`);
    if (claimableSnowballs > 0) {
      $('#pending').append(`<ion-icon name="time-outline"></ion-icon> Pending: ${(claimableSnowballs).toFixed(4)}`);
    }else{
      $('#pending').append(`<ion-icon name="checkmark-circle" class="text-success"></ion-icon> No pending rewards`);
    }

  }


  const currentSUSHIAVAXTokens = await SUSHI_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLSUSHITokens = await SPGL_SUSHI_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglSushiDisplayAmt = currentSPGLSUSHITokens > 1000 ? (currentSPGLSUSHITokens / 1e18).toFixed(4) : 0;

  const currentPNGAVAXTokens = await PNG_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLPNGTokens = await SPGL_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglPngDisplayAmt = currentSPGLPNGTokens > 1000 ? (currentSPGLPNGTokens / 1e18).toFixed(4) : 0;

  const currentETHAVAXTokens = await ETH_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLETHTokens = await SPGL_ETH_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglEthDisplayAmt = currentSPGLETHTokens > 1000 ? (currentSPGLETHTokens / 1e18).toFixed(4) : 0;

  const currentLINKAVAXTokens = await LINK_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLLINKTokens = await SPGL_LINK_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglLinkDisplayAmt = currentSPGLLINKTokens > 1000 ? (currentSPGLLINKTokens / 1e18).toFixed(4) : 0;

  const currentSNOBAVAXTokens = await SNOB_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const snobAvaxDisplayAmt = currentSNOBAVAXTokens > 1000 ? (currentSNOBAVAXTokens / 1e18).toFixed(4) : 0;

  const currentUSDTAVAXTokens = await USDT_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLUSDTTokens = await SPGL_USDT_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglUsdtDisplayAmt = currentSPGLUSDTTokens > 1000 ? (currentSPGLUSDTTokens / 1e18).toFixed(8) : 0;

  const currentWBTCAVAXTokens = await WBTC_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLWBTCTokens = await SPGL_WBTC_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglWbtcDisplayAmt = currentSPGLWBTCTokens > 1000 ? (currentSPGLWBTCTokens / 1e18).toFixed(8) : 0;

  //snowglobes
  /*  //_print(`<b style="font-size: 20px;"">Snowglobes 🌐</b>`)
   //_print(`Deposit LP tokens into Snowglobes for automatic compounding. Save on gas costs!`)
   //_print(`Harvest log available in the <a href="https://discord.com/channels/812557591917887508/818943563759878196" target="_blank">#harvests</a> channel in Discord\n`) */
  /* $('#title').append(`Snowglobes 🌐`);
  $('#msg1').append(`Deposit LP tokens into Snowglobes for automatic compounding. Save on gas costs!`);
  $('#msg2').append(`Harvest log available in the <a href="https://discord.com/channels/812557591917887508/818943563759878196" target="_blank">#harvests</a> channel in Discord`);
 */
  let res = null;
  let usdt_tvl = null;
  let link_tvl = null;
  let usdt_tvl_display = '';
  let link_tvl_display = '';
  let wbtc_tvl_display = '';
  try {
    res = await $.ajax({
      url: 'https://x-api.snowball.network/dex/0xc38f41a296a4493ff429f1238e030924a1542e50/tvl.json',
      type: 'GET',
    })
    if (res && res.pairs) {
      if (res && res.pairs) {
        res.pairs.forEach( p => {
          if ( pairmatch(p, 'usdt', 'wavax') ) {
            usdt_tvl = p.locked;
            usdt_tvl_display = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          } else if ( pairmatch(p, 'link', 'wavax') ) {
            link_tvl = p.locked;
            link_tvl_display = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          } else if ( pairmatch(p, 'sushi', 'wavax') ) {
            sushi_tvl = p.locked;
            sushi_tvl_display = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          } else if ( pairmatch(p, 'png', 'wavax') ) {
            png_tvl = p.locked;
            png_tvl_display = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          } else if ( pairmatch(p, 'eth', 'wavax') ) {
            eth_tvl = p.locked;
            eth_tvl_display = `$${new Intl.NumberFormat('en-US').format(p.locked)}`        
          } else if ( pairmatch(p, 'wbtc', 'wavax') ) {
            wbtc_tvl = p.locked;
            wbtc_tvl_display = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          }
        });
      }
    }
  }
  catch(e) {
    console.log('could not get tvl');
  }
  // APR
  const PngStakingContracts = [
    {
      stakingRewardAddress: '0xa16381eae6285123c323a665d4d99a6bcfaac307'
    },
    {
      stakingRewardAddress: '0x8fd2755c6ae7252753361991bdcd6ff55bdc01ce'
    },
    {
      stakingRewardAddress: '0x88f26b81c9cae4ea168e31bc6353f493fda29661'
    },
    {
      stakingRewardAddress: '0x7d7ecd4d370384b17dfc1b4155a8410e97841b65'
    },
    {
      stakingRewardAddress: '0x4f019452f51bba0250ec8b69d64282b79fc8bd9f'
    },
    {
      stakingRewardAddress: '0x01897e996eefff65ae9999c02d1d8d7e9e0c0352'
    }
  ]

  const tokens = {};

  const pools = PngStakingContracts.map(c => {
    return {
      address: c.stakingRewardAddress,
      abi: PNG_STAKING_ABI,
      stakeTokenFunction: "stakingToken",
      rewardTokenFunction: "rewardsToken"
    }
  })

  let apr_array = await loadMultipleSnowglobePools(App, tokens, prices, pools)
  const eth_apr = apr_array[0]
  const png_apr = apr_array[1]
  const sushi_apr = apr_array[2]
  const link_apr = apr_array[3]
  const usdt_apr = apr_array[4]
  const wbtc_apr = apr_array[5]

  // APY = P(1 + r/n)nt
  let compounds_per_year = DAILY_COMPOUNDS * 365
  let eth_r = eth_apr.yearlyAPR / 100
  let eth_annual_apy = 100 * (1 + eth_r / compounds_per_year) ** compounds_per_year
  let png_r = png_apr.yearlyAPR / 100
  let png_annual_apy = 100 * (1 + png_r / compounds_per_year) ** compounds_per_year
  let sushi_r = sushi_apr.yearlyAPR / 100
  let sushi_annual_apy = 100 * (1 + sushi_r / compounds_per_year) ** compounds_per_year
  let link_r = link_apr.yearlyAPR / 100
  let link_annual_apy = 100 * (1 + link_r / compounds_per_year) ** compounds_per_year
  let usdt_r = usdt_apr.yearlyAPR/100
  let usdt_annual_apy = 100*(1 + usdt_r/compounds_per_year)**compounds_per_year
  let wbtc_r = wbtc_apr.yearlyAPR/100
  let wbtc_annual_apy = 100*(1 + wbtc_r/compounds_per_year)**compounds_per_year

  //Contracts
  const LINK_CONTRACT = new ethers.Contract(SNOWGLOBE_LINK_ADDR, SNOWGLOBE_ABI, signer)
  const totalDepositedLINKAVAX = await LINK_CONTRACT.totalSupply()
  const userLinkDeposited = await LINK_CONTRACT.balanceOf(App.YOUR_ADDRESS)
  const userLinkPoolPercent = (userLinkDeposited / 1e18) / (totalDepositedLINKAVAX / 1e18) * 100

  const USDT_CONTRACT = new ethers.Contract(SNOWGLOBE_USDT_ADDR, SNOWGLOBE_ABI, signer)
  const totalDepositedUSDTAVAX = await USDT_CONTRACT.totalSupply()
  const userUsdtDeposited = await USDT_CONTRACT.balanceOf(App.YOUR_ADDRESS)
  const userUsdtPoolPercent = (userUsdtDeposited / 1e18)/(totalDepositedUSDTAVAX / 1e18)*100

  const WBTC_CONTRACT = new ethers.Contract(SNOWGLOBE_WBTC_ADDR, SNOWGLOBE_ABI, signer)
  const totalDepositedWBTCAVAX = await WBTC_CONTRACT.totalSupply()
  const userWbtcDeposited = await WBTC_CONTRACT.balanceOf(App.YOUR_ADDRESS)
  const userWbtcPoolPercent = (userWbtcDeposited / 1e18)/(totalDepositedWBTCAVAX / 1e18)*100

  const TOKEN_NAMES = {
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": "AVAX",
    "0x60781C2586D68229fde47564546784ab3fACA982": "PNG",
    "0xC38f41A296A4493Ff429F1238e030924A1542e50": "SNOB",
    "0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc": "SUSHI",
    "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15": "ETH",
    "0xde3A24028580884448a5397872046a019649b084": "USDT",
    "0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651": "LINK",
    "0x408d4cd0adb7cebd1f1a1c33a0ba2098e1295bab": "WBTC"
  }

  // PGL & LP values
  const snowglobeContract_usdt = new ethers.Contract(SNOWGLOBE_USDT_ADDR, SNOWGLOBE_ABI, signer);
  let totalPoolPGL_usdt = await snowglobeContract_usdt.balance();
  let poolShareDisplay_usdt = null;
  let stakeDisplay_usdt = null;
  let withdrawDisplay_usdt = null;
  const userSPGL_usdt = userUsdtDeposited / 1e18;
  try {
    if (userSPGL_usdt > 0) {
      let totalSPGL_usdt = await snowglobeContract_usdt.totalSupply();
      let ownedPGL_usdt = userSPGL_usdt * (totalPoolPGL_usdt / 1e18) / (totalSPGL_usdt / 1e18);
      const pglContract_usdt = new ethers.Contract(USDT_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_usdt = await pglContract_usdt.totalSupply();
      totalSupplyPGL_usdt = totalSupplyPGL_usdt / 1e18;
      const reserves_usdt = await pglContract_usdt.getReserves();
      const r0_usdt = reserves_usdt._reserve0 / 1e18
      const r1_usdt = reserves_usdt._reserve1 / 1e6
      let reserve0Owned_usdt = ownedPGL_usdt * (r0_usdt) / (totalSupplyPGL_usdt);
      let reserve1Owned_usdt = ownedPGL_usdt * (r1_usdt) / (totalSupplyPGL_usdt);
      const token0Address_usdt = await pglContract_usdt.token0();
      const token1Address_usdt = await pglContract_usdt.token1();
      const t0Price_usdt = prices[token0Address_usdt] ? prices[token0Address_usdt].usd : 0
      const t1Price_usdt = prices[token1Address_usdt] ? prices[token1Address_usdt].usd : 0
      const token0ValueUSDT_usdt = reserve0Owned_usdt * t0Price_usdt;
      const token1ValueUSDT_usdt = reserve1Owned_usdt * t1Price_usdt;
      const value_usdt = token0ValueUSDT_usdt + (token1ValueUSDT_usdt);
      withdrawDisplay_usdt = `<b>${userSPGL_usdt.toFixed(8)}</b> sPGL (<b>${ownedPGL_usdt.toFixed(8)}</b> PGL)`;
      poolShareDisplay_usdt = `Your pool share is ${withdrawDisplay_usdt} - <b>${userUsdtPoolPercent.toFixed(6)}%</b>`;
      stakeDisplay_usdt = `Your LP value is <b>${reserve0Owned_usdt.toFixed(5)}</b> ${TOKEN_NAMES[token0Address_usdt]} / <b>${reserve1Owned_usdt.toFixed(5)}</b> ${TOKEN_NAMES[token1Address_usdt]} ($<b>${value_usdt.toFixed(2)}</b>)**</b>`
    }
  } catch { console.log('error calculating PGL value')}

  const snowglobeContract_link = new ethers.Contract(SNOWGLOBE_LINK_ADDR, SNOWGLOBE_ABI, signer);
  let totalPoolPGL_link = await snowglobeContract_link.balance();
  let poolShareDisplay_link = null;
  let stakeDisplay_link = null;
  let withdrawDisplay_link = null;
  const userSPGL_link = userLinkDeposited / 1e18;
  try {
    if (userSPGL_link > 0) {
      let totalSPGL_link = await snowglobeContract_link.totalSupply();
      let ownedPGL_link = userSPGL_link * (totalPoolPGL_link / 1e18) / (totalSPGL_link / 1e18);
      const pglContract_link = new ethers.Contract(LINK_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_link = await pglContract_link.totalSupply();
      totalSupplyPGL_link = totalSupplyPGL_link / 1e18;
      const reserves_link = await pglContract_link.getReserves();
      const r0_link = reserves_link._reserve0 / 1e18
      const r1_link = reserves_link._reserve1 / 1e18
      let reserve0Owned_link = ownedPGL_link * (r0_link) / (totalSupplyPGL_link);
      let reserve1Owned_link = ownedPGL_link * (r1_link) / (totalSupplyPGL_link);
      const token0Address_link = await pglContract_link.token0();
      const token1Address_link = await pglContract_link.token1();
      const t0Price_link = prices[token0Address_link] ? prices[token0Address_link].usd : 0
      const t1Price_link = prices[token1Address_link] ? prices[token1Address_link].usd : 0
      const token0ValueUSDT_link = reserve0Owned_link * t0Price_link;
      const token1ValueUSDT_link = reserve1Owned_link * t1Price_link;
      const value_link = token0ValueUSDT_link + (token1ValueUSDT_link);
      withdrawDisplay_link = `<b>${userSPGL_link .toFixed(4)}</b> sPGL (<b>${ownedPGL_link .toFixed(4)}</b> PGL)`;
      poolShareDisplay_link = `Your pool share is ${withdrawDisplay_link} - <b>${userLinkPoolPercent.toFixed(6)}%</b>`;
      stakeDisplay_link = `Your LP value is <b>${reserve0Owned_link .toFixed(3)}</b> ${TOKEN_NAMES[token0Address_link ]} / <b>${reserve1Owned_link .toFixed(3)}</b> ${TOKEN_NAMES[token1Address_link ]} ($<b>${value_link .toFixed(2)}</b>)**</b>`
    }
  } catch { console.log('error calculating PGL value')}


  const snowglobeContract_eth = new ethers.Contract(SNOWGLOBE_ETH_ADDR, SNOWGLOBE_ABI, signer);
  const userEthDeposited = await snowglobeContract_eth.balanceOf(App.YOUR_ADDRESS)
  let totalPoolPGL_eth = await snowglobeContract_eth.balance();
  let poolShareDisplay_eth = null;
  let stakeDisplay_eth = null;
  let withdrawDisplay_eth = null;
  const userSPGL_eth = userEthDeposited / 1e18;
  try {
    if (userSPGL_eth > 0) {
      let totalSPGL_eth = await snowglobeContract_eth.totalSupply();
      let ownedPGL_eth = userSPGL_eth * (totalPoolPGL_eth / 1e18) / (totalSPGL_eth / 1e18);
      const pglContract_eth = new ethers.Contract(ETH_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_eth = await pglContract_eth.totalSupply();
      totalSupplyPGL_eth = totalSupplyPGL_eth / 1e18;
      const reserves_eth = await pglContract_eth.getReserves();
      const r0_eth = reserves_eth._reserve0 / 1e18
      const r1_eth = reserves_eth._reserve1 / 1e18
      let reserve0Owned_eth = ownedPGL_eth * (r0_eth) / (totalSupplyPGL_eth);
      let reserve1Owned_eth = ownedPGL_eth * (r1_eth) / (totalSupplyPGL_eth);
      const token0Address_eth = await pglContract_eth.token0();
      const token1Address_eth = await pglContract_eth.token1();
      const t0Price_eth = prices[token0Address_eth] ? prices[token0Address_eth].usd : 0
      const t1Price_eth = prices[token1Address_eth] ? prices[token1Address_eth].usd : 0
      const token0ValueUSDT_eth = reserve0Owned_eth * t0Price_eth;
      const token1ValueUSDT_eth = reserve1Owned_eth * t1Price_eth;
      const value_eth = token0ValueUSDT_eth + (token1ValueUSDT_eth);
      withdrawDisplay_eth = `<b>${userSPGL_eth .toFixed(4)}</b> sPGL (<b>${ownedPGL_eth .toFixed(4)}</b> PGL)`;
      poolShareDisplay_eth = withdrawDisplay_eth;
      stakeDisplay_eth = `Your LP value is <b>${reserve0Owned_eth .toFixed(3)}</b> ${TOKEN_NAMES[token0Address_eth ]} / <b>${reserve1Owned_eth .toFixed(3)}</b> ${TOKEN_NAMES[token1Address_eth ]} ($<b>${value_eth .toFixed(2)}</b>)**</b>`
    }
  } catch { console.log('error calculating PGL value')}

  const snowglobeContract_png = new ethers.Contract(SNOWGLOBE_PNG_ADDR, SNOWGLOBE_ABI, signer);
  const userPngDeposited = await snowglobeContract_png.balanceOf(App.YOUR_ADDRESS)
  let totalPoolPGL_png = await snowglobeContract_png.balance();
  let poolShareDisplay_png = null;
  let stakeDisplay_png = null;
  let withdrawDisplay_png = null;
  const userSPGL_png = userPngDeposited / 1e18;
  try {
    if (userSPGL_png > 0) {
      let totalSPGL_png = await snowglobeContract_png.totalSupply();
      let ownedPGL_png = userSPGL_png * (totalPoolPGL_png / 1e18) / (totalSPGL_png / 1e18);
      const pglContract_png = new ethers.Contract(PNG_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_png = await pglContract_png.totalSupply();
      totalSupplyPGL_png = totalSupplyPGL_png / 1e18;
      const reserves_png = await pglContract_png.getReserves();
      const r0_png = reserves_png._reserve0 / 1e18
      const r1_png = reserves_png._reserve1 / 1e18
      let reserve0Owned_png = ownedPGL_png * (r0_png) / (totalSupplyPGL_png);
      let reserve1Owned_png = ownedPGL_png * (r1_png) / (totalSupplyPGL_png);
      const token0Address_png = await pglContract_png.token0();
      const token1Address_png = await pglContract_png.token1();
      const t0Price_png = prices[token0Address_png] ? prices[token0Address_png].usd : 0
      const t1Price_png = prices[token1Address_png] ? prices[token1Address_png].usd : 0
      const token0ValueUSDT_png = reserve0Owned_png * t0Price_png;
      const token1ValueUSDT_png = reserve1Owned_png * t1Price_png;
      const value_png = token0ValueUSDT_png + (token1ValueUSDT_png);
      withdrawDisplay_png = `<b>${userSPGL_png .toFixed(4)}</b> sPGL (<b>${ownedPGL_png .toFixed(4)}</b> PGL)`;
      poolShareDisplay_png = withdrawDisplay_png;
      stakeDisplay_png = `Your LP value is <b>${reserve0Owned_png .toFixed(3)}</b> ${TOKEN_NAMES[token0Address_png ]} / <b>${reserve1Owned_png .toFixed(3)}</b> ${TOKEN_NAMES[token1Address_png ]} ($<b>${value_png .toFixed(2)}</b>)**</b>`
    }
  } catch { console.log('error calculating PGL value')}

  const snowglobeContract_sushi = new ethers.Contract(SNOWGLOBE_SUSHI_ADDR, SNOWGLOBE_ABI, signer);
  const userSushiDeposited = await snowglobeContract_sushi.balanceOf(App.YOUR_ADDRESS)
  let totalPoolPGL_sushi = await snowglobeContract_sushi.balance();
  let poolShareDisplay_sushi = null;
  let stakeDisplay_sushi = null;
  let withdrawDisplay_sushi = null;
  const userSPGL_sushi = userSushiDeposited / 1e18;
  try {
    if (userSPGL_sushi > 0) {
      let totalSPGL_sushi = await snowglobeContract_sushi.totalSupply();
      let ownedPGL_sushi = userSPGL_sushi * (totalPoolPGL_sushi / 1e18) / (totalSPGL_sushi / 1e18);
      const pglContract_sushi = new ethers.Contract(SUSHI_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_sushi = await pglContract_sushi.totalSupply();
      totalSupplyPGL_sushi = totalSupplyPGL_sushi / 1e18;
      const reserves_sushi = await pglContract_sushi.getReserves();
      const r0_sushi = reserves_sushi._reserve0 / 1e18
      const r1_sushi = reserves_sushi._reserve1 / 1e18
      let reserve0Owned_sushi = ownedPGL_sushi * (r0_sushi) / (totalSupplyPGL_sushi);
      let reserve1Owned_sushi = ownedPGL_sushi * (r1_sushi) / (totalSupplyPGL_sushi);
      const token0Address_sushi = await pglContract_sushi.token0();
      const token1Address_sushi = await pglContract_sushi.token1();
      const t0Price_sushi = prices[token0Address_sushi] ? prices[token0Address_sushi].usd : 0
      const t1Price_sushi = prices[token1Address_sushi] ? prices[token1Address_sushi].usd : 0
      const token0ValueUSDT_sushi = reserve0Owned_sushi * t0Price_sushi;
      const token1ValueUSDT_sushi = reserve1Owned_sushi * t1Price_sushi;
      const value_sushi = token0ValueUSDT_sushi + (token1ValueUSDT_sushi);
      withdrawDisplay_sushi = `<b>${userSPGL_sushi .toFixed(4)}</b> sPGL (<b>${ownedPGL_sushi .toFixed(4)}</b> PGL)`;
      poolShareDisplay_sushi = withdrawDisplay_sushi;
      stakeDisplay_sushi = `Your LP value is <b>${reserve0Owned_sushi .toFixed(3)}</b> ${TOKEN_NAMES[token0Address_sushi ]} / <b>${reserve1Owned_sushi .toFixed(3)}</b> ${TOKEN_NAMES[token1Address_sushi ]} ($<b>${value_sushi .toFixed(2)}</b>)**</b>`
    }
  } catch { console.log('error calculating PGL value')}

  const snowglobeContract_wbtc = new ethers.Contract(SNOWGLOBE_WBTC_ADDR, SNOWGLOBE_ABI, signer);
  let wbtcDeposited = await snowglobeContract_wbtc.balanceOf(App.YOUR_ADDRESS)
  let totalPoolPGL_wbtc = await snowglobeContract_wbtc.balance();
  let poolShareDisplay_wbtc = null;
  let stakeDisplay_wbtc = null;
  let withdrawDisplay_wbtc = null;
  const userSPGL_wbtc = wbtcDeposited / 1e18;
  try {
    if (userSPGL_wbtc > 0) {
      let totalSPGL_wbtc = await snowglobeContract_wbtc.totalSupply();
      let ownedPGL_wbtc = userSPGL_wbtc * (totalPoolPGL_wbtc / 1e18) / (totalSPGL_wbtc / 1e18);
      const pglContract_wbtc = new ethers.Contract(WBTC_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_wbtc = await pglContract_wbtc.totalSupply();
      totalSupplyPGL_wbtc = totalSupplyPGL_wbtc / 1e18;
      const reserves_wbtc = await pglContract_wbtc.getReserves();
      const r0_wbtc = reserves_wbtc._reserve0 / 1e18
      const r1_wbtc = reserves_wbtc._reserve1 / 1e18
      let reserve0Owned_wbtc = ownedPGL_wbtc * (r0_wbtc) / (totalSupplyPGL_wbtc);
      let reserve1Owned_wbtc = ownedPGL_wbtc * (r1_wbtc) / (totalSupplyPGL_wbtc);
      const token0Address_wbtc = await pglContract_wbtc.token0();
      const token1Address_wbtc = await pglContract_wbtc.token1();
      const t0Price_wbtc = prices[token0Address_wbtc] ? prices[token0Address_wbtc].usd : 0
      const t1Price_wbtc = prices[token1Address_wbtc] ? prices[token1Address_wbtc].usd : 0
      const token0ValueUSDT_wbtc = reserve0Owned_wbtc * t0Price_wbtc;
      const token1ValueUSDT_wbtc = reserve1Owned_wbtc * t1Price_wbtc;
      const value_wbtc = token0ValueUSDT_wbtc + (token1ValueUSDT_wbtc);
      withdrawDisplay_wbtc = `<b>${userSPGL_wbtc .toFixed(8)}</b> sPGL (<b>${ownedPGL_wbtc .toFixed(8)}</b> PGL)`;
      poolShareDisplay_wbtc = withdrawDisplay_wbtc;
      stakeDisplay_wbtc = `Your LP value is <b>${reserve0Owned_wbtc .toFixed(3)}</b> ${TOKEN_NAMES[token0Address_wbtc ]} / <b>${reserve1Owned_wbtc .toFixed(3)}</b> ${TOKEN_NAMES[token1Address_wbtc ]} ($<b>${value_wbtc .toFixed(2)}</b>)**</b>`
    }
  } catch { console.log('error calculating PGL value')}
  
  const layout_pool = function(options) {
    _print(``)
    _print(`<a href='${options.url}' target='_blank'>${options.pool_name}</a>`)
    if ( options.tvl_display ) {
      _print(`TVL: <a href='${options.tvl}' target='_blank'>${options.tvl_display}</a>`)
    }
    _print(`APR - Day: <b>${options.apr.dailyAPR.toFixed(2)}</b>% Week: <b>${options.apr.weeklyAPR.toFixed(2)}</b>% Year: <b>${options.apr.yearlyAPR.toFixed(2)}</b>%`);
    _print(`APY (compounding): <b>${options.apy.toFixed(2)}</b>%`);

    if ( !isNaN(options.total_deposited) ) {
      _print(`Pool Size: <b>${(options.total_deposited / 1e18) > 1 ? (options.total_deposited / 1e18).toLocaleString() : (options.total_deposited / 1e18).toFixed(8)}</b> sPGL (<b>${(options.total_pgl / 1e18) > 1 ? (options.total_pgl / 1e18).toLocaleString() : (options.total_pgl / 1e18).toFixed(8)}</b> PGL)`)
    }
    if ( options.pool_share_display ) {
      _print(options.pool_share_display);
    }
    if ( options.stake_display) {
      _print(options.stake_display);
    }
    if ( options.current_tokens / 1e18 > 0 ) {
      _print(`Deposit Available: <b>${(options.current_tokens / 1e18) > 1 ? (options.current_tokens / 1e18).toFixed(3) : (options.current_tokens / 1e18).toFixed(8) }</b> PGL`)
    }
    if ( options.display_amount > 0 ) {
      _print(`Withdrawal Available: ${options.withdraw_display}`)
    }
    let has_options = false;
    if ( options.current_tokens / 1e18 > 0 ) {
      has_options = true;
      _print_button(`Approve`, options.approve)
      _print_button(`Deposit`, options.stake)
    }
    if ( options.display_amount > 0 ) {
      has_options = true;
      _print_button(`Withdraw`, options.withdraw)
    }
    if ( !has_options ) {
      _print(`No PGL/sPGL to Deposit/Withdraw`)
    	_print(`<a href='${options.url}' target='_blank'>Get LP Tokens</a>`)
    }
    _print(``)
  }
  layout_pool({
    url: WBTC_AVAX_POOL_URL,
    pool_name: 'AVAX-WBTC Pangolin LP - New! 🌟',
    tvl: WBTC_AVAX_TVL,
    apr: wbtc_apr,
    apy: wbtc_annual_apy,
    total_deposited: totalDepositedWBTCAVAX,
    user_pool_percent: userWbtcPoolPercent,
    current_tokens: currentWBTCAVAXTokens,
    display_amount: spglWbtcDisplayAmt,
    approve: approveWBTC,
    stake: stakeWBTC,
    withdraw: withdrawWBTC,
    tvl_display: wbtc_tvl_display,
    pool_share_display: '',
    stake_display: '',
    total_pgl: totalPoolPGL_wbtc,
    withdraw_display: withdrawDisplay_wbtc
  })
  layout_pool({
    url: USDT_AVAX_POOL_URL,
    pool_name: '💵 AVAX-USDT Pangolin LP',
    tvl: USDT_AVAX_TVL,
    apr: usdt_apr,
    apy: usdt_annual_apy,
    total_deposited: totalDepositedUSDTAVAX,
    user_pool_percent: userUsdtPoolPercent,
    current_tokens: currentUSDTAVAXTokens,
    display_amount: spglUsdtDisplayAmt,
    approve: approveUSDT,
    stake: stakeUSDT,
    withdraw: withdrawUSDT,
    tvl_display: usdt_tvl_display,
    pool_share_display: poolShareDisplay_usdt,
    stake_display: stakeDisplay_usdt,
    total_pgl: totalPoolPGL_usdt,
    withdraw_display: withdrawDisplay_usdt
  })

  layout_pool({
    url: LINK_AVAX_POOL_URL,
    pool_name: '🔗 AVAX-LINK Pangolin LP',
    tvl: LINK_AVAX_TVL,
    apr: link_apr,
    apy: link_annual_apy,
    total_deposited: totalDepositedLINKAVAX,
    user_pool_percent: userLinkPoolPercent,
    current_tokens: currentLINKAVAXTokens,
    display_amount: spglLinkDisplayAmt,
    approve: approveLINK,
    stake: stakeLINK,
    withdraw: withdrawLINK,
    tvl_display: link_tvl_display,
    pool_share_display: poolShareDisplay_link,
    stake_display: stakeDisplay_link,
    total_pgl: totalPoolPGL_link,
    withdraw_display: withdrawDisplay_link
  })

  layout_pool({
    url: ETH_AVAX_POOL_URL,
    pool_name: '💠 AVAX-ETH Pangolin LP',
    apr: eth_apr,
    apy: eth_annual_apy,
    current_tokens: currentETHAVAXTokens,
    display_amount: spglEthDisplayAmt,
    approve: approveETH,
    stake: stakeETH,
    withdraw: withdrawETH,
    tvl_display: null,
    pool_share_display: null,
    stake_display: stakeDisplay_eth,
    total_pgl: null,
    withdraw_display: withdrawDisplay_eth
  })

  layout_pool({
    url: PNG_AVAX_POOL_URL,
    pool_name: '🦔 AVAX-PNG Pangolin LP',
    apr: png_apr,
    apy: png_annual_apy,
    current_tokens: currentPNGAVAXTokens,
    display_amount: spglPngDisplayAmt,
    approve: approvePNG,
    stake: stakePNG,
    withdraw: withdrawPNG,
    tvl_display: null,
    pool_share_display: null,
    stake_display: stakeDisplay_png,
    total_pgl: null,
    withdraw_display: withdrawDisplay_png
  })

  layout_pool({
    url: SUSHI_AVAX_POOL_URL,
    pool_name: '🍣 AVAX-SUSHI Pangolin LP',
    apr: sushi_apr,
    apy: sushi_annual_apy,
    current_tokens: currentSUSHIAVAXTokens,
    display_amount: spglSushiDisplayAmt,
    approve: approveSUSHI,
    stake: stakeSUSHI,
    withdraw: withdrawSUSHI,
    tvl_display: null,
    pool_share_display: null,
    stake_display: stakeDisplay_sushi,
    total_pgl: null,
    withdraw_display: withdrawDisplay_sushi
  })
  _print('**Estimated LP value based on current token prices')
  const bottom_funnel = `
<b>PGL vs sPGL</b>
* PGL tokens staked in Snowglobes receive sPGL receipt tokens in return
* Withdrawn sPGL tokens recieve PGL tokens in return
* sPGL amount stays constant, underlying PGL value grows
`
  _print(bottom_funnel);

  hideLoading();
}

const snowglobeContract_approve = async function (chefAbi, chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  showLoading()
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
    alert('Already approved')
  } else {
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
        alert('Approval failed')
      })
  }
}

const icequeenContract_approve = async function (chefAbi, chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  showLoading()
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
    alert('Already approved')
  } else {
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
        alert('Approval failed')
      })
  }

}

const snowglobeContract_stake = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  if (allowedTokens / 1e18 == 0) {
    alert('Please approve spending first')
  } else if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function () {
        CHEF_CONTRACT.depositAll()
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
              alert('Tokens deposited. Refresh page to see balance.')
            })
          })
          .catch(function () {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake')
  }
}

const snowglobeContract_withdraw = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function () {
        CHEF_CONTRACT.withdrawAll()
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
              alert('Tokens Withdrawn. Refresh page to see balance.')
            })
          })
          .catch(function () {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to withdraw')
  }
}


const icequeenContract_stake = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  if (allowedTokens / 1e18 == 0) {
    alert('Please approve spending first')
  } else if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function () {
        CHEF_CONTRACT.deposit(poolIndex, currentTokens)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
              alert('Tokens deposited. Refresh page to see balance.')
            })
          })
          .catch(function () {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake')
  }
}

const icequeenContract_withdraw = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)
  const ICEQUEEN_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  const userPoolInfo = await ICEQUEEN_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)
  console.log(userPoolInfo)
  const currentTokens = userPoolInfo.amount
  let allow = Promise.resolve()

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function () {
        ICEQUEEN_CONTRACT.withdraw(poolIndex, currentTokens)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
              alert('Tokens withdraw. Refresh page to see balance.')
            })
          })
          .catch(function () {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to withdraw')
  }
}

const icequeenContract_claim = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const pendingRewards = await CHEF_CONTRACT.pendingSnowball(poolIndex, App.YOUR_ADDRESS)

  let allow = Promise.resolve()

  if (pendingRewards / 1e18 == 0) {
    alert('No rewards to claim')
  } else {
    showLoading()
    allow
      .then(async function () {
        CHEF_CONTRACT.withdraw(poolIndex, 1)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
              alert('Rewards claimed. Refresh page for new balance')
            })
          })
          .catch(function () {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Something went wrong.')
      })
  }
}

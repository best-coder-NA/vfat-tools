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
  const LP_API = [{ "type": "constructor", "stateMutability": "nonpayable", "payable": false, "inputs": [] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Burn", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Mint", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Swap", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0In", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1In", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount0Out", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1Out", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Sync", "inputs": [{ "type": "uint112", "name": "reserve0", "internalType": "uint112", "indexed": false }, { "type": "uint112", "name": "reserve1", "internalType": "uint112", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DOMAIN_SEPARATOR", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "MINIMUM_LIQUIDITY", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "PERMIT_TYPEHASH", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "amount0", "internalType": "uint256" }, { "type": "uint256", "name": "amount1", "internalType": "uint256" }], "name": "burn", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "factory", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint112", "name": "_reserve0", "internalType": "uint112" }, { "type": "uint112", "name": "_reserve1", "internalType": "uint112" }, { "type": "uint32", "name": "_blockTimestampLast", "internalType": "uint32" }], "name": "getReserves", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "initialize", "inputs": [{ "type": "address", "name": "_token0", "internalType": "address" }, { "type": "address", "name": "_token1", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "kLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "liquidity", "internalType": "uint256" }], "name": "mint", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "nonces", "inputs": [{ "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "permit", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price0CumulativeLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price1CumulativeLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "skim", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "swap", "inputs": [{ "type": "uint256", "name": "amount0Out", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Out", "internalType": "uint256" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "bytes", "name": "data", "internalType": "bytes" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "sync", "inputs": [], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "token0", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "token1", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "from", "internalType": "address" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }]
  const PNG_STAKING_ABI = [{ "inputs": [{ "internalType": "address", "name": "_rewardsToken", "type": "address" }, { "internalType": "address", "name": "_stakingToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Recovered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newDuration", "type": "uint256" }], "name": "RewardsDurationUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "earned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "exit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getRewardForDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastTimeRewardApplicable", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastUpdateTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "notifyRewardAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "periodFinish", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "recoverERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rewardPerToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardPerTokenStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "rewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_rewardsDuration", "type": "uint256" }], "name": "setRewardsDuration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "stakeWithPermit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stakingToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userRewardPerTokenPaid", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  const CRYSTAL_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_iceQueen","internalType":"address"},{"type":"address","name":"_snowball","internalType":"address"},{"type":"address","name":"_pgl","internalType":"address"},{"type":"uint256","name":"_poolId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"snowball","internalType":"uint256"},{"type":"uint256","name":"PGL","internalType":"uint256"},{"type":"uint256","name":"rewardCredit","internalType":"uint256"},{"type":"uint256","name":"rewardSnapshot","internalType":"uint256"},{"type":"uint256","name":"votes","internalType":"uint256"},{"type":"uint256","name":"thawTimestamp","internalType":"uint256"}],"name":"accounts","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amountSnowball","internalType":"uint256"},{"type":"uint256","name":"_amountPGL","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositPGL","inputs":[{"type":"uint256","name":"_amountIn","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositSnowball","inputs":[{"type":"uint256","name":"_amountIn","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"freeze","inputs":[{"type":"address","name":"_address","internalType":"address"},{"type":"uint256","name":"_duration","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIceQueen"}],"name":"iceQueen","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isFrozen","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingReward","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPangolinPair"}],"name":"pgl","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quadraticVotes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"snowball","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  const STAKING_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"OwnerChanged","inputs":[{"type":"address","name":"oldOwner","internalType":"address","indexed":false},{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerNominated","inputs":[{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"PauseChanged","inputs":[{"type":"bool","name":"isPaused","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardsDurationUpdated","inputs":[{"type":"uint256","name":"newDuration","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastPauseTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"min","inputs":[{"type":"uint256","name":"a","internalType":"uint256"},{"type":"uint256","name":"b","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"nominateNewOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"nominatedOwner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setPaused","inputs":[{"type":"bool","name":"_paused","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDuration","inputs":[{"type":"uint256","name":"_rewardsDuration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]
  const GAUGE_PROXY_ABI = [ { "type": "constructor", "stateMutability": "nonpayable", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IceQueen" } ], "name": "MASTER", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "SNOWBALL", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "SNOWCONE", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "TOKEN", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "acceptGovernance", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "addGauge", "inputs": [ { "type": "address", "name": "_token", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "collect", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "distribute", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "gauges", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "getGauge", "inputs": [ { "type": "address", "name": "_token", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "governance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "length", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "pendingGovernance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "pid", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "poke", "inputs": [ { "type": "address", "name": "_owner", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "reset", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setGovernance", "inputs": [ { "type": "address", "name": "_governance", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setPID", "inputs": [ { "type": "uint256", "name": "_pid", "internalType": "uint256" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "tokenVote", "inputs": [ { "type": "address", "name": "", "internalType": "address" }, { "type": "uint256", "name": "", "internalType": "uint256" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address[]", "name": "", "internalType": "address[]" } ], "name": "tokens", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "totalWeight", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "usedWeights", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "vote", "inputs": [ { "type": "address[]", "name": "_tokenVote", "internalType": "address[]" }, { "type": "uint256[]", "name": "_weights", "internalType": "uint256[]" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "votes", "inputs": [ { "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "weights", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] } ]
  const GAUGE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"DISTRIBUTION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DURATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWBALL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWCONE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"TOKEN","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"TREASURY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalance","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalances","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"kick","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  const ERC20_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
 
  
  //governance
  const CRYSTAL_VAULT_ADDRESS = "0xe5614C304D73d990B8BcA8F055Ec0f2685Ebf60c";
  const GAUGE_PROXY_ADDRESS = "0xFc371bA1E7874Ad893408D7B581F3c8471F03D2C";
  const ICEQUEEN_ADDR = "0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375";
  const SNOB_ADDRESS = "0xC38f41A296A4493Ff429F1238e030924A1542e50";

  const calculateShare = (snowglobeContract, PAIR_ADDR, userSPGL, decimals, pool_percent) => {
    let pglContract = new ethers.Contract(PAIR_ADDR, LP_API, signer)
    return Promise.all([
      snowglobeContract ? snowglobeContract.balance() : Promise.resolve(0), 
      snowglobeContract ? snowglobeContract.totalSupply() : Promise.resolve(0),
      pglContract.totalSupply(),
      pglContract.getReserves(),
      pglContract.token0(),
      pglContract.token1()
    ]).then(res => {
      let totalPoolPGL = res[0];
      let totalSPGL = res[1];
      let totalSupplyPGL = res[2] / 1e18
      let reserves = res[3]
      let token0Address = res[4]
      let token1Address = res[5]
      let ownedPGL = userSPGL * (totalPoolPGL / 1e18) / (totalSPGL / 1e18);
      // wBTC is 8 decimals
      const r0 = token0Address == '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB' ? reserves._reserve0 / 1e8 : reserves._reserve0 / 1e18;
      const r1 = reserves._reserve1 / decimals
      let reserve0Owned = ownedPGL * (r0) / (totalSupplyPGL);
      let reserve1Owned = ownedPGL * (r1) / (totalSupplyPGL);
      const t0Price = prices[token0Address] ? prices[token0Address].usd : 0
      const t1Price = prices[token1Address] ? prices[token1Address].usd : 0
      const token0ValueUSDT = reserve0Owned * t0Price;
      const token1ValueUSDT = reserve1Owned * t1Price;
      const value = token0ValueUSDT + (token1ValueUSDT);
      
      return [
        `${userSPGL > 1 ? userSPGL.toFixed(3) : userSPGL.toFixed(8)} sPGL`, // TODO:  convert to general symbol
        `${ownedPGL > 1 ? ownedPGL.toFixed(3) : ownedPGL.toFixed(8)} PGL - ${pool_percent.toFixed(6)}%`, // TODO:  convert to general symbol
        `<div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
          <p class="m-0 font-size-12"><ion-icon name="flame-outline"></ion-icon> Your LP value is</p>
          <p class="m-0 font-size-16 font-weight-regular">${reserve0Owned.toFixed(8)} ${TOKEN_NAMES[token0Address]} / ${reserve1Owned.toFixed(8)} ${TOKEN_NAMES[token1Address]}  </p>
          <p class="m-0 font-size-12">($${value.toFixed(2)})</p>
        </div>`,
        totalPoolPGL];
    }).catch( err => {
      console.log('error calculating LP value:', err)
    })    
  }

 
  const TOKEN_NAMES = {
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": "AVAX",
    "0x60781C2586D68229fde47564546784ab3fACA982": "PNG",
    "0xC38f41A296A4493Ff429F1238e030924A1542e50": "SNOB",
    "0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc": "SUSHI",
    "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15": "ETH",
    "0xde3A24028580884448a5397872046a019649b084": "USDT",
    "0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651": "LINK",
    "0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB": "WBTC",
    "0x095370AE41FF23798d96c1ADF7D58Ae6a2b05b18": "DAI",
    "0x846D50248BAf8b7ceAA9d9B53BFd12d7D7FBB25a": "VSO",
    "0xf39f9671906d8630812f9d9863bBEf5D523c84Ab": "UNI",
    "0x6e7f5C0b9f4432716bDd0a77a3601291b9D9e985": "SPORE",
    "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd": "JOE"
  }

  const stakeUnstake = (amount, stake, st) => {
    return `<div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
    <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
    <p class="m-0 font-size-16 font-weight-regular">${amount} ${(st?st:'sPGL')} </p>
    <p class="m-0 font-size-12">(Available to ${(stake? 'Stake': 'Unstake')}) </p>
    </div>`
  }
  
  const signer = App.provider.getSigner();
  const GAUGE_PROXY_CONTRACT = new ethers.Contract(GAUGE_PROXY_ADDRESS, GAUGE_PROXY_ABI, signer);

  const globes = await GAUGE_PROXY_CONTRACT.tokens()

  const gaugeAddresses = await Promise.all(
    globes.map((globe) => {
      return GAUGE_PROXY_CONTRACT.getGauge(globe)
    }),
  )

  let prices = await getAvaxPrices();  
  let claimableSnowballs = 0;
  

  const snobPrice = prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'] ? prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'].usd : 0;
  

   // iterate through each globe:
  const displayGlobe = async (globe, index) => {
    // if actually a 3Pool, run display3Pool instead
    if (globe == '0xA42BE3dB9aff3aee48167b240bFEE5e1697e1281' || globe == '0xdE1A11C331a0E45B9BA8FeE04D4B51A745f1e4A4') {
      display3Pool(globe)
    }
    // if depricated pool, skip
    else if (globe == '0x53B37b9A6631C462d74D65d61e1c056ea9dAa637'){
      return
    }
    else {
    
      const SNOWGLOBE_CONTRACT = new ethers.Contract(globe, SNOWGLOBE_ABI, signer);
      
      let lp_token 
      
      try{
        lp_token = await SNOWGLOBE_CONTRACT.token()
      } catch {
        console.log('failed lp token fetch with globe: ',globe)
      }

      const LP_TOKEN_CONTRACT = new ethers.Contract(lp_token, LP_API, signer)
      const GAUGE_ADDRESS = gaugeAddresses[index];
      const GAUGE_CONTRACT = new ethers.Contract(GAUGE_ADDRESS, GAUGE_ABI, signer);
      
      const token_0 = await LP_TOKEN_CONTRACT.token0()
      const token_1 = await LP_TOKEN_CONTRACT.token1()
      const lp_symbol = await LP_TOKEN_CONTRACT.symbol()

      const TOKEN_0_CONTRACT = new ethers.Contract(token_0, ERC20_ABI, signer)
      const TOKEN_1_CONTRACT = new ethers.Contract(token_1, ERC20_ABI, signer)
      

      let token_0_symbol = await TOKEN_0_CONTRACT.symbol()
      let token_1_symbol = await TOKEN_1_CONTRACT.symbol()
      let globe_symbol = await SNOWGLOBE_CONTRACT.symbol()
      let snowglobe_balance = await SNOWGLOBE_CONTRACT.balanceOf(App.YOUR_ADDRESS)
      let total_staked_lp = await SNOWGLOBE_CONTRACT.balance()
      let pending_snob = await GAUGE_CONTRACT.earned(App.YOUR_ADDRESS)
      let gauge_staked = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS)
      let gauge_total = await GAUGE_CONTRACT.totalSupply()
      // let globe_snob_per_block = await GAUGE_CONTRACT.rewardRate()

      const pool_percent = (gauge_staked / 1e18) / (gauge_total / 1e18) * 100
      

      let gaugeShareDisplay, gaugeShareDisplay_lp, stakeDisplay
      
      if (gauge_staked / 1e18 > 0) {
        //                              snowglobeContract, PAIR_ADDR, userSPGL,             decimals, pool_percent
        let ret = await calculateShare(SNOWGLOBE_CONTRACT, lp_token, gauge_staked / 1e18, 1e18, pool_percent)
        gaugeShareDisplay = ret[0]
        gaugeShareDisplay_lp = ret[1]
        stakeDisplay = ret[2]
      }

      let tvl_class = 'tvl-hide';

      let pendingSNOBTokensPool = await GAUGE_CONTRACT.earned(App.YOUR_ADDRESS)

      claimableSnowballs += pendingSNOBTokensPool / 1e18

      pool({
        logo_token0 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${token_0}/logo.png`,
        logo_token1 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${token_1}/logo.png`,
        pool_nickname: `${token_0_symbol}-${token_1_symbol}-${globe_symbol}`,
        pool_name: `${token_0_symbol}-${token_1_symbol} ${globe_symbol}`,
        globe_symbol: globe_symbol,
        lp_symbol: lp_symbol,
        url: null,
        tvl: null,
        pool_weight: null,
        total_staked: total_staked_lp,
        user_pool_percent: pool_percent,
        staked_pool: gauge_staked,
        pending_tokens: pending_snob,
        display_amount: snowglobe_balance > 1000 ? snowglobe_balance / 1e18 : 0,
        gauge: GAUGE_ADDRESS,
        pool: globe,
        icequeen_apr: null,
        snowglobe_apr: null,
        tvl_display: null,
        tvl_class: tvl_class,
        total_pgl: total_staked_lp,
        pool_share_display: gaugeShareDisplay,
        pool_share_display_pgl: gaugeShareDisplay_lp,
        stake_display: stakeDisplay,
        apy: null,
        snowballsPerBlock: snowballsPerBlock
      })
    }

    
  }
  const display3Pool = async pool => {
    const TOKEN_ADDRESSES = {
      "DAI": "0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a",
      "TUSD": "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
      "FRAX": "0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98",
      "USDT": "0xde3A24028580884448a5397872046a019649b084",
      "BUSD": "0xaEb044650278731Ef3DC244692AB9F64C78FfaEA"
    }

    const POOL_CONTRACT = new ethers.Contract(pool, ERC20_ABI, signer)
    const gauge = await GAUGE_PROXY_CONTRACT.getGauge(pool)

    const GAUGE_CONTRACT = new ethers.Contract(gauge, GAUGE_ABI, signer);
    
    // let currentPoolTokens = await POOL_CONTRACT.balanceOf(App.YOUR_ADDRESS)
    let stakedPoolTokens = await POOL_CONTRACT.balanceOf(App.YOUR_ADDRESS)
    let totalStakedPool = await POOL_CONTRACT.totalSupply()
    let pool_snob_per_block = await GAUGE_CONTRACT.rewardRate()

    let stakedGauge = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS)
    let totalStakedGauge = await GAUGE_CONTRACT.totalSupply()

    let symbol = await POOL_CONTRACT.symbol()
    let name = await POOL_CONTRACT.name()

    let tokens = name.split(" ")[1].split("+")

    let pending_snob = await GAUGE_CONTRACT.earned(App.YOUR_ADDRESS)

    const pool_percent = (stakedGauge / 1e18) / (totalStakedGauge / 1e18) * 100

    let gaugeShareDisplay, gaugeShareDisplay_lp, stakeDisplay
    if (stakedGauge / 1e18 > 0) {
      let ret = await calculateShare(POOL_CONTRACT, lp_token, stakedGauge / 1e18, 1e18, pool_percent)
      gaugeShareDisplay = ret[0]
      gaugeShareDisplay_lp = ret[1]
      stakeDisplay = ret[2]
    }

    let pendingSNOBTokensPool = await GAUGE_CONTRACT.earned(App.YOUR_ADDRESS)

    claimableSnowballs += pendingSNOBTokensPool / 1e18

    vault({
      logo_token0 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${TOKEN_ADDRESSES[tokens[0]]}/logo.png`,
      logo_token1 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${TOKEN_ADDRESSES[tokens[1]]}/logo.png`,
      logo_token2 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${TOKEN_ADDRESSES[tokens[2]]}/logo.png`,
      pool_nickname: `StableVault-${symbol}`,
      pool_name: `StableVault ${symbol}`,
      symbol: symbol,
      url: null,
      tvl: null,
      pool_weight: null,
      total_staked: totalStakedPool,
      user_pool_percent: pool_percent,
      staked_pool: stakedPoolTokens,
      pending_tokens: pending_snob,
      display_amount: stakedPoolTokens > 1000 ? stakedPoolTokens / 1e18 : 0,
      pool: pool,
      gauge: gauge,
      icequeen_apr: (pool_snob_per_block / 1e18) * 15000 * snobPrice / (totalStakedPool / 1e18) * 100,
      snowglobe_apr: null,
      tvl_display: `${new Intl.NumberFormat('en-US').format(totalStakedPool / 1e18)}`,
      total_pgl: null,
      pool_share_display: `${(stakedPoolTokens / 1e18).toFixed(6)} ${symbol}`,
      pool_share_display_pgl: '',
      stake_display: '',
      snobPrice,
      snowballsPerBlock: snowballsPerBlock
    });
  }

  //Contracts
  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)
  // const STAKING_CONTRACT = new ethers.Contract(STAKING_ADDR, STAKING_ABI, signer)
  const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)

  let snobTotalSupply = await SNOB_TOKEN.totalSupply()
  let currentSNOBTokens = await SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS)
  let blockNumber = await App.provider.getBlockNumber()
  // let snowballMultiplier = await ICEQUEEN_CONTRACT.BONUS_MULTIPLIER()
  let snowballsPerBlock = await ICEQUEEN_CONTRACT.snowballPerBlock()

  let currentBlock = await App.provider.getBlock(blockNumber)
  let yesterdayBlock = await App.provider.getBlock(blockNumber - 20000)

  //votes
  const CRYSTAL_CONTRACT = new ethers.Contract(CRYSTAL_VAULT_ADDRESS, CRYSTAL_VAULT_ABI, signer);
  const assetsDeposited = await CRYSTAL_CONTRACT.accounts(App.YOUR_ADDRESS);
  const pendingGovReward = await CRYSTAL_CONTRACT.pendingReward(App.YOUR_ADDRESS);

  const secondsInDay = 86400;
  
  const blocks24hrs = (secondsInDay / (currentBlock.timestamp - yesterdayBlock.timestamp)) * 20000;
  const marketCapDisplay = `$${new Intl.NumberFormat('en-US').format(snobTotalSupply / 1e18 * snobPrice)}`
  
  $('#value-market').append(`$${snobPrice.toFixed(3)}`)
  $('#value-marketcap').append(`${marketCapDisplay}`)
  $('#snob-supply').append(`${(snobTotalSupply / 1e18).toLocaleString()}`)
  $('#snob-supply-max').append(`18,000,000`)
  $('#snob-per-block').append(`${snowballsPerBlock / 1e18}`)
  $('#snob-block-pday').append(`${(snowballsPerBlock / 1e18 * 15000).toLocaleString()}`)
  $('#blocks-24-hrs').append(`~${Math.round(blocks24hrs).toLocaleString()}`)
  $('#distribution_phase').append(`${blockNumber.toLocaleString()} / 3,065,000 (${(3065000 - blockNumber).toLocaleString()} blocks left)`);

  document.getElementById('wallet-copy').addEventListener('click', ()=>{
    navigator.clipboard.writeText(`${App.YOUR_ADDRESS}`).then(function() {
      console.log('Snowball Platform: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Snowball Platform: Could not copy text: ', err);
    });
  });
  let walletAddres = `${App.YOUR_ADDRESS}`;
  $('#wallet-address').html(`${walletAddres}`);
  

  

  const aprDisplay = (cDayAPR, cWeekAPR, cYearAPR) => {
    return `<div class="col-sm-12 col-md-3 align-items-center pb-10">
        <div class="row">
            <p class="w-full text-center">Combined APR :</p>
        </div>
        <div class="row">
            <div class="form-inline w-50 mx-auto">
                <div class="form-group m-md-0">
                    <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                    <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                </div>
            </div>
            <div class="form-inline w-50 mx-auto">
                <div class="form-group m-md-0">
                <p class="m-0 font-size-12 font-weight-regular">${cDayAPR}% </p>
                <p class="m-0 font-size-12 font-weight-regular">${cYearAPR}%</p>
                </div>
            </div>
        </div>
    </div>`    
  }

  await Promise.all(
    globes.map((globe, index) => {
      return displayGlobe(globe, index)
    }),
  )

  try {
    if (currentSNOBTokens / 1e18 > 0 || claimableSnowballs > 0 || assetsDeposited.snowball / 1e18 > 0) {
      $('#account-info').show();
      $('#snob-info').show();
      $('#value-snob').append(`${((currentSNOBTokens / 1e18) + claimableSnowballs).toFixed(4)}`);
      $('#value-usd').append(`${(((currentSNOBTokens / 1e18) + claimableSnowballs) * snobPrice).toFixed(2)}`);
      $('#wallet').append(`${(currentSNOBTokens / 1e18).toFixed(4)}`);
      $('#governance-snob').append(`In Governance: ${(assetsDeposited.snowball / 1e18).toFixed(4)}`);
      $('#track-portfolio').html(`<ion-icon name="arrow-redo-outline"></ion-icon> <a href='https://markr.io/#/wallet?address=${walletAddres}' target='_blank'>Track Your Portfolio</a>`);
      if (claimableSnowballs > 0) {
        $('#pending').append(`<ion-icon name="time-outline"></ion-icon> Pending: ${(claimableSnowballs).toFixed(4)}`);
      }else{
        $('#pending').append(`<ion-icon name="checkmark-circle" class="text-success"></ion-icon> No pending rewards`);
      }
    }
  } catch {console.log('could not load wallet info')}

  function pool(options) {
    if (options.icequeen_apr) {

      var eDayAPR = `${options.icequeen_apr.toFixed(2)}`;
      var eWeekAPR = `${(options.icequeen_apr * 7).toFixed(2)}`;
      var eYearAPR = `${(options.icequeen_apr * 365).toFixed(2)}`;

      var combinedAprDisplay = '';
      if (options.snowglobe_apr) {
        let combinedAPR = options.icequeen_apr + options.snowglobe_apr

        var cDayAPR = `${combinedAPR.toFixed(2)}`;
        var cWeekAPR = `${(combinedAPR * 7).toFixed(2)}`;
        var cYearAPR = `${options.apy.toFixed(2)}`;

        var combinedAprDisplay = aprDisplay(cDayAPR, cWeekAPR, cYearAPR)
      }
    }
    if (options.total_staked && options.total_pgl) {
      

      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${options.total_staked / 1e18 > 1 ? (options.total_staked / 1e18).toLocaleString() : (options.total_staked / 1e18).toFixed(6)} ${options.globe_symbol} </span>
        <span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${options.total_pgl / 1e18 > 1 ? (options.total_pgl / 1e18).toLocaleString() :(options.total_pgl / 1e18).toFixed(6) } ${options.lp_symbol}</span>`;

    } else if (options.total_staked) {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} ${options.globe_symbol} </span>`;
    } else {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.total_pgl / 1e18).toLocaleString()} ${options.lp_symbol}</span>`;
    }
    var poolShare = '';
    var estimatedRate = '';
    var earning = '';
    if ( options.user_pool_percent > 0 ) {
      if (options.pool_share_display) {
        var poolShare = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
          <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> Your pool share is</p>
          <p class="m-0 font-size-16 font-weight-regular">${options.pool_share_display} </p>
          <p class="m-0 font-size-12">${options.pool_share_display_pgl} </p>
          </div>`;
      }
      var stakeDisplay = '';
      if (options.stake_display ) {
        stakeDisplay = options.stake_display;
      } else {
        stakeDisplay = '';
      }

      var estimatedRate = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0 mx-auto">
        <p class="m-0 font-size-12"> Estimated Rate</p>
        <span class="badge badge-success font-size-12 px-5 px-sm-10 mx-10">${(options.snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)} SNOB <ion-icon name="trending-up-outline"></ion-icon></span>
        <p class="m-0 font-size-12">(24hr block rate)</p>
        </div>`;

      var earning = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You are earning</p>
        <p class="m-0 font-size-16 font-weight-regular">${(options.snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)} SNOB </p>
        <p class="m-0 font-size-12">per day ($${(options.snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(Average block rate)</p>
        </div>`
    }
    availableStake = '';
    if ( options.display_amount > 0 ) {
      availableStake = stakeUnstake(options.display_amount.toFixed(8), true);
    }
    availableUnstake = '';
    if ( options.staked_pool / 1e18 > 0 ) {      
      availableUnstake = stakeUnstake((options.staked_pool / 1e18).toFixed(8), false);
    }

    let has_options = false
    approveBtn = '';
    stakeBtn = '';
    unstakeBtn = '';
    claimBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true
      approveBtn = `<button onclick="approveGauge('${options.gauge}', '${options.pool}');" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button onclick="gaugeContractStake('${options.gauge}', '${options.pool}');" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake ${options.globe_symbol}</button>`;
    }
    if ( options.staked_pool / 1e18 > 0 ) {
      has_options = true
      unstakeBtn = `<button onclick="gaugeContractWithdraw('${options.gauge}');" class="btn btn-sm mx-10 unstakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Unstake ${options.globe_symbol}</button>`;
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      claimBtn = `<button onclick="gaugeClaim('${options.gauge}');" class="btn btn-primary btn-sm claimBtn"><ion-icon name="push-outline"></ion-icon> Harvest SNOB</button>`;
    }
    if (!has_options){

      var poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens" class="align-items-center d-flex mx-auto mx-md-0">
                        <img class="rounded-circle" width="48" src="${options.logo_token0}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center d-flex flex-column snob-tvl pb-10 pb-md-0 mx-auto">
                    <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                </div>
                <div class="col-sm-12 col-md-2 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <a href="/compound" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get ${options.globe_symbol} from Snowglobes</a>
                    <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APYs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display: none;">
                <div class="row">
                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
                        <p class="m-0 font-size-16 font-weight-regular">O ${options.globe_symbol} </p>
                        <p class="m-0 font-size-12">(No ${options.globe_symbol} to Stake/Withdraw) </p>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
      $('#snob-pools-unused').append(poolPrint);
    }
    if(has_options){
      var poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens" class="align-items-center d-flex mx-auto mx-md-0">
                        <img class="rounded-circle" width="48" src="${options.logo_token0}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                ${approveBtn}
                ${stakeBtn}
                ${unstakeBtn}
                ${claimBtn}
                <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APYs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>

            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display:none">
                <div class="row">
                    <div class="col-sm-12 col-md-2 align-items-center d-flex flex-column text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                    </div>
                    ${poolShare}

                </div>
                <div class="row pt-20">
                    ${stakeDisplay || ''}
                    ${availableStake}
                    <div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="flame-outline"></ion-icon> Pending SNOB</p>
                        <p class="m-0 font-size-16 font-weight-regular">${(options.pending_tokens / 1e18).toFixed(6)}</p>
                    </div>
                    ${availableUnstake}
                </div>
            </div>
        </div>
    </div>`;
      $('#snob-pools-used').append(poolPrint);
    }
  }
  function vault(options) {
    if (options.icequeen_apr) {

      var eDayAPR = `${options.icequeen_apr.toFixed(2)}`;
      var eWeekAPR = `${(options.icequeen_apr * 7).toFixed(2)}`;
      var eYearAPR = `${(options.icequeen_apr * 365).toFixed(2)}`;

      var combinedAprDisplay = ''
      if (options.snowglobe_apr) {
        let combinedAPR = options.icequeen_apr + options.snowglobe_apr

        var cDayAPR = `${combinedAPR.toFixed(2)}`;
        var cWeekAPR = `${(combinedAPR * 7).toFixed(2)}`;
        var cYearAPR = `${(combinedAPR * 365).toFixed(2)}`;

        var combinedAprDisplay = aprDisplay(cDayAPR, cWeekAPR, cYearAPR)

      }
    }

    poolSize = '';
    if (options.total_staked) {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} S3D </span>`;
    }
    var estimatedRate = '';
    var poolShare = '';
    var earning = '';
    var stakeDisplay = '';
    
    if ( options.user_pool_percent > 0 ) {
      if (options.pool_share_display) {
        poolShare = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> Your pool share is</p>
        <p class="m-0 font-size-16 font-weight-regular">${options.pool_share_display} </p>
        <p class="m-0 font-size-12">(${options.user_pool_percent.toFixed(6)}%)</p>
        </div>`;
      }
      if (options.stake_display) {
        stakeDisplay = options.stake_display;
      }

      var estimatedRate = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0 mx-auto">
        <p class="m-0 font-size-12"> Estimated Rate</p>
        <span class="badge badge-success font-size-12 px-5 px-sm-10 mx-10">${(options.snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)} SNOB <ion-icon name="trending-up-outline"></ion-icon></span>
        <p class="m-0 font-size-12">per day ($${(options.snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(24hr block rate)</p>
        </div>`;

      var earning = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You are earning</p>
        <p class="m-0 font-size-16 font-weight-regular">${(options.snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)} SNOB </p>
        <p class="m-0 font-size-12">per day ($${(options.snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(Average block rate)</p>
        </div>`
    }
    var availableStake = '';
    if ( options.display_amount > 0 ) {
      availableStake = stakeUnstake(options.display_amount.toFixed(6), true, options.symbol);
    }
    var availableUnstake = ''
    if ( options.staked_pool / 1e18 > 0 ) {
      availableUnstake = stakeUnstake((options.staked_pool / 1e18).toFixed(6), false, options.symbol);
    }
    let has_options = false
    approveBtn = '';
    stakeBtn = '';
    unstakeBtn = '';
    claimBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true
      approveBtn = `<button onclick="approveGauge('${options.gauge}', '${options.pool}');" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button onclick="gaugeContractStake('${options.gauge}', '${options.pool}');" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake ${options.symbol}</button>`;
    }
    if ( options.staked_pool / 1e18 > 0 ) {
      has_options = true
      unstakeBtn = `<button onclick="gaugeContractWithdraw('${options.gauge}');" class="btn btn-sm mx-10 unstakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Unstake ${options.symbol}</button>`;
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      claimBtn = `<button onclick="gaugeClaim('${options.gauge}');" class="btn btn-primary btn-sm claimBtn"><ion-icon name="push-outline"></ion-icon> Harvest SNOB</button>`;
    }

    if( !has_options ){
      let poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens-3sd" class="align-items-center d-flex mx-auto mx-md-0 ">
                        <img class="rounded-circle" width="48" src="${options.logo_token0}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                <div class="col-sm-12 col-md-1 align-items-center text-center snob-tvl pb-10 pb-md-0 ${options.tvl_class}">
                    <p class="m-0 font-size-12"><ion-icon name="lock-closed-outline"></ion-icon> Total Value Locked</p>
                    <span class="badge font-size-12 px-5 px-sm-10 mx-5">${options.tvl_display}</span>
                </div>
                <div class="col-sm-12 col-md-2 d-flex align-items-center pb-10 pb-md-0 mx-auto">
                    <div class="form-inline w-50 mx-auto">
                        <div class="form-group m-md-0">
                            <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                            <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                        </div>
                    </div>
                    <div class="form-inline w-50 mx-auto mx-md-0">
                        <div class="form-group m-md-0">
                        <p class="m-0 font-size-12 font-weight-regular">${eDayAPR}% </p>
                        <p class="m-0 font-size-12 font-weight-regular">${eYearAPR}% </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center d-flex flex-column snob-tvl pb-10 pb-md-0 mx-auto">
                    <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                </div>
                <div class="col-sm-12 col-md-2 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <a href="/stablevault" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get ${options.symbol} from StableVault</a>
                    <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APYs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display: none;">
                <div class="row">

                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
                        <p class="m-0 font-size-16 font-weight-regular">O ${options.symbol} </p>
                        <p class="m-0 font-size-12">(No ${options.symbol} to Stake/Withdraw) </p>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
      $('#snob-pools-new').append(poolPrint);
    }
    if(has_options){
      var poolPrint = `<div class="col-md-12">
      <div class="card border-0 p-10 pl-20 pr-20 mt-5">
          <div class="row">
              <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                  <div id="pooltokens-3sd" class="align-items-center d-flex mx-auto mx-md-0">
                      <img class="rounded-circle" width="48" src="${options.logo_token0}" alt="${options.pool_name}">
                      <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                      <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                      <h6 class="pl-10 m-0">${options.pool_name}</h6>
                  </div>
              </div>
              <div class="col-sm-12 col-md-1 align-items-center text-center snob-tvl pb-10 pb-md-0 ${options.tvl_class}">
                  <p class="m-0 font-size-12"><ion-icon name="lock-closed-outline"></ion-icon> Total Value Locked</p>
                  <span class="badge font-size-12 px-5 px-sm-10 mx-5">${options.tvl_display}</span>
              </div>
              <div class="col-sm-12 col-md-2 d-flex align-items-center pb-10 pb-md-0 mx-auto">
                  <div class="form-inline w-50 mx-auto">
                      <div class="form-group m-md-0">
                          <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                          <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                      </div>
                  </div>
                  <div class="form-inline w-50 mx-auto mx-md-0">
                      <div class="form-group m-md-0">
                      <p class="m-0 font-size-12 font-weight-regular">${eDayAPR}% </p>
                      <p class="m-0 font-size-12 font-weight-regular">${eYearAPR}%</p>
                      </div>
                  </div>

              </div>
              <div class="col-sm-12 col-md-3 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
              ${approveBtn}
              ${stakeBtn}
              ${unstakeBtn}
              ${claimBtn}
              <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APYs and TVL on Markr.io</a>
              </div>

              <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                  <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
              </div>
          </div>

          <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display:none">
              <div class="row">

                  <div class="col-sm-12 col-md-2 align-items-center d-flex flex-column text-center snob-tvl pb-10 pb-md-0">
                      <p class="m-0 font-size-12"> Pool Size</p>
                      ${poolSize}
                  </div>
                  ${poolShare}
                  <div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
                      <p class="m-0 font-size-12"><ion-icon name="flame-outline"></ion-icon> Pending SNOB</p>
                      <p class="m-0 font-size-16 font-weight-regular">${(options.pending_tokens / 1e18).toFixed(6)}</p>
                  </div>

              </div>
              <div class="row pt-20">

                  ${availableStake}
                  
                  ${availableUnstake}
              </div>
          </div>
      </div>
  </div>`;
      $('#snob-pools-new').append(poolPrint);
    }
  }

  // updateButtonHandlers();
  hideLoading();
}

const approveGauge = async function(gaugeAddress, stakingToken) {
  const App = await init_ethers()

  const signer = App.provider.getSigner();
  const STAKING_TOKEN = new ethers.Contract(stakingToken, ERC20_ABI, signer);
  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, gaugeAddress);
  let allow = Promise.resolve();
  halfmoon.toggleModal('modal-loading');
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
    halfmoon.toggleModal('modal-loading')
    snobMessage(`Connected successfully`, `Already approved . <br>You can use the deposit/withdrawals options`, `checkmark-circle-outline`, `success`, false, `ok`, 4000);
  } else {
    allow = STAKING_TOKEN.approve(gaugeAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        halfmoon.toggleModal('modal-loading')
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Connecting to metamask`, `Approval failed . Please check your Metamask Wallet`, `close-circle-outline`, `danger`, false, `ok`, 4000);
      })
  }
}

const gaugeContractStake = async function(gaugeAddress, stakeTokenAddr) {
  const App = await init_ethers()
  const gaugeAbi = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"DISTRIBUTION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DURATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWBALL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWCONE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"TOKEN","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"TREASURY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalance","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalances","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"kick","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  const stakeTokenAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

  const signer = App.provider.getSigner();
  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, stakeTokenAbi, signer);
  const GAUGE_CONTRACT = new ethers.Contract(gaugeAddress, gaugeAbi, signer);
  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, gaugeAddress);
  let allow = Promise.resolve();
  if (allowedTokens / 1e18 == 0) {
    snobMessage(`Approve spending`, `Please approve spending first. Please check your Metamask Wallet`, `information-circle-outline`, `primary`, false, `ok`);
  } else if (currentTokens / 1e18 > 0) {
    halfmoon.toggleModal('modal-loading');
    allow.then(async function() {
      GAUGE_CONTRACT.deposit(currentTokens).then(function(t) {
        App.provider.waitForTransaction(t.hash).then(function () {
          halfmoon.toggleModal('modal-loading');
          snobMessage(`Tokens deposit`, `Tokens deposited. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
          setTimeout(function(){ window.location.reload(true); }, 6000);
        });
      });
    })
    .catch(function () {
        halfmoon.toggleModal('modal-loading');
        snobMessage(`Oops! Failed`, `Deposit Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      })
  } else {
    snobMessage(`Oops! Failed`, `You have no tokens to stake`, `close-circle-outline`, `danger`, false, `ok`, false);
  }
}

const gaugeContractWithdraw = async function (gaugeAddress) {
  const App = await init_ethers()
  const gaugeAbi = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"DISTRIBUTION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DURATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWBALL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWCONE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"TOKEN","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"TREASURY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalance","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalances","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"kick","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  
  const signer = App.provider.getSigner();
  const GAUGE_CONTRACT = new ethers.Contract(gaugeAddress, gaugeAbi, signer);
  const currentTokens = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS);
  let allow = Promise.resolve();
  if(currentTokens / 1e18 > 0) {
    halfmoon.toggleModal('modal-loading');
    allow.then(async function() {
      GAUGE_CONTRACT.withdraw(currentTokens).then(function(t) {
        App.provider.waitForTransaction(t.hash).then(function () {
          halfmoon.toggleModal('modal-loading');
          snobMessage(`Withdrawn Tokens`, `Tokens Withdrawn. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
          setTimeout(function(){ window.location.reload(true); }, 6000);
        });
      }).catch(function() {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Oops! Failed`, `Withdrawn Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      });
    }).catch(function () {
      halfmoon.toggleModal('modal-loading')
      snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
    });
  } else {
    snobMessage(`Withdrawn Tokens`, `Withdraw failed . Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, 4000);
  }
}

const gaugeClaim = async function (gaugeAddress) {
  const App = await init_ethers()
  const gaugeAbi = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"DISTRIBUTION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DURATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWBALL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWCONE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"TOKEN","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"TREASURY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalance","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalances","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"kick","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  
  const signer = App.provider.getSigner();
  const GAUGE_CONTRACT = new ethers.Contract(gaugeAddress, gaugeAbi, signer);
  const pendingRewards = await GAUGE_CONTRACT.earned(App.YOUR_ADDRESS);
  let allow = Promise.resolve();
  if (pendingRewards / 1e18 == 0) {
    snobMessage(`Oops`, `You have no rewards to claim`, `information-circle-outline`, `primary`, false, `ok`, 4000);
  } else {
    halfmoon.toggleModal('modal-loading');
    allow.then(async function() {
      GAUGE_CONTRACT.getReward().then(function(t) {
        App.provider.waitForTransaction(t.hash).then(function() {
          halfmoon.toggleModal('modal-loading');
          snobMessage(`Withdrawn Tokens`, `Rewards claimed. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
          setTimeout(function(){ window.location.reload(true); }, 6000);
        });
      }).catch(function() {
        halfmoon.toggleModal('modal-loading');
        snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      });
    }).catch(function() {
      halfmoon.toggleModal('modal-loading');
      snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
    })
  }
}

const snobMessage = (title, message, icon, state, btn1, btn2, time) =>{
  $('#snob-title-modal').html('').html(title);
  $('#snob-message-modal').html('').html(message);
  if (icon) {
    if(state){
      icon = `<ion-icon class="text-${state}" name="${icon}"></ion-icon>`;
    } else{
      icon = `<ion-icon name="${icon}"></ion-icon>`;
    }
  }else{
    icon = '';
  }
  switch (btn1) {
    case 'close':
      btn1 = `<button class="btn mr-5" data-dismiss="modal">Close</button>`;
      break;
    case 'ok':
      btn1 = `<button class="btn mr-5" data-dismiss="modal">Ok</button>`;
      break;
    case 'reload':
      btn1 = `<button onclick="window.location.reload(true);" class="btn mr-5" data-dismiss="modal">Reload</button>`;
      break;
    default:
      btn = ``;
      break;
  }
  switch (btn2) {
    case 'close':
      btn2 = `<button class="btn btn-primary" data-dismiss="modal">Close</button>`;
      break;
    case 'ok':
      btn2 = `<button class="btn btn-primary" data-dismiss="modal">Ok</button>`;
      break;
    case 'reload':
      btn2 = `<button onclick="window.location.reload(true);" class="btn btn-primary" data-dismiss="modal">Reload</button>`;
      break;
    default:
      btn = ``;
      break;
  }

  $('#snob-icon-modal').html('').html(`${icon}`);
  $('#snob-btn-modal').html('').append(btn1).append(btn2);
  halfmoon.toggleModal('modal-message')
  if(time){
    setTimeout(function(){ $('#modal-message').removeClass('show');   }, time);
  }

}
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
  const CRYSTAL_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_iceQueen","internalType":"address"},{"type":"address","name":"_snowball","internalType":"address"},{"type":"address","name":"_pgl","internalType":"address"},{"type":"uint256","name":"_poolId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"snowball","internalType":"uint256"},{"type":"uint256","name":"PGL","internalType":"uint256"},{"type":"uint256","name":"rewardCredit","internalType":"uint256"},{"type":"uint256","name":"rewardSnapshot","internalType":"uint256"},{"type":"uint256","name":"votes","internalType":"uint256"},{"type":"uint256","name":"thawTimestamp","internalType":"uint256"}],"name":"accounts","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amountSnowball","internalType":"uint256"},{"type":"uint256","name":"_amountPGL","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositPGL","inputs":[{"type":"uint256","name":"_amountIn","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositSnowball","inputs":[{"type":"uint256","name":"_amountIn","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"freeze","inputs":[{"type":"address","name":"_address","internalType":"address"},{"type":"uint256","name":"_duration","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIceQueen"}],"name":"iceQueen","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isFrozen","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingReward","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPangolinPair"}],"name":"pgl","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quadraticVotes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"snowball","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  const STAKING_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"OwnerChanged","inputs":[{"type":"address","name":"oldOwner","internalType":"address","indexed":false},{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerNominated","inputs":[{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"PauseChanged","inputs":[{"type":"bool","name":"isPaused","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardsDurationUpdated","inputs":[{"type":"uint256","name":"newDuration","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastPauseTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"min","inputs":[{"type":"uint256","name":"a","internalType":"uint256"},{"type":"uint256","name":"b","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"nominateNewOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"nominatedOwner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setPaused","inputs":[{"type":"bool","name":"_paused","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDuration","inputs":[{"type":"uint256","name":"_rewardsDuration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]

  //governance
  const CRYSTAL_VAULT_ADDRESS = "0xe5614C304D73d990B8BcA8F055Ec0f2685Ebf60c";

  //contracts
  const SNOWGLOBE_SUSHI_ADDR = "0x751089F1bf31B13Fa0F0537ae78108088a2253BF";
  const SNOWGLOBE_PNG_ADDR = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
  const SNOWGLOBE_ETH_ADDR = "0x586554828eE99811A8ef75029351179949762c26";
  const SNOWGLOBE_LINK_ADDR = "0x00933c16e06b1d15958317C2793BC54394Ae356C";
  const SNOWGLOBE_USDT_ADDR = "0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605";
  const ICEQUEEN_ADDR = "0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375";
  const STAKING_ADDR = "0xDC132af22690c0d3812ADF7260F083E7935092Bd";

  //pangolin pairs
  const SUSHI_AVAX_ADDR = "0xd8B262C0676E13100B33590F10564b46eeF652AD";
  const SNOB_AVAX_ADDR = "0xa1c2c3b6b120cbd4cec7d2371ffd4a931a134a32";
  const PNG_AVAX_ADDR = "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367";
  const ETH_AVAX_ADDR = "0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65";
  const LINK_AVAX_ADDR = "0xbbc7fff833d27264aac8806389e02f717a5506c9";
  const USDT_AVAX_ADDR = "0x9EE0a4E21bd333a6bb2ab298194320b8DaA26516";
  //tokens
  const SPGL_SUSHI_ADDRESS = "0x751089f1bf31b13fa0f0537ae78108088a2253bf";
  const SPGL_PNG_ADDRESS = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
  const SPGL_ETH_ADDRESS = "0x586554828eE99811A8ef75029351179949762c26";
  const SPGL_LINK_ADDRESS = "0x00933c16e06b1d15958317C2793BC54394Ae356C";
  const SPGL_USDT_ADDRESS = "0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605";
  const SNOB_ADDRESS = "0xC38f41A296A4493Ff429F1238e030924A1542e50";
  const S3D_ADDRESS = "0xdE1A11C331a0E45B9BA8FeE04D4B51A745f1e4A4"
  const S3F_ADDRESS = "0xA42BE3dB9aff3aee48167b240bFEE5e1697e1281"
  const TOKEN_NAMES = {
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": "AVAX",
    "0x60781C2586D68229fde47564546784ab3fACA982": "PNG",
    "0xC38f41A296A4493Ff429F1238e030924A1542e50": "SNOB",
    "0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc": "SUSHI",
    "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15": "ETH",
    "0xde3A24028580884448a5397872046a019649b084": "USDT",
    "0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651": "LINK"
  }
  //LP URLs
  const SNOB_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xC38f41A296A4493Ff429F1238e030924A1542e50";

  // TVL URLS
  const SUSHI_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x14ec55f8B4642111A5aF4f5ddc56B7bE867eB6cC"
  const SNOB_AVAX_TVL = "https://info.pangolin.exchange/#/account/0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375"
  const PNG_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x6A803904b9eA0Fc982fBB077c7243c244Ae05a2d"
  const ETH_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x953853590b805A0E885A75A3C786D2aFfcEEA3Cf"
  const LINK_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x974Ef0bDA58C81F3094e124f530eF34fe70dc103"
  const USDT_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x74dB28797957a52a28963F424dAF2B10226ba04C"

  const stakingContract_stake = async ({
    STAKING_ABI,
    STAKING_ADDR,
    S3F_ADDRESS,
    App,
    STAKING_CONTRACT,
    SNOB_TOKEN,
    S3F_TOKEN,
    renderPoolS3F,
  }) => {
    const signer = await App.provider.getSigner();
    const STAKING_TOKEN = new ethers.Contract(S3F_ADDRESS, ERC20_ABI, signer);
    const CHEF_CONTRACT = new ethers.Contract(STAKING_ADDR, STAKING_ABI, signer);
    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS);
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, STAKING_ADDR);
    if (allowedTokens === 0) {
      snobMessage(
        `Approve spending`,
        `Please approve spending first. Please check your Metamask Wallet`,
        `information-circle-outline`,
        `primary`,
        false,
        `ok`
      );
    } else if (currentTokens / 1e18 > 0) {
      halfmoon.toggleModal('modal-loading');
      let stakeResult;
      try {
        stakeResult = await CHEF_CONTRACT.stake(currentTokens);

        await App.provider.waitForTransaction(stakeResult.hash);

        await renderPoolS3F({
          STAKING_CONTRACT,
          App,
          SNOB_TOKEN,
          S3F_TOKEN,
        });

        halfmoon.toggleModal('modal-loading');
        snobMessage(`Tokens deposit`, `Tokens deposited`, `checkmark-circle-outline`, `success`, false, `ok`);
      } catch (err) {
        halfmoon.toggleModal('modal-loading');
        snobMessage(
          `Oops! Failed`,
          `Deposit Failed. Something went wrong`,
          `close-circle-outline`,
          `danger`,
          false,
          `ok`,
          false
        );
      }
    } else {
      snobMessage(`Oops! Failed`, `You have no tokens to stake`, `close-circle-outline`, `danger`, false, `ok`, false);
    }
  }

  const stakingContract_withdraw = async ({STAKING_ABI, STAKING_ADDR, App, SNOB_TOKEN, S3F_TOKEN, renderPoolS3F}) => {
    const signer = await App.provider.getSigner();
    const STAKING_CONTRACT = new ethers.Contract(STAKING_ADDR, STAKING_ABI, signer);
    const currentTokens = await STAKING_CONTRACT.balanceOf(App.YOUR_ADDRESS);

    if (currentTokens / 1e18 > 0) {
      halfmoon.toggleModal('modal-loading');

      let withdrawResult;

      try {
        withdrawResult = await STAKING_CONTRACT.withdraw(currentTokens);

        await App.provider.waitForTransaction(withdrawResult.hash);

        await renderPoolS3F({
          STAKING_CONTRACT,
          App,
          SNOB_TOKEN,
          S3F_TOKEN,
        });

        halfmoon.toggleModal('modal-loading');
        snobMessage(`Withdrawn Tokens`, `Tokens Withdrawn.`, `checkmark-circle-outline`, `success`, false, `ok`);
      } catch (err) {
        halfmoon.toggleModal('modal-loading');
        snobMessage(
          `Oops! Failed`,
          `Withdrawn Failed. Something went wrong`,
          `close-circle-outline`,
          `danger`,
          false,
          `ok`,
          false
        );
      }
    } else {
      snobMessage(
        `Withdrawn Tokens`,
        `Withdrawn failed . Something went wrong`,
        `close-circle-outline`,
        `danger`,
        false,
        `ok`,
        4000
      );
    }
  }

  const approveSPGLSUSHI = async function () {
    return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_SUSHI_ADDRESS, App)
  }
  const stakeSPGLSUSHI = async function () {
    return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
  }
  const approveSPGLPNG = async function () {
    return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_PNG_ADDRESS, App)
  }
  const stakeSPGLPNG = async function () {
    return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SPGL_PNG_ADDRESS, App)
  }
  const approveSPGLETH = async function () {
    return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_ETH_ADDRESS, App)
  }
  const stakeSPGLETH = async function () {
    return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SPGL_ETH_ADDRESS, App)
  }
  const approveSPGLUSDT = async function () {
    return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_USDT_ADDRESS, App)
  }
  const stakeSPGLUSDT = async function () {
    return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 5, SPGL_USDT_ADDRESS, App)
  }
  const approveSPGLLINK = async function () {
    return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_LINK_ADDRESS, App)
  }
  const stakeSPGLLINK = async function () {
    return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 6, SPGL_LINK_ADDRESS, App)
  }
  const approveS3D = async function () {
    return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, S3D_ADDRESS, App)
  }
  const stakeS3D  = async function () {
    return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 7, S3D_ADDRESS, App)
  }
  const approveS3F = async function () {
    return stakingContract_approve(STAKING_ABI, STAKING_ADDR, S3F_ADDRESS, App)
  }
  const stakeS3F  = async function () {
    return stakingContract_stake({
      STAKING_ABI, STAKING_ADDR, S3F_ADDRESS, App, STAKING_CONTRACT, SNOB_TOKEN, S3F_TOKEN, renderPoolS3F
    })
  }
  const approveSNOB = async function () {
    return icequeenContract_approve(PGL_ABI, ICEQUEEN_ADDR, SNOB_AVAX_ADDR, App)
  }
  const stakeSNOB = async function () {
    return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
  }
  const claimPool1 = async function () {
    return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SNOB_AVAX_ADDR, App)
  }
  const claimPool2 = async function () {
    return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
  }
  const claimPool3 = async function () {
    return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SNOB_AVAX_ADDR, App)
  }
  const claimPool4 = async function () {
    return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SNOB_AVAX_ADDR, App)
  }
  const claimPool5 = async function () {
    return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 5, SNOB_AVAX_ADDR, App)
  }
  const claimPool6 = async function () {
    return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 6, SNOB_AVAX_ADDR, App)
  }
  const claimPool7 = async function () {
    return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 7, SNOB_AVAX_ADDR, App)
  }
  const claimPool8 = async function () {
    return stakingContract_claim(STAKING_ABI, STAKING_ADDR,  S3F_ADDRESS, App)
  }
  const withdrawPool1 = async function () {
    return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
  }
  const withdrawPool2 = async function () {
    return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
  }
  const withdrawPool3 = async function () {
    return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SPGL_PNG_ADDRESS, App)
  }
  const withdrawPool4 = async function () {
    return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SPGL_ETH_ADDRESS, App)
  }
  const withdrawPool5 = async function () {
    return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 5, SPGL_USDT_ADDRESS, App)
  }
  const withdrawPool6 = async function () {
    return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 6, SPGL_LINK_ADDRESS, App)
  }
  const withdrawPool7 = async function () {
    return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 7, SPGL_LINK_ADDRESS, App)
  }
  const withdrawPool8 = async function () {
    return stakingContract_withdraw({STAKING_ABI, STAKING_ADDR, S3F_ADDRESS, App, STAKING_CONTRACT, SNOB_TOKEN, S3F_TOKEN, renderPoolS3F})
  }
  const signer = App.provider.getSigner()

  //Tokens
  const SNOB_AVAX_TOKEN = new ethers.Contract(SNOB_AVAX_ADDR, ERC20_ABI, signer)
  const S3D_TOKEN = new ethers.Contract(S3D_ADDRESS, ERC20_ABI, signer)
  const S3F_TOKEN = new ethers.Contract(S3F_ADDRESS, ERC20_ABI, signer)
  const SPGL_SUSHI_TOKEN = new ethers.Contract(SPGL_SUSHI_ADDRESS, ERC20_ABI, signer)
  const SPGL_PNG_TOKEN = new ethers.Contract(SPGL_PNG_ADDRESS, ERC20_ABI, signer)
  const SPGL_ETH_TOKEN = new ethers.Contract(SPGL_ETH_ADDRESS, ERC20_ABI, signer)
  const SPGL_LINK_TOKEN = new ethers.Contract(SPGL_LINK_ADDRESS, ERC20_ABI, signer)
  const SPGL_USDT_TOKEN = new ethers.Contract(SPGL_USDT_ADDRESS, ERC20_ABI, signer)
  const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)
  //Contracts
  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)
  const STAKING_CONTRACT = new ethers.Contract(STAKING_ADDR, STAKING_ABI, signer)
  let snobTotalSupply, pendingSNOBTokensPool1, pendingSNOBTokensPool2, pendingSNOBTokensPool3, pendingSNOBTokensPool4, pendingSNOBTokensPool5, pendingSNOBTokensPool6, pendingSNOBTokensPool7, pendingSNOBTokensPool8;
  let currentSNOBTokens, snowballMultiplier, blockRate, blockNumber, currentBlock, yesterdayBlock;

  await Promise.all([
    SNOB_TOKEN.totalSupply(),
    ICEQUEEN_CONTRACT.pendingSnowball(1, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(2, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(3, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(4, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(5, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(6, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(7, App.YOUR_ADDRESS),
    SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.BONUS_MULTIPLIER(),
    ICEQUEEN_CONTRACT.snowballPerBlock(),
    App.provider.getBlockNumber(),
    STAKING_CONTRACT.earned(App.YOUR_ADDRESS)
  ]).then(res => {
    snobTotalSupply = res[0]
    pendingSNOBTokensPool1 = res[1]
    pendingSNOBTokensPool2 = res[2]
    pendingSNOBTokensPool3 = res[3]
    pendingSNOBTokensPool4 = res[4]
    pendingSNOBTokensPool5 = res[5]
    pendingSNOBTokensPool6 = res[6]
    pendingSNOBTokensPool7 = res[7]
    currentSNOBTokens = res[8]
    snowballMultiplier = res[9]
    blockRate = res[10]
    blockNumber = res[11]
    pendingSNOBTokensPool8 = res[12]
  })

  await Promise.all([
    App.provider.getBlock(blockNumber),
    App.provider.getBlock(blockNumber - 20000)
  ]).then(res => {
    currentBlock = res[0]
    yesterdayBlock = res[1]
  })
  //votes
  const CRYSTAL_CONTRACT = new ethers.Contract(CRYSTAL_VAULT_ADDRESS, CRYSTAL_VAULT_ABI, signer);
  const assetsDeposited = await CRYSTAL_CONTRACT.accounts(App.YOUR_ADDRESS);
  const pendingGovReward = await CRYSTAL_CONTRACT.pendingReward(App.YOUR_ADDRESS);
  console.log("PGL deposited:", assetsDeposited.PGL / 1e18);
  console.log("Snowball deposited:", assetsDeposited.snowball / 1e18);
  console.log("Gov pending:", pendingGovReward / 1e18);

  // wallet info
  const claimableSnowballs = pendingGovReward / 1e18 + pendingSNOBTokensPool1 / 1e18 + pendingSNOBTokensPool2 / 1e18 + pendingSNOBTokensPool3 / 1e18 + pendingSNOBTokensPool4 / 1e18 + pendingSNOBTokensPool5 / 1e18 + pendingSNOBTokensPool6 / 1e18 + pendingSNOBTokensPool7 / 1e18 + pendingSNOBTokensPool8 / 1e18;
  const snowballsPerBlock = blockRate
  const secondsInDay = 86400;
  
  const blocks24hrs = (secondsInDay / (currentBlock.timestamp - yesterdayBlock.timestamp)) * 20000;
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
  try {
    if (currentSNOBTokens / 1e18 > 0 || claimableSnowballs > 0 || assetsDeposited.snowball / 1e18 > 0) {
      $('#account-info').show();
      $('#snob-info').show();
      $('#value-snob').append(`${(currentSNOBTokens / 1e18 + claimableSnowballs).toFixed(4)}`);
      $('#value-usd').append(`${((currentSNOBTokens / 1e18 + claimableSnowballs) * snobPrice).toFixed(2)}`);
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

  let currentSPGLSUSHITokens, currentSPGLPNGTokens, currentSPGLETHTokens, currentSPGLUSDTTokens, currentSPGLLINKTokens, currentS3DTokens, currentS3FTokens, currentSNOBAVAXTokens;
  let stakedPool1, stakedPool2, stakedPool3, stakedPool4, stakedPool5, stakedPool6, stakedPool7, stakedPool8;
  let totalStakedSPGLSUSHI, totalStakedSPGLPNG, totalStakedSPGLETH, totalStakedSNOBAVAX, totalStakedSPGLUSDT, totalStakedSPGLLINK, totalStakedS3D, totalStakedS3F, s3FRewardRate;

  await Promise.all([
    SPGL_SUSHI_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPGL_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPGL_ETH_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPGL_USDT_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPGL_LINK_TOKEN.balanceOf(App.YOUR_ADDRESS),
    S3D_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SNOB_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS),

    ICEQUEEN_CONTRACT.userInfo(1, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.userInfo(2, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.userInfo(3, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.userInfo(4, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.userInfo(5, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.userInfo(6, App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.userInfo(7, App.YOUR_ADDRESS),

    SPGL_SUSHI_TOKEN.balanceOf(ICEQUEEN_ADDR),
    SPGL_PNG_TOKEN.balanceOf(ICEQUEEN_ADDR),
    SPGL_ETH_TOKEN.balanceOf(ICEQUEEN_ADDR),
    SNOB_AVAX_TOKEN.balanceOf(ICEQUEEN_ADDR),
    SPGL_USDT_TOKEN.balanceOf(ICEQUEEN_ADDR),
    SPGL_LINK_TOKEN.balanceOf(ICEQUEEN_ADDR),
    S3D_TOKEN.balanceOf(ICEQUEEN_ADDR),
    S3F_TOKEN.balanceOf(App.YOUR_ADDRESS),
    STAKING_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    STAKING_CONTRACT.totalSupply(),
    STAKING_CONTRACT.rewardRate()
  ]).then(res => {
    currentSPGLSUSHITokens = res[0]
    currentSPGLPNGTokens = res[1]
    currentSPGLETHTokens = res[2]
    currentSPGLUSDTTokens = res[3]
    currentSPGLLINKTokens = res[4]
    currentS3DTokens = res[5]
    currentSNOBAVAXTokens = res[6]

    stakedPool1 = res[7]
    stakedPool2 = res[8]
    stakedPool3 = res[9]
    stakedPool4 = res[10]
    stakedPool5 = res[11]
    stakedPool6 = res[12]
    stakedPool7 = res[13]

    totalStakedSPGLSUSHI = res[14]
    totalStakedSPGLPNG = res[15]
    totalStakedSPGLETH = res[16]
    totalStakedSNOBAVAX = res[17]
    totalStakedSPGLUSDT = res[18]
    totalStakedSPGLLINK = res[19]
    totalStakedS3D = res[20]
    currentS3FTokens = res[21]
    stakedPool8 = res[22]
    totalStakedS3F = res[23]
    s3FRewardRate = res[24]
  })

  //Balances
  const spglSushiDisplayAmt = currentSPGLSUSHITokens > 1000 ? currentSPGLSUSHITokens / 1e18 : 0;
  const spglPngDisplayAmt = currentSPGLPNGTokens > 1000 ? currentSPGLPNGTokens / 1e18 : 0;
  const spglEthDisplayAmt = currentSPGLETHTokens > 1000 ? currentSPGLETHTokens / 1e18 : 0;
  const spglUsdtDisplayAmt = currentSPGLUSDTTokens > 1000 ? currentSPGLUSDTTokens / 1e18 : 0;
  const spglLinkDisplayAmt = currentSPGLLINKTokens > 1000 ? currentSPGLLINKTokens / 1e18 : 0;
  const S3DDisplayAmt = currentS3DTokens > 1000 ? currentS3DTokens / 1e18 : 0;
  const S3FDisplayAmt = currentS3FTokens > 1000 ? currentS3FTokens / 1e18 : 0;
  const snobAvaxDisplayAmt = currentSNOBAVAXTokens > 1000 ? currentSNOBAVAXTokens / 1e18 : 0;

  const userPool8Percent = (stakedPool8 / 1e18) / (totalStakedS3F / 1e18) * 100
  const userPool7Percent = (stakedPool7.amount / 1e18) / (totalStakedS3D / 1e18) * 100
  const userPool6Percent = (stakedPool6.amount / 1e18) / (totalStakedSPGLLINK / 1e18) * 100
  const userPool5Percent = (stakedPool5.amount / 1e18) / (totalStakedSPGLUSDT / 1e18) * 100
  const userPool4Percent = (stakedPool4.amount / 1e18) / (totalStakedSPGLETH / 1e18) * 100
  const userPool3Percent = (stakedPool3.amount / 1e18) / (totalStakedSPGLPNG / 1e18) * 100
  const userPool2Percent = (stakedPool2.amount / 1e18) / (totalStakedSNOBAVAX / 1e18) * 100
  const userPool1Percent = (stakedPool1.amount / 1e18) / (totalStakedSPGLSUSHI / 1e18) * 100
  
  const poolShareDisplay_7 = `${(stakedPool7.amount / 1e18).toFixed(6)} S3D`;
  const poolShareDisplay_8 = `${(stakedPool8 / 1e18).toFixed(6)} S3F`;

  const pool7weight = 0.20
  const pool6weight = 0.08
  const pool5weight = 0.05
  const pool4weight = 0.08
  const pool3weight = 0.11
  const pool2weight = 0.40
  const pool1weight = 0.08

  const pool8tvl = totalStakedS3F / 1e18;
  const pool8tvlDisplay = `$${new Intl.NumberFormat('en-US').format(pool8tvl)}`;
  const pool8APR = 2666 * snobPrice / pool8tvl * 100;
  
  const pool7tvl = totalStakedS3D / 1e18;
  const pool7tvlDisplay = `$${new Intl.NumberFormat('en-US').format(pool7tvl)}`;
  const pool7APR = snowballsPerBlock * pool7weight / 1e18 * 15000 * snobPrice / pool7tvl * 100;
  
  let pool6APR, pool5APR, pool4APR, pool3APR, pool2APR, pool1APR;
  let pool6tvl, pool5tvl, pool4tvl, pool3tvl, pool2tvl, pool1tvl;
  let pool6tvlDisplay, pool5tvlDisplay, pool4tvlDisplay, pool3tvlDisplay, pool2tvlDisplay, pool1tvlDisplay;

  let tvl_class = 'tvl-hide';
  let res = null;

  try {
    res = await $.ajax({
      url: 'https://x-api.snowball.network/dex/0xc38f41a296a4493ff429f1238e030924a1542e50/tvl.json',
      type: 'GET',
    })
    if (res && res.pairs && res.locked) {

      res.pairs.forEach( p => {
        if ( pairmatch(p, 'usdt', 'wavax') ) {
          pool5tvl = p.locked;
          pool5tvlDisplay = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          pool5APR = snowballsPerBlock * pool5weight / 1e18 * 15000 * snobPrice / p.locked * 100;
        } else if ( pairmatch(p, 'link', 'wavax') ) {
          pool6tvl = p.locked;
          pool6tvlDisplay = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          pool6APR = snowballsPerBlock * pool6weight / 1e18 * 15000 * snobPrice / p.locked * 100;
        } else if ( pairmatch(p, 'sushi', 'wavax') ) {
          pool1tvl = p.locked;
          pool1tvlDisplay = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          pool1APR = snowballsPerBlock * pool1weight / 1e18 * 15000 * snobPrice / p.locked * 100;
        } else if ( pairmatch(p, 'png', 'wavax') ) {
          pool3tvl = p.locked;
          pool3tvlDisplay = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          pool3APR = snowballsPerBlock * pool3weight / 1e18 * 15000 * snobPrice / p.locked * 100;
        } else if ( pairmatch(p, 'eth', 'wavax') ) {
          pool4tvl = p.locked;
          pool4tvlDisplay = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
          pool4APR = snowballsPerBlock * pool4weight / 1e18 * 15000 * snobPrice / p.locked * 100;
        } else if ( pairmatch(p, 'snob', 'wavax') ) {
          pool2tvl = p.locked;
          pool2tvlDisplay = `$${new Intl.NumberFormat('en-US').format(p.locked)}`          
          pool2APR = snowballsPerBlock * pool2weight / 1e18 * 15000 * snobPrice / p.locked * 100;
        }
      });

      if ( res.locked > 6000000) {
        tvl_class = 'tvl-show';
      }      
    }    
  } catch(e) {
    console.log('could not get tvl:', e);
  }
  // APR
  const PngStakingContracts= [
    {
      stakingRewardAddress: '0x417C02150b9a31BcaCb201d1D60967653384E1C6'
    },
    {
      stakingRewardAddress: '0x574d3245e36Cf8C9dc86430EaDb0fDB2F385F829'
    },
    {
      stakingRewardAddress: '0xDA354352b03f87F84315eEF20cdD83c49f7E812e'
    },
    {
      stakingRewardAddress: '0xBDa623cDD04d822616A263BF4EdbBCe0B7DC4AE7'
    },
    {
      stakingRewardAddress: '0x94C021845EfE237163831DAC39448cFD371279d6'
    }
  ]
  const tokens = {};
  const pools = PngStakingContracts.map(c => { return {
    address: c.stakingRewardAddress,
    abi: PNG_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }})
  let apr_array = await loadMultipleSnowglobePools(App, tokens, prices, pools)
  const eth_apr = apr_array[0]
  const png_apr = apr_array[1]
  const sushi_apr = apr_array[2]
  const link_apr = apr_array[3]
  const usdt_apr = apr_array[4]

  let compounds_per_year = 6 * 365
  let eth_r = eth_apr.yearlyAPR / 100
  let eth_annual_apy = 100 * (1 + eth_r / compounds_per_year) ** compounds_per_year - 100
  let png_r = png_apr.yearlyAPR / 100
  let png_annual_apy = 100 * (1 + png_r / compounds_per_year) ** compounds_per_year - 100
  let sushi_r = sushi_apr.yearlyAPR / 100
  let sushi_annual_apy = 100 * (1 + sushi_r / compounds_per_year) ** compounds_per_year - 100
  let link_r = link_apr.yearlyAPR / 100
  let link_annual_apy = 100 * (1 + link_r / compounds_per_year) ** compounds_per_year - 100
  let usdt_r = usdt_apr.yearlyAPR/100
  let usdt_annual_apy = 100*(1 + usdt_r/compounds_per_year)**compounds_per_year - 100


  const stakeUnstake = (amount, stake, st) => {
    return `<div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
    <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
    <p class="m-0 font-size-16 font-weight-regular">${amount} ${(st?st:'sPGL')} </p>
    <p class="m-0 font-size-12">(Available to ${(stake? 'Stake': 'Unstake')}) </p>
    </div>`
  }

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

  const calculateShare = (snowglobeContract, PAIR_ADDR, userSPGL, decimals, pool_percent) => {
    let pglContract = new ethers.Contract(PAIR_ADDR, PGL_ABI, signer)
    return Promise.all([
      snowglobeContract ? snowglobeContract.balance() : Promise.resolve(0), 
      snowglobeContract ? snowglobeContract.totalSupply() : Promise.resolve(0),
      pglContract.totalSupply(),
      pglContract.getReserves(),
      pglContract.token0(),
      pglContract.token1()
    ]).then(res => {
      let totalPoolPGL = res[0]
      let totalSPGL = res[1]
      let totalSupplyPGL = res[2] / 1e18
      let reserves = res[3]
      let token0Address = res[4]
      let token1Address = res[5]
      let ownedPGL = userSPGL * (totalPoolPGL / 1e18) / (totalSPGL / 1e18);        
      const r0 = reserves._reserve0 / 1e18
      const r1 = reserves._reserve1 / decimals
      let reserve0Owned = ownedPGL * (r0) / (totalSupplyPGL);
      let reserve1Owned = ownedPGL * (r1) / (totalSupplyPGL);
      const t0Price = prices[token0Address] ? prices[token0Address].usd : 0
      const t1Price = prices[token1Address] ? prices[token1Address].usd : 0
      const token0ValueUSDT = reserve0Owned * t0Price;
      const token1ValueUSDT = reserve1Owned * t1Price;
      const value = token0ValueUSDT + (token1ValueUSDT);
      return [
        `${userSPGL > 1 ? userSPGL.toFixed(3) : userSPGL.toFixed(8)} sPGL`,
        `${ownedPGL > 1 ? ownedPGL.toFixed(3) : ownedPGL.toFixed(8)} PGL - ${pool_percent.toFixed(6)}%`,
        `<div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
          <p class="m-0 font-size-12"><ion-icon name="flame-outline"></ion-icon> Your LP value is</p>
          <p class="m-0 font-size-16 font-weight-regular">${reserve0Owned.toFixed(3)} ${TOKEN_NAMES[token0Address]} / ${reserve1Owned.toFixed(3)} ${TOKEN_NAMES[token1Address]}  </p>
          <p class="m-0 font-size-12">($${value.toFixed(2)})***</p>
        </div>`,
        totalPoolPGL];
    }).catch( err => {
      console.log('error calculating PGL value:', err)
    })    
  }

  // PGL & LP values
  //SNOWGLOBE_SUSHI_ADDR
  const snowglobeContract_1 = new ethers.Contract(SNOWGLOBE_SUSHI_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_1, poolShareDisplay_1_pgl, stakeDisplay_1, totalPoolPGL_1;
  if (stakedPool1.amount / 1e18 > 0) {
    let ret_1 = await calculateShare(snowglobeContract_1, SUSHI_AVAX_ADDR, stakedPool1.amount / 1e18, 1e18, userPool1Percent)
    poolShareDisplay_1 = ret_1[0]
    poolShareDisplay_1_pgl = ret_1[1]
    stakeDisplay_1 = ret_1[2]
    totalPoolPGL_1 = ret_1[3]
  }
    
  let poolShareDisplay_2, poolShareDisplay_2_pgl, stakeDisplay_2, totalPoolPGL_2;
  if (stakedPool2.amount / 1e18 > 0) {
    let ret_2 = await calculateShare(null, SNOB_AVAX_ADDR, stakedPool2.amount / 1e18, 1e18, userPool2Percent)
    poolShareDisplay_2 = ret_2[0]
    poolShareDisplay_2_pgl = ret_2[1]
    stakeDisplay_2 = ret_2[2]
    totalPoolPGL_2 = ret_2[3]
  }

  //SNOWGLOBE_PNG_ADDR
  const snowglobeContract_3 = new ethers.Contract(SNOWGLOBE_PNG_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_3, poolShareDisplay_3_pgl, stakeDisplay_3, totalPoolPGL_3;
  if (stakedPool3.amount / 1e18 > 0) {
    let ret_3 = await calculateShare(snowglobeContract_3, PNG_AVAX_ADDR, stakedPool3.amount / 1e18, 1e18, userPool3Percent)
    poolShareDisplay_3 = ret_3[0]
    poolShareDisplay_3_pgl = ret_3[1]
    stakeDisplay_3 = ret_3[2]
    totalPoolPGL_3 = ret_3[3]
  }

  //SNOWGLOBE_ETH_ADDR
  const snowglobeContract_4 = new ethers.Contract(SNOWGLOBE_ETH_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_4, poolShareDisplay_4_pgl, stakeDisplay_4, totalPoolPGL_4;
  if (stakedPool4.amount / 1e18 > 0) {
    let ret_4 = await calculateShare(snowglobeContract_4, ETH_AVAX_ADDR, stakedPool4.amount / 1e18, 1e18, userPool4Percent)
    poolShareDisplay_4 = ret_4[0]
    poolShareDisplay_4_pgl = ret_4[1]
    stakeDisplay_4 = ret_4[2]
    totalPoolPGL_4 = ret_4[3]
  }

  //SNOWGLOBE_USDT_ADDR
  const snowglobeContract_5 = new ethers.Contract(SNOWGLOBE_USDT_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_5, poolShareDisplay_5_pgl, stakeDisplay_5, totalPoolPGL_5;
  if (stakedPool5.amount / 1e18 > 0) {
    let ret_5 = await calculateShare(snowglobeContract_5, USDT_AVAX_ADDR, stakedPool5.amount / 1e18, 1e6, userPool5Percent)
    poolShareDisplay_5 = ret_5[0]
    poolShareDisplay_5_pgl = ret_5[1]
    stakeDisplay_5 = ret_5[2]
    totalPoolPGL_5 = ret_5[3]
  }

  //SNOWGLOBE_LINK_ADDR
  const snowglobeContract_6 = new ethers.Contract(SNOWGLOBE_LINK_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_6, poolShareDisplay_6_pgl, stakeDisplay_6, totalPoolPGL_6;
  if (stakedPool6.amount / 1e18 > 0) {
    let ret_6 = await calculateShare(snowglobeContract_6, LINK_AVAX_ADDR, stakedPool6.amount / 1e18, 1e18, userPool6Percent)
    poolShareDisplay_6 = ret_6[0]
    poolShareDisplay_6_pgl = ret_6[1]
    stakeDisplay_6 = ret_6[2]
    totalPoolPGL_6 = ret_6[3]
  }


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

      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} sPGL </span>
        <span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_pgl / 1e18).toLocaleString()} PGL</span>`;

    } else if (options.total_staked) {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} sPGL </span>`;
    } else {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.total_pgl / 1e18).toLocaleString()} PGL</span>`;
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
        <p class="m-0 font-size-12"> Estimated Rate 2</p>
        <span class="badge badge-success font-size-12 px-5 px-sm-10 mx-10">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)} SNOB <ion-icon name="trending-up-outline"></ion-icon></span>
        <p class="m-0 font-size-12">(24hr block rate)</p>
        </div>`;

      var earning = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You are earning</p>
        <p class="m-0 font-size-16 font-weight-regular">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)} SNOB </p>
        <p class="m-0 font-size-12">per day ($${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(Average block rate)</p>
        </div>`
    }
    availableStake = '';
    if ( options.display_amount > 0 ) {
      availableStake = stakeUnstake(options.display_amount.toFixed(6), true);
    }
    availableUnstake = '';
    if ( options.staked_pool.amount / 1e18 > 0 ) {      
      availableUnstake = stakeUnstake((options.staked_pool.amount / 1e18).toFixed(6), false);
    }

    let has_options = false
    approveBtn = '';
    stakeBtn = '';
    unstakeBtn = '';
    claimBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true
      approveBtn = `<button data-btn="${options.approve}" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button data-btn="${options.stake}" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake sPGL</button>`;
    }
    if ( options.staked_pool.amount / 1e18 > 0 ) {
      has_options = true
      unstakeBtn = `<button data-btn="${options.unstake}" class="btn btn-sm mx-10 unstakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Unstake sPGL</button>`;
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      claimBtn = `<button data-btn="${options.claim}" class="btn btn-primary btn-sm claimBtn"><ion-icon name="push-outline"></ion-icon> Harvest SNOB</button>`;
    }
    if (!has_options){

      var poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens" class="align-items-center d-flex mx-auto mx-md-0">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center d-flex flex-column snob-tvl pb-10 pb-md-0 mx-auto">
                    <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                </div>
                <div class="col-sm-12 col-md-2 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <a href="/compound" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get sPGL from Snowglobes</a>
                    <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APRs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display: none;">
                <div class="row">
                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="bowling-ball-outline"></ion-icon> Allocation</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.pool_weight * 100)}%</span>
                        <p class="m-0 font-size-12 pt-10"><ion-icon name="ellipse-outline"></ion-icon> SNOB per day</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${snowballsPerBlock * options.pool_weight / 1e18 * 15000}</span>
                    </div>

                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
                        <p class="m-0 font-size-16 font-weight-regular">O sPGL </p>
                        <p class="m-0 font-size-12">(No sPGL to Stake/Withdraw) </p>
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
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                ${estimatedRate}
                <div class="col-sm-12 col-md-3 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                ${approveBtn}
                ${stakeBtn}
                ${unstakeBtn}
                ${claimBtn}
                <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APRs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>

            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display:none">
                <div class="row">
                    <div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="bowling-ball-outline"></ion-icon> Allocation</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.pool_weight * 100)}%</span>
                        <p class="m-0 font-size-12 pt-10"><ion-icon name="ellipse-outline"></ion-icon> SNOB per day</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${snowballsPerBlock * options.pool_weight / 1e18 * 15000}</span>
                    </div>
                    <div class="col-sm-12 col-md-2 align-items-center d-flex flex-column text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                    </div>
                    ${poolShare}

                </div>
                <div class="row pt-20">
                    ${earning}
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
  function poolS3D(options) {
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
        <span class="badge badge-success font-size-12 px-5 px-sm-10 mx-10">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)} SNOB <ion-icon name="trending-up-outline"></ion-icon></span>
        <p class="m-0 font-size-12">per day ($${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(24hr block rate)</p>
        </div>`;

      var earning = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You are earning</p>
        <p class="m-0 font-size-16 font-weight-regular">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)} SNOB </p>
        <p class="m-0 font-size-12">per day ($${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(Average block rate)</p>
        </div>`
    }
    var availableStake = '';
    if ( options.display_amount > 0 ) {
      availableStake = stakeUnstake(options.display_amount.toFixed(6), true, 'S3D');
    }
    var availableUnstake = ''
    if ( options.staked_pool.amount / 1e18 > 0 ) {
      availableUnstake = stakeUnstake((options.staked_pool.amount / 1e18).toFixed(6), false, 'S3D');
    }
    let has_options = false
    approveBtn = '';
    stakeBtn = '';
    unstakeBtn = '';
    claimBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true
      approveBtn = `<button data-btn="${options.approve}" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button data-btn="${options.stake}" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake S3D</button>`;
    }
    if ( options.staked_pool.amount / 1e18 > 0 ) {
      has_options = true
      unstakeBtn = `<button data-btn="${options.unstake}" class="btn btn-sm mx-10 unstakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Unstake S3D</button>`;
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      claimBtn = `<button data-btn="${options.claim}" class="btn btn-primary btn-sm claimBtn"><ion-icon name="push-outline"></ion-icon> Harvest SNOB</button>`;
    }

    if( !has_options ){
      let poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens-3sd" class="align-items-center d-flex mx-auto mx-md-0 ">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token3}" alt="${options.pool_name}">
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
                    <a href="/stablevault" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get S3D from StableVault</a>
                    <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APRs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display: none;">
                <div class="row">
                    <div class="col-sm-12 col-md-3 align-items-center pb-10">
                        <div class="row">
                            <p class="w-full text-center">Rewards APR :</p>
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
                                <p class="m-0 font-size-12 font-weight-regular">${eDayAPR}% </p>
                                <p class="m-0 font-size-12 font-weight-regular">${eYearAPR}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ${combinedAprDisplay}
                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="bowling-ball-outline"></ion-icon> Allocation</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.pool_weight * 100)}%</span>
                        <p class="m-0 font-size-12 pt-10"><ion-icon name="ellipse-outline"></ion-icon> SNOB per day</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${snowballsPerBlock * options.pool_weight / 1e18 * 15000}</span>
                    </div>

                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
                        <p class="m-0 font-size-16 font-weight-regular">O S3D </p>
                        <p class="m-0 font-size-12">(No S3D to Stake/Withdraw) </p>
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
                      <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                      <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                      <img class="rounded-circle" width="48" src="${options.logo_token3}" alt="${options.pool_name}">
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
              ${estimatedRate}
              <div class="col-sm-12 col-md-3 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
              ${approveBtn}
              ${stakeBtn}
              ${unstakeBtn}
              ${claimBtn}
              <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APRs and TVL on Markr.io</a>
              </div>

              <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                  <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
              </div>
          </div>

          <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display:none">
              <div class="row">
                  <div class="col-sm-12 col-md-2 align-items-center pb-10">
                      <div class="row text-center">
                          <p class="font-weight-light">Rewards APR :</p>
                      </div>
                      <div class="row">
                          <div class="form-inline w-50 ">
                              <div class="form-group m-md-0">
                                  <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                                  <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                              </div>
                          </div>
                          <div class="form-inline w-50 mx-auto">
                              <div class="form-group m-md-0">
                              <p class="m-0 font-size-12 font-weight-regular">${eDayAPR}% </p>
                              <p class="m-0 font-size-12 font-weight-regular">${eYearAPR}%</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  ${combinedAprDisplay}
                  <div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
                      <p class="m-0 font-size-12"><ion-icon name="bowling-ball-outline"></ion-icon> Allocation</p>
                      <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.pool_weight * 100)}%</span>
                      <p class="m-0 font-size-12 pt-10"><ion-icon name="ellipse-outline"></ion-icon> SNOB per day</p>
                      <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${snowballsPerBlock * options.pool_weight / 1e18 * 15000}</span>
                  </div>
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
                  ${earning}

                  ${availableStake}
                  
                  ${availableUnstake}
              </div>
          </div>
      </div>
  </div>`;
      $('#snob-pools-new').append(poolPrint);
    }


  }
  function poolS3F(options){
    let poolId = `pool_${options.pool_name.split(' ').join('')}`;
    let eDayAPR = options.icequeen_apr;
    let eYearAPR = options.icequeen_apr * 365;
  
    poolSize = '';
    if (options.total_staked) {
      let poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} S3F </span>`;
    }
    let estimatedRate = '';
    let poolShare = '';
    let earning = '';
    let stakeDisplay = '';
  
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
  
      estimatedRate = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0 mx-auto">
        <p class="m-0 font-size-12"> Estimated Rate</p>
        <span class="badge badge-success font-size-12 px-5 px-sm-10 mx-10">${(2666 * options.user_pool_percent / 100 ).toFixed(2)} SNOB <ion-icon name="trending-up-outline"></ion-icon></span>
        <p class="m-0 font-size-12">per day ($${(2666 * options.user_pool_percent / 100 * options.snobPrice).toFixed(2)})</p>
        </div>`;
  
      earning = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You are earning</p>
        <p class="m-0 font-size-16 font-weight-regular">${(2666 * options.user_pool_percent / 100 ).toFixed(2)} SNOB </p>
        <p class="m-0 font-size-12">per day ($${(2666 * options.user_pool_percent / 100 * options.snobPrice).toFixed(2)})</p>
        </div>`
    }
  
    let availableStake = '';
    if ( options.display_amount > 0 ) {
      availableStake = stakeUnstake(options.display_amount.toFixed(6), true, 'S3F');
    }
    let availableUnstake = ''
    if ( options.staked_pool / 1e18 > 0 ) {
      availableUnstake = stakeUnstake((options.staked_pool / 1e18).toFixed(6), false, 'S3F');
    }
    let has_options = false
    approveBtn = '';
    stakeBtn = '';
    unstakeBtn = '';
    claimBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true
      approveBtn = `<button data-btn="${options.approve}" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button data-btn="${options.stake}" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake S3F</button>`;
    }
    if ( options.staked_pool / 1e18 > 0 ) {
      has_options = true
      unstakeBtn = `<button data-btn="${options.unstake}" class="btn btn-sm mx-10 unstakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Unstake S3F</button>`;
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      claimBtn = `<button data-btn="${options.claim}" class="btn btn-primary btn-sm claimBtn"><ion-icon name="push-outline"></ion-icon> Harvest SNOB</button>`;
    }
  
    if( !has_options ){
      let poolPrint = `<div id="${poolId}" class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens-3sd" class="align-items-center d-flex mx-auto mx-md-0 ">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <img style="background-color: white" class="rounded-circle" width="48" src="${options.logo_token3}" alt="${options.pool_name}">
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
                        <p class="m-0 font-size-12 font-weight-regular">${eDayAPR.toFixed(2)}% </p>
                        <p class="m-0 font-size-12 font-weight-regular">${eYearAPR.toFixed(2)}% </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center d-flex flex-column snob-tvl pb-10 pb-md-0 mx-auto">
                    <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                </div>
                <div class="col-sm-12 col-md-2 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <a href="/stablevault" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get S3F from StableVault</a>
                </div>
  
                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display: none;">
                <div class="row">
                    <div class="col-sm-12 col-md-3 align-items-center pb-10">
                        <div class="row">
                            <p class="w-full text-center">Rewards APR :</p>
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
                        <p class="m-0 font-size-12 font-weight-regular">${eDayAPR.toFixed(2)}% </p>
                        <p class="m-0 font-size-12 font-weight-regular">${eYearAPR.toFixed(2)}% </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="bowling-ball-outline"></ion-icon> Allocation</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">80,000 SNOB</span>
                        <p class="m-0 font-size-12 pt-10"><ion-icon name="ellipse-outline"></ion-icon> SNOB per day</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">2666</span>
                    </div>
  
                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
                        <p class="m-0 font-size-16 font-weight-regular">O S3F </p>
                        <p class="m-0 font-size-12">(No S3F to Stake/Withdraw) </p>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
  
      if($(`#${poolId}`).length) {
        $(`#${poolId}`).replaceWith(poolPrint);
      }
      else {
        $('#snob-pools-new').append(poolPrint); 
      }   
    }
    if(has_options){
      let poolPrint = `<div id="${poolId}" class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens-3sd" class="align-items-center d-flex mx-auto mx-md-0">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <img style="background-color: white" class="rounded-circle" width="48" src="${options.logo_token3}" alt="${options.pool_name}">
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
                          <p class="m-0 font-size-12 font-weight-regular">${eDayAPR.toFixed(2)}% </p>
                          <p class="m-0 font-size-12 font-weight-regular">${eYearAPR.toFixed(2)}% </p>
                        </div>
                    </div>
  
                </div>
                ${estimatedRate}
                <div class="col-sm-12 col-md-3 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                ${approveBtn}
                ${stakeBtn}
                ${unstakeBtn}
                ${claimBtn}
                <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APRs and TVL on Markr.io</a>
                </div>
  
                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
  
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display:none">
                <div class="row">
                    <div class="col-sm-12 col-md-2 align-items-center pb-10">
                        <div class="row text-center">
                            <p class="font-weight-light">Rewards APR :</p>
                        </div>
                        <div class="row">
                            <div class="form-inline w-50 ">
                                <div class="form-group m-md-0">
                                    <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                                    <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                                </div>
                            </div>
                            <div class="form-inline w-50 mx-auto">
                                <div class="form-group m-md-0">
                          <p class="m-0 font-size-12 font-weight-regular">${eDayAPR.toFixed(2)}% </p>
                          <p class="m-0 font-size-12 font-weight-regular">${eYearAPR.toFixed(2)}% </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
                          <p class="m-0 font-size-12"><ion-icon name="bowling-ball-outline"></ion-icon> Allocation</p>
                          <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">80,000 SNOB</span>
                          <p class="m-0 font-size-12 pt-10"><ion-icon name="ellipse-outline"></ion-icon> SNOB per day</p>
                          <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">2666</span>
                    </div>
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
                    ${earning}
  
                    ${availableStake}
                    
                    ${availableUnstake}
                </div>
            </div>
        </div>
    </div>`;
  
      if($(`#${poolId}`).length) {
        $(`#${poolId}`).replaceWith(poolPrint);
      }
      else {
        $('#snob-pools-new').append(poolPrint); 
      }      
    }
  }
  function poolSNOB(options) {
    if (options.icequeen_apr) {
      var eDayAPR = `${options.icequeen_apr.toFixed(2)}`;
      var eWeekAPR = `${(options.icequeen_apr * 7).toFixed(2)}`;
      var eYearAPR = `${(options.icequeen_apr * 365).toFixed(2)}`;


      var combinedAprDisplay = '';
      if (options.snowglobe_apr) {
        let combinedAPR = options.icequeen_apr + options.snowglobe_apr;

        var cDayAPR = `${combinedAPR.toFixed(2)}`;
        var cWeekAPR = `${(combinedAPR * 7).toFixed(2)}`;
        var cYearAPR = `${(combinedAPR * 365).toFixed(2)}`;

        var combinedAprDisplay = aprDisplay(cDayAPR, cWeekAPR, cYearAPR);
      }
    }
    if (options.total_staked && options.total_pgl) {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} PGL </span>
        <span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_pgl / 1e18).toLocaleString()} PGL</span>`;

    } else if (options.total_staked) {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} PGL </span>`;
    } else {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.total_pgl / 1e18).toLocaleString()} PGL</span>`;
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
      }else{
        stakeDisplay = '';
      }

      var estimatedRate = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0 mx-auto">
        <p class="m-0 font-size-12"> Estimated Rate</p>
        <span class="badge badge-success font-size-12 px-5 px-sm-10 mx-10">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)} SNOB <ion-icon name="trending-up-outline"></ion-icon></span>
        <p class="m-0 font-size-12">(24hr block rate)</p>
        </div>`;

      var earning = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You are earning</p>
        <p class="m-0 font-size-16 font-weight-regular">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)} SNOB </p>
        <p class="m-0 font-size-12">per day ($${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(Average block rate)</p>
        </div>`
    }
    availableStake = '';
    if ( options.display_amount > 0 ) {
      availableStake = stakeUnstake(options.display_amount.toFixed(6), true, 'PGL');
    }
    availableUnstake = '';
    if ( options.staked_pool.amount / 1e18 > 0 ) {      
      availableUnstake = stakeUnstake((options.staked_pool.amount / 1e18).toFixed(6), false, 'PGL'); 
    }
    let has_options = false
    approveBtn = '';
    stakeBtn = '';
    unstakeBtn = '';
    claimBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true
      approveBtn = `<button data-btn="${options.approve}" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button data-btn="${options.stake}" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake PGL</button>`;
    }
    if ( options.staked_pool.amount / 1e18 > 0 ) {
      has_options = true
      unstakeBtn = `<button data-btn="${options.unstake}" class="btn btn-sm mx-10 unstakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Unstake PGL</button>`;
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      claimBtn = `<button data-btn="${options.claim}" class="btn btn-primary btn-sm claimBtn"><ion-icon name="push-outline"></ion-icon> Harvest SNOB</button>`;
    }
    if (!has_options){

      var poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens" class="align-items-center d-flex mx-auto mx-md-0">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center d-flex flex-column snob-tvl pb-10 pb-md-0 mx-auto">
                    <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                </div>
                <div class="col-sm-12 col-md-2 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <a target="_blank" href="${options.url}" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get PGL from Pangolin</a>
                    <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APRs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display: none;">
                <div class="row">
                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="bowling-ball-outline"></ion-icon> Allocation</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.pool_weight * 100)}%</span>
                        <p class="m-0 font-size-12 pt-10"><ion-icon name="ellipse-outline"></ion-icon> SNOB per day</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${snowballsPerBlock * options.pool_weight / 1e18 * 15000}</span>
                    </div>

                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
                        <p class="m-0 font-size-16 font-weight-regular">O sPGL </p>
                        <p class="m-0 font-size-12">(No sPGL to Stake/Withdraw) </p>
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
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                ${estimatedRate}
                <div class="col-sm-12 col-md-3 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                ${approveBtn}
                ${stakeBtn}
                ${unstakeBtn}
                ${claimBtn}
                <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APRs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>

            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display:none">
                <div class="row">
                    <div class="col-sm-12 col-md-2 align-items-center pb-10">
                        <div class="row text-center">
                            <p class="font-weight-light">Rewards APR :</p>
                        </div>
                        <div class="row">
                            <div class="form-inline w-50 ">
                                <div class="form-group m-md-0">
                                    <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                                    <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                                </div>
                            </div>
                            <div class="form-inline w-50 mx-auto">
                                <div class="form-group m-md-0">
                                <p class="m-0 font-size-12 font-weight-regular">${eDayAPR}% </p>
                                <p class="m-0 font-size-12 font-weight-regular">${eYearAPR}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ${combinedAprDisplay}
                    <div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="bowling-ball-outline"></ion-icon> Allocation</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.pool_weight * 100)}%</span>
                        <p class="m-0 font-size-12 pt-10"><ion-icon name="ellipse-outline"></ion-icon> SNOB per day</p>
                        <span class="badge font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${snowballsPerBlock * options.pool_weight / 1e18 * 15000}</span>
                    </div>
                    <div class="col-sm-12 col-md-2 align-items-center d-flex flex-column text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                    </div>
                    ${poolShare}

                </div>
                <div class="row pt-20">
                    ${earning}

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
  await renderPoolS3F({
    STAKING_CONTRACT, App, SNOB_TOKEN, S3F_TOKEN
  });
  poolS3D({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xde3A24028580884448a5397872046a019649b084/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a/logo.png',
    logo_token3 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xaEb044650278731Ef3DC244692AB9F64C78FfaEA/logo.png',
    pool_nickname: 'pool-7',
    pool_name: 'StableVault S3D',
    url: null,
    tvl: null,
    pool_weight: pool7weight,
    total_staked: totalStakedS3D,
    user_pool_percent: userPool7Percent,
    staked_pool: stakedPool7,
    pending_tokens: pendingSNOBTokensPool7,
    display_amount: S3DDisplayAmt,
    approve: 'approveS3D',
    stake: 'stakeS3D',
    unstake: 'withdrawPool7',
    claim: 'claimPool7',
    icequeen_apr: pool7APR,
    snowglobe_apr: null,
    tvl_display: pool7tvlDisplay,
    total_pgl: null,
    pool_share_display: poolShareDisplay_7,
    pool_share_display_pgl: '',
    stake_display: ''
  })
  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651/logo.png',
    pool_nickname: 'pool-6',
    pool_name: 'LINK-AVAX sPGL',
    url: null,
    tvl: LINK_AVAX_TVL,
    pool_weight: pool6weight,
    total_staked: totalStakedSPGLLINK,
    user_pool_percent: userPool6Percent,
    staked_pool: stakedPool6,
    pending_tokens: pendingSNOBTokensPool6,
    display_amount: spglLinkDisplayAmt,
    approve: 'approveSPGLLINK',
    stake: 'stakeSPGLLINK',
    unstake: 'withdrawPool6',
    claim: 'claimPool6',
    icequeen_apr: pool6APR,
    snowglobe_apr: link_apr.dailyAPR,
    tvl_display: pool6tvlDisplay,
    tvl_class: tvl_class,
    total_pgl: null,
    pool_share_display: poolShareDisplay_6,
    pool_share_display_pgl: poolShareDisplay_6_pgl,
    stake_display: stakeDisplay_6,
    apy: link_annual_apy
  })
  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xde3A24028580884448a5397872046a019649b084/logo.png',
    pool_nickname: 'pool-5',
    pool_name: 'USDT-AVAX sPGL',
    url: null,
    tvl: USDT_AVAX_TVL,
    pool_weight: pool5weight,
    total_staked: totalStakedSPGLUSDT,
    user_pool_percent: userPool5Percent,
    staked_pool: stakedPool5,
    pending_tokens: pendingSNOBTokensPool5,
    display_amount: spglUsdtDisplayAmt,
    approve: 'approveSPGLUSDT',
    stake: 'stakeSPGLUSDT',
    unstake: 'withdrawPool5',
    claim: 'claimPool5',
    icequeen_apr: pool5APR,
    snowglobe_apr: usdt_apr.dailyAPR,
    tvl_display: pool5tvlDisplay,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_5,
    pool_share_display: poolShareDisplay_5,
    pool_share_display_pgl: poolShareDisplay_5_pgl,
    stake_display: stakeDisplay_5,
    apy: usdt_annual_apy
  })
  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15/logo.png',
    pool_nickname: 'pool-4',
    pool_name: 'ETH-AVAX sPGL',
    url: null,
    tvl: ETH_AVAX_TVL,
    pool_weight: pool4weight,
    total_staked: totalStakedSPGLETH,
    user_pool_percent: userPool4Percent,
    staked_pool: stakedPool4,
    pending_tokens: pendingSNOBTokensPool4,
    display_amount: spglEthDisplayAmt,
    approve: 'approveSPGLETH',
    stake: 'stakeSPGLETH',
    unstake: 'withdrawPool4',
    claim: 'claimPool4',
    icequeen_apr: pool4APR,
    snowglobe_apr: eth_apr.dailyAPR,
    tvl_display: pool4tvlDisplay,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_4,
    pool_share_display: poolShareDisplay_4,
    pool_share_display_pgl: poolShareDisplay_4_pgl,
    stake_display: stakeDisplay_4,
    apy: eth_annual_apy
  })
  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    pool_nickname: 'pool-3',
    pool_name: 'PNG-AVAX sPGL',
    url: null,
    tvl: PNG_AVAX_TVL,
    pool_weight: pool3weight,
    total_staked: totalStakedSPGLPNG,
    user_pool_percent: userPool3Percent,
    staked_pool: stakedPool3,
    pending_tokens: pendingSNOBTokensPool3,
    display_amount: spglPngDisplayAmt,
    approve: 'approveSPGLPNG',
    stake: 'stakeSPGLPNG',
    unstake: 'withdrawPool3',
    claim: 'claimPool3',
    icequeen_apr: pool3APR,
    snowglobe_apr: png_apr.dailyAPR,
    tvl_display: pool3tvlDisplay,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_3,
    pool_share_display: poolShareDisplay_3,
    pool_share_display_pgl: poolShareDisplay_3_pgl,
    stake_display: stakeDisplay_3,
    apy: png_annual_apy
  })
  poolSNOB({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC38f41A296A4493Ff429F1238e030924A1542e50/logo.png',
    pool_nickname: 'pool-2',
    pool_name: 'SNOB-AVAX Pangolin LP',
    url: SNOB_AVAX_POOL_URL,
    tvl: SNOB_AVAX_TVL,
    pool_weight: pool2weight,
    total_staked: null,
    user_pool_percent: userPool2Percent,
    staked_pool: stakedPool2,
    pending_tokens: pendingSNOBTokensPool2,
    display_amount: snobAvaxDisplayAmt,
    approve: 'approveSNOB',
    stake: 'stakeSNOB',
    unstake: 'withdrawPool2',
    claim: 'claimPool2',
    icequeen_apr: pool2APR,
    snowglobe_apr: null,
    tvl_display: pool2tvlDisplay,
    tvl_class: tvl_class,
    total_pgl: totalStakedSNOBAVAX,
    pool_share_display: poolShareDisplay_2,
    pool_share_display_pgl: poolShareDisplay_2_pgl,
    stake_display: stakeDisplay_2
  })
  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc/logo.png',
    pool_nickname: 'pool-1',
    pool_name: 'SUSHI-AVAX sPGL',
    url: null,
    tvl: SUSHI_AVAX_TVL,
    pool_weight: pool1weight,
    total_staked: totalStakedSPGLSUSHI,
    user_pool_percent: userPool1Percent,
    staked_pool: stakedPool1,
    pending_tokens: pendingSNOBTokensPool1,
    display_amount: spglSushiDisplayAmt,
    approve: 'approveSPGLSUSHI',
    stake: 'stakeSPGLSUSHI',
    unstake: 'withdrawPool1',
    claim: 'claimPool1',
    icequeen_apr: pool1APR,
    snowglobe_apr: sushi_apr.dailyAPR,
    tvl_display: pool1tvlDisplay,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_1,
    pool_share_display: poolShareDisplay_1,
    pool_share_display_pgl: poolShareDisplay_1_pgl,
    stake_display: stakeDisplay_1,
    apy: sushi_annual_apy
  })

  function updateButtonHandlers() {
    $(".unstakeBtn").unbind('click');
    $(".unstakeBtn").click(function(){
      let fn = $(this).attr("data-btn");
      switch (fn) {
        case 'withdrawPool1':
          withdrawPool1();
          break;
        case 'withdrawPool2':
          withdrawPool2();
          break;
        case 'withdrawPool3':
          withdrawPool3();
          break;
        case 'withdrawPool4':
          withdrawPool4();
          break;
        case 'withdrawPool5':
          withdrawPool5();
          break;
        case 'withdrawPool6':
          withdrawPool6();
          break;
        case 'withdrawPool7':
          withdrawPool7();
          break;
        case 'withdrawPool8':
          withdrawPool8();
          break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  
    $(".claimBtn").unbind('click');
    $(".claimBtn").click(function(){
      let fn = $(this).attr("data-btn");
      switch (fn) {
        case 'claimPool1':
          claimPool1();
          break;
        case 'claimPool2':
          claimPool2();
          break;
        case 'claimPool3':
          claimPool3();
          break;
        case 'claimPool4':
          claimPool4();
          break;
        case 'claimPool5':
          claimPool5();
          break;
        case 'claimPool6':
          claimPool6();
          break;
        case 'claimPool7':
          claimPool7();
          break;
        case 'claimPool8':
          claimPool8();
          break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  
    $(".approveBtn").unbind('click');
    $(".approveBtn").click(function(){
      let fn = $(this).attr("data-btn");
      switch (fn) {
        case 'approveSPGLSUSHI':
          approveSPGLSUSHI();
          break;
        case 'approveSNOB':
          approveSNOB();
          break;
        case 'approveSPGLPNG':
          approveSPGLPNG();
          break;
        case 'approveSPGLETH':
          approveSPGLETH();
          break;
        case 'approveSPGLUSDT':
          approveSPGLUSDT();
          break;
        case 'approveSPGLLINK':
          approveSPGLLINK();
          break;
        case 'approveS3D':
          approveS3D();
          break;
        case 'approveS3F':
          approveS3F();
          break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  
    $(".stakeBtn").unbind('click');
    $(".stakeBtn").click(function(){
      let fn = $(this).attr("data-btn");
      switch (fn) {
        case 'stakeSPGLSUSHI':
          stakeSPGLSUSHI();
          break;
        case 'stakeSNOB':
          stakeSNOB();
          break;
        case 'stakeSPGLPNG':
          stakeSPGLPNG();
          break;
        case 'stakeSPGLETH':
          stakeSPGLETH();
          break;
        case 'stakeSPGLUSDT':
          stakeSPGLUSDT();
          break;
        case 'stakeSPGLLINK':
          stakeSPGLLINK();
          break;
        case 'stakeS3D':
          stakeS3D();
          break;
        case 'stakeS3F':
          stakeS3F();
          break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  }

  async function renderPoolS3F ({
    STAKING_CONTRACT, App, SNOB_TOKEN, S3F_TOKEN
  }) {
    const totalStakedS3F = await STAKING_CONTRACT.totalSupply();
    
    const stakedPool8 = await STAKING_CONTRACT.balanceOf(App.YOUR_ADDRESS);
  
    const userPool8Percent = (stakedPool8 / 1e18) / (totalStakedS3F / 1e18) * 100;
  
    const pendingSNOBTokensPool8 = await STAKING_CONTRACT.earned(App.YOUR_ADDRESS);
  
    const currentS3FTokens = await S3F_TOKEN.balanceOf(App.YOUR_ADDRESS)
  
    const S3FDisplayAmt = currentS3FTokens > 1000 ? currentS3FTokens / 1e18 : 0;
  
    const pool8tvl = totalStakedS3F / 1e18;
  
    const prices = await getAvaxPrices();
  
    const snobPrice = prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'] ? prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'].usd : 0;
  
    const pool8APR = 2666 * snobPrice / pool8tvl * 100;
  
    const pool8tvlDisplay = `$${new Intl.NumberFormat('en-US').format(pool8tvl)}`;
  
    const poolShareDisplay_8 = `${(stakedPool8 / 1e18).toFixed(6)} S3F`;
  
    poolS3F({
      logo_token3 : 'https://assets.coingecko.com/coins/images/13422/small/frax_logo.png?1608476506',
      logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB/logo.png',
      logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xde3A24028580884448a5397872046a019649b084/logo.png',
      pool_nickname: 'pool-8',
      pool_name: 'StableVault S3F 🌟',
      url: null,
      tvl: null,
      pool_weight: null,
      total_staked: totalStakedS3F,
      user_pool_percent: userPool8Percent,
      staked_pool: stakedPool8,
      pending_tokens: pendingSNOBTokensPool8,
      display_amount: S3FDisplayAmt,
      approve: 'approveS3F',
      stake: 'stakeS3F',
      unstake: 'withdrawPool8',
      claim: 'claimPool8',
      icequeen_apr: pool8APR,
      snowglobe_apr: null,
      tvl_display: pool8tvlDisplay,
      total_pgl: null,
      pool_share_display: poolShareDisplay_8,
      pool_share_display_pgl: '',
      stake_display: '',
      snobPrice
    });

    updateButtonHandlers();
    return;
  }

  updateButtonHandlers();
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
  halfmoon.toggleModal('modal-loading')
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
    halfmoon.toggleModal('modal-loading')
    snobMessage(`Connected successfully`, `Already approved . <br>You can use the deposit/withdrawals options`, `checkmark-circle-outline`, `success`, false, `ok`, 4000);
    halfmoon.toggleModal('modal-loading')
  } else {
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        halfmoon.toggleModal('modal-loading');
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading');
        snobMessage(`Connecting to metamask`, `Approval failed . Please check your Metamask Wallet`, `close-circle-outline`, `danger`, false, `ok`, 4000);
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
  halfmoon.toggleModal('modal-loading')
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
    halfmoon.toggleModal('modal-loading')
    snobMessage(`Connected successfully`, `Already approved . <br>You can use the deposit/withdrawals options`, `checkmark-circle-outline`, `success`, false, `ok`, 4000);
  } else {
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
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
    snobMessage(`Approve spending`, `Please approve spending first. Please check your Metamask Wallet`, `information-circle-outline`, `primary`, false, `ok`);
  } else if (currentTokens / 1e18 > 0) {
    halfmoon.toggleModal('modal-loading')
    allow
      .then(async function () {
        CHEF_CONTRACT.depositAll()
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
              halfmoon.toggleModal('modal-loading')
              snobMessage(`Tokens deposit`, `Tokens deposited. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
              setTimeout(function(){ window.location.reload(true); }, 6000);
            })
          })
          .catch(function () {
            halfmoon.toggleModal('modal-loading')
            snobMessage(`Oops! Failed`, `Deposit Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
          })
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Oops! Failed`, `Deposit Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      })
  } else {
    snobMessage(`Oops! Failed`, `Deposit Failed. You have no tokens to stake`, `close-circle-outline`, `danger`, false, `ok`, false);
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
    halfmoon.toggleModal('modal-loading')
    allow
      .then(async function () {
        CHEF_CONTRACT.withdrawAll()
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              halfmoon.toggleModal('modal-loading')
              snobMessage(`Withdrawn Tokens`, `Tokens Withdrawn. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
              setTimeout(function(){ window.location.reload(true); }, 6000);
            })
          })
          .catch(function () {
            halfmoon.toggleModal('modal-loading')
            snobMessage(`Withdrawn Tokens`, `Withdrawn failed . Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
          })
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Withdrawn Tokens`, `Withdrawn failed . Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      })
  } else {
    snobMessage(`Withdrawn Tokens`, `Withdrawn failed . You have no tokens to withdraw`, `close-circle-outline`, `danger`, false, `ok`, 4000);
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
    snobMessage(`Approve spending`, `Please approve spending first. Please check your Metamask Wallet`, `information-circle-outline`, `primary`, false, `ok`);
  } else if (currentTokens / 1e18 > 0) {
    halfmoon.toggleModal('modal-loading')
    allow
      .then(async function () {
        CHEF_CONTRACT.deposit(poolIndex, currentTokens)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              halfmoon.toggleModal('modal-loading')
              snobMessage(`Tokens deposit`, `Tokens deposited. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
              setTimeout(function(){ window.location.reload(true); }, 6000);
            })
          })
          .catch(function () {
            halfmoon.toggleModal('modal-loading')
            snobMessage(`Oops! Failed`, `Deposit Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
          })
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Oops! Failed`, `Deposit Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      })
  } else {
    snobMessage(`Oops! Failed`, `You have no tokens to stake`, `close-circle-outline`, `danger`, false, `ok`, false);
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
    halfmoon.toggleModal('modal-loading')
    allow
      .then(async function () {
        ICEQUEEN_CONTRACT.withdraw(poolIndex, currentTokens)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              halfmoon.toggleModal('modal-loading')
              snobMessage(`Withdrawn Tokens`, `Tokens Withdrawn. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
              setTimeout(function(){ window.location.reload(true); }, 6000);
            })
          })
          .catch(function () {
            halfmoon.toggleModal('modal-loading')
            snobMessage(`Oops! Failed`, `Withdrawn Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
          })
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      })
  } else {
    snobMessage(`Withdrawn Tokens`, `Withdrawn failed . Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, 4000);
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
    snobMessage(`Oops`, `You have no rewards to claim`, `information-circle-outline`, `primary`, false, `ok`, 4000);
  } else {
    halfmoon.toggleModal('modal-loading')
    allow
      .then(async function () {
        CHEF_CONTRACT.withdraw(poolIndex, 1)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              halfmoon.toggleModal('modal-loading')
              snobMessage(`Withdrawn Tokens`, `Rewards claimed. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
              setTimeout(function(){ window.location.reload(true); }, 6000);
            })
          })
          .catch(function () {
            halfmoon.toggleModal('modal-loading')
            snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
          })
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading')
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
const stakingContract_approve = async function (chefAbi, chefAddress, stakeTokenAddr, App) {
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
  halfmoon.toggleModal('modal-loading')
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
    halfmoon.toggleModal('modal-loading')
    snobMessage(`Connected successfully`, `Already approved . <br>You can use the deposit/withdrawals options`, `checkmark-circle-outline`, `success`, false, `ok`, 4000);
  } else {
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
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



const stakingContract_claim = async function (chefAbi, chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)
  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)
  const pendingRewards = await CHEF_CONTRACT.earned(App.YOUR_ADDRESS)
  let allow = Promise.resolve()
  if (pendingRewards / 1e18 == 0) {
    snobMessage(`Oops`, `You have no rewards to claim`, `information-circle-outline`, `primary`, false, `ok`, 4000);
  } else {
    halfmoon.toggleModal('modal-loading')
    allow
      .then(async function () {
        CHEF_CONTRACT.getReward()
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              halfmoon.toggleModal('modal-loading')
              snobMessage(`Withdrawn Tokens`, `Rewards claimed. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
              setTimeout(function(){ window.location.reload(true); }, 6000);
            })
          })
          .catch(function () {
            halfmoon.toggleModal('modal-loading')
            snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
          })
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      })
  }
}


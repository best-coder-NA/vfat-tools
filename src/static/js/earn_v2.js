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
  const GAUGEPROXY_ABI = [ { "type": "constructor", "stateMutability": "nonpayable", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IceQueen" } ], "name": "MASTER", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "SNOWBALL", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "SNOWCONE", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "TOKEN", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "acceptGovernance", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "addGauge", "inputs": [ { "type": "address", "name": "_token", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "collect", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "distribute", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "gauges", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "getGauge", "inputs": [ { "type": "address", "name": "_token", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "governance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "length", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "pendingGovernance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "pid", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "poke", "inputs": [ { "type": "address", "name": "_owner", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "reset", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setGovernance", "inputs": [ { "type": "address", "name": "_governance", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setPID", "inputs": [ { "type": "uint256", "name": "_pid", "internalType": "uint256" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "tokenVote", "inputs": [ { "type": "address", "name": "", "internalType": "address" }, { "type": "uint256", "name": "", "internalType": "uint256" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address[]", "name": "", "internalType": "address[]" } ], "name": "tokens", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "totalWeight", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "usedWeights", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "vote", "inputs": [ { "type": "address[]", "name": "_tokenVote", "internalType": "address[]" }, { "type": "uint256[]", "name": "_weights", "internalType": "uint256[]" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "votes", "inputs": [ { "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "weights", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] } ]
  const GAUGE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"DISTRIBUTION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DURATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWBALL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWCONE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"TOKEN","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"TREASURY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalance","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalances","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"kick","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
    

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
  const GAUGEPROXY_ADDR = "0xFc371bA1E7874Ad893408D7B581F3c8471F03D2C";

  //gauges
  const SUSHI_AVAX_GAUGE = "0x38a9635c0a1b62a7d8bc608a3ad5d84b300831ae";
  const PNG_AVAX_GAUGE = "0x3b062f421be17a7dc2d973a2da3fe56ff5ac8042";
  const ETH_AVAX_GAUGE = "0x6bb9d2420217e0c3f272f47c58942e89e23806c9";
  const LINK_AVAX_GAUGE = "0x7e68717f6228764bc1fc7a970dd5a041837c370c";
  const USDT_AVAX_GAUGE = "0x45590658f6608c5be4c94ce885c52dbddb4fa21a";
  const SNOB_AVAX_GAUGE = "0xda7099baa4693209ead01d2baf2f722f40ab30c1";
  const S3D_GAUGE = "0x5994612ffffc31d6c05c4fbec4a17116676d5b22";
  const S3F_GAUGE = "0x472075680e16d34aba24ce9a6ddb59f27995906a";
  const WBTC_AVAX_GAUGE = "0x4906bf6aa9aad2b76f2c92738b7242a5c7a6a7bd";
  const DAI_AVAX_GAUGE = "0x2e2191fde0872e686b0a5117cd639896d2c8ad97";
  const UNI_AVAX_GAUGE = "0x0e06c4d0ecaae66b82ebc9133ca52ea82702cd30";
  const ETH_PNG_GAUGE = "0x5f05dc58ee067c91a98ec025d5c332af40b84667";
  const WBTC_PNG_GAUGE = "0x1e544e0eedc7e44f506f2ae7d389e0b07289e3c1";
  const LINK_PNG_GAUGE = "0xc4960af75f321c7fb36b725afc6059727e2db457";
  const USDT_PNG_GAUGE = "0xe58961d4895f0e26309ca1f36d607c6a2a1556ff";
  const SUSHI_PNG_GAUGE = "0xaf309db1bed322880a1edb8da426450e1c3be98e";
  const DAI_PNG_GAUGE = "0xef36cce5017471189030c84a218a6c60502d2248";
  const AAVE_PNG_GAUGE = "0xf0c180fcbd9fafd541e8be1303cf8c72eda80399";
  const UNI_PNG_GAUGE = "0xbcbce1fb679b9eba3c2e266232c86e06ab2e1e45";
  const YFI_PNG_GAUGE = "0xbf23aafa5ba0bc81f798f190b1b632ecf3fd4709";
  const PNG_SNOB_GAUGE = "0xf2b70c7d26b841566ef14027f91c8771d615d54a";
  const VSO_AVAX_GAUGE = "0x4d16ecff6dfa8f344ba182f09422b86b4d796ab4";
  const VSO_PNG_GAUGE = "0xea4a0a6b5cc61b8edb228a5582308d0ad82b85cc";
  const SPORE_AVAX_GAUGE = "0x85852980d24f69714701C50371811d31410144c3";
  const SPORE_PNG_GAUGE = "0xfe570d95BAddFAb258c09B2F008B7786a2Da3b3f";
  const JOE_ETH_AVAX_GAUGE = "0xA634ec1BaDa2faC4eaa71439b0b18Dd3486823e6";
  
  //PGL address
  const SUSHI_AVAX_ADDR = "0xd8B262C0676E13100B33590F10564b46eeF652AD";
  const PNG_AVAX_ADDR = "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367";
  const ETH_AVAX_ADDR = "0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65";
  const LINK_AVAX_ADDR = "0xbbc7fff833d27264aac8806389e02f717a5506c9";
  const USDT_AVAX_ADDR = "0x9EE0a4E21bd333a6bb2ab298194320b8DaA26516";
  const PGL_SNOB_AVAX_ADDR = "0xa1c2c3b6b120cbd4cec7d2371ffd4a931a134a32";
  const PGL_WBTC_AVAX = "0x7a6131110b82dacbb5872c7d352bfe071ea6a17c";
  const PGL_DAI_AVAX = "0x17a2e8275792b4616befb02eb9ae699aa0dcb94b";
  const PGL_UNI_AVAX = "0x92dc558cb9f8d0473391283ead77b79b416877ca";
  const PGL_ETH_PNG = "0x53b37b9a6631c462d74d65d61e1c056ea9daa637"
  const PGL_WBTC_PNG = "0xf372ceae6b2f4a2c4a6c0550044a7eab914405ea";
  const PGL_LINK_PNG = "0x7313835802c6e8ca2a6327e6478747b71440f7a4";
  const PGL_USDT_PNG = "0xE8AcF438B10A2C09f80aEf3Ef2858F8E758C98F9";
  const PGL_SUSHI_PNG = "0xf105fb50fc6ddd8a857bbecd296c8a630e8ca857";
  const PGL_DAI_PNG = "0xd765b31399985f411a9667330764f62153b42c76";
  const PGL_AAVE_PNG = "0x0025cebd8289bbe0a51a5c85464da68cbc2ec0c4";
  const PGL_UNI_PNG = "0x874685bc6794c8b4befbd037147c2eef990761a9";
  const PGL_YFI_PNG = "0xa465e953f9f2a00b2c1c5805560207b66a570093";
  const PGL_PNG_SNOB = "0x97b4957df08e185502a0ac624f332c7f8967ee8d";
  const PGL_VSO_AVAX = "0x2b532bc0afae65da57eccfb14ff46d16a12de5e6";
  const PGL_VSO_PNG = "0x9d472e21f6589380b21c42674b3585c47b74c891";
  const PGL_SPORE_AVAX = "0x0a63179a8838b5729E79D239940d7e29e40A0116";
  const PGL_SPORE_PNG = "0xad24a72ffE0466399e6F69b9332022a71408f10b";
  const JLP_ETH_AVAX = "0xc992Ab46428a5a2eDeB8F44D946CE5642F97EF71";
  
  //tokens
  const SPGL_SUSHI_ADDRESS = "0x751089f1bf31b13fa0f0537ae78108088a2253bf";
  const SPGL_PNG_ADDRESS = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
  const SPGL_ETH_ADDRESS = "0x586554828eE99811A8ef75029351179949762c26";
  const SPGL_LINK_ADDRESS = "0x00933c16e06b1d15958317C2793BC54394Ae356C";
  const SPGL_USDT_ADDRESS = "0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605";
  const SPGL_SNOB_AVAX_ADDR = "0xF4072358C1E3d7841BD7AfDE31F61E17E8d99BE7";
  const SNOB_ADDRESS = "0xC38f41A296A4493Ff429F1238e030924A1542e50";
  const S3D_ADDRESS = "0xdE1A11C331a0E45B9BA8FeE04D4B51A745f1e4A4";
  const S3F_ADDRESS = "0xA42BE3dB9aff3aee48167b240bFEE5e1697e1281";
  const SPGL_WBTC_AVAX = "0x39BE35904f52E83137881C0AC71501Edf0180181";
  const SPGL_DAI_AVAX = "0xb21b21E4fA802EE4c158d7cf4bD5416B8035c5e0";
  const SPGL_UNI_AVAX = "0xdf7F15d05d641dF701D961a38d03028e0a26a42D";
  const SPGL_ETH_PNG = "0x3815f36C3d60d658797958EAD8778f6500be16Df";
  const SPGL_WBTC_PNG = "0x763Aa38c837f61DD8429313933Cc47f24E881430";
  const SPGL_LINK_PNG = "0x392c51Ab0AF3017E3e22713353eCF5B9d6fBDE84";
  const SPGL_USDT_PNG = "0x7987aDB3C789f071FeFC1BEb15Ce6DfDfbc75899";
  const SPGL_SUSHI_PNG = "0x8eDd233546730C51a9d3840e954E5581Eb3fDAB1";
  const SPGL_DAI_PNG = "0xcD651AD29835099334d312a9372418Eb2b70c72F";
  const SPGL_AAVE_PNG = "0x3270b685A4a61252C6f30c1eBca9DbE622984e22";
  const SPGL_UNI_PNG = "0x14F98349Af847AB472Eb7f7c705Dc4Bee530713B";
  const SPGL_YFI_PNG = "0x234ed7c95Be12b2A0A43fF602e737225C83c2aa1";
  const SPGL_PNG_SNOB = "0xB4db531076494432eaAA4C6fCD59fcc876af2734";
  const SPGL_VSO_AVAX = "0x888Ab4CB2279bDB1A81c49451581d7c243AffbEf";
  const SPGL_VSO_PNG = "0x8309C64390F376fD778BDd701d54d1F8DFfe1F39";
  const SPGL_SPORE_AVAX = "0x27f8FE86a513bAAF18B59D3dD15218Cc629640Fc";
  const SPGL_SPORE_PNG = "0xa39785a4E4CdDa7509751ed152a00f3D37FbFa9F";
  const SJLP_AVAX_ETH = "0xAbD637a6881a2D4bbf279aE484c2447c070f7C73";
  
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
  //LP URLs
  const SNOB_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xC38f41A296A4493Ff429F1238e030924A1542e50";

  // TVL URLS
  const SUSHI_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x14ec55f8B4642111A5aF4f5ddc56B7bE867eB6cC";
  const SNOB_AVAX_TVL = "https://info.pangolin.exchange/#/account/0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375";
  const PNG_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x6A803904b9eA0Fc982fBB077c7243c244Ae05a2d";
  const ETH_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x953853590b805A0E885A75A3C786D2aFfcEEA3Cf";
  const LINK_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x974Ef0bDA58C81F3094e124f530eF34fe70dc103";
  const USDT_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x74dB28797957a52a28963F424dAF2B10226ba04C";

  const approveSPGLSUSHI = async function () {
    return approveGauge(SPGL_SUSHI_ADDRESS, SUSHI_AVAX_GAUGE, App);
  }
  const stakeSPGLSUSHI = async function () {
    return gaugeContractStake(SUSHI_AVAX_GAUGE, GAUGE_ABI, SPGL_SUSHI_ADDRESS, SNOWGLOBE_ABI, App);
  }
  const approveSPGLPNG = async function () {
    return approveGauge(SPGL_PNG_ADDRESS, PNG_AVAX_GAUGE, App);
  }
  const stakeSPGLPNG = async function () {
    return gaugeContractStake(PNG_AVAX_GAUGE, GAUGE_ABI, SPGL_PNG_ADDRESS, SNOWGLOBE_ABI, App);
  }
  const approveSPGLETH = async function () {
    return approveGauge(SPGL_ETH_ADDRESS, ETH_AVAX_GAUGE, App);
  }
  const stakeSPGLETH = async function () {
    return gaugeContractStake(ETH_AVAX_GAUGE, GAUGE_ABI, SPGL_ETH_ADDRESS, SNOWGLOBE_ABI, App);
  }
  const approveSPGLUSDT = async function () {
    return approveGauge(SPGL_USDT_ADDRESS, USDT_AVAX_GAUGE, App);
  }
  const stakeSPGLUSDT = async function () {
    return gaugeContractStake(USDT_AVAX_GAUGE, GAUGE_ABI, SPGL_USDT_ADDRESS, SNOWGLOBE_ABI, App);
  }
  const approveSPGLLINK = async function () {
    return approveGauge(SPGL_LINK_ADDRESS, LINK_AVAX_GAUGE, App);
  }
  const stakeSPGLLINK = async function () {
    return gaugeContractStake(LINK_AVAX_GAUGE, GAUGE_ABI, SPGL_LINK_ADDRESS, SNOWGLOBE_ABI, App);
  }
  const approveS3D = async function () {
    return approveGauge(S3D_ADDRESS, S3D_GAUGE, App);
  }
  const stakeS3D  = async function () {
    return gaugeContractStake(S3D_GAUGE, GAUGE_ABI, S3D_ADDRESS, SNOWGLOBE_ABI, App);
  }
  const approveS3F = async function () {
    return approveGauge(S3F_ADDRESS, S3F_GAUGE, App);
  }
  const stakeS3F  = async function () {
    return gaugeContractStake(S3F_GAUGE, GAUGE_ABI, S3F_ADDRESS, SNOWGLOBE_ABI, App);
  }
  const approveSNOB = async function () {
    return approveGauge(SPGL_SNOB_AVAX_ADDR, SNOB_AVAX_GAUGE, App);
  }
  const stakeSNOB = async function () {
    return gaugeContractStake(SNOB_AVAX_GAUGE, GAUGE_ABI, SPGL_SNOB_AVAX_ADDR, SNOWGLOBE_ABI, App);
  }
  const stakeWBTC_AVAX = async function() {
    return gaugeContractStake(WBTC_AVAX_GAUGE, GAUGE_ABI, SPGL_WBTC_AVAX, SNOWGLOBE_ABI, App);
  }
  const stakeDAI_AVAX = async function() {
    return gaugeContractStake(DAI_AVAX_GAUGE, GAUGE_ABI, SPGL_DAI_AVAX, SNOWGLOBE_ABI, App);
  }
  const stakeUNI_AVAX = async function() {
    return gaugeContractStake(UNI_AVAX_GAUGE, GAUGE_ABI, SPGL_UNI_AVAX, SNOWGLOBE_ABI, App);
  }
  const stakeWBTC_PNG = async function() {
    return gaugeContractStake(WBTC_PNG_GAUGE, GAUGE_ABI, SPGL_WBTC_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeLINK_PNG = async function() {
    return gaugeContractStake(LINK_PNG_GAUGE, GAUGE_ABI, SPGL_LINK_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeUSDT_PNG = async function() {
    return gaugeContractStake(USDT_PNG_GAUGE, GAUGE_ABI, SPGL_USDT_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeSUSHI_PNG = async function() {
    return gaugeContractStake(SUSHI_PNG_GAUGE, GAUGE_ABI, SPGL_SUSHI_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeDAI_PNG = async function() {
    return gaugeContractStake(DAI_PNG_GAUGE, GAUGE_ABI, SPGL_DAI_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeAAVE_PNG = async function() {
    return gaugeContractStake(AAVE_PNG_GAUGE, GAUGE_ABI, SPGL_AAVE_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeUNI_PNG = async function() {
    return gaugeContractStake(UNI_PNG_GAUGE, GAUGE_ABI, SPGL_UNI_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeYFI_PNG = async function() {
    return gaugeContractStake(YFI_PNG_GAUGE, GAUGE_ABI, SPGL_YFI_PNG, SNOWGLOBE_ABI, App);
  }
  const stakePNG_SNOB = async function() {
    return gaugeContractStake(PNG_SNOB_GAUGE, GAUGE_ABI, SPGL_PNG_SNOB, SNOWGLOBE_ABI, App);
  }
  const stakeETH_PNG = async function() {
    return gaugeContractStake(ETH_PNG_GAUGE, GAUGE_ABI, SPGL_ETH_PNG, SNOWGLOBE_ABI, App);
  }
  const stakePNG_VSO = async function() {
    return gaugeContractStake(VSO_PNG_GAUGE, GAUGE_ABI, SPGL_VSO_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeAVAX_VSO = async function() {
    return gaugeContractStake(VSO_AVAX_GAUGE, GAUGE_ABI, SPGL_VSO_AVAX, SNOWGLOBE_ABI, App);
  }
  const stakePNG_SPORE = async function() {
    return gaugeContractStake(SPORE_PNG_GAUGE, GAUGE_ABI, SPGL_SPORE_PNG, SNOWGLOBE_ABI, App);
  }
  const stakeAVAX_SPORE = async function() {
    return gaugeContractStake(SPORE_AVAX_GAUGE, GAUGE_ABI, SPGL_SPORE_AVAX, SNOWGLOBE_ABI, App);
  }
  const stakeJOE_AVAX_ETH = async function() {
    return gaugeContractStake(JOE_ETH_AVAX_GAUGE, GAUGE_ABI, SJLP_AVAX_ETH, SNOWGLOBE_ABI, App);
  }

  /* approve */
  const approveWBTC_AVAX = async function() {
    return approveGauge(SPGL_WBTC_AVAX, WBTC_AVAX_GAUGE, App);
  }
  const approveDAI_AVAX = async function() {
    return approveGauge(SPGL_DAI_AVAX, DAI_AVAX_GAUGE, App);
  }
  const approveUNI_AVAX = async function() {
    return approveGauge(SPGL_UNI_AVAX, UNI_AVAX_GAUGE, App);
  }
  const approveWBTC_PNG = async function() {
    return approveGauge(SPGL_WBTC_PNG, WBTC_PNG_GAUGE, App);
  }
  const approveLINK_PNG = async function() {
    return approveGauge(SPGL_LINK_PNG, LINK_PNG_GAUGE, App);
  }
  const approveUSDT_PNG = async function() {
    return approveGauge(SPGL_USDT_PNG, USDT_PNG_GAUGE, App);
  }
  const approveSUSHI_PNG = async function() {
    return approveGauge(SPGL_SUSHI_PNG, SUSHI_PNG_GAUGE, App);
  }
  const approveDAI_PNG = async function() {
    return approveGauge(SPGL_DAI_PNG, DAI_PNG_GAUGE, App);
  }
  const approveAAVE_PNG = async function() {
    return approveGauge(SPGL_AAVE_PNG, AAVE_PNG_GAUGE, App);
  }
  const approveUNI_PNG = async function() {
    return approveGauge(SPGL_UNI_PNG, UNI_PNG_GAUGE, App);
  }
  const approveYFI_PNG = async function() {
    return approveGauge(SPGL_YFI_PNG, YFI_PNG_GAUGE, App);
  }
  const approveETH_PNG = async function() {
    return approveGauge(SPGL_ETH_PNG, ETH_PNG_GAUGE, App);
  }
  const approvePNG_SNOB = async function() {
    return approveGauge(SPGL_PNG_SNOB, PNG_SNOB_GAUGE, App);
  }
  const approvePNG_VSO = async function() {
    return approveGauge(SPGL_VSO_PNG, VSO_PNG_GAUGE, App);
  }
  const approveAVAX_VSO= async function() {
    return approveGauge(SPGL_VSO_AVAX, VSO_AVAX_GAUGE, App);
  }
  const approvePNG_SPORE = async function() {
    return approveGauge(SPGL_SPORE_PNG, SPORE_PNG_GAUGE, App);
  }
  const approveAVAX_SPORE = async function() {
    return approveGauge(SPGL_SPORE_AVAX, SPORE_AVAX_GAUGE, App);
  }
  const approveJOE_AVAX_ETH = async function() {
    return approveGauge(SJLP_AVAX_ETH, JOE_ETH_AVAX_GAUGE, App);
  }

  /* claim reward functions */
  const claimPool1 = async function () {
    return gaugeClaim(SUSHI_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimPool2 = async function () {
    return gaugeClaim(SNOB_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimPool3 = async function () {
    return gaugeClaim(PNG_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimPool4 = async function () {
    return gaugeClaim(ETH_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimPool5 = async function () {
    return gaugeClaim(USDT_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimPool6 = async function () {
    return gaugeClaim(LINK_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimPool7 = async function () {
    return gaugeClaim(S3D_GAUGE, GAUGE_ABI, App);
  }
  const claimPool8 = async function () {
    return gaugeClaim(S3F_GAUGE, GAUGE_ABI, App);
  }
  const claimWBTC_AVAX = async function() {
    return gaugeClaim(WBTC_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimDAI_AVAX = async function() {
    return gaugeClaim(DAI_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimUNI_AVAX = async function() {
    return gaugeClaim(UNI_AVAX_GAUGE, GAUGE_ABI, App);
  }

  const claimWBTC_PNG = async function() {
    return gaugeClaim(WBTC_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimLINK_PNG = async function() {
    return gaugeClaim(LINK_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimUSDT_PNG = async function() {
    return gaugeClaim(USDT_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimSUSHI_PNG = async function() {
    return gaugeClaim(SUSHI_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimDAI_PNG = async function() {
    return gaugeClaim(DAI_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimAAVE_PNG = async function() {
    return gaugeClaim(AAVE_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimUNI_PNG = async function() {
    return gaugeClaim(UNI_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimYFI_PNG = async function() {
    return gaugeClaim(YFI_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimETH_PNG = async function() {
    return gaugeClaim(ETH_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimPNG_SNOB = async function() {
    return gaugeClaim(PNG_SNOB_GAUGE, GAUGE_ABI, App);
  }
  const claimPNG_VSO = async function() {
    return gaugeClaim(VSO_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimAVAX_VSO= async function() {
    return gaugeClaim(VSO_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimPNG_SPORE = async function() {
    return gaugeClaim(SPORE_PNG_GAUGE, GAUGE_ABI, App);
  }
  const claimAVAX_SPORE = async function() {
    return gaugeClaim(SPORE_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const claimJOE_AVAX_ETH = async function() {
    return gaugeClaim(JOE_ETH_AVAX_GAUGE, GAUGE_ABI, App);
  }


  const withdrawPool1 = async function () {
    return gaugeContractWithdraw(SUSHI_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPool2 = async function () {
    return gaugeContractWithdraw(SNOB_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPool3 = async function () {
    return gaugeContractWithdraw(PNG_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPool4 = async function () {
    return gaugeContractWithdraw(ETH_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPool5 = async function () {
    return gaugeContractWithdraw(USDT_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPool6 = async function () {
    return gaugeContractWithdraw(LINK_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPool7 = async function () {
    return gaugeContractWithdraw(S3D_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPool8 = async function () {
    return gaugeContractWithdraw(S3F_GAUGE, GAUGE_ABI, App);
  }
  const withdrawWBTC_AVAX = async function() {
    return gaugeContractWithdraw(WBTC_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawDAI_AVAX = async function() {
    return gaugeContractWithdraw(DAI_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawUNI_AVAX = async function() {
    return gaugeContractWithdraw(UNI_AVAX_GAUGE, GAUGE_ABI, App);
  }

  const withdrawWBTC_PNG = async function() {
    return gaugeContractWithdraw(WBTC_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawLINK_PNG = async function() {
    return gaugeContractWithdraw(LINK_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawUSDT_PNG = async function() {
    return gaugeContractWithdraw(USDT_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawSUSHI_PNG = async function() {
    return gaugeContractWithdraw(SUSHI_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawDAI_PNG = async function() {
    return gaugeContractWithdraw(DAI_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawAAVE_PNG = async function() {
    return gaugeContractWithdraw(AAVE_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawUNI_PNG = async function() {
    return gaugeContractWithdraw(UNI_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawYFI_PNG = async function() {
    return gaugeContractWithdraw(YFI_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawETH_PNG = async function() {
    return gaugeContractWithdraw(ETH_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPNG_SNOB = async function() {
    return gaugeContractWithdraw(PNG_SNOB_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPNG_VSO = async function() {
    return gaugeContractWithdraw(VSO_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawAVAX_VSO = async function() {
    return gaugeContractWithdraw(VSO_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawPNG_SPORE = async function() {
    return gaugeContractWithdraw(SPORE_PNG_GAUGE, GAUGE_ABI, App);
  }
  const withdrawAVAX_SPORE = async function() {
    return gaugeContractWithdraw(SPORE_AVAX_GAUGE, GAUGE_ABI, App);
  }
  const withdrawJOE_AVAX_ETH = async function() {
    return gaugeContractWithdraw(JOE_ETH_AVAX_GAUGE, GAUGE_ABI, App);
  }


  const signer = App.provider.getSigner();

  //Tokens
  const SNOB_AVAX_TOKEN = new ethers.Contract(SPGL_SNOB_AVAX_ADDR, ERC20_ABI, signer)
  const S3D_TOKEN = new ethers.Contract(S3D_ADDRESS, ERC20_ABI, signer)
  const S3F_TOKEN = new ethers.Contract(S3F_ADDRESS, ERC20_ABI, signer)
  const SPGL_SUSHI_TOKEN = new ethers.Contract(SPGL_SUSHI_ADDRESS, ERC20_ABI, signer)
  const SPGL_PNG_TOKEN = new ethers.Contract(SPGL_PNG_ADDRESS, ERC20_ABI, signer)
  const SPGL_ETH_TOKEN = new ethers.Contract(SPGL_ETH_ADDRESS, ERC20_ABI, signer)
  const SPGL_LINK_TOKEN = new ethers.Contract(SPGL_LINK_ADDRESS, ERC20_ABI, signer)
  const SPGL_USDT_TOKEN = new ethers.Contract(SPGL_USDT_ADDRESS, ERC20_ABI, signer)
  const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)
  const SPGL_WBTC_AVAX_TOKEN = new ethers.Contract(SPGL_WBTC_AVAX, ERC20_ABI, signer);
  const SPGL_DAI_AVAX_TOKEN = new ethers.Contract(SPGL_DAI_AVAX, ERC20_ABI, signer);
  const SPGL_UNI_AVAX_TOKEN = new ethers.Contract(SPGL_UNI_AVAX, ERC20_ABI, signer);
  const SPGL_WBTC_PNG_TOKEN = new ethers.Contract(SPGL_WBTC_PNG, ERC20_ABI, signer);
  const SPGL_LINK_PNG_TOKEN = new ethers.Contract(SPGL_LINK_PNG, ERC20_ABI, signer);
  const SPGL_USDT_PNG_TOKEN = new ethers.Contract(SPGL_USDT_PNG, ERC20_ABI, signer);
  const SPGL_SUSHI_PNG_TOKEN = new ethers.Contract(SPGL_SUSHI_PNG, ERC20_ABI, signer);
  const SPGL_DAI_PNG_TOKEN = new ethers.Contract(SPGL_DAI_PNG, ERC20_ABI, signer);
  const SPGL_AAVE_PNG_TOKEN = new ethers.Contract(SPGL_AAVE_PNG, ERC20_ABI, signer);
  const SPGL_UNI_PNG_TOKEN = new ethers.Contract(SPGL_UNI_PNG, ERC20_ABI, signer);
  const SPGL_YFI_PNG_TOKEN = new ethers.Contract(SPGL_YFI_PNG, ERC20_ABI, signer);
  const SPGL_ETH_PNG_TOKEN = new ethers.Contract(SPGL_ETH_PNG, ERC20_ABI, signer);
  const SPGL_PNG_SNOB_TOKEN = new ethers.Contract(SPGL_PNG_SNOB, ERC20_ABI, signer);
  const SPGL_VSO_PNG_TOKEN = new ethers.Contract(SPGL_VSO_PNG, ERC20_ABI, signer);
  const SPGL_VSO_AVAX_TOKEN = new ethers.Contract(SPGL_VSO_AVAX, ERC20_ABI, signer);
  const SPGL_SPORE_PNG_TOKEN = new ethers.Contract(SPGL_SPORE_PNG, ERC20_ABI, signer);
  const SPGL_SPORE_AVAX_TOKEN = new ethers.Contract(SPGL_SPORE_AVAX, ERC20_ABI, signer);
  const SJLP_ETH_AVAX_TOKEN = new ethers.Contract(SJLP_AVAX_ETH, ERC20_ABI, signer);
  

  //Contracts
  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)
  const STAKING_CONTRACT = new ethers.Contract(STAKING_ADDR, STAKING_ABI, signer)

  /* GAUGE CONTRACTS */
  const LINK_GAUGE_CONTRACT = new ethers.Contract(LINK_AVAX_GAUGE, GAUGE_ABI, signer);
  const SUSHI_GAUGE_CONTRACT = new ethers.Contract(SUSHI_AVAX_GAUGE, GAUGE_ABI, signer);
  const PNG_GAUGE_CONTRACT = new ethers.Contract(PNG_AVAX_GAUGE, GAUGE_ABI, signer);
  const ETH_GAUGE_CONTRACT = new ethers.Contract(ETH_AVAX_GAUGE, GAUGE_ABI, signer);
  const USDT_GAUGE_CONTRACT = new ethers.Contract(USDT_AVAX_GAUGE, GAUGE_ABI, signer);
  const S3D_GAUGE_CONTRACT = new ethers.Contract(S3D_GAUGE, GAUGE_ABI, signer);
  const S3F_GAUGE_CONTRACT = new ethers.Contract(S3F_GAUGE, GAUGE_ABI, signer);
  const SNOB_AVAX_GAUGE_CONTRACT = new ethers.Contract(SNOB_AVAX_GAUGE, GAUGE_ABI, signer);
  const WBTC_AVAX_GAUGE_CONTRACT = new ethers.Contract(WBTC_AVAX_GAUGE, GAUGE_ABI, signer);
  const DAI_AVAX_GAUGE_CONTRACT = new ethers.Contract(DAI_AVAX_GAUGE, GAUGE_ABI, signer);
  const UNI_AVAX_GAUGE_CONTRACT = new ethers.Contract(UNI_AVAX_GAUGE, GAUGE_ABI, signer);
  const WBTC_PNG_GAUGE_CONTRACT = new ethers.Contract(WBTC_PNG_GAUGE, GAUGE_ABI, signer);
  const LINK_PNG_GAUGE_CONTRACT = new ethers.Contract(LINK_PNG_GAUGE, GAUGE_ABI, signer);
  const USDT_PNG_GAUGE_CONTRACT = new ethers.Contract(USDT_PNG_GAUGE, GAUGE_ABI, signer);
  const SUSHI_PNG_GAUGE_CONTRACT = new ethers.Contract(SUSHI_PNG_GAUGE, GAUGE_ABI, signer);
  const DAI_PNG_GAUGE_CONTRACT = new ethers.Contract(DAI_PNG_GAUGE, GAUGE_ABI, signer);
  const AAVE_PNG_GAUGE_CONTRACT = new ethers.Contract(AAVE_PNG_GAUGE, GAUGE_ABI, signer);
  const UNI_PNG_GAUGE_CONTRACT = new ethers.Contract(UNI_PNG_GAUGE, GAUGE_ABI, signer);
  const YFI_PNG_GAUGE_CONTRACT = new ethers.Contract(YFI_PNG_GAUGE, GAUGE_ABI, signer);
  const ETH_PNG_GAUGE_CONTRACT = new ethers.Contract(ETH_PNG_GAUGE, GAUGE_ABI, signer);
  const PNG_SNOB_GAUGE_CONTRACT = new ethers.Contract(PNG_SNOB_GAUGE, GAUGE_ABI, signer);
  const VSO_AVAX_GAUGE_CONTRACT = new ethers.Contract(VSO_AVAX_GAUGE, GAUGE_ABI, signer);
  const VSO_PNG_GAUGE_CONTRACT = new ethers.Contract(VSO_PNG_GAUGE, GAUGE_ABI, signer);
  const SPORE_AVAX_GAUGE_CONTRACT = new ethers.Contract(SPORE_AVAX_GAUGE, GAUGE_ABI, signer);
  const SPORE_PNG_GAUGE_CONTRACT = new ethers.Contract(SPORE_PNG_GAUGE, GAUGE_ABI, signer);
  const JOE_AVAX_ETH_GAUGE_CONTRACT = new ethers.Contract(JOE_ETH_AVAX_GAUGE, GAUGE_ABI, signer);
  

  let snobTotalSupply, pendingSNOBTokensPool1, pendingSNOBTokensPool2, pendingSNOBTokensPool3, pendingSNOBTokensPool4, pendingSNOBTokensPool5, pendingSNOBTokensPool6, pendingSNOBTokensPool7, pendingSNOBTokensPool8;
  let currentSNOBTokens, snowballMultiplier, blockRate, blockNumber, currentBlock, yesterdayBlock;

  await Promise.all([
    SNOB_TOKEN.totalSupply(),
    SUSHI_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    SNOB_AVAX_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    ETH_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    USDT_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    LINK_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    S3D_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.BONUS_MULTIPLIER(),
    ICEQUEEN_CONTRACT.snowballPerBlock(),
    App.provider.getBlockNumber(),
    S3F_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    WBTC_AVAX_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    DAI_AVAX_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    UNI_AVAX_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    WBTC_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    LINK_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    USDT_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    SUSHI_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    DAI_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    AAVE_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    UNI_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    YFI_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    PNG_SNOB_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    ETH_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    VSO_AVAX_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    VSO_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    SPORE_AVAX_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    SPORE_PNG_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS),
    JOE_AVAX_ETH_GAUGE_CONTRACT.earned(App.YOUR_ADDRESS)
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
    pendingSNOBTokensPool8 = res[12];
    pendingSNOBTokensPool_WBTC_AVAX = res[13];
    pendingSNOBTokensPool_DAI_AVAX = res[14];
    pendingSNOBTokensPool_UNI_AVAX = res[15];
    pendingSNOBTokensPool_WBTC_PNG = res[16];
    pendingSNOBTokensPool_LINK_PNG = res[17];
    pendingSNOBTokensPool_USDT_PNG = res[18];
    pendingSNOBTokensPool_SUSHI_PNG = res[19];
    pendingSNOBTokensPool_DAI_PNG = res[20];
    pendingSNOBTokensPool_AAVE_PNG = res[21];
    pendingSNOBTokensPool_UNI_PNG = res[22];
    pendingSNOBTokensPool_YFI_PNG = res[23];
    pendingSNOBTokensPool_PNG_SNOB = res[24];
    pendingSNOBTokensPool_ETH_PNG = res[25];
    pendingSNOBTokensPool_VSO_AVAX = res[26];
    pendingSNOBTokensPool_VSO_PNG = res[27];
    pendingSNOBTokensPool_SPORE_AVAX = res[28];
    pendingSNOBTokensPool_SPORE_PNG = res[29];
    pendingSNOBTokensPool_JOE_ETH_AVAX = res[30];
  });

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
  var claimableSnowballs = pendingGovReward / 1e18 + pendingSNOBTokensPool1 / 1e18 + pendingSNOBTokensPool2 / 1e18 + pendingSNOBTokensPool3 / 1e18 + pendingSNOBTokensPool4 / 1e18 + pendingSNOBTokensPool5 / 1e18 + pendingSNOBTokensPool6 / 1e18 + pendingSNOBTokensPool7 / 1e18 + pendingSNOBTokensPool8 / 1e18;
  claimableSnowballs += pendingSNOBTokensPool_WBTC_AVAX / 1e18 + pendingSNOBTokensPool_DAI_AVAX / 1e18 + pendingSNOBTokensPool_UNI_AVAX / 1e18;
  claimableSnowballs += pendingSNOBTokensPool_LINK_PNG / 1e18 + pendingSNOBTokensPool_USDT_PNG / 1e18 + pendingSNOBTokensPool_SUSHI_PNG / 1e18 + pendingSNOBTokensPool_WBTC_PNG / 1e18 + pendingSNOBTokensPool_ETH_PNG / 1e18;
  claimableSnowballs += pendingSNOBTokensPool_DAI_PNG / 1e18 + pendingSNOBTokensPool_AAVE_PNG / 1e18 + pendingSNOBTokensPool_UNI_PNG / 1e18 + pendingSNOBTokensPool_YFI_PNG / 1e18 + pendingSNOBTokensPool_PNG_SNOB / 1e18+ pendingSNOBTokensPool_VSO_AVAX / 1e18 + pendingSNOBTokensPool_VSO_PNG / 1e18;
  claimableSnowballs += pendingSNOBTokensPool_SPORE_AVAX / 1e18 + pendingSNOBTokensPool_SPORE_PNG / 1e18;
  claimableSnowballs += pendingSNOBTokensPool_JOE_ETH_AVAX / 1e18 + pendingSNOBTokensPool_JOE_ETH_AVAX / 1e18;
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

  let currentSPGL_WBTC_AVAX, currentSPGL_DAI_AVAX, currentSPGL_UNI_AVAX;
  let stakedPool_WBTC_AVAX, stakedPool_DAI_AVAX, stakedPool_UNI_AVAX;
  let totalStaked_WBTC_AVAX, totalStaked_DAI_AVAX, totalStaked_UNI_AVAX;
  
  let currentSPGL_WBTC_PNG, currentSPGL_LINK_PNG, currentSPGL_USDT_PNG, currentSPGL_SUSHI_PNG, currentSPGL_DAI_PNG, currentSPGL_AAVE_PNG, currentSPGL_UNI_PNG, currentSPGL_YFI_PNG;
  let stakedPool_WBTC_PNG, stakedPool_LINK_PNG, stakedPool_USDT_PNG, stakedPool_SUSHI_PNG, stakedPool_DAI_PNG, stakedPool_AAVE_PNG, stakedPool_UNI_PNG, stakedPool_YFI_PNG;
  let totalStaked_WBTC_PNG, totalStaked_LINK_PNG, totalStaked_USDT_PNG, totalStaked_SUSHI_PNG, totalStaked_DAI_PNG, totalStaked_AAVE_PNG, totalStaked_UNI_PNG, totalStaked_YFI_PNG;
  
  let currentSPGL_PNG_SNOB;
  let stakedPool_PNG_SNOB;
  let totalStaked_PNG_SNOB;

  let currentSPGL_ETH_PNG;
  let stakedPool_ETH_PNG;
  let totalStaked_ETH_PNG;

  let currentSPGL_PNG_VSO;
  let stakedPool_PNG_VSO;
  let totalStaked_PNG_VSO;

  let currentSPGL_AVAX_VSO;
  let stakedPool_AVAX_VSO;
  let totalStaked_AVAX_VSO;

  let currentSPGL_PNG_SPORE;
  let stakedPool_PNG_SPORE;
  let totalStaked_PNG_SPORE;

  let currentSPGL_AVAX_SPORE;
  let stakedPool_AVAX_SPORE;
  let totalStaked_AVAX_SPORE;

  let currentSJLP_AVAX_ETH;
  let stakedPool_JOE_AVAX_ETH;
  let totalStaked_JOE_AVAX_ETH;

  await Promise.all([
    SPGL_SUSHI_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPGL_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPGL_ETH_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPGL_USDT_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPGL_LINK_TOKEN.balanceOf(App.YOUR_ADDRESS),
    S3D_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SNOB_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS),

    SUSHI_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    SNOB_AVAX_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    ETH_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    USDT_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    LINK_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    S3D_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),

    SUSHI_GAUGE_CONTRACT.totalSupply(),
    PNG_GAUGE_CONTRACT.totalSupply(),
    ETH_GAUGE_CONTRACT.totalSupply(),
    SNOB_AVAX_GAUGE_CONTRACT.totalSupply(),
    USDT_GAUGE_CONTRACT.totalSupply(),
    LINK_GAUGE_CONTRACT.totalSupply(),
    S3D_GAUGE_CONTRACT.totalSupply(),
    S3F_TOKEN.balanceOf(App.YOUR_ADDRESS),
    S3F_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    S3F_GAUGE_CONTRACT.totalSupply(),
    SPGL_WBTC_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS),
    WBTC_AVAX_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    WBTC_AVAX_GAUGE_CONTRACT.totalSupply(),
    SPGL_DAI_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS),
    DAI_AVAX_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    DAI_AVAX_GAUGE_CONTRACT.totalSupply(),
    SPGL_UNI_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS),
    UNI_AVAX_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    UNI_AVAX_GAUGE_CONTRACT.totalSupply(),
    SPGL_WBTC_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    WBTC_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    WBTC_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_LINK_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    LINK_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    LINK_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_USDT_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    USDT_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    USDT_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_SUSHI_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SUSHI_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    SUSHI_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_DAI_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    DAI_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    DAI_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_AAVE_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    AAVE_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    AAVE_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_UNI_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    UNI_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    UNI_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_YFI_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    YFI_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    YFI_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_PNG_SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS),
    PNG_SNOB_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    PNG_SNOB_GAUGE_CONTRACT.totalSupply(),
    SPGL_ETH_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    ETH_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    ETH_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_VSO_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    VSO_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    VSO_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_VSO_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS),
    VSO_AVAX_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    VSO_AVAX_GAUGE_CONTRACT.totalSupply(),
    SPGL_SPORE_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPORE_PNG_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    SPORE_PNG_GAUGE_CONTRACT.totalSupply(),
    SPGL_SPORE_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS),
    SPORE_AVAX_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    SPORE_AVAX_GAUGE_CONTRACT.totalSupply(),
    SJLP_ETH_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS),
    JOE_AVAX_ETH_GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    JOE_AVAX_ETH_GAUGE_CONTRACT.totalSupply()
  ]).then(res => {
    currentSPGLSUSHITokens = res[0]
    currentSPGLPNGTokens = res[1]
    currentSPGLETHTokens = res[2]
    currentSPGLUSDTTokens = res[3]
    currentSPGLLINKTokens = res[4]
    currentS3DTokens = res[5];
    currentSNOBAVAXTokens = res[6]
    stakedPool1 = res[7]
    stakedPool2 = res[8]
    stakedPool3 = res[9]
    stakedPool4 = res[10]
    stakedPool5 = res[11]
    stakedPool6 = res[12];
    stakedPool7 = res[13]

    totalStakedSPGLSUSHI = res[14]
    totalStakedSPGLPNG = res[15]
    totalStakedSPGLETH = res[16];
    totalStakedSNOBAVAX = res[17];
    totalStakedSPGLUSDT = res[18]
    totalStakedSPGLLINK = res[19]
    totalStakedS3D = res[20]
    currentS3FTokens = res[21]
    stakedPool8 = res[22]
    totalStakedS3F = res[23];
    currentSPGL_WBTC_AVAX = res[24];
    stakedPool_WBTC_AVAX = res[25];
    totalStaked_WBTC_AVAX = res[26];
    currentSPGL_DAI_AVAX = res[27];
    stakedPool_DAI_AVAX = res[28];
    totalStaked_DAI_AVAX = res[29];
    currentSPGL_UNI_AVAX = res[30];
    stakedPool_UNI_AVAX = res[31];
    totalStaked_UNI_AVAX = res[32];
    currentSPGL_WBTC_PNG = res[33];
    stakedPool_WBTC_PNG = res[34];
    totalStaked_WBTC_PNG = res[35];
    currentSPGL_LINK_PNG = res[36];
    stakedPool_LINK_PNG = res[37];
    totalStaked_LINK_PNG = res[38];
    currentSPGL_USDT_PNG = res[39];
    stakedPool_USDT_PNG = res[40];
    totalStaked_USDT_PNG = res[41];
    currentSPGL_SUSHI_PNG = res[42];
    stakedPool_SUSHI_PNG = res[43];
    totalStaked_SUSHI_PNG = res[44];
    currentSPGL_DAI_PNG = res[45];
    stakedPool_DAI_PNG = res[46];
    totalStaked_DAI_PNG = res[47];
    currentSPGL_AAVE_PNG = res[48];
    stakedPool_AAVE_PNG = res[49];
    totalStaked_AAVE_PNG = res[50];
    currentSPGL_UNI_PNG = res[51];
    stakedPool_UNI_PNG = res[52];
    totalStaked_UNI_PNG = res[53];
    currentSPGL_YFI_PNG = res[54];
    stakedPool_YFI_PNG = res[55];
    totalStaked_YFI_PNG = res[56];
    currentSPGL_PNG_SNOB = res[57];
    stakedPool_PNG_SNOB = res[58];
    totalStaked_PNG_SNOB = res[59];
    currentSPGL_ETH_PNG = res[60];
    stakedPool_ETH_PNG = res[61];
    totalStaked_ETH_PNG = res[62];
    currentSPGL_PNG_VSO= res[63];
    stakedPool_PNG_VSO = res[64];
    totalStaked_PNG_VSO = res[65];
    currentSPGL_AVAX_VSO= res[66];
    stakedPool_AVAX_VSO = res[67];
    totalStaked_AVAX_VSO = res[68];
    currentSPGL_PNG_SPORE= res[69];
    stakedPool_PNG_SPORE = res[70];
    totalStaked_PNG_SPORE = res[71];
    currentSPGL_AVAX_SPORE= res[72];
    stakedPool_AVAX_SPORE = res[73];
    totalStaked_AVAX_SPORE = res[74];
    currentSJLP_AVAX_ETH = res[75];
    stakedPool_JOE_AVAX_ETH = res[76];
    totalStaked_JOE_AVAX_ETH = res[77];
  });
  console.log("currentSJLP_AVAX_ETH: ",currentSJLP_AVAX_ETH);

  //Balances
  const spglSushiDisplayAmt = currentSPGLSUSHITokens > 1000 ? currentSPGLSUSHITokens / 1e18 : 0;
  const spglPngDisplayAmt = currentSPGLPNGTokens > 1000 ? currentSPGLPNGTokens / 1e18 : 0;
  const spglEthDisplayAmt = currentSPGLETHTokens > 1000 ? currentSPGLETHTokens / 1e18 : 0;
  const spglUsdtDisplayAmt = currentSPGLUSDTTokens > 1000 ? currentSPGLUSDTTokens / 1e18 : 0;
  const spglLinkDisplayAmt = currentSPGLLINKTokens > 1000 ? currentSPGLLINKTokens / 1e18 : 0;
  const S3DDisplayAmt = currentS3DTokens > 1000 ? currentS3DTokens / 1e18 : 0;
  const S3FDisplayAmt = currentS3FTokens > 1000 ? currentS3FTokens / 1e18 : 0;
  const snobAvaxDisplayAmt = currentSNOBAVAXTokens > 1000 ? currentSNOBAVAXTokens / 1e18 : 0;
  const wbtcAvaxDisplayAmount = currentSPGL_WBTC_AVAX > 1000 ? currentSPGL_WBTC_AVAX / 1e18 : 0;
  const daiAvaxDisplayAmount = currentSPGL_DAI_AVAX > 1000 ? currentSPGL_DAI_AVAX / 1e18 : 0;
  const uniAvaxDisplayAmount = currentSPGL_UNI_AVAX > 1000 ? currentSPGL_UNI_AVAX / 1e18 : 0;
  const WBTC_PNG_DisplayAmount = currentSPGL_WBTC_PNG > 1000 ? currentSPGL_WBTC_PNG / 1e18 : 0;
  const LINK_PNG_DisplayAmount = currentSPGL_LINK_PNG > 1000 ? currentSPGL_LINK_PNG / 1e18 : 0;
  const USDT_PNG_DisplayAmount = currentSPGL_USDT_PNG > 1000 ? currentSPGL_USDT_PNG / 1e18 : 0;
  const SUSHI_PNG_DisplayAmount = currentSPGL_SUSHI_PNG > 1000 ? currentSPGL_SUSHI_PNG / 1e18 : 0;
  const DAI_PNG_DisplayAmount = currentSPGL_DAI_PNG > 1000 ? currentSPGL_DAI_PNG / 1e18 : 0;
  const AAVE_PNG_DisplayAmount = currentSPGL_AAVE_PNG > 1000 ? currentSPGL_AAVE_PNG / 1e18 : 0;
  const UNI_PNG_DisplayAmount = currentSPGL_UNI_PNG > 1000 ? currentSPGL_UNI_PNG / 1e18 : 0;
  const YFI_PNG_DisplayAmount = currentSPGL_YFI_PNG > 1000 ? currentSPGL_YFI_PNG / 1e18 : 0;
  const PNG_SNOB_DisplayAmount = currentSPGL_PNG_SNOB > 1000 ? currentSPGL_PNG_SNOB / 1e18 : 0;
  const ETH_PNG_DisplayAmount = currentSPGL_ETH_PNG > 1000 ? currentSPGL_ETH_PNG / 1e18 : 0;
  const PNG_VSO_DisplayAmount = currentSPGL_PNG_VSO > 1000 ? currentSPGL_PNG_VSO / 1e18 : 0;
  const AVAX_VSO_DisplayAmount = currentSPGL_AVAX_VSO > 1000 ? currentSPGL_AVAX_VSO / 1e18 : 0;
  const PNG_SPORE_DisplayAmount = currentSPGL_PNG_SPORE > 1000 ? currentSPGL_PNG_SPORE / 1e18 : 0;
  const AVAX_SPORE_DisplayAmount = currentSPGL_AVAX_SPORE > 1000 ? currentSPGL_AVAX_SPORE / 1e18 : 0;
  const JOE_AVAX_ETH_DisplayAmount = currentSJLP_AVAX_ETH > 1000 ? currentSJLP_AVAX_ETH / 1e18 : 0;
  console.log("JOE_AVAX_ETH_DisplayAmount: ",JOE_AVAX_ETH_DisplayAmount);


  const userPool8Percent = (stakedPool8 / 1e18) / (totalStakedS3F / 1e18) * 100
  const userPool7Percent = (stakedPool7 / 1e18) / (totalStakedS3D / 1e18) * 100
  const userPool6Percent = (stakedPool6 / 1e18) / (totalStakedSPGLLINK / 1e18) * 100;
  const userPool5Percent = (stakedPool5 / 1e18) / (totalStakedSPGLUSDT / 1e18) * 100
  const userPool4Percent = (stakedPool4 / 1e18) / (totalStakedSPGLETH / 1e18) * 100
  const userPool3Percent = (stakedPool3 / 1e18) / (totalStakedSPGLPNG / 1e18) * 100
  const userPool2Percent = (stakedPool2 / 1e18) / (totalStakedSNOBAVAX / 1e18) * 100
  const userPool1Percent = (stakedPool1 / 1e18) / (totalStakedSPGLSUSHI / 1e18) * 100

  const userPool_WBTC_AVAX = (stakedPool_WBTC_AVAX / 1e18) / (totalStaked_WBTC_AVAX / 1e18) * 100;
  const userPool_DAI_AVAX = (stakedPool_DAI_AVAX / 1e18) / (totalStaked_DAI_AVAX / 1e18) * 100;
  const userPool_UNI_AVAX = (stakedPool_UNI_AVAX / 1e18) / (totalStaked_UNI_AVAX / 1e18) * 100;
  const userPool_WBTC_PNG = (stakedPool_WBTC_PNG / 1e18) / (totalStaked_WBTC_PNG / 1e18) * 100;
  const userPool_LINK_PNG = (stakedPool_LINK_PNG / 1e18) / (totalStaked_LINK_PNG / 1e18) * 100;
  const userPool_USDT_PNG = (stakedPool_USDT_PNG / 1e18) / (totalStaked_USDT_PNG / 1e18) * 100;
  const userPool_SUSHI_PNG = (stakedPool_SUSHI_PNG / 1e18) / (totalStaked_SUSHI_PNG / 1e18) * 100;
  const userPool_DAI_PNG = (stakedPool_DAI_PNG / 1e18) / (totalStaked_DAI_PNG / 1e18) * 100;
  const userPool_AAVE_PNG = (stakedPool_AAVE_PNG / 1e18) / (totalStaked_AAVE_PNG / 1e18) * 100;
  const userPool_UNI_PNG = (stakedPool_UNI_PNG / 1e18) / (totalStaked_UNI_PNG / 1e18) * 100;
  const userPool_YFI_PNG = (stakedPool_YFI_PNG / 1e18) / (totalStaked_YFI_PNG / 1e18) * 100;
  const userPool_PNG_SNOB = (stakedPool_PNG_SNOB / 1e18) / (totalStaked_PNG_SNOB / 1e18) * 100;
  const userPool_ETH_PNG = (stakedPool_ETH_PNG / 1e18) / (totalStaked_ETH_PNG / 1e18) * 100;
  const userPool_PNG_VSO = (stakedPool_PNG_VSO / 1e18) / (totalStaked_PNG_VSO / 1e18) * 100;
  const userPool_AVAX_VSO = (stakedPool_AVAX_VSO / 1e18) / (totalStaked_AVAX_VSO / 1e18) * 100;
  const userPool_PNG_SPORE = (stakedPool_PNG_SPORE / 1e18) / (totalStaked_PNG_SPORE / 1e18) * 100;
  const userPool_AVAX_SPORE = (stakedPool_AVAX_SPORE / 1e18) / (totalStaked_AVAX_SPORE / 1e18) * 100;
  const userPool_JOE_AVAX_ETH = (stakedPool_JOE_AVAX_ETH / 1e18) / (totalStaked_JOE_AVAX_ETH / 1e18) * 100;

  const poolShareDisplay_7 = `${(stakedPool7 / 1e18).toFixed(6)} S3D`;
  const poolShareDisplay_8 = `${(stakedPool8 / 1e18).toFixed(6)} S3F`;

  const pool8weight = 0.33
  const pool7weight = 0.20
  const pool6weight = 0.08
  const pool5weight = 0.05
  const pool4weight = 0.08
  const pool3weight = 0.11
  const pool2weight = 0.40
  const pool1weight = 0.08

  const pool8tvl = totalStakedS3F / 1e18;
  const pool8tvlDisplay = `$${new Intl.NumberFormat('en-US').format(pool8tvl)}`;
  const pool8APR = snowballsPerBlock * pool8weight / 1e18 * 15000 * snobPrice / pool8tvl * 100;
  
  const pool7tvl = totalStakedS3D / 1e18;
  const pool7tvlDisplay = `$${new Intl.NumberFormat('en-US').format(pool7tvl)}`;
  const pool7APR = snowballsPerBlock * pool7weight / 1e18 * 15000 * snobPrice / pool7tvl * 100;
  
  let pool6APR, pool5APR, pool4APR, pool3APR, pool2APR, pool1APR;
  let pool6tvl, pool5tvl, pool4tvl, pool3tvl, pool2tvl, pool1tvl;
  let pool6tvlDisplay, pool5tvlDisplay, pool4tvlDisplay, pool3tvlDisplay, pool2tvlDisplay, pool1tvlDisplay;

  let tvl_class = 'tvl-hide';
  let res = null;

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
      // console.log("token0Address:", token0Address);
      // console.log("token0Name:", TOKEN_NAMES[token0Address]);
      // console.log("token1Address:", token1Address);
      // console.log("token1Name:", TOKEN_NAMES[token1Address]);
      // console.log("reserves:", reserves);
      // console.log("reserve0Owned:", reserve0Owned);
      // console.log("reserve1Owned:", reserve1Owned);
      // console.log("t0Price:", t0Price);
      // console.log("t1Price:", t1Price);
      return [
        `${userSPGL > 1 ? userSPGL.toFixed(3) : userSPGL.toFixed(8)} sPGL`,
        `${ownedPGL > 1 ? ownedPGL.toFixed(3) : ownedPGL.toFixed(8)} PGL - ${pool_percent.toFixed(6)}%`,
        `<div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
          <p class="m-0 font-size-12"><ion-icon name="flame-outline"></ion-icon> Your LP value is</p>
          <p class="m-0 font-size-16 font-weight-regular">${reserve0Owned.toFixed(8)} ${TOKEN_NAMES[token0Address]} / ${reserve1Owned.toFixed(8)} ${TOKEN_NAMES[token1Address]}  </p>
          <p class="m-0 font-size-12">($${value.toFixed(2)})</p>
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
  if (stakedPool1 / 1e18 > 0) {
    let ret_1 = await calculateShare(snowglobeContract_1, SUSHI_AVAX_ADDR, stakedPool1 / 1e18, 1e18, userPool1Percent)
    poolShareDisplay_1 = ret_1[0]
    poolShareDisplay_1_pgl = ret_1[1]
    stakeDisplay_1 = ret_1[2]
    totalPoolPGL_1 = ret_1[3]
  }
  const snowglobeContract_2 = new ethers.Contract(SPGL_SNOB_AVAX_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_2, poolShareDisplay_2_pgl, stakeDisplay_2, totalPoolPGL_2;
  if (stakedPool2 / 1e18 > 0) {
    let ret_2 = await calculateShare(snowglobeContract_2, PGL_SNOB_AVAX_ADDR, stakedPool2 / 1e18, 1e18, userPool2Percent)
    poolShareDisplay_2 = ret_2[0];
    poolShareDisplay_2_pgl = ret_2[1];
    stakeDisplay_2 = ret_2[2];
    totalPoolPGL_2 = ret_2[3];
  }

  //SNOWGLOBE_PNG_ADDR
  const snowglobeContract_3 = new ethers.Contract(SNOWGLOBE_PNG_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_3, poolShareDisplay_3_pgl, stakeDisplay_3, totalPoolPGL_3;
  if (stakedPool3 / 1e18 > 0) {
    let ret_3 = await calculateShare(snowglobeContract_3, PNG_AVAX_ADDR, stakedPool3 / 1e18, 1e18, userPool3Percent)
    poolShareDisplay_3 = ret_3[0]
    poolShareDisplay_3_pgl = ret_3[1]
    stakeDisplay_3 = ret_3[2]
    totalPoolPGL_3 = ret_3[3]
  }

  //SNOWGLOBE_ETH_ADDR
  const snowglobeContract_4 = new ethers.Contract(SNOWGLOBE_ETH_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_4, poolShareDisplay_4_pgl, stakeDisplay_4, totalPoolPGL_4;
  if (stakedPool4 / 1e18 > 0) {
    let ret_4 = await calculateShare(snowglobeContract_4, ETH_AVAX_ADDR, stakedPool4 / 1e18, 1e18, userPool4Percent)
    poolShareDisplay_4 = ret_4[0]
    poolShareDisplay_4_pgl = ret_4[1]
    stakeDisplay_4 = ret_4[2]
    totalPoolPGL_4 = ret_4[3]
  }

  //SNOWGLOBE_USDT_ADDR
  const snowglobeContract_5 = new ethers.Contract(SNOWGLOBE_USDT_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_5, poolShareDisplay_5_pgl, stakeDisplay_5, totalPoolPGL_5;
  if (stakedPool5 / 1e18 > 0) {
    let ret_5 = await calculateShare(snowglobeContract_5, USDT_AVAX_ADDR, stakedPool5 / 1e18, 1e6, userPool5Percent)
    poolShareDisplay_5 = ret_5[0]
    poolShareDisplay_5_pgl = ret_5[1]
    stakeDisplay_5 = ret_5[2]
    totalPoolPGL_5 = ret_5[3]
  }

  //SNOWGLOBE_LINK_ADDR
  const snowglobeContract_6 = new ethers.Contract(SNOWGLOBE_LINK_ADDR, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_6, poolShareDisplay_6_pgl, stakeDisplay_6, totalPoolPGL_6;
  if (stakedPool6 / 1e18 > 0) {
    let ret_6 = await calculateShare(snowglobeContract_6, LINK_AVAX_ADDR, stakedPool6 / 1e18, 1e18, userPool6Percent)
    poolShareDisplay_6 = ret_6[0]
    poolShareDisplay_6_pgl = ret_6[1]
    stakeDisplay_6 = ret_6[2]
    totalPoolPGL_6 = ret_6[3]
  }

  const snowglobeContract_9 = new ethers.Contract(SPGL_WBTC_AVAX, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_9, poolShareDisplay_9_pgl, stakeDisplay_9, totalPoolPGL_9;
  if (stakedPool_WBTC_AVAX / 1e18 > 0) {
    let ret_9 = await calculateShare(snowglobeContract_9, PGL_WBTC_AVAX, stakedPool_WBTC_AVAX / 1e18, 1e18, userPool_WBTC_AVAX)
    poolShareDisplay_9 = ret_9[0]
    poolShareDisplay_9_pgl = ret_9[1]
    stakeDisplay_9 = ret_9[2]
    totalPoolPGL_9 = ret_9[3]
  }

  const snowglobeContract_10 = new ethers.Contract(SPGL_DAI_AVAX, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_10, poolShareDisplay_10_pgl, stakeDisplay_10, totalPoolPGL_10;
  if (stakedPool_DAI_AVAX / 1e18 > 0) {
    let ret_10 = await calculateShare(snowglobeContract_10, PGL_DAI_AVAX, stakedPool_DAI_AVAX / 1e18, 1e18, userPool_DAI_AVAX)
    poolShareDisplay_10 = ret_10[0]
    poolShareDisplay_10_pgl = ret_10[1]
    stakeDisplay_10 = ret_10[2]
    totalPoolPGL_10 = ret_10[3]
  }

  const snowglobeContract_11 = new ethers.Contract(SPGL_UNI_AVAX, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_11, poolShareDisplay_11_pgl, stakeDisplay_11, totalPoolPGL_11;
  if (stakedPool_UNI_AVAX / 1e18 > 0) {
    let ret_11 = await calculateShare(snowglobeContract_11, PGL_UNI_AVAX, stakedPool_UNI_AVAX / 1e18, 1e18, userPool_UNI_AVAX)
    poolShareDisplay_11 = ret_11[0]
    poolShareDisplay_11_pgl = ret_11[1]
    stakeDisplay_11 = ret_11[2]
    totalPoolPGL_11 = ret_11[3]
  }

  const snowglobeContract_12 = new ethers.Contract(SPGL_WBTC_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_12, poolShareDisplay_12_pgl, stakeDisplay_12, totalPoolPGL_12;
  if (stakedPool_WBTC_PNG / 1e18 > 0) {
    let ret_12 = await calculateShare(snowglobeContract_12, PGL_WBTC_PNG, stakedPool_WBTC_PNG / 1e18, 1e18, userPool_WBTC_PNG)
    poolShareDisplay_12 = ret_12[0]
    poolShareDisplay_12_pgl = ret_12[1]
    stakeDisplay_12 = ret_12[2]
    totalPoolPGL_12 = ret_12[3]
  }

  const snowglobeContract_13 = new ethers.Contract(SPGL_LINK_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_13, poolShareDisplay_13_pgl, stakeDisplay_13, totalPoolPGL_13;
  if (stakedPool_LINK_PNG / 1e18 > 0) {
    let ret_13 = await calculateShare(snowglobeContract_13, PGL_LINK_PNG, stakedPool_LINK_PNG / 1e18, 1e18, userPool_LINK_PNG)
    poolShareDisplay_13 = ret_13[0]
    poolShareDisplay_13_pgl = ret_13[1]
    stakeDisplay_13 = ret_13[2]
    totalPoolPGL_13 = ret_13[3]
  }

  const snowglobeContract_14 = new ethers.Contract(SPGL_USDT_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_14, poolShareDisplay_14_pgl, stakeDisplay_14, totalPoolPGL_14;
  if (stakedPool_USDT_PNG / 1e18 > 0) {
    let ret_14 = await calculateShare(snowglobeContract_14, PGL_USDT_PNG, stakedPool_USDT_PNG / 1e18, 1e6, userPool_USDT_PNG)
    poolShareDisplay_14 = ret_14[0]
    poolShareDisplay_14_pgl = ret_14[1]
    stakeDisplay_14 = ret_14[2]
    totalPoolPGL_14 = ret_14[3]
  }

  const snowglobeContract_15 = new ethers.Contract(SPGL_SUSHI_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_15, poolShareDisplay_15_pgl, stakeDisplay_15, totalPoolPGL_15;
  if (stakedPool_SUSHI_PNG / 1e18 > 0) {
    let ret_15 = await calculateShare(snowglobeContract_15, PGL_SUSHI_PNG, stakedPool_SUSHI_PNG / 1e18, 1e18, userPool_SUSHI_PNG)
    poolShareDisplay_15 = ret_15[0]
    poolShareDisplay_15_pgl = ret_15[1]
    stakeDisplay_15 = ret_15[2]
    totalPoolPGL_15 = ret_15[3]
  }

  const snowglobeContract_16 = new ethers.Contract(SPGL_DAI_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_16, poolShareDisplay_16_pgl, stakeDisplay_16, totalPoolPGL_16;
  if (stakedPool_DAI_PNG / 1e18 > 0) {
    let ret_16 = await calculateShare(snowglobeContract_16, PGL_DAI_PNG, stakedPool_DAI_PNG / 1e18, 1e18, userPool_DAI_PNG)
    poolShareDisplay_16 = ret_16[0]
    poolShareDisplay_16_pgl = ret_16[1]
    stakeDisplay_16 = ret_16[2]
    totalPoolPGL_16 = ret_16[3]
  }

  const snowglobeContract_17 = new ethers.Contract(SPGL_AAVE_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_17, poolShareDisplay_17_pgl, stakeDisplay_17, totalPoolPGL_17;
  if (stakedPool_AAVE_PNG / 1e18 > 0) {
    let ret_17 = await calculateShare(snowglobeContract_17, PGL_AAVE_PNG, stakedPool_AAVE_PNG / 1e18, 1e18, userPool_AAVE_PNG)
    poolShareDisplay_17 = ret_17[0]
    poolShareDisplay_17_pgl = ret_17[1]
    stakeDisplay_17 = ret_17[2]
    totalPoolPGL_17 = ret_17[3]
  }

  const snowglobeContract_18 = new ethers.Contract(SPGL_UNI_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_18, poolShareDisplay_18_pgl, stakeDisplay_18, totalPoolPGL_18;
  if (stakedPool_UNI_PNG / 1e18 > 0) {
    let ret_18 = await calculateShare(snowglobeContract_18, PGL_UNI_PNG, stakedPool_UNI_PNG / 1e18, 1e18, userPool_UNI_PNG)
    poolShareDisplay_18 = ret_18[0]
    poolShareDisplay_18_pgl = ret_18[1]
    stakeDisplay_18 = ret_18[2]
    totalPoolPGL_18 = ret_18[3]
  }

  const snowglobeContract_19 = new ethers.Contract(SPGL_YFI_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_19, poolShareDisplay_19_pgl, stakeDisplay_19, totalPoolPGL_19;
  if (stakedPool_YFI_PNG / 1e18 > 0) {
    let ret_19 = await calculateShare(snowglobeContract_19, PGL_YFI_PNG, stakedPool_YFI_PNG / 1e18, 1e18, userPool_YFI_PNG)
    poolShareDisplay_19 = ret_19[0]
    poolShareDisplay_19_pgl = ret_19[1]
    stakeDisplay_19 = ret_19[2]
    totalPoolPGL_19 = ret_19[3]
  }

  const snowglobeContract_20 = new ethers.Contract(SPGL_ETH_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_20, poolShareDisplay_20_pgl, stakeDisplay_20, totalPoolPGL_20;
  if (stakedPool_ETH_PNG / 1e18 > 0) {
    let ret_20 = await calculateShare(snowglobeContract_20, PGL_ETH_PNG, stakedPool_ETH_PNG / 1e18, 1e18, userPool_ETH_PNG)
    poolShareDisplay_20 = ret_20[0]
    poolShareDisplay_20_pgl = ret_20[1]
    stakeDisplay_20 = ret_20[2]
    totalPoolPGL_20 = ret_20[3]
  }

  const snowglobeContract_21 = new ethers.Contract(SPGL_PNG_SNOB, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_21, poolShareDisplay_21_pgl, stakeDisplay_21, totalPoolPGL_21;
  if (stakedPool_PNG_SNOB / 1e18 > 0) {
    let ret_21 = await calculateShare(snowglobeContract_21, PGL_PNG_SNOB, stakedPool_PNG_SNOB / 1e18, 1e18, userPool_PNG_SNOB)
    poolShareDisplay_21 = ret_21[0]
    poolShareDisplay_21_pgl = ret_21[1]
    stakeDisplay_21 = ret_21[2]
    totalPoolPGL_21 = ret_21[3]
  }

  const snowglobeContract_22 = new ethers.Contract(SPGL_VSO_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_22, poolShareDisplay_22_pgl, stakeDisplay_22, totalPoolPGL_22;
  if (stakedPool_PNG_VSO / 1e18 > 0) {
    let ret_22 = await calculateShare(snowglobeContract_22, PGL_VSO_PNG, stakedPool_PNG_VSO / 1e18, 1e18, userPool_PNG_VSO)
    poolShareDisplay_22 = ret_22[0]
    poolShareDisplay_22_pgl = ret_22[1]
    stakeDisplay_22 = ret_22[2]
    totalPoolPGL_22 = ret_22[3]
  }

  const snowglobeContract_23 = new ethers.Contract(SPGL_VSO_AVAX, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_23, poolShareDisplay_23_pgl, stakeDisplay_23, totalPoolPGL_23;
  if (stakedPool_AVAX_VSO / 1e18 > 0) {
    let ret_23 = await calculateShare(snowglobeContract_23, PGL_VSO_AVAX, stakedPool_AVAX_VSO / 1e18, 1e18, userPool_AVAX_VSO)
    poolShareDisplay_23 = ret_23[0]
    poolShareDisplay_23_pgl = ret_23[1]
    stakeDisplay_23 = ret_23[2]
    totalPoolPGL_23 = ret_23[3]
  }

  const snowglobeContract_24 = new ethers.Contract(SPGL_SPORE_PNG, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_24, poolShareDisplay_24_pgl, stakeDisplay_24, totalPoolPGL_24;
  if (stakedPool_PNG_SPORE / 1e18 > 0) {
    let ret_24 = await calculateShare(snowglobeContract_24, PGL_SPORE_PNG, stakedPool_PNG_SPORE / 1e18, 1e18, userPool_PNG_SPORE)
    poolShareDisplay_24 = ret_24[0]
    poolShareDisplay_24_pgl = ret_24[1]
    stakeDisplay_24 = ret_24[2]
    totalPoolPGL_24 = ret_24[3]
  }

  const snowglobeContract_25 = new ethers.Contract(SPGL_SPORE_AVAX, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_25, poolShareDisplay_25_pgl, stakeDisplay_25, totalPoolPGL_25;
  if (stakedPool_AVAX_SPORE / 1e18 > 0) {
    let ret_25 = await calculateShare(snowglobeContract_25, PGL_SPORE_AVAX, stakedPool_AVAX_SPORE / 1e18, 1e18, userPool_AVAX_SPORE)
    poolShareDisplay_25 = ret_25[0]
    poolShareDisplay_25_pgl = ret_25[1]
    stakeDisplay_25 = ret_25[2]
    totalPoolPGL_25 = ret_25[3]
  }

  const snowglobeContract_26 = new ethers.Contract(SJLP_AVAX_ETH, SNOWGLOBE_ABI, signer);
  let poolShareDisplay_26, poolShareDisplay_26_pgl, stakeDisplay_26, totalPoolPGL_26;
  if (stakedPool_JOE_AVAX_ETH / 1e18 > 0) {
    let ret_26 = await calculateShare(snowglobeContract_26, JLP_ETH_AVAX, stakedPool_JOE_AVAX_ETH / 1e18, 1e18, userPool_JOE_AVAX_ETH)
    poolShareDisplay_26 = ret_26[0]
    poolShareDisplay_26_pgl = ret_26[1]
    stakeDisplay_26 = ret_26[2]
    totalPoolPGL_26 = ret_26[3]
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
      

      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${options.total_staked / 1e18 > 1 ? (options.total_staked / 1e18).toLocaleString() : (options.total_staked / 1e18).toFixed(6)} sPGL </span>
        <span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${options.total_pgl / 1e18 > 1 ? (options.total_pgl / 1e18).toLocaleString() :(options.total_pgl / 1e18).toFixed(6) } PGL</span>`;

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
      approveBtn = `<button data-btn="${options.approve}" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button data-btn="${options.stake}" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake sPGL</button>`;
    }
    if ( options.staked_pool / 1e18 > 0 ) {
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
    if ( options.staked_pool / 1e18 > 0 ) {
      availableUnstake = stakeUnstake((options.staked_pool / 1e18).toFixed(6), false, 'S3D');
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
    if ( options.staked_pool / 1e18 > 0 ) {
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
    if ( options.staked_pool / 1e18 > 0 ) {      
      availableUnstake = stakeUnstake((options.staked_pool / 1e18).toFixed(6), false, 'PGL'); 
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
    if ( options.staked_pool / 1e18 > 0 ) {
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
  poolS3F({
    logo_token3 : 'https://assets.coingecko.com/coins/images/13422/small/frax_logo.png?1608476506',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB/logo.png',
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xde3A24028580884448a5397872046a019649b084/logo.png',
    pool_nickname: 'pool-8',
    pool_name: 'StableVault S3F',
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
  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC38f41A296A4493Ff429F1238e030924A1542e50/logo.png',
    pool_nickname: 'pool-2',
    pool_name: 'SNOB-AVAX sPGL',
    url: SNOB_AVAX_POOL_URL,
    tvl: SNOB_AVAX_TVL,
    pool_weight: pool2weight,
    total_staked: totalStakedSNOBAVAX,
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
    total_pgl: totalPoolPGL_2,
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
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB/logo.png',
    pool_nickname: 'pool-9',
    pool_name: 'WBTC-AVAX sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_WBTC_AVAX,
    user_pool_percent: userPool_WBTC_AVAX,
    staked_pool: stakedPool_WBTC_AVAX,
    pending_tokens: pendingSNOBTokensPool_WBTC_AVAX,
    display_amount: wbtcAvaxDisplayAmount,
    approve: 'approveWBTC_AVAX',
    stake: 'stakeWBTC_AVAX',
    unstake: 'withdrawWBTC_AVAX',
    claim: 'claimWBTC_AVAX',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_9,
    pool_share_display: poolShareDisplay_9,
    pool_share_display_pgl: poolShareDisplay_9_pgl,
    stake_display: stakeDisplay_9,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a/logo.png',
    pool_nickname: 'pool-10',
    pool_name: 'DAI-AVAX sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_DAI_AVAX,
    user_pool_percent: userPool_DAI_AVAX,
    staked_pool: stakedPool_DAI_AVAX,
    pending_tokens: pendingSNOBTokensPool_DAI_AVAX,
    display_amount: daiAvaxDisplayAmount,
    approve: 'approveDAI_AVAX',
    stake: 'stakeDAI_AVAX',
    unstake: 'withdrawDAI_AVAX',
    claim: 'claimDAI_AVAX',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_10,
    pool_share_display: poolShareDisplay_10,
    pool_share_display_pgl: poolShareDisplay_10_pgl,
    stake_display: stakeDisplay_10,
    apy: null
  });


  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf39f9671906d8630812f9d9863bBEf5D523c84Ab/logo.png',
    pool_nickname: 'pool-11',
    pool_name: 'UNI-AVAX sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_UNI_AVAX,
    user_pool_percent: userPool_UNI_AVAX,
    staked_pool: stakedPool_UNI_AVAX,
    pending_tokens: pendingSNOBTokensPool_UNI_AVAX,
    display_amount: uniAvaxDisplayAmount,
    approve: 'approveUNI_AVAX',
    stake: 'stakeUNI_AVAX',
    unstake: 'withdrawUNI_AVAX',
    claim: 'claimUNI_AVAX',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_11,
    pool_share_display: poolShareDisplay_11,
    pool_share_display_pgl: poolShareDisplay_11_pgl,
    stake_display: stakeDisplay_11,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB/logo.png',
    pool_nickname: 'pool-12',
    pool_name: 'WBTC-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_WBTC_PNG,
    user_pool_percent: userPool_WBTC_PNG,
    staked_pool: stakedPool_WBTC_PNG,
    pending_tokens: pendingSNOBTokensPool_WBTC_PNG,
    display_amount: WBTC_PNG_DisplayAmount,
    approve: 'approveWBTC_PNG',
    stake: 'stakeWBTC_PNG',
    unstake: 'withdrawWBTC_PNG',
    claim: 'claimWBTC_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_12,
    pool_share_display: poolShareDisplay_12,
    pool_share_display_pgl: poolShareDisplay_12_pgl,
    stake_display: stakeDisplay_12,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651/logo.png',
    pool_nickname: 'pool-13',
    pool_name: 'LINK-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_LINK_PNG,
    user_pool_percent: userPool_LINK_PNG,
    staked_pool: stakedPool_LINK_PNG,
    pending_tokens: pendingSNOBTokensPool_LINK_PNG,
    display_amount: LINK_PNG_DisplayAmount,
    approve: 'approveLINK_PNG',
    stake: 'stakeLINK_PNG',
    unstake: 'withdrawLINK_PNG',
    claim: 'claimLINK_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_13,
    pool_share_display: poolShareDisplay_13,
    pool_share_display_pgl: poolShareDisplay_13_pgl,
    stake_display: stakeDisplay_13,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xde3A24028580884448a5397872046a019649b084/logo.png',
    pool_nickname: 'pool-14',
    pool_name: 'USDT-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_USDT_PNG,
    user_pool_percent: userPool_USDT_PNG,
    staked_pool: stakedPool_USDT_PNG,
    pending_tokens: pendingSNOBTokensPool_USDT_PNG,
    display_amount: USDT_PNG_DisplayAmount,
    approve: 'approveUSDT_PNG',
    stake: 'stakeUSDT_PNG',
    unstake: 'withdrawUSDT_PNG',
    claim: 'claimUSDT_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_14,
    pool_share_display: poolShareDisplay_14,
    pool_share_display_pgl: poolShareDisplay_14_pgl,
    stake_display: stakeDisplay_14,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc/logo.png',
    pool_nickname: 'pool-15',
    pool_name: 'SUSHI-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_SUSHI_PNG,
    user_pool_percent: userPool_SUSHI_PNG,
    staked_pool: stakedPool_SUSHI_PNG,
    pending_tokens: pendingSNOBTokensPool_SUSHI_PNG,
    display_amount: SUSHI_PNG_DisplayAmount,
    approve: 'approveSUSHI_PNG',
    stake: 'stakeSUSHI_PNG',
    unstake: 'withdrawSUSHI_PNG',
    claim: 'claimSUSHI_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_15,
    pool_share_display: poolShareDisplay_15,
    pool_share_display_pgl: poolShareDisplay_15_pgl,
    stake_display: stakeDisplay_15,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a/logo.png',
    pool_nickname: 'pool-16',
    pool_name: 'DAI-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_DAI_PNG,
    user_pool_percent: userPool_DAI_PNG,
    staked_pool: stakedPool_DAI_PNG,
    pending_tokens: pendingSNOBTokensPool_DAI_PNG,
    display_amount: DAI_PNG_DisplayAmount,
    approve: 'approveDAI_PNG',
    stake: 'stakeDAI_PNG',
    unstake: 'withdrawDAI_PNG',
    claim: 'claimDAI_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_16,
    pool_share_display: poolShareDisplay_16,
    pool_share_display_pgl: poolShareDisplay_16_pgl,
    stake_display: stakeDisplay_16,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8cE2Dee54bB9921a2AE0A63dBb2DF8eD88B91dD9/logo.png',
    pool_nickname: 'pool-17',
    pool_name: 'AAVE-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_AAVE_PNG,
    user_pool_percent: userPool_AAVE_PNG,
    staked_pool: stakedPool_AAVE_PNG,
    pending_tokens: pendingSNOBTokensPool_AAVE_PNG,
    display_amount: AAVE_PNG_DisplayAmount,
    approve: 'approveAAVE_PNG',
    stake: 'stakeAAVE_PNG',
    unstake: 'withdrawAAVE_PNG',
    claim: 'claimAAVE_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_17,
    pool_share_display: poolShareDisplay_17,
    pool_share_display_pgl: poolShareDisplay_17_pgl,
    stake_display: stakeDisplay_17,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf39f9671906d8630812f9d9863bBEf5D523c84Ab/logo.png',
    pool_nickname: 'pool-18',
    pool_name: 'UNI-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_UNI_PNG,
    user_pool_percent: userPool_UNI_PNG,
    staked_pool: stakedPool_UNI_PNG,
    pending_tokens: pendingSNOBTokensPool_UNI_PNG,
    display_amount: UNI_PNG_DisplayAmount,
    approve: 'approveUNI_PNG',
    stake: 'stakeUNI_PNG',
    unstake: 'withdrawUNI_PNG',
    claim: 'claimUNI_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_18,
    pool_share_display: poolShareDisplay_18,
    pool_share_display_pgl: poolShareDisplay_18_pgl,
    stake_display: stakeDisplay_18,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x99519AcB025a0e0d44c3875A4BbF03af65933627/logo.png',
    pool_nickname: 'pool-19',
    pool_name: 'YFI-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_YFI_PNG,
    user_pool_percent: userPool_YFI_PNG,
    staked_pool: stakedPool_YFI_PNG,
    pending_tokens: pendingSNOBTokensPool_YFI_PNG,
    display_amount: YFI_PNG_DisplayAmount,
    approve: 'approveYFI_PNG',
    stake: 'stakeYFI_PNG',
    unstake: 'withdrawYFI_PNG',
    claim: 'claimYFI_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_19,
    pool_share_display: poolShareDisplay_19,
    pool_share_display_pgl: poolShareDisplay_19_pgl,
    stake_display: stakeDisplay_19,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15/logo.png',
    pool_nickname: 'pool-20',
    pool_name: 'ETH-PNG sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_ETH_PNG,
    user_pool_percent: userPool_ETH_PNG,
    staked_pool: stakedPool_ETH_PNG,
    pending_tokens: pendingSNOBTokensPool_ETH_PNG,
    display_amount: ETH_PNG_DisplayAmount,
    approve: 'approveETH_PNG',
    stake: 'stakeETH_PNG',
    unstake: 'withdrawETH_PNG',
    claim: 'claimETH_PNG',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_20,
    pool_share_display: poolShareDisplay_20,
    pool_share_display_pgl: poolShareDisplay_20_pgl,
    stake_display: stakeDisplay_20,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC38f41A296A4493Ff429F1238e030924A1542e50/logo.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    pool_nickname: 'pool-21',
    pool_name: 'PNG-SNOB sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_PNG_SNOB,
    user_pool_percent: userPool_PNG_SNOB,
    staked_pool: stakedPool_PNG_SNOB,
    pending_tokens: pendingSNOBTokensPool_PNG_SNOB,
    display_amount: PNG_SNOB_DisplayAmount,
    approve: 'approvePNG_SNOB',
    stake: 'stakePNG_SNOB',
    unstake: 'withdrawPNG_SNOB',
    claim: 'claimPNG_SNOB',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_21,
    pool_share_display: poolShareDisplay_21,
    pool_share_display_pgl: poolShareDisplay_21_pgl,
    stake_display: stakeDisplay_21,
    apy: null
  });

  pool({
    logo_token1 : 'https://assets.coingecko.com/coins/images/15169/small/versa.PNG',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    pool_nickname: 'pool-22',
    pool_name: 'PNG-VSO sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_PNG_VSO,
    user_pool_percent: userPool_PNG_VSO,
    staked_pool: stakedPool_PNG_VSO,
    pending_tokens: pendingSNOBTokensPool_VSO_PNG,
    display_amount: PNG_VSO_DisplayAmount,
    approve: 'approvePNG_VSO',
    stake: 'stakePNG_VSO',
    unstake: 'withdrawPNG_VSO',
    claim: 'claimPNG_VSO',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_22,
    pool_share_display: poolShareDisplay_22,
    pool_share_display_pgl: poolShareDisplay_22_pgl,
    stake_display: stakeDisplay_22,
    apy: null
  });

  pool({
    logo_token1 : 'https://assets.coingecko.com/coins/images/15169/small/versa.PNG',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    pool_nickname: 'pool-23',
    pool_name: 'AVAX-VSO sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_AVAX_VSO,
    user_pool_percent: userPool_AVAX_VSO,
    staked_pool: stakedPool_AVAX_VSO,
    pending_tokens: pendingSNOBTokensPool_VSO_AVAX,
    display_amount: AVAX_VSO_DisplayAmount,
    approve: 'approveAVAX_VSO',
    stake: 'stakeAVAX_VSO',
    unstake: 'withdrawAVAX_VSO',
    claim: 'claimAVAX_VSO',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_23,
    pool_share_display: poolShareDisplay_23,
    pool_share_display_pgl: poolShareDisplay_23_pgl,
    stake_display: stakeDisplay_23,
    apy: null
  });
 // 
  pool({
    logo_token1 : 'https://assets.coingecko.com/coins/images/14470/small/SPORE.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
    pool_nickname: 'pool-24',
    pool_name: 'PNG-SPORE sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_PNG_SPORE,
    user_pool_percent: userPool_PNG_SPORE,
    staked_pool: stakedPool_PNG_SPORE,
    pending_tokens: pendingSNOBTokensPool_SPORE_PNG,
    display_amount: PNG_SPORE_DisplayAmount,
    approve: 'approvePNG_SPORE',
    stake: 'stakePNG_SPORE',
    unstake: 'withdrawPNG_SPORE',
    claim: 'claimPNG_SPORE',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_24,
    pool_share_display: poolShareDisplay_24,
    pool_share_display_pgl: poolShareDisplay_24_pgl,
    stake_display: stakeDisplay_24,
    apy: null
  });

  pool({
    logo_token1 : 'https://assets.coingecko.com/coins/images/14470/small/SPORE.png',
    logo_token2 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    pool_nickname: 'pool-25',
    pool_name: 'AVAX-SPORE sPGL',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_AVAX_SPORE,
    user_pool_percent: userPool_AVAX_SPORE,
    staked_pool: stakedPool_AVAX_SPORE,
    pending_tokens: pendingSNOBTokensPool_SPORE_AVAX,
    display_amount: AVAX_SPORE_DisplayAmount,
    approve: 'approveAVAX_SPORE',
    stake: 'stakeAVAX_SPORE',
    unstake: 'withdrawAVAX_SPORE',
    claim: 'claimAVAX_SPORE',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_25,
    pool_share_display: poolShareDisplay_25,
    pool_share_display_pgl: poolShareDisplay_25_pgl,
    stake_display: stakeDisplay_25,
    apy: null
  });

  pool({
    logo_token1 : 'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    logo_token2 : 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    pool_nickname: 'pool-26',
    pool_name: 'AVAX-ETH sJLP',
    url: null,
    tvl: null,
    pool_weight: null,
    total_staked: totalStaked_JOE_AVAX_ETH,
    user_pool_percent: userPool_JOE_AVAX_ETH,
    staked_pool: stakedPool_JOE_AVAX_ETH,
    pending_tokens: pendingSNOBTokensPool_JOE_ETH_AVAX,
    display_amount: JOE_AVAX_ETH_DisplayAmount,
    approve: 'approveJOE_AVAX_ETH',
    stake: 'stakeJOE_AVAX_ETH',
    unstake: 'withdrawJOE_AVAX_ETH',
    claim: 'claimJOE_AVAX_ETH',
    icequeen_apr: null,
    snowglobe_apr: null,
    tvl_display: null,
    tvl_class: tvl_class,
    total_pgl: totalPoolPGL_26,
    pool_share_display: poolShareDisplay_26,
    pool_share_display_pgl: poolShareDisplay_26_pgl,
    stake_display: stakeDisplay_26,
    apy: null
  });

  

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
        case 'withdrawWBTC_AVAX':
          withdrawWBTC_AVAX();
          break;
        case 'withdrawDAI_AVAX':
          withdrawDAI_AVAX();
          break;
        case 'withdrawUNI_AVAX':
          withdrawUNI_AVAX();
          break;
        case 'withdrawWBTC_PNG':
          withdrawWBTC_PNG();
          break;
        case 'withdrawLINK_PNG':
          withdrawLINK_PNG();
          break;
        case 'withdrawUSDT_PNG':
          withdrawUSDT_PNG();
          break;
        case 'withdrawSUSHI_PNG':
          withdrawSUSHI_PNG();
          break;
        case 'withdrawDAI_PNG':
          withdrawDAI_PNG();
          break;
        case 'withdrawAAVE_PNG':
          withdrawAAVE_PNG();
          break;
        case 'withdrawUNI_PNG':
          withdrawUNI_PNG();
          break;
        case 'withdrawYFI_PNG':
          withdrawYFI_PNG();
          break;
        case 'withdrawETH_PNG':
          withdrawETH_PNG();
          break;
        case 'withdrawPNG_SNOB':
          withdrawPNG_SNOB();
          break;
        case 'withdrawPNG_VSO':
          withdrawPNG_VSO();
          break;
        case 'withdrawAVAX_VSO':
          withdrawAVAX_VSO();
          break;
        case 'withdrawPNG_SPORE':
          withdrawPNG_SPORE();
          break;
        case 'withdrawAVAX_SPORE':
          withdrawAVAX_SPORE();
          break;
        case 'withdrawJOE_AVAX_ETH':
          withdrawJOE_AVAX_ETH();
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
        case 'claimWBTC_AVAX':
          claimWBTC_AVAX();
          break;
        case 'claimDAI_AVAX':
          claimDAI_AVAX();
          break;
        case 'claimUNI_AVAX':
          claimUNI_AVAX();
          break;
        case 'claimWBTC_PNG':
          claimWBTC_PNG();
          break;
        case 'claimLINK_PNG':
          claimLINK_PNG();
          break;
        case 'claimUSDT_PNG':
          claimUSDT_PNG();
          break;
        case 'claimSUSHI_PNG':
          claimSUSHI_PNG();
          break;
        case 'claimDAI_PNG':
          claimDAI_PNG();
          break;
        case 'claimAAVE_PNG':
          claimAAVE_PNG();
          break;
        case 'claimUNI_PNG':
          claimUNI_PNG();
          break;
        case 'claimYFI_PNG':
          claimYFI_PNG();
          break;
        case 'claimETH_PNG':
          claimETH_PNG();
          break;
        case 'claimPNG_SNOB':
          claimPNG_SNOB();
          break;
        case 'claimPNG_VSO':
          claimPNG_VSO();
          break;
        case 'claimAVAX_VSO':
          claimAVAX_VSO();
          break;
        case 'claimPNG_SPORE':
          claimPNG_SPORE();
          break;
        case 'claimAVAX_SPORE':
          claimAVAX_SPORE();
          break;
        case 'claimJOE_AVAX_ETH':
          claimJOE_AVAX_ETH();
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
        case 'approveWBTC_AVAX':
          approveWBTC_AVAX();
          break;
        case 'approveDAI_AVAX':
          approveDAI_AVAX();
          break;
        case 'approveUNI_AVAX':
          approveUNI_AVAX();
          break;
        case 'approveWBTC_PNG':
          approveWBTC_PNG();
          break;
        case 'approveLINK_PNG':
          approveLINK_PNG();
          break;
        case 'approveUSDT_PNG':
          approveUSDT_PNG();
          break;
        case 'approveSUSHI_PNG':
          approveSUSHI_PNG();
          break;
        case 'approveDAI_PNG':
          approveDAI_PNG();
          break;
        case 'approveAAVE_PNG':
          approveAAVE_PNG();
          break;
        case 'approveUNI_PNG':
          approveUNI_PNG();
          break;
        case 'approveYFI_PNG':
          approveYFI_PNG();
          break;
        case 'approveETH_PNG':
          approveETH_PNG();
          break;
        case 'approvePNG_SNOB':
          approvePNG_SNOB();
          break;
        case 'approvePNG_VSO':
          approvePNG_VSO();
          break;
        case 'approveAVAX_VSO':
          approveAVAX_VSO();
          break;
        case 'approvePNG_SPORE':
          approvePNG_SPORE();
          break;
        case 'approveAVAX_SPORE':
          approveAVAX_SPORE();
          break;
          case 'approveJOE_AVAX_ETH':
            approveJOE_AVAX_ETH();
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
        case 'stakeWBTC_AVAX':
          stakeWBTC_AVAX();
          break;
        case 'stakeDAI_AVAX':
          stakeDAI_AVAX();
          break;
        case 'stakeUNI_AVAX':
          stakeUNI_AVAX();
          break;
        case 'stakeWBTC_PNG':
          stakeWBTC_PNG();
          break;
        case 'stakeLINK_PNG':
          stakeLINK_PNG();
          break;
        case 'stakeUSDT_PNG':
          stakeUSDT_PNG();
          break;
        case 'stakeSUSHI_PNG':
          stakeSUSHI_PNG();
          break;
        case 'stakeDAI_PNG':
          stakeDAI_PNG();
          break;
        case 'stakeAAVE_PNG':
          stakeAAVE_PNG();
          break;
        case 'stakeUNI_PNG':
          stakeUNI_PNG();
          break;
        case 'stakeYFI_PNG':
          stakeYFI_PNG();
          break;
        case 'stakeETH_PNG':
          stakeETH_PNG();
          break;
        case 'stakePNG_SNOB':
          stakePNG_SNOB();
          break;
        case 'stakePNG_VSO':
          stakePNG_VSO();
          break;
        case 'stakeAVAX_VSO':
          stakeAVAX_VSO();
          break;
        case 'stakePNG_SPORE':
          stakePNG_SPORE();
          break;
        case 'stakeAVAX_SPORE':
          stakeAVAX_SPORE();
          break;
        case 'stakeJOE_AVAX_ETH':
          stakeJOE_AVAX_ETH();
          break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  }

  updateButtonHandlers();
  hideLoading();
}


const approveGauge = async function(stakingToken, gaugeAddress, App) {
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


const gaugeContractStake = async function(gaugeAddress, gaugeAbi, stakeTokenAddr, stakeTokenAbi, App) {
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

const gaugeContractWithdraw = async function (gaugeAddress, gaugeAbi, App) {
  const signer = App.provider.getSigner();
  console.log(signer);
  const GAUGE_CONTRACT = new ethers.Contract(gaugeAddress, gaugeAbi, signer);
  const currentTokens = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS);
  console.log(currentTokens / 1e18);
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

const gaugeClaim = async function (gaugeAddress, gaugeAbi, App) {
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

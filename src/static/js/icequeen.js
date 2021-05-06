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
  const STABLEVAULT_ABI = [{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"minToMint","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"inputs":[{"internalType":"contractIERC20[]","name":"_pooledTokens","type":"address[]"},{"internalType":"uint8[]","name":"decimals","type":"uint8[]"},{"internalType":"string","name":"lpTokenName","type":"string"},{"internalType":"string","name":"lpTokenSymbol","type":"string"},{"internalType":"uint256","name":"_a","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_adminFee","type":"uint256"},{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newAdminFee","type":"uint256"}],"name":"NewAdminFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newSwapFee","type":"uint256"}],"name":"NewSwapFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newWithdrawFee","type":"uint256"}],"name":"NewWithdrawFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"inputs":[{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"rampA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"initialTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"RampA","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"minAmounts","type":"uint256[]"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"maxBurnAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityImbalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"RemoveLiquidityImbalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"lpTokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boughtId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"}],"name":"RemoveLiquidityOne","type":"event"},{"inputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint8","name":"tokenIndex","type":"uint8"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityOneToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAdminFee","type":"uint256"}],"name":"setAdminFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newWithdrawFee","type":"uint256"}],"name":"setDefaultWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSwapFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stopRampA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"currentA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"StopRampA","type":"event"},{"inputs":[{"internalType":"uint8","name":"tokenIndexFrom","type":"uint8"},{"internalType":"uint8","name":"tokenIndexTo","type":"uint8"},{"internalType":"uint256","name":"dx","type":"uint256"},{"internalType":"uint256","name":"minDy","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensSold","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"soldId","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"boughtId","type":"uint128"}],"name":"TokenSwap","type":"event"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"transferAmount","type":"uint256"}],"name":"updateUserWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAdminFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"calculateCurrentWithdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calculateRemoveLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint8","name":"tokenIndex","type":"uint8"}],"name":"calculateRemoveLiquidityOneToken","outputs":[{"internalType":"uint256","name":"availableTokenAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"tokenIndexFrom","type":"uint8"},{"internalType":"uint8","name":"tokenIndexTo","type":"uint8"},{"internalType":"uint256","name":"dx","type":"uint256"}],"name":"calculateSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bool","name":"deposit","type":"bool"}],"name":"calculateTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAdminBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAPrecise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getDepositTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getToken","outputs":[{"internalType":"contractIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"getTokenIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVirtualPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapStorage","outputs":[{"internalType":"uint256","name":"initialA","type":"uint256"},{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"initialATime","type":"uint256"},{"internalType":"uint256","name":"futureATime","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"},{"internalType":"uint256","name":"adminFee","type":"uint256"},{"internalType":"uint256","name":"defaultWithdrawFee","type":"uint256"},{"internalType":"contractLPToken","name":"lpToken","type":"address"}],"stateMutability":"view","type":"function"}]

  //contracts
  const SNOWGLOBE_SUSHI_ADDR = "0x751089F1bf31B13Fa0F0537ae78108088a2253BF";
  const SNOWGLOBE_PNG_ADDR = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
  const SNOWGLOBE_ETH_ADDR = "0x586554828eE99811A8ef75029351179949762c26";
  const SNOWGLOBE_LINK_ADDR = "0x00933c16e06b1d15958317C2793BC54394Ae356C";
  const SNOWGLOBE_USDT_ADDR = "0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605";
  const ICEQUEEN_ADDR = "0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375";
  const STABLEVAULT_ADDRESS = "0x6B41E5c07F2d382B921DE5C34ce8E2057d84C042"

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
  const SUSHI_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc";
  const SNOB_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xC38f41A296A4493Ff429F1238e030924A1542e50";
  const PNG_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x60781c2586d68229fde47564546784ab3faca982";
  const ETH_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15";
  const LINK_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/avax/0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651";
  const USDT_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/avax/0xde3a24028580884448a5397872046a019649b084";

  // TVL URLS
  const SUSHI_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x14ec55f8B4642111A5aF4f5ddc56B7bE867eB6cC"
  const SNOB_AVAX_TVL = "https://info.pangolin.exchange/#/account/0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375"
  const PNG_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x6A803904b9eA0Fc982fBB077c7243c244Ae05a2d"
  const ETH_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x953853590b805A0E885A75A3C786D2aFfcEEA3Cf"
  const LINK_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x974Ef0bDA58C81F3094e124f530eF34fe70dc103"
  const USDT_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x74dB28797957a52a28963F424dAF2B10226ba04C"

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

  const signer = App.provider.getSigner()

  //Tokens
  const SUSHI_AVAX_TOKEN = new ethers.Contract(SUSHI_AVAX_ADDR, ERC20_ABI, signer)
  const PNG_AVAX_TOKEN = new ethers.Contract(PNG_AVAX_ADDR, ERC20_ABI, signer)
  const ETH_AVAX_TOKEN = new ethers.Contract(ETH_AVAX_ADDR, ERC20_ABI, signer)
  const SNOB_AVAX_TOKEN = new ethers.Contract(SNOB_AVAX_ADDR, ERC20_ABI, signer)
  const LINK_AVAX_TOKEN = new ethers.Contract(LINK_AVAX_ADDR, ERC20_ABI, signer)
  const USDT_AVAX_TOKEN = new ethers.Contract(USDT_AVAX_ADDR, ERC20_ABI, signer)
  const S3D_TOKEN = new ethers.Contract(S3D_ADDRESS, ERC20_ABI, signer)

  const SPGL_SUSHI_TOKEN = new ethers.Contract(SPGL_SUSHI_ADDRESS, ERC20_ABI, signer)
  const SPGL_PNG_TOKEN = new ethers.Contract(SPGL_PNG_ADDRESS, ERC20_ABI, signer)
  const SPGL_ETH_TOKEN = new ethers.Contract(SPGL_ETH_ADDRESS, ERC20_ABI, signer)
  const SPGL_LINK_TOKEN = new ethers.Contract(SPGL_LINK_ADDRESS, ERC20_ABI, signer)
  const SPGL_USDT_TOKEN = new ethers.Contract(SPGL_USDT_ADDRESS, ERC20_ABI, signer)

  const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)

  //Contracts
  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)
  const STABLEVAULT_CONTRACT = new ethers.Contract(STABLEVAULT_ADDRESS, STABLEVAULT_ABI, signer)

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

   //Balances

  const currentSUSHIAVAXTokens = await SUSHI_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLSUSHITokens = await SPGL_SUSHI_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglSushiDisplayAmt = currentSPGLSUSHITokens > 1000 ? currentSPGLSUSHITokens / 1e18 : 0;

  const currentPNGAVAXTokens = await PNG_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLPNGTokens = await SPGL_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglPngDisplayAmt = currentSPGLPNGTokens > 1000 ? currentSPGLPNGTokens / 1e18 : 0;

  const currentETHAVAXTokens = await ETH_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLETHTokens = await SPGL_ETH_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglEthDisplayAmt = currentSPGLETHTokens > 1000 ? currentSPGLETHTokens / 1e18 : 0;

  const currentUSDTAVAXTokens = await USDT_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLUSDTTokens = await SPGL_USDT_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglUsdtDisplayAmt = currentSPGLUSDTTokens > 1000 ? currentSPGLUSDTTokens / 1e18 : 0;

  const currentLINKAVAXTokens = await LINK_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLLINKTokens = await SPGL_LINK_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglLinkDisplayAmt = currentSPGLLINKTokens > 1000 ? currentSPGLLINKTokens / 1e18 : 0;

  const currentS3DTokens = await S3D_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const S3DDisplayAmt = currentS3DTokens > 1000 ? currentS3DTokens / 1e18 : 0;

  const currentSNOBAVAXTokens = await SNOB_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const snobAvaxDisplayAmt = currentSNOBAVAXTokens > 1000 ? currentSNOBAVAXTokens / 1e18 : 0;

  const stakedPool1 = await ICEQUEEN_CONTRACT.userInfo(1, App.YOUR_ADDRESS)
  const stakedPool2 = await ICEQUEEN_CONTRACT.userInfo(2, App.YOUR_ADDRESS)
  const stakedPool3 = await ICEQUEEN_CONTRACT.userInfo(3, App.YOUR_ADDRESS)
  const stakedPool4 = await ICEQUEEN_CONTRACT.userInfo(4, App.YOUR_ADDRESS)
  const stakedPool5 = await ICEQUEEN_CONTRACT.userInfo(5, App.YOUR_ADDRESS)
  const stakedPool6 = await ICEQUEEN_CONTRACT.userInfo(6, App.YOUR_ADDRESS)
  const stakedPool7 = await ICEQUEEN_CONTRACT.userInfo(7, App.YOUR_ADDRESS)

  // Total staked in each pool
  const totalStakedSPGLSUSHI = await SPGL_SUSHI_TOKEN.balanceOf(ICEQUEEN_ADDR)
  const totalStakedSPGLPNG = await SPGL_PNG_TOKEN.balanceOf(ICEQUEEN_ADDR)
  const totalStakedSPGLETH = await SPGL_ETH_TOKEN.balanceOf(ICEQUEEN_ADDR)
  const totalStakedSNOBAVAX = await SNOB_AVAX_TOKEN.balanceOf(ICEQUEEN_ADDR)
  const totalStakedSPGLUSDT = await SPGL_USDT_TOKEN.balanceOf(ICEQUEEN_ADDR)
  const totalStakedSPGLLINK = await SPGL_LINK_TOKEN.balanceOf(ICEQUEEN_ADDR)
  const totalStakedS3D = await S3D_TOKEN.balanceOf(ICEQUEEN_ADDR)

  const userPool7Percent = (stakedPool7.amount / 1e18) / (totalStakedS3D / 1e18) * 100
  const userPool6Percent = (stakedPool6.amount / 1e18) / (totalStakedSPGLLINK / 1e18) * 100
  const userPool5Percent = (stakedPool5.amount / 1e18) / (totalStakedSPGLUSDT / 1e18) * 100
  const userPool4Percent = (stakedPool4.amount / 1e18) / (totalStakedSPGLETH / 1e18) * 100
  const userPool3Percent = (stakedPool3.amount / 1e18) / (totalStakedSPGLPNG / 1e18) * 100
  const userPool2Percent = (stakedPool2.amount / 1e18) / (totalStakedSNOBAVAX / 1e18) * 100
  const userPool1Percent = (stakedPool1.amount / 1e18) / (totalStakedSPGLSUSHI / 1e18) * 100

  const poolShareDisplay_7 = `Your pool share is <b>${(stakedPool7.amount / 1e18).toFixed(6)}</b> S3D - <b>${userPool7Percent.toFixed(6)}%</b>`;

  const pool7weight = 0.20
  const pool6weight = 0.08
  const pool5weight = 0.05
  const pool4weight = 0.08
  const pool3weight = 0.11
  const pool2weight = 0.40
  const pool1weight = 0.08


	let res = null;
  let pool7tvl = totalStakedS3D / 1e18;
  let pool6tvl = null;
  let pool5tvl = null;
  let pool4tvl = null;
	let pool3tvl = null;
	let pool2tvl = null;
	let pool1tvl = null;
  let pool7tvlDisplay = `$${new Intl.NumberFormat('en-US').format(pool7tvl)}`;
  let pool6tvlDisplay = '';
  let pool5tvlDisplay = '';
  let pool4tvlDisplay = '';
	let pool3tvlDisplay = '';
	let pool2tvlDisplay = '';
	let pool1tvlDisplay = '';
  let pool7APR = snowballsPerBlock * pool7weight / 1e18 * 15000 * snobPrice / pool7tvl * 100;
  let pool6APR = null;
  let pool5APR = null;
  let pool4APR = null;
	let pool3APR = null;
	let pool2APR = null;
	let pool1APR = null;
	try {
		res = await $.ajax({
	      url: 'https://x-api.snowball.network/dex/0xc38f41a296a4493ff429f1238e030924a1542e50/tvl.json',
	      type: 'GET',
	    })
    	if (res && res.pairs) {
        console.log(res.pairs)
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
	}
	catch(e) {
	  console.log('could not get tvl:', e);
	}

		// APR
	const PngStakingContracts= [
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

  
  // PGL & LP values
  //SNOWGLOBE_SUSHI_ADDR
  const snowglobeContract_1 = new ethers.Contract(SNOWGLOBE_SUSHI_ADDR, SNOWGLOBE_ABI, signer);
  let totalPoolPGL_1 = await snowglobeContract_1.balance();
  let poolShareDisplay_1 = null;
  let stakeDisplay_1 = null;
  const userSPGL_1 = stakedPool1.amount / 1e18;
  try {
    if (userSPGL_1 > 0) {
      let totalSPGL_1 = await snowglobeContract_1.totalSupply();
      let ownedPGL_1 = userSPGL_1 * (totalPoolPGL_1 / 1e18) / (totalSPGL_1 / 1e18);
      // SUSHI_AVAX_ADDR
      const pglContract_1 = new ethers.Contract(SUSHI_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_1 = await pglContract_1.totalSupply();
      totalSupplyPGL_1 = totalSupplyPGL_1 / 1e18;
      const reserves_1 = await pglContract_1.getReserves();
      const r0_1 = reserves_1._reserve0 / 1e18
      const r1_1 = reserves_1._reserve1 / 1e18
      let reserve0Owned_1 = ownedPGL_1 * (r0_1) / (totalSupplyPGL_1);
      let reserve1Owned_1 = ownedPGL_1 * (r1_1) / (totalSupplyPGL_1);
      const token0Address_1 = await pglContract_1.token0();
      const token1Address_1 = await pglContract_1.token1();
      const t0Price_1 = prices[token0Address_1] ? prices[token0Address_1].usd : 0
      const t1Price_1 = prices[token1Address_1] ? prices[token1Address_1].usd : 0
      const token0ValueUSDT_1 = reserve0Owned_1 * t0Price_1;
      const token1ValueUSDT_1 = reserve1Owned_1 * t1Price_1;
      const value_1 = token0ValueUSDT_1 + (token1ValueUSDT_1);
      poolShareDisplay_1 = `Your pool share is <b>${userSPGL_1.toFixed(3)}</b> sPGL (<b>${ownedPGL_1.toFixed(3)}</b> PGL) - <b>${userPool1Percent.toFixed(6)}%</b>`
      stakeDisplay_1 = `Your LP value is <b>${reserve0Owned_1.toFixed(3)}</b> ${TOKEN_NAMES[token0Address_1]} / <b>${reserve1Owned_1.toFixed(3)}</b> ${TOKEN_NAMES[token1Address_1]} ($<b>${value_1.toFixed(2)}</b>)***</b>`
    }
  } catch { console.log('error calculating PGL value')}

  let poolShareDisplay_2 = null;
  let stakeDisplay_2 = null;
  const userPGL_2 = stakedPool2.amount / 1e18;
  try {
  if (userPGL_2 > 0) {
      let totalSPGL_2 = 0;
      let ownedPGL_2 = userPGL_2;
      // SNOB_AVAX_TOKEN
      const pglContract_2 = new ethers.Contract(SNOB_AVAX_ADDR, PGL_ABI, signer)
      let totalSupplyPGL_2 = await pglContract_2.totalSupply();
      totalSupplyPGL_2 = totalSupplyPGL_2 / 1e18;
      const reserves_2 = await pglContract_2.getReserves();
      const r0_2 = reserves_2._reserve0 / 1e18
      const r1_2 = reserves_2._reserve1 / 1e18
      let reserve0Owned_2 = ownedPGL_2 * (r0_2) / (totalSupplyPGL_2);
      let reserve1Owned_2 = ownedPGL_2 * (r1_2) / (totalSupplyPGL_2);
      const token0Address_2 = await pglContract_2.token0();
      const token1Address_2 = await pglContract_2.token1();
      const t0Price_2 = prices[token0Address_2] ? prices[token0Address_2].usd : 0
      const t1Price_2 = prices[token1Address_2] ? prices[token1Address_2].usd : 0
      const token0ValueUSDT_2 = reserve0Owned_2 * t0Price_2;
      const token1ValueUSDT_2 = reserve1Owned_2 * t1Price_2;
      const value_2 = token0ValueUSDT_2 + (token1ValueUSDT_2);
      poolShareDisplay_2 = `Your pool share is <b>${ownedPGL_2.toFixed(3)}</b> PGL - <b>${userPool2Percent.toFixed(6)}%</b></b>`
      stakeDisplay_2 = `Your LP value is <b>${reserve0Owned_2.toFixed(3)}</b> ${TOKEN_NAMES[token0Address_2]} / <b>${reserve1Owned_2.toFixed(3)}</b> ${TOKEN_NAMES[token1Address_2]} ($<b>${value_2.toFixed(2)}</b>)***</b>`
    }
  } catch { console.log('error calculating PGL value')}

  //SNOWGLOBE_PNG_ADDR
  const snowglobeContract_3 = new ethers.Contract(SNOWGLOBE_PNG_ADDR, SNOWGLOBE_ABI, signer);
  let totalPoolPGL_3 = await snowglobeContract_3.balance();
  let poolShareDisplay_3 = null;
  let stakeDisplay_3 = null;
  const userSPGL_3 = stakedPool3.amount / 1e18;
  try {
    if (userSPGL_3 > 0) {
      let totalSPGL_3 = await snowglobeContract_3.totalSupply();
      let ownedPGL_3 = userSPGL_3 * (totalPoolPGL_3 / 1e18) / (totalSPGL_3 / 1e18);
      // PNG_AVAX_ADDR
      const pglContract_3 = new ethers.Contract(PNG_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_3 = await pglContract_3.totalSupply();
      totalSupplyPGL_3 = totalSupplyPGL_3 / 1e18;
      const reserves_3 = await pglContract_3.getReserves();
      const r0_3 = reserves_3._reserve0 / 1e18
      const r1_3 = reserves_3._reserve1 / 1e18
      let reserve0Owned_3 = ownedPGL_3 * (r0_3) / (totalSupplyPGL_3);
      let reserve1Owned_3 = ownedPGL_3 * (r1_3) / (totalSupplyPGL_3);
      const token0Address_3 = await pglContract_3.token0();
      const token1Address_3 = await pglContract_3.token1();
      const t0Price_3 = prices[token0Address_3] ? prices[token0Address_3].usd : 0
      const t1Price_3 = prices[token1Address_3] ? prices[token1Address_3].usd : 0
      const token0ValueUSDT_3 = reserve0Owned_3 * t0Price_3;
      const token1ValueUSDT_3 = reserve1Owned_3 * t1Price_3;
      const value_3 = token0ValueUSDT_3 + (token1ValueUSDT_3);
      poolShareDisplay_3 = `Your pool share is <b>${userSPGL_3.toFixed(3)}</b> sPGL (<b>${ownedPGL_3.toFixed(3)}</b> PGL) - <b>${userPool3Percent.toFixed(6)}%</b>`
      stakeDisplay_3 = `Your LP Value is <b>${reserve0Owned_3.toFixed(3)}</b> ${TOKEN_NAMES[token0Address_3]} / <b>${reserve1Owned_3.toFixed(3)}</b> ${TOKEN_NAMES[token1Address_3]} ($<b>${value_3.toFixed(2)}</b>)***</b>`
    }
  } catch { console.log('error calculating PGL value')}

  //SNOWGLOBE_ETH_ADDR
  const snowglobeContract_4 = new ethers.Contract(SNOWGLOBE_ETH_ADDR, SNOWGLOBE_ABI, signer);
  let totalPoolPGL_4 = await snowglobeContract_4.balance();
  let poolShareDisplay_4 = null;
  let stakeDisplay_4 = null;
  const userSPGL_4 = stakedPool4.amount / 1e18;
  try {
    if (userSPGL_4 > 0) {
      let totalSPGL_4 = await snowglobeContract_4.totalSupply();
      let ownedPGL_4 = userSPGL_4 * (totalPoolPGL_4 / 1e18) / (totalSPGL_4 / 1e18);
      // ETH_AVAX_ADDR
      const pglContract_4 = new ethers.Contract(ETH_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_4 = await pglContract_4.totalSupply();
      totalSupplyPGL_4 = totalSupplyPGL_4 / 1e18;
      const reserves_4 = await pglContract_4.getReserves();
      const r0_4 = reserves_4._reserve0 / 1e18
      const r1_4 = reserves_4._reserve1 / 1e18
      let reserve0Owned_4 = ownedPGL_4 * (r0_4) / (totalSupplyPGL_4);
      let reserve1Owned_4 = ownedPGL_4 * (r1_4) / (totalSupplyPGL_4);
      const token0Address_4 = await pglContract_4.token0();
      const token1Address_4 = await pglContract_4.token1();
      const t0Price_4 = prices[token0Address_4] ? prices[token0Address_4].usd : 0
      const t1Price_4 = prices[token1Address_4] ? prices[token1Address_4].usd : 0
      const token0ValueUSDT_4 = reserve0Owned_4 * t0Price_4;
      const token1ValueUSDT_4 = reserve1Owned_4 * t1Price_4;
      const value_4 = token0ValueUSDT_4 + (token1ValueUSDT_4);
      poolShareDisplay_4 = `Your pool share is <b>${userSPGL_4.toFixed(3)}</b> sPGL (<b>${ownedPGL_4.toFixed(3)}</b> PGL) - <b>${userPool4Percent.toFixed(6)}%</b>`
      stakeDisplay_4 = `Your LP Value is <b>${reserve0Owned_4.toFixed(3)}</b> ${TOKEN_NAMES[token0Address_4]} / <b>${reserve1Owned_4.toFixed(3)}</b> ${TOKEN_NAMES[token1Address_4]} ($<b>${value_4.toFixed(2)}</b>)***</b>`
    }
  } catch { console.log('error calculating PGL value')}

  //SNOWGLOBE_USDT_ADDR
  const snowglobeContract_5 = new ethers.Contract(SNOWGLOBE_USDT_ADDR, SNOWGLOBE_ABI, signer);
  let totalPoolPGL_5 = await snowglobeContract_5.balance();
  let poolShareDisplay_5 = null;
  let stakeDisplay_5 = null;
  const userSPGL_5 = stakedPool5.amount / 1e18;
  try {
    if (userSPGL_5 > 0) {
      let totalSPGL_5 = await snowglobeContract_5.totalSupply();
      let ownedPGL_5 = userSPGL_5 * (totalPoolPGL_5 / 1e18) / (totalSPGL_5 / 1e18);
      const pglContract_5 = new ethers.Contract(USDT_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_5 = await pglContract_5.totalSupply();
      totalSupplyPGL_5 = totalSupplyPGL_5 / 1e18;
      const reserves_5 = await pglContract_5.getReserves();
      const r0_5 = reserves_5._reserve0 / 1e18
      const r1_5 = reserves_5._reserve1 / 1e6
      let reserve0Owned_5 = ownedPGL_5 * (r0_5) / (totalSupplyPGL_5);
      let reserve1Owned_5 = ownedPGL_5 * (r1_5) / (totalSupplyPGL_5);
      const token0Address_5 = await pglContract_5.token0();
      const token1Address_5 = await pglContract_5.token1();
      const t0Price_5 = prices[token0Address_5] ? prices[token0Address_5].usd : 0
      const t1Price_5 = prices[token1Address_5] ? prices[token1Address_5].usd : 0
      const token0ValueUSDT_5 = reserve0Owned_5 * t0Price_5;
      const token1ValueUSDT_5 = reserve1Owned_5 * t1Price_5;
      const value_5 = token0ValueUSDT_5 + (token1ValueUSDT_5);
      poolShareDisplay_5 = `Your pool share is <b>${userSPGL_5.toFixed(8)}</b> sPGL (<b>${ownedPGL_5.toFixed(8)}</b> PGL) - <b>${userPool5Percent.toFixed(6)}%</b>`
      stakeDisplay_5 = `Your LP Value is <b>${reserve0Owned_5.toFixed(6)}</b> ${TOKEN_NAMES[token0Address_5]} / <b>${reserve1Owned_5.toFixed(6)}</b> ${TOKEN_NAMES[token1Address_5]} ($<b>${value_5.toFixed(2)}</b>)***</b>`
    }
  } catch { console.log('error calculating PGL value')}

  //SNOWGLOBE_LINK_ADDR
  const snowglobeContract_6 = new ethers.Contract(SNOWGLOBE_LINK_ADDR, SNOWGLOBE_ABI, signer);
  let totalPoolPGL_6 = await snowglobeContract_6.balance();
  let poolShareDisplay_6 = null;
  let stakeDisplay_6 = null;
  const userSPGL_6 = stakedPool6.amount / 1e18;
  try {
    if (userSPGL_6 > 0) {
      let totalSPGL_6 = await snowglobeContract_6.totalSupply();
      let ownedPGL_6 = userSPGL_6 * (totalPoolPGL_6 / 1e18) / (totalSPGL_6 / 1e18);
      const pglContract_6 = new ethers.Contract(LINK_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_6 = await pglContract_6.totalSupply();
      totalSupplyPGL_6 = totalSupplyPGL_6 / 1e18;
      const reserves_6 = await pglContract_6.getReserves();
      const r0_6 = reserves_6._reserve0 / 1e18
      const r1_6 = reserves_6._reserve1 / 1e18
      let reserve0Owned_6 = ownedPGL_6 * (r0_6) / (totalSupplyPGL_6);
      let reserve1Owned_6 = ownedPGL_6 * (r1_6) / (totalSupplyPGL_6);
      const token0Address_6 = await pglContract_6.token0();
      const token1Address_6 = await pglContract_6.token1();
      const t0Price_6 = prices[token0Address_6] ? prices[token0Address_6].usd : 0
      const t1Price_6 = prices[token1Address_6] ? prices[token1Address_6].usd : 0
      const token0ValueUSDT_6 = reserve0Owned_6 * t0Price_6;
      const token1ValueUSDT_6 = reserve1Owned_6 * t1Price_6;
      const value_6 = token0ValueUSDT_6 + (token1ValueUSDT_6);
      poolShareDisplay_6 = `Your pool share is <b>${userSPGL_6.toFixed(6)}</b> sPGL (<b>${ownedPGL_6.toFixed(6)}</b> PGL) - <b>${userPool6Percent.toFixed(6)}%</b>`
      stakeDisplay_6 = `Your LP Value is <b>${reserve0Owned_6.toFixed(6)}</b> ${TOKEN_NAMES[token0Address_6]} / <b>${reserve1Owned_6.toFixed(6)}</b> ${TOKEN_NAMES[token1Address_6]} ($<b>${value_6.toFixed(2)}</b>)***</b>`
    }
  } catch { console.log('error calculating PGL value')}


  _print(`<b style="font-size: 20px;"">IceQueen 👸 - Governance</b>`);
  _print(`<div style="font-size:smaller;padding: 4px 0 0 20px">*Estimates based on 15,000 blocks per day<br/>**Combined APR includes the APR earned from Snowglobe<br/>***Estimated LP value based on current token prices</div>`)

  function pool(options) {
    _print(``)
    if (options.url) {
	    _print(`<b>${options.pool_nickname}</b> <a href='${options.url}' target="_blank">${options.pool_name}</a>`)
    } else {
	    _print(`<b>${options.pool_nickname}</b> ${options.pool_name}`)
	  }
    _print(`TVL: <a href='${options.tvl}' target='_blank'>${options.tvl_display}</a>`)
  	if (options.icequeen_apr) {
			_print(`Estimated APR*: Day ${options.icequeen_apr.toFixed(2)}% Week ${(options.icequeen_apr * 7).toFixed(2)}% Year ${(options.icequeen_apr * 365).toFixed(2)}%`)
			if (options.snowglobe_apr) {
				let combinedAPR = options.icequeen_apr + options.snowglobe_apr
				_print(`Combined APR**: Day ${combinedAPR.toFixed(2)}% Week ${(combinedAPR * 7).toFixed(2)}% Year ${(combinedAPR * 365).toFixed(2)}%`)
			}
		}
    _print(`Allocation: <b>${ (options.pool_weight * 100)}%</b> SNOB Per Day: <b>${snowballsPerBlock * options.pool_weight / 1e18 * 15000}</b>`)
    if (options.total_staked && options.total_pgl) {
      _print(`Pool Size: <b>${(options.total_staked / 1e18).toLocaleString()}</b> sPGL (<b>${(options.total_pgl / 1e18).toLocaleString()}</b> PGL)`)
    } else if (options.total_staked) {
      _print(`Pool Size: <b>${(options.total_staked / 1e18).toLocaleString()}</b> sPGL`)

    } else {
      _print(`Pool Size: <b>${ (options.total_pgl / 1e18).toLocaleString()}</b> PGL`)
    }
    if ( options.user_pool_percent > 0 ) {
      if (options.pool_share_display) {
        _print(options.pool_share_display)
      }
      if (options.stake_display) {
        _print(options.stake_display)
      }
      _print(`Estimated rate (average block rate): <b>${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)}</b> SNOB per day ($<b>${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</b>`)
      _print(`Estimated rate (24hr block rate): <b>${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)}</b> SNOB per day ($<b>${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs * snobPrice).toFixed(2)})</b>`)
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      _print(`Pending: <b>${(options.pending_tokens / 1e18).toFixed(6)}</b> SNOB`)
    }
    if ( options.display_amount > 0 ) {
      _print(`Available to Stake: <b>${(options.display_amount).toFixed(6)}</b> sPGL`)
    }
    if ( options.staked_pool.amount / 1e18 > 0 ) {
      _print(`Available to Unstake: <b>${(options.staked_pool.amount / 1e18).toFixed(6)}</b> sPGL`)
    }
    let has_options = false
    if ( options.display_amount > 0 ) {
      has_options = true
      _print_button(`Approve`, options.approve)
      _print_button(`Stake`, options.stake)
    }
    if ( options.staked_pool.amount / 1e18 > 0 ) {
      has_options = true
      _print_button(`Unstake`, options.unstake)
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      _print_button(`Claim`, options.claim)
    }
    if ( !has_options ) {
      _print(`No sPGL to Stake/Withdraw.`)
      _print(`<a href="/snowglobes">Get sPGL from Snowglobes</a>`)
    }
  }

  function poolS3D(options) {
    _print(``)
    if (options.url) {
      _print(`<b>${options.pool_nickname}</b> <a href='${options.url}' target="_blank">${options.pool_name}</a>`)
    } else {
      _print(`<b>${options.pool_nickname}</b> ${options.pool_name}`)
    }
    _print(`TVL: ${options.tvl_display}`)
    if (options.icequeen_apr) {
      _print(`Estimated APR*: Day ${options.icequeen_apr.toFixed(2)}% Week ${(options.icequeen_apr * 7).toFixed(2)}% Year ${(options.icequeen_apr * 365).toFixed(2)}%`)
      if (options.snowglobe_apr) {
        let combinedAPR = options.icequeen_apr + options.snowglobe_apr
        _print(`Combined APR**: Day ${combinedAPR.toFixed(2)}% Week ${(combinedAPR * 7).toFixed(2)}% Year ${(combinedAPR * 365).toFixed(2)}%`)
      }
    }
    _print(`Allocation: <b>${ (options.pool_weight * 100)}%</b> SNOB Per Day: <b>${snowballsPerBlock * options.pool_weight / 1e18 * 15000}</b>`)
    if (options.total_staked) {
      _print(`Pool Size: <b>${(options.total_staked / 1e18).toLocaleString()}</b> S3D`)
    }
    if ( options.user_pool_percent > 0 ) {
      if (options.pool_share_display) {
        _print(options.pool_share_display)
      }
      if (options.stake_display) {
        _print(options.stake_display)
      }
      _print(`Estimated rate (average block rate): <b>${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)}</b> SNOB per day ($<b>${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</b>`)
      _print(`Estimated rate (24hr block rate): <b>${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)}</b> SNOB per day ($<b>${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs * snobPrice).toFixed(2)})</b>`)
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      _print(`Pending: <b>${(options.pending_tokens / 1e18).toFixed(6)}</b> SNOB`)
    }
    if ( options.display_amount > 0 ) {
      _print(`Available to Stake: <b>${(options.display_amount).toFixed(6)}</b> S3D`)
    }
    if ( options.staked_pool.amount / 1e18 > 0 ) {
      _print(`Available to Unstake: <b>${(options.staked_pool.amount / 1e18).toFixed(6)}</b> S3D`)
    }
    let has_options = false
    if ( options.display_amount > 0 ) {
      has_options = true
      _print_button(`Approve`, options.approve)
      _print_button(`Stake`, options.stake)
    }
    if ( options.staked_pool.amount / 1e18 > 0 ) {
      has_options = true
      _print_button(`Unstake`, options.unstake)
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      _print_button(`Claim`, options.claim)
    }
    if ( !has_options ) {
      _print(`No S3D to Stake/Withdraw. Get S3D from StableVault.`)
    }
  }


  poolS3D({
    pool_nickname: '(Pool 7)',
    pool_name: '🏦 StableVault S3D - New! 🌟',
    url: null,
    tvl: null,
    pool_weight: pool7weight,
    total_staked: totalStakedS3D,
    user_pool_percent: userPool7Percent,
    staked_pool: stakedPool7,
    pending_tokens: pendingSNOBTokensPool7,
    display_amount: S3DDisplayAmt,
    approve: approveS3D,
    stake: stakeS3D,
    unstake: withdrawPool7,
    claim: claimPool7,
    icequeen_apr: pool7APR,
    snowglobe_apr: null,
    tvl_display: pool7tvlDisplay,
    total_pgl: null,
    pool_share_display: poolShareDisplay_7,
    stake_display: ''
  })
  pool({
    pool_nickname: '(Pool 6)',
    pool_name: '🔗 LINK-AVAX sPGL - New! 🌟',
    url: null,
    tvl: LINK_AVAX_TVL,
    pool_weight: pool6weight,
    total_staked: totalStakedSPGLLINK,
    user_pool_percent: userPool6Percent,
    staked_pool: stakedPool6,
    pending_tokens: pendingSNOBTokensPool6,
    display_amount: spglLinkDisplayAmt,
    approve: approveSPGLLINK,
    stake: stakeSPGLLINK,
    unstake: withdrawPool6,
    claim: claimPool6,
    icequeen_apr: pool6APR,
    snowglobe_apr: link_apr.dailyAPR,
    tvl_display: pool6tvlDisplay,
    total_pgl: null,
    pool_share_display: poolShareDisplay_6,
    stake_display: stakeDisplay_6
  })
  pool({
    pool_nickname: '(Pool 5)',
    pool_name: '💵 USDT-AVAX sPGL',
    url: null,
    tvl: USDT_AVAX_TVL,
    pool_weight: pool5weight,
    total_staked: totalStakedSPGLUSDT,
    user_pool_percent: userPool5Percent,
    staked_pool: stakedPool5,
    pending_tokens: pendingSNOBTokensPool5,
    display_amount: spglUsdtDisplayAmt,
    approve: approveSPGLUSDT,
    stake: stakeSPGLUSDT,
    unstake: withdrawPool5,
    claim: claimPool5,
    icequeen_apr: pool5APR,
    snowglobe_apr: usdt_apr.dailyAPR,
    tvl_display: pool5tvlDisplay,
    total_pgl: totalPoolPGL_5,
    pool_share_display: poolShareDisplay_5,
    stake_display: stakeDisplay_5
  })
  pool({
    pool_nickname: '(Pool 4)',
    pool_name: '💠 ETH-AVAX sPGL',
    url: null,
    tvl: ETH_AVAX_TVL,
    pool_weight: pool4weight,
    total_staked: totalStakedSPGLETH,
    user_pool_percent: userPool4Percent,
    staked_pool: stakedPool4,
    pending_tokens: pendingSNOBTokensPool4,
    display_amount: spglEthDisplayAmt,
    approve: approveSPGLETH,
    stake: stakeSPGLETH,
    unstake: withdrawPool4,
    claim: claimPool4,
    icequeen_apr: pool4APR,
    snowglobe_apr: eth_apr.dailyAPR,
    tvl_display: pool4tvlDisplay,
    total_pgl: totalPoolPGL_4,
    pool_share_display: poolShareDisplay_4,
    stake_display: stakeDisplay_4
  })

  pool({
    pool_nickname: '(Pool 3)',
    pool_name: '🦔 PNG-AVAX sPGL',
    url: null,
    tvl: PNG_AVAX_TVL,
    pool_weight: pool3weight,
    total_staked: totalStakedSPGLPNG,
    user_pool_percent: userPool3Percent,
    staked_pool: stakedPool3,
    pending_tokens: pendingSNOBTokensPool3,
    display_amount: spglPngDisplayAmt,
    approve: approveSPGLPNG,
    stake: stakeSPGLPNG,
    unstake: withdrawPool3,
    claim: claimPool3,
    icequeen_apr: pool3APR,
    snowglobe_apr: png_apr.dailyAPR,
    tvl_display: pool3tvlDisplay,
    total_pgl: totalPoolPGL_3,
    pool_share_display: poolShareDisplay_3,
    stake_display: stakeDisplay_3
  })

  pool({
    pool_nickname: '(Pool 2)',
    pool_name: '❄️ SNOB-AVAX Pangolin LP',
    url: SNOB_AVAX_POOL_URL,
    tvl: SNOB_AVAX_TVL,
    pool_weight: pool2weight,
    total_staked: null,
    user_pool_percent: userPool2Percent,
    staked_pool: stakedPool2,
    pending_tokens: pendingSNOBTokensPool2,
    display_amount: snobAvaxDisplayAmt,
    approve: approveSNOB,
    stake: stakeSNOB,
    unstake: withdrawPool2,
    claim: claimPool2,
    icequeen_apr: pool2APR,
    snowglobe_apr: null,
    tvl_display: pool2tvlDisplay,
    total_pgl: totalStakedSNOBAVAX,
    pool_share_display: poolShareDisplay_2,
    stake_display: stakeDisplay_2
  })

  pool({
    pool_nickname: '(Pool 1)',
    pool_name: '🍣 SUSHI-AVAX sPGL',
    url: null,
    tvl: SUSHI_AVAX_TVL,
    pool_weight: pool1weight,
    total_staked: totalStakedSPGLSUSHI,
    user_pool_percent: userPool1Percent,
    staked_pool: stakedPool1,
    pending_tokens: pendingSNOBTokensPool1,
    display_amount: spglSushiDisplayAmt,
    approve: approveSPGLSUSHI,
    stake: stakeSPGLSUSHI,
    unstake: withdrawPool1,
    claim: claimPool1,
    icequeen_apr: pool1APR,
    snowglobe_apr: sushi_apr.dailyAPR,
    tvl_display: pool1tvlDisplay,
    total_pgl: totalPoolPGL_1,
    pool_share_display: poolShareDisplay_1,
    stake_display: stakeDisplay_1
  })

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

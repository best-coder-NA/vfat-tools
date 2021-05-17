//ABIs
const SNOWGLOBE_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_token", "internalType": "address" }, { "type": "address", "name": "_governance", "internalType": "address" }, { "type": "address", "name": "_timelock", "internalType": "address" }, { "type": "address", "name": "_controller", "internalType": "address" }] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "available", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "controller", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "decreaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "subtractedValue", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "uint256", "name": "_amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "depositAll", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "earn", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getRatio", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "governance", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "harvest", "inputs": [{ "type": "address", "name": "reserve", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "increaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "addedValue", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "max", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "min", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setController", "inputs": [{ "type": "address", "name": "_controller", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setGovernance", "inputs": [{ "type": "address", "name": "_governance", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setMin", "inputs": [{ "type": "uint256", "name": "_min", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setTimelock", "inputs": [{ "type": "address", "name": "_timelock", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "timelock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract IERC20" }], "name": "token", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "sender", "internalType": "address" }, { "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "_shares", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdrawAll", "inputs": [] }]
const ICEQUEEN_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_snowball", "internalType": "contract Snowball" }, { "type": "address", "name": "_devfund", "internalType": "address" }, { "type": "address", "name": "_treasury", "internalType": "address" }, { "type": "uint256", "name": "_snowballPerBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_startBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_bonusEndBlock", "internalType": "uint256" }] }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "EmergencyWithdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "type": "address", "name": "previousOwner", "internalType": "address", "indexed": true }, { "type": "address", "name": "newOwner", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Recovered", "inputs": [{ "type": "address", "name": "token", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "BONUS_MULTIPLIER", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "add", "inputs": [{ "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "address", "name": "_lpToken", "internalType": "contract IERC20" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "bonusEndBlock", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "devFundDivRate", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "devfund", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "emergencyWithdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getMultiplier", "inputs": [{ "type": "uint256", "name": "_from", "internalType": "uint256" }, { "type": "uint256", "name": "_to", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "massUpdatePools", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "pendingSnowball", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "address", "name": "_user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "lpToken", "internalType": "contract IERC20" }, { "type": "uint256", "name": "allocPoint", "internalType": "uint256" }, { "type": "uint256", "name": "lastRewardBlock", "internalType": "uint256" }, { "type": "uint256", "name": "accSnowballPerShare", "internalType": "uint256" }], "name": "poolInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "poolLength", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "renounceOwnership", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "set", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setBonusEndBlock", "inputs": [{ "type": "uint256", "name": "_bonusEndBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setDevFundDivRate", "inputs": [{ "type": "uint256", "name": "_devFundDivRate", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setSnowballPerBlock", "inputs": [{ "type": "uint256", "name": "_snowballPerBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setTreasuryDivRate", "inputs": [{ "type": "uint256", "name": "_treasuryDivRate", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract Snowball" }], "name": "snowball", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "snowballPerBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "startBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalAllocPoint", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "transferOwnership", "inputs": [{ "type": "address", "name": "newOwner", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "treasury", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "treasuryDivRate", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateDevfund", "inputs": [{ "type": "address", "name": "_devfund", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updatePool", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateTreasury", "inputs": [{ "type": "address", "name": "_treasury", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }, { "type": "uint256", "name": "rewardDebt", "internalType": "uint256" }], "name": "userInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }]
const PGL_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "payable": false, "inputs": [] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Burn", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Mint", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Swap", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0In", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1In", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount0Out", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1Out", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Sync", "inputs": [{ "type": "uint112", "name": "reserve0", "internalType": "uint112", "indexed": false }, { "type": "uint112", "name": "reserve1", "internalType": "uint112", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DOMAIN_SEPARATOR", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "MINIMUM_LIQUIDITY", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "PERMIT_TYPEHASH", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "amount0", "internalType": "uint256" }, { "type": "uint256", "name": "amount1", "internalType": "uint256" }], "name": "burn", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "factory", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint112", "name": "_reserve0", "internalType": "uint112" }, { "type": "uint112", "name": "_reserve1", "internalType": "uint112" }, { "type": "uint32", "name": "_blockTimestampLast", "internalType": "uint32" }], "name": "getReserves", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "initialize", "inputs": [{ "type": "address", "name": "_token0", "internalType": "address" }, { "type": "address", "name": "_token1", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "kLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "liquidity", "internalType": "uint256" }], "name": "mint", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "nonces", "inputs": [{ "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "permit", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price0CumulativeLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price1CumulativeLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "skim", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "swap", "inputs": [{ "type": "uint256", "name": "amount0Out", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Out", "internalType": "uint256" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "bytes", "name": "data", "internalType": "bytes" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "sync", "inputs": [], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "token0", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "token1", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "from", "internalType": "address" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }]
const PNG_STAKING_ABI = [{ "inputs": [{ "internalType": "address", "name": "_rewardsToken", "type": "address" }, { "internalType": "address", "name": "_stakingToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Recovered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newDuration", "type": "uint256" }], "name": "RewardsDurationUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "earned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "exit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getRewardForDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastTimeRewardApplicable", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastUpdateTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "notifyRewardAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "periodFinish", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "recoverERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rewardPerToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardPerTokenStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "rewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_rewardsDuration", "type": "uint256" }], "name": "setRewardsDuration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "stakeWithPermit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stakingToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userRewardPerTokenPaid", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const CRYSTAL_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_iceQueen","internalType":"address"},{"type":"address","name":"_snowball","internalType":"address"},{"type":"address","name":"_pgl","internalType":"address"},{"type":"uint256","name":"_poolId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"snowball","internalType":"uint256"},{"type":"uint256","name":"PGL","internalType":"uint256"},{"type":"uint256","name":"rewardCredit","internalType":"uint256"},{"type":"uint256","name":"rewardSnapshot","internalType":"uint256"},{"type":"uint256","name":"votes","internalType":"uint256"},{"type":"uint256","name":"thawTimestamp","internalType":"uint256"}],"name":"accounts","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amountSnowball","internalType":"uint256"},{"type":"uint256","name":"_amountPGL","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositPGL","inputs":[{"type":"uint256","name":"_amountIn","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositSnowball","inputs":[{"type":"uint256","name":"_amountIn","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"freeze","inputs":[{"type":"address","name":"_address","internalType":"address"},{"type":"uint256","name":"_duration","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIceQueen"}],"name":"iceQueen","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isFrozen","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingReward","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPangolinPair"}],"name":"pgl","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quadraticVotes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"snowball","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]

//governance
const CRYSTAL_VAULT_ADDRESS = '0xe5614C304D73d990B8BcA8F055Ec0f2685Ebf60c';

//contracts
const ICEQUEEN_ADDR = '0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375';

const DAILY_COMPOUNDS = 6

const compounds_per_year = DAILY_COMPOUNDS * 365

const SNOB_ADDRESS = '0xC38f41A296A4493Ff429F1238e030924A1542e50';

const TOKEN_NAMES = {
  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": "AVAX",
  "0x60781C2586D68229fde47564546784ab3fACA982": "PNG",
  "0xC38f41A296A4493Ff429F1238e030924A1542e50": "SNOB",
  "0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc": "SUSHI",
  "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15": "ETH",
  "0xde3A24028580884448a5397872046a019649b084": "USDT",
  "0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651": "LINK",
  "0x408d4cd0adb7cebd1f1a1c33a0ba2098e1295bab": "WBTC",
  "0x99519acb025a0e0d44c3875a4bbf03af65933627": "YFI" ,
  "0xf39f9671906d8630812f9d9863bbef5d523c84ab": "UNI",
  "0xba7deebbfc5fa1100fb055a87773e1e99cd3507a": "DAI",
  "0x8ce2dee54bb9921a2ae0a63dbb2df8ed88b91dd9": "AAVE"
}

const walletcopy = () => {
  let wc = document.getElementById('wallet-copy');
  if ( wc ) {
    wc.addEventListener('click', ()=>{
      navigator.clipboard.writeText(`${app.YOUR_ADDRESS}`).then(function() {
        console.log('Snowball Platform: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Snowball Platform: Could not copy text: ', err);
      });
    });
    
  }
}
walletcopy();

const snobMessage = (title, message, icon, state, btn1, btn2, time) =>{
  $('#snob-title-modal').html('').html(title);
  $('#snob-message-modal').html('').html(message);
  //icon = icon ? icon = `<ion-icon name="${icon}"></ion-icon>` : icon = '';
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

const snowglobe = async (func, pairId, snowglobeId) => {
  console.log('snowglobe:', func, 'pairid:', pairId, 'snowglobeId:', snowglobeId)
  
  let app = window.app;  
  let signer = app.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(pairId, ERC20_ABI, signer)
  const SNOWGLOBE = new ethers.Contract(snowglobeId, SNOWGLOBE_ABI, signer)
  
  const currentTokens = await STAKING_TOKEN.balanceOf(app.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(app.YOUR_ADDRESS, snowglobeId)
  const stakedTokens  = await SNOWGLOBE.balanceOf(app.YOUR_ADDRESS)

  console.log('current tokens:', currentTokens, 'allowed tokens:', allowedTokens, 'staked tokens:', stakedTokens)

  let allow = Promise.resolve()

  if ( func === 'approve') {
    halfmoon.toggleModal('modal-loading')
    if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
      snobMessage(`Connected successfully`, `Already approved . <br>You can use the deposit/withdrawals options`, `checkmark-circle-outline`, `success`, false, `ok`, 4000);
      halfmoon.toggleModal('modal-loading')
    } else {
      allow = STAKING_TOKEN.approve(snowglobeId, ethers.constants.MaxUint256)
        .then(function (t) {
          halfmoon.toggleModal('modal-loading');
          return app.provider.waitForTransaction(t.hash)
        })
        .catch(function () {
          hideLoading()  
          snobMessage(`Connecting to metamask`, `Approval failed . Please check your Metamask Wallet`, `close-circle-outline`, `danger`, false, `ok`, 4000);
          halfmoon.toggleModal('modal-loading')
        })
    }
  } else if ( func === 'stake' ) {
    if (allowedTokens / 1e18 == 0) {
      snobMessage(`Approve spending`, `Please approve spending first. Please check your Metamask Wallet`, `information-circle-outline`, `primary`, false, `ok`);
    } else if (currentTokens / 1e18 > 0) {
      halfmoon.toggleModal('modal-loading')
      allow
        .then(async function () {
          new ethers.Contract(snowglobeId, SNOWGLOBE_ABI, signer).depositAll()
            .then(function (t) {
              app.provider.waitForTransaction(t.hash).then(function () {
                halfmoon.toggleModal('modal-loading')
                snobMessage(`Tokens deposit`, `Tokens deposited. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
                setTimeout(function() { 
                  window.location.reload(true); 
                }, 5000);
              })
            })
            .catch(function (err) {
              console.log('error 1:', err)
              halfmoon.toggleModal('modal-loading')
              snobMessage(`Oops! Failed`, `Deposit Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
            })
        })
        .catch(function (err2) {
          console.log('error 2:', err2)
          halfmoon.toggleModal('modal-loading')
        })
    } else {
      snobMessage(`Oops! Failed`, `Deposit Failed. You have no tokens to stake`, `close-circle-outline`, `danger`, false, `ok`, false);
    }
  } else if ( func === 'withdraw' ) {
    if (stakedTokens / 1e18 > 0) {
      let c = new ethers.Contract(snowglobeId, SNOWGLOBE_ABI, signer)
      console.log('withdraw:', stakedTokens / 1e18, 'from:', c)
      halfmoon.toggleModal('modal-loading')
      allow
        .then(async function () {
          c.withdrawAll()
            .then(function (t) {
              app.provider.waitForTransaction(t.hash).then(function () {
                halfmoon.toggleModal('modal-loading')
                snobMessage(`Withdrawn Tokens`, `Tokens Withdrawn. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
                setTimeout(function(){ window.location.reload(true); }, 5000);
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

}

const gentop = async () => {  
  let start = new Date().getTime();

  let app = window.app;
  let signer = app.provider.getSigner()  
  let prices = window.prices

  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)
  const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)
  const CRYSTAL_CONTRACT = new ethers.Contract(CRYSTAL_VAULT_ADDRESS, CRYSTAL_VAULT_ABI, signer);
  
  return Promise.all([
    ICEQUEEN_CONTRACT.pendingSnowball(1, app.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(2, app.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(3, app.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(4, app.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(5, app.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(6, app.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.pendingSnowball(7, app.YOUR_ADDRESS),
    ICEQUEEN_CONTRACT.snowballPerBlock(),
    SNOB_TOKEN.totalSupply(),
    SNOB_TOKEN.balanceOf(app.YOUR_ADDRESS),
    app.provider.getBlockNumber(),    
    CRYSTAL_CONTRACT.pendingReward(app.YOUR_ADDRESS),
    CRYSTAL_CONTRACT.accounts(app.YOUR_ADDRESS)
  ]).then(results => {

    const pendingGovReward = results[11]
    const assetsDeposited = results[12]

    const pendingSNOBTokensPool1 = results[0] 
    const pendingSNOBTokensPool2 = results[1] 
    const pendingSNOBTokensPool3 = results[2] 
    const pendingSNOBTokensPool4 = results[3] 
    const pendingSNOBTokensPool5 = results[4] 
    const pendingSNOBTokensPool6 = results[5] 
    const pendingSNOBTokensPool7 = results[6] 
    const snowballsPerBlock = results[7] 
    const snobTotalSupply = results[8] 
    const currentSNOBTokens = results[9] 
    const claimableSnowballs = pendingGovReward / 1e18 + pendingSNOBTokensPool1 / 1e18 + pendingSNOBTokensPool2 / 1e18 + pendingSNOBTokensPool3 / 1e18 + pendingSNOBTokensPool4 / 1e18 + pendingSNOBTokensPool5 / 1e18 + pendingSNOBTokensPool6 / 1e18 + pendingSNOBTokensPool7 / 1e18;
    const blockNumber = results[10] 
  

    return Promise.all([
      app.provider.getBlock(blockNumber),
      app.provider.getBlock(blockNumber - 15000)
    ]).then(results2 => {
      const currentBlock = results2[0]
      const yesterdayBlock = results2[1]
      const secondsInDay = 86400;
      const blocks24hrs = (secondsInDay / (currentBlock.timestamp - yesterdayBlock.timestamp)) * 15000;  
  
      const snobPrice = prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'] ? prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'].usd : 0;
    
      let walletAddres = `${app.YOUR_ADDRESS}`;
      $('#wallet-address').html(`${walletAddres}`);
  
      try {
        if (currentSNOBTokens / 1e18 > 0 || claimableSnowballs > 0 || assetsDeposited.snowball / 1e18 > 0) {
          $('#account-info').show();
          $('#snob-info').show();
          $('#value-snob').append(`${(currentSNOBTokens / 1e18 + claimableSnowballs).toFixed(4)}`);
          $('#value-usd').append(`${((currentSNOBTokens / 1e18 + claimableSnowballs) * snobPrice).toFixed(2)}`);
          $('#wallet').append(`${(currentSNOBTokens / 1e18).toFixed(4)}`);
          $('#track-portfolio').html(`<ion-icon name="arrow-redo-outline"></ion-icon> <a href='https://markr.io/#/wallet?address=${walletAddres}' target='_blank'>Track Your Portfolio</a>`);
          $('#governance-snob').append(`In Governance: ${(assetsDeposited.snowball / 1e18).toFixed(4)}`);
          if (claimableSnowballs > 0) {
            $('#pending').append(`<ion-icon name="time-outline"></ion-icon> Pending: ${(claimableSnowballs).toFixed(4)}`);
          }else{
            $('#pending').append(`<ion-icon name="checkmark-circle" class="text-success"></ion-icon> No pending rewards`);
          }
        }
      } catch {console.log('could not load wallet info')}    
  
      const marketCapDisplay = `$${new Intl.NumberFormat('en-US').format(snobTotalSupply / 1e18 * snobPrice)}`
      $('#value-market').append(`$${snobPrice.toFixed(3)}`)
      $('#value-marketcap').append(`${marketCapDisplay}`)
      $('#snob-supply').append(`${(snobTotalSupply / 1e18).toLocaleString()}`)
      $('#snob-supply-max').append(`18,000,000`)
      $('#snob-per-block').append(`${snowballsPerBlock / 1e18}`)
      $('#snob-block-pday').append(`${(snowballsPerBlock / 1e18 * 15000).toLocaleString()}`)
      $('#blocks-24-hrs').append(`~${Math.round(blocks24hrs).toLocaleString()}`)
      $('#distribution_phase').append(`${blockNumber.toLocaleString()} / 3,065,000 (${(3065000 - blockNumber).toLocaleString()} blocks left)`);
      return new Date().getTime() - start
    })      
  }) 
}

const layoutpool = (options, replace) => {
  if ( options.tvl_display ) {
    var tvl = `<div class="col-sm-12 col-md-12 align-items-center text-center mt-5 mb-5">
    <p class="m-0 font-size-12"><ion-icon name="lock-closed-outline"></ion-icon> Total Value Locked</p>
    <span class="badge font-size-12 px-5 px-sm-10 mx-5">${options.tvl_display}</span>
    </div>`;
  } else {
    var tvl = '';
  }
  var apy =  `<div class="col-sm-12 col-md-12 align-items-center text-center mt-5 mb-5">
    <p class="m-0 font-size-12">APY</p>
    <span class="badge font-size-12 px-5 px-sm-10 mx-5" id="${options.pool_id}-apy"></span>
    </div>`;
  if ( !isNaN(options.total_deposited) ) {
    var poolSize = `<div class="col-sm-12 col-md-12 align-items-center text-center mt-5 mb-5 mx-auto">
    <p class="m-0 font-size-12"> Pool Size</p><span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-semi-bold">${(options.total_deposited / 1e18) > 1 ? (options.total_deposited / 1e18).toLocaleString() : (options.total_deposited / 1e18).toFixed(8)} sPGL </span>
    <span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-semi-bold">${(options.total_pgl / 1e18) > 1 ? (options.total_pgl / 1e18).toLocaleString() : (options.total_pgl / 1e18).toFixed(8)} PGL</span>
    </div>`;
  } else {
    var poolSize = '';
  }
  if ( options.current_tokens / 1e18 > 0 ) {
    var available = `<div class="col-sm-12 col-md-12 align-items-center text-center snob-tvl mt-5 mb-5">
    <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
    <p class="m-0 font-size-16 font-weight-semi-bold">${(options.current_tokens / 1e18) > 0 ? (options.current_tokens / 1e18) .toFixed(8) : (options.current_tokens / 1e18) } PGL  </p>
    <p class="m-0 font-size-12">(Available for deposit) </p>
    </div>`;
  } else {
    var available = '';
  }
  if ( options.owned_pgl * 1 > 0 ) {
    var withdraw = `<div class="col-sm-12 col-md-12 align-items-center text-center snob-tvl mt-5 mb-5">
    <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
    <p class="m-0 font-size-16 font-weight-semi-bold">${(options.owned_pgl * 1) > 0 ? (options.owned_pgl * 1).toFixed(8) : (options.owned_pgl * 1) } PGL  </p>
    <p class="m-0 font-size-12">(Available for withdraw) </p>
    </div>`;
  } else {
    var withdraw = '';
  }
  let has_options = false;
  var approveBtn = '';
  var depositBtn = '';
  if ( options.current_tokens / 1e18 > 0 ) {
    has_options = true;
    var approveBtn = `<button onclick="${options.approve}" class="btn btn-sm mx-10 approveBtn"><ion-icon name="bag-check-outline"></ion-icon> Approve</button>`;
    var depositBtn = `<button onclick="${options.stake}" class="btn btn-primary btn-sm depositBtn"><ion-icon name="download-outline"></ion-icon> Deposit </button>`;
  }
  var withdrawBtn = '';
  if ( options.display_amount > 0 ) {
    has_options = true;    
    var withdrawBtn = `<button onclick="${options.withdraw}" class="btn btn-success btn-sm withdrawBtn"><ion-icon name="push-outline"></ion-icon> Withdraw </button>`;
  }
  if( !has_options ){
    var poolPrint = `<div class="col-md-4">
    <div class="card border-0 p-10 pl-20 pr-20 mt-5">
        <div class="row">
            <div class="col-sm-12 col-md-12 align-items-center d-flex mb-5 mt-5">
                <div id="pooltokens" class="align-items-center d-flex mx-auto mx-md-0">
                    <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                    <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                    <a href="${options.url}" target="_blank"><h6 class="pl-10 m-0">${options.pool_name}</h6></a>
                </div>
            </div>
            ${poolSize}
            <div class="col-sm-12 col-md-12 align-items-center text-center snob-tvl mt-10 mb-0 mx-auto">
                <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm"><ion-icon name="calculator"></ion-icon> Check APRs and TVL on Markr.io</a>
            </div>
            <div class="col-sm-12 col-md-12 align-items-center text-center snob-tvl mt-10 mb-10 mx-auto">
                <a href="${options.url}" target="_blank" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get LP tokens</a>
            </div>
        </div>
    </div>
  </div>`;
  $('#snob-pools').append(poolPrint);
} else {
    var poolPrint = `<div class="col-md-4">
      <div class="card border-0 p-10 pl-20 pr-20 mt-5">
          <div class="row">
              <div class="col-sm-12 col-md-12 align-items-center d-flex mb-5 mt-5">
                  <div id="pooltokens" class="align-items-center d-flex mx-auto mx-md-0">
                      <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                      <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                      <a href="${options.url}" target="_blank"><h6 class="pl-10 m-0">${options.pool_name}</h6></a>
                  </div>
              </div>
              ${poolSize}
              ${available}
              ${withdraw}
              <div class="col-sm-12 col-md-12 align-items-center text-center snob-tvl mt-10 mb-10 mx-auto">
                ${approveBtn}
                ${depositBtn}
                ${withdrawBtn}
              </div>
          </div>
      </div>
  </div>`;
    $('#snob-pools').append(poolPrint);
  }
}

function pairmatch(p, t0, t1) {
  return ( p.token0.id.toLowerCase() == t0.toLowerCase() || p.token1.id.toLowerCase() == t0.toLowerCase() ) && 
         ( p.token0.id.toLowerCase() == t1.toLowerCase() || p.token1.id.toLowerCase() == t1.toLowerCase() )
}

const genpool = async (pool) => {
  console.log('genpool nickname:', pool.nickname)

  let app = window.app;
  let prices = window.prices;  
  let signer = app.provider.getSigner()  

  let snowglobeContract = new ethers.Contract(pool.snowglobe, SNOWGLOBE_ABI, signer)
  let pairToken = new ethers.Contract(pool.pair, ERC20_ABI, signer)
  let pglContract = new ethers.Contract(pool.pair, PGL_ABI, signer);

  let results = await Promise.all([
    pairToken.balanceOf(app.YOUR_ADDRESS),
    snowglobeContract.balanceOf(app.YOUR_ADDRESS),
    snowglobeContract.balance()
  ])

  let currentPGLTokens = results[0]
  let currentSPGLTokens = results[1]
  let totalPoolPGL = results[2];

  const spglDisplayAmt = currentSPGLTokens > 1000 ? (currentSPGLTokens / 1e18).toFixed(8) : 0;
  
  let pair_tvl = 0;
  let pair_tvl_display = '';
  
  // window.tvl.pairs.forEach( p => {
  //   if ( pairmatch(p, pool.token0.toLowerCase(), pool.token1.toLowerCase()) ) {
  //     pair_tvl = p.locked;
  //     pair_tvl_display = `$${new Intl.NumberFormat('en-US').format(pair_tvl)}`
  //   }
  // });

  let poolShareDisplay = null;
  let stakeDisplay = null;
  let withdrawDisplay = null;

  let userSPGL = currentSPGLTokens / 1e18;
  let ownedPGL = 0

  if (userSPGL > 0) {

    let results2 = await Promise.all([
      snowglobeContract.totalSupply(),
      pglContract.totalSupply(),
      pglContract.getReserves(),
      pglContract.token0(),
      pglContract.token1()
    ]);

    let totalSPGL = results2[0];
    ownedPGL = userSPGL * (totalPoolPGL / 1e18) / (totalSPGL / 1e18);
    
    let totalSupplyPGL = results2[1];
    totalSupplyPGL = totalSupplyPGL / 1e18;
    const reserves = await results2[2];
    const r0 = reserves._reserve0 / 1e18
    const r1 = reserves._reserve1 / 1e18
    let reserve0Owned = ownedPGL * (r0) / (totalSupplyPGL);
    let reserve1Owned = ownedPGL * (r1) / (totalSupplyPGL);
    const token0Address = results2[3];
    const token1Address = results2[4];
    const t0Price = prices[token0Address] ? prices[token0Address].usd : 0
    const t1Price = prices[token1Address] ? prices[token1Address].usd : 0
    const token0ValueUSDT = reserve0Owned * t0Price;
    const token1ValueUSDT = reserve1Owned * t1Price;
    const value = token0ValueUSDT + (token1ValueUSDT);
    withdrawDisplay = `<b>${userSPGL.toFixed(4)}</b> sPGL (<b>${ownedPGL.toFixed(4)}</b> PGL)`;
    poolShareDisplay = withdrawDisplay;
    stakeDisplay = `Your LP value is <b>${reserve0Owned.toFixed(3)}</b> ${TOKEN_NAMES[token0Address]} / <b>${reserve1Owned.toFixed(3)}</b> ${TOKEN_NAMES[token1Address]} ($<b>${value.toFixed(2)}</b>)**</b>`
  }   
  layoutpool({
    logo_token1: `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${pool.token0}/logo.png`,
    logo_token2: `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${pool.token1}/logo.png`,
    url: `https://app.pangolin.exchange/#/add/${pool.token0.toLowerCase()}/${pool.token1.toLowerCase()}`,
    pool_name: pool.nickname,
    apr: null,
    apy: null,
    current_tokens: currentPGLTokens,
    display_amount: spglDisplayAmt,
    approve: `snowglobe('approve', '${pool.pair}', '${pool.snowglobe}')`,
    stake: `snowglobe('stake','${pool.pair}', '${pool.snowglobe}')`,
    withdraw: `snowglobe('withdraw', '${pool.pair}', '${pool.snowglobe}')`,
    tvl_display: pair_tvl_display,
    pool_share_display: null,
    stake_display: stakeDisplay,
    total_pgl: null,
    withdraw_display: withdrawDisplay,
    owned_pgl: ownedPGL,
    pool_id: pool.pool_id
  })

  // lazy load APR
  genAPR(pool);

  if ( thispagespools.length > 0 )  {
    genpool(thispagespools.pop())
  } else {
    hideLoading();
  }
}

const genAPR = async (pool) => {
  console.log('genAPR nickname:', pool.nickname)

  let results = await Promise.all([
    loadSingleSnowglobePool(window.app, {}, window.prices, {
      address: pool.stake,
      abi: PNG_STAKING_ABI,
      stakeTokenFunction: "stakingToken",
      rewardTokenFunction: "rewardsToken"
    })
  ])

  let apr = results[0]

  let token_apr = apr.yearlyAPR / 100;
  let token_annual_apy = 100 * (1 + token_apr / compounds_per_year) ** compounds_per_year - 100;
  $(`#${pool.pool_id}-apy`).html(`${token_annual_apy.toFixed(2)}%`)
  $(`#${pool.pool_id}-apr-daily`).html(`${apr.dailyAPR.toFixed(2)}%`);
  $(`#${pool.pool_id}-apr-weekly`).html(`${apr.weeklyAPR.toFixed(2)}%`);
  $(`#${pool.pool_id}-apr-yearly`).html(`${apr.yearlyAPR.toFixed(2)}%`);

}

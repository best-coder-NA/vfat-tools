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
async function main() {

  const TUNDRA_ABI = [{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"minToMint","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"inputs":[{"internalType":"contractIERC20[]","name":"_pooledTokens","type":"address[]"},{"internalType":"uint8[]","name":"decimals","type":"uint8[]"},{"internalType":"string","name":"lpTokenName","type":"string"},{"internalType":"string","name":"lpTokenSymbol","type":"string"},{"internalType":"uint256","name":"_a","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_adminFee","type":"uint256"},{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newAdminFee","type":"uint256"}],"name":"NewAdminFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newSwapFee","type":"uint256"}],"name":"NewSwapFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newWithdrawFee","type":"uint256"}],"name":"NewWithdrawFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"inputs":[{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"rampA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"initialTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"RampA","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"minAmounts","type":"uint256[]"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"maxBurnAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityImbalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"RemoveLiquidityImbalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"lpTokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boughtId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"}],"name":"RemoveLiquidityOne","type":"event"},{"inputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint8","name":"tokenIndex","type":"uint8"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityOneToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAdminFee","type":"uint256"}],"name":"setAdminFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newWithdrawFee","type":"uint256"}],"name":"setDefaultWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSwapFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stopRampA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"currentA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"StopRampA","type":"event"},{"inputs":[{"internalType":"uint8","name":"tokenIndexFrom","type":"uint8"},{"internalType":"uint8","name":"tokenIndexTo","type":"uint8"},{"internalType":"uint256","name":"dx","type":"uint256"},{"internalType":"uint256","name":"minDy","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensSold","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"soldId","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"boughtId","type":"uint128"}],"name":"TokenSwap","type":"event"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"transferAmount","type":"uint256"}],"name":"updateUserWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAdminFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"calculateCurrentWithdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calculateRemoveLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint8","name":"tokenIndex","type":"uint8"}],"name":"calculateRemoveLiquidityOneToken","outputs":[{"internalType":"uint256","name":"availableTokenAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"tokenIndexFrom","type":"uint8"},{"internalType":"uint8","name":"tokenIndexTo","type":"uint8"},{"internalType":"uint256","name":"dx","type":"uint256"}],"name":"calculateSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bool","name":"deposit","type":"bool"}],"name":"calculateTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAdminBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAPrecise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getDepositTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getToken","outputs":[{"internalType":"contractIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"getTokenIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVirtualPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapStorage","outputs":[{"internalType":"uint256","name":"initialA","type":"uint256"},{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"initialATime","type":"uint256"},{"internalType":"uint256","name":"futureATime","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"},{"internalType":"uint256","name":"adminFee","type":"uint256"},{"internalType":"uint256","name":"defaultWithdrawFee","type":"uint256"},{"internalType":"contractLPToken","name":"lpToken","type":"address"}],"stateMutability":"view","type":"function"}]
  const ICEQUEEN_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_snowball", "internalType": "contract Snowball" }, { "type": "address", "name": "_devfund", "internalType": "address" }, { "type": "address", "name": "_treasury", "internalType": "address" }, { "type": "uint256", "name": "_snowballPerBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_startBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_bonusEndBlock", "internalType": "uint256" }] }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "EmergencyWithdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "type": "address", "name": "previousOwner", "internalType": "address", "indexed": true }, { "type": "address", "name": "newOwner", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Recovered", "inputs": [{ "type": "address", "name": "token", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "BONUS_MULTIPLIER", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "add", "inputs": [{ "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "address", "name": "_lpToken", "internalType": "contract IERC20" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "bonusEndBlock", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "devFundDivRate", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "devfund", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "emergencyWithdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getMultiplier", "inputs": [{ "type": "uint256", "name": "_from", "internalType": "uint256" }, { "type": "uint256", "name": "_to", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "massUpdatePools", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "pendingSnowball", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "address", "name": "_user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "lpToken", "internalType": "contract IERC20" }, { "type": "uint256", "name": "allocPoint", "internalType": "uint256" }, { "type": "uint256", "name": "lastRewardBlock", "internalType": "uint256" }, { "type": "uint256", "name": "accSnowballPerShare", "internalType": "uint256" }], "name": "poolInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "poolLength", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "renounceOwnership", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "set", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setBonusEndBlock", "inputs": [{ "type": "uint256", "name": "_bonusEndBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setDevFundDivRate", "inputs": [{ "type": "uint256", "name": "_devFundDivRate", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setSnowballPerBlock", "inputs": [{ "type": "uint256", "name": "_snowballPerBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setTreasuryDivRate", "inputs": [{ "type": "uint256", "name": "_treasuryDivRate", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract Snowball" }], "name": "snowball", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "snowballPerBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "startBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalAllocPoint", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "transferOwnership", "inputs": [{ "type": "address", "name": "newOwner", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "treasury", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "treasuryDivRate", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateDevfund", "inputs": [{ "type": "address", "name": "_devfund", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updatePool", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateTreasury", "inputs": [{ "type": "address", "name": "_treasury", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }, { "type": "uint256", "name": "rewardDebt", "internalType": "uint256" }], "name": "userInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }]

  //FUJI ADDRESSES
  const TUNDRA_ADDRESS = "0x427BBe0E9D632b0285F046Ca36898D07F449452A"
  const STABLE_1_ADDRESS = "0xF7838d3fb0c8Ea840191a463551662c4064D3775"
  const STABLE_2_ADDRESS = "0xA79d0E1cD4E2482C7DEcCB50848d91B3daFE10F0"
  const STABLE_3_ADDRESS = "0xa17901A40Ec10a72840e1EaEa0Ea11B0Ad8a53D9"
  const S3D_ADDRESS = "0xE730AFB0C84416e33f17a6C781e46E59C6780CC4"

  // MAINNET ADDRESSES
  // const TUNDRA_ADDRESS = "0x6B41E5c07F2d382B921DE5C34ce8E2057d84C042"
  // const STABLE_1_ADDRESS = "0xde3A24028580884448a5397872046a019649b084"
  // const STABLE_2_ADDRESS = "0xaEb044650278731Ef3DC244692AB9F64C78FfaEA"
  // const STABLE_3_ADDRESS = "0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a"
  // const S3D_ADDRESS = "0xdE1A11C331a0E45B9BA8FeE04D4B51A745f1e4A4"

  const ICEQUEEN_ADDR = "0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375";

  const App = await init_ethers();
  const signer = App.provider.getSigner();

  $('#recent-transactions').html('Loading Transactions...');

  //functions
  const approveStable1 = async function () {
    return tundraContract_approve(TUNDRA_ABI, TUNDRA_ADDRESS, STABLE_1_ADDRESS, App)
  }
  const approveStable2 = async function () {
    return tundraContract_approve(TUNDRA_ABI, TUNDRA_ADDRESS, STABLE_2_ADDRESS, App)
  }
  const approveStable3 = async function () {
    return tundraContract_approve(TUNDRA_ABI, TUNDRA_ADDRESS, STABLE_3_ADDRESS, App)
  }
  const approveLP = async function () {
    return tundraContract_approve(TUNDRA_ABI, TUNDRA_ADDRESS, S3D_ADDRESS, App)
  }
  const revokeStable1 = async function () {
    return tundraContract_revoke(TUNDRA_ABI, TUNDRA_ADDRESS, STABLE_1_ADDRESS, App)
  }
  const revokeStable2 = async function () {
    return tundraContract_revoke(TUNDRA_ABI, TUNDRA_ADDRESS, STABLE_2_ADDRESS, App)
  }
  const revokeStable3 = async function () {
    return tundraContract_revoke(TUNDRA_ABI, TUNDRA_ADDRESS, STABLE_3_ADDRESS, App)
  }
  const revokeLP = async function () {
    return tundraContract_revoke(TUNDRA_ABI, TUNDRA_ADDRESS, S3D_ADDRESS, App)
  }
  const depositStables = async function () {
    return tundraContract_deposit(TUNDRA_ABI, TUNDRA_ADDRESS, STABLE_1_ADDRESS, STABLE_2_ADDRESS, STABLE_3_ADDRESS, App)
  }
  const withdrawLP = async function () {
    return tundraContract_withdraw(TUNDRA_ABI, TUNDRA_ADDRESS, S3D_ADDRESS, TUNDRA_ADDRESS, App)
  }
  // Tokens & contracts
  const STABLE_1_TOKEN = new ethers.Contract(STABLE_1_ADDRESS, ERC20_ABI, signer);
  const STABLE_2_TOKEN = new ethers.Contract(STABLE_2_ADDRESS, ERC20_ABI, signer);
  const STABLE_3_TOKEN = new ethers.Contract(STABLE_3_ADDRESS, ERC20_ABI, signer);
  const S3D_TOKEN = new ethers.Contract(S3D_ADDRESS, ERC20_ABI, signer);
  const TUNDRA_CONTRACT = new ethers.Contract(TUNDRA_ADDRESS, TUNDRA_ABI, signer);

  // User Balances
  const s1_balance = await STABLE_1_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const s2_balance = await STABLE_2_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const s3_balance = await STABLE_3_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const s1_balance_formatted = s1_balance/1e18 > .001 ? (s1_balance/1e18 - .001).toFixed(3) : 0;
  const s2_balance_formatted = s2_balance/1e18 > .001 ? (s2_balance/1e18 - .001).toFixed(3) : 0;
  const s3_balance_formatted = s3_balance/1e18 > .001 ? (s3_balance/1e18 - .001).toFixed(3) : 0;
  const S3D_balance = await S3D_TOKEN.balanceOf(App.YOUR_ADDRESS);
  // const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)
  // const stakedPool7 = await ICEQUEEN_CONTRACT.userInfo(7, App.YOUR_ADDRESS)
  $('#token_1_balance').html(`${s1_balance_formatted}`);
  $("#from_balance").html(s1_balance_formatted);
  $('#token_2_balance').html(`${s2_balance_formatted}`);
  $('#token_3_balance').html(`${s3_balance_formatted}`);
  $('#withdraw_balance').html(`${(S3D_balance/1e18).toFixed(3)}`);
  // $('#staked_balance').html(`${(stakedPool7.amount/1e18).toFixed(3)}`);

  // supply
  const s1_supply = await STABLE_1_TOKEN.balanceOf(TUNDRA_ADDRESS);
  const s2_supply = await STABLE_2_TOKEN.balanceOf(TUNDRA_ADDRESS);
  const s3_supply = await STABLE_3_TOKEN.balanceOf(TUNDRA_ADDRESS);
  const combined_supply = s1_supply / 1e18 + s2_supply / 1e18 + s3_supply / 1e18;
  const s1_supply_percentage = (s1_supply / 1e18 / combined_supply * 100) || 0;
  const s2_supply_percentage = (s2_supply / 1e18 / combined_supply * 100) || 0;
  const s3_supply_percentage = (s3_supply / 1e18 / combined_supply * 100) || 0;
  const S3D_supply = await S3D_TOKEN.totalSupply();
  const user_percentage = ((S3D_balance / 1e18) / (S3D_supply / 1e18) * 100) || 0;
  const S3D_ratio = combined_supply / (S3D_supply / 1e18);
  console.log("S3D_ratio:", S3D_ratio);

  // const prices = await getAvaxPrices();
  // const snobPrice = prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'] ? prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'].usd : 0;
  // const totalStakedS3D = await S3D_TOKEN.balanceOf(ICEQUEEN_ADDR)
  // const pool7tvl = totalStakedS3D / 1e18;
  // const pool7weight = 0.20;
  // const snowballsPerBlock = await ICEQUEEN_CONTRACT.snowballPerBlock();
  // const pool7APR = snowballsPerBlock * pool7weight / 1e18 * 15000 * snobPrice / pool7tvl * 100 * 365;
  // $('#staking_apr1').html(pool7APR.toFixed(2));
  // $('#staking_apr2').html(pool7APR.toFixed(2));

  const t1_supply_display = new Intl.NumberFormat('en-US').format((s1_supply / 1e18).toFixed(2));
  const t2_supply_display = new Intl.NumberFormat('en-US').format((s2_supply / 1e18).toFixed(2));
  const t3_supply_display = new Intl.NumberFormat('en-US').format((s3_supply / 1e18).toFixed(2));
  const combined_supply_display = new Intl.NumberFormat('en-US').format(combined_supply.toFixed(2));

  $("#pool_percent").html(`${user_percentage.toLocaleString()}%`);
  $("#t1_supply").html(`${t1_supply_display}`);
  $("#t2_supply").html(`${t2_supply_display}`);
  $("#t3_supply").html(`${t3_supply_display}`);
  $("#t1_supply_percentage").html(`${s1_supply_percentage.toLocaleString()}%`);
  $("#t2_supply_percentage").html(`${s2_supply_percentage.toLocaleString()}%`);
  $("#t3_supply_percentage").html(`${s3_supply_percentage.toLocaleString()}%`);
  $("#combined_supply").html(`$${combined_supply_display}`);
  console.log("sUSD Supply:", S3D_supply / 1e18);
  console.log("Tundra S1 Supply:", s1_supply / 1e18);
  console.log("Tundra S2 Supply:", s2_supply / 1e18);
  console.log("Tundra S3 Supply:", s3_supply / 1e18);
  console.log("Tundra Combined Supply:", combined_supply);
  console.log("user sUSD Supply:", S3D_balance / 1e18);
  console.log("user_percentage:", `${user_percentage}`);

  // Approvals
  const s1_allowance = await STABLE_1_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const s2_allowance = await STABLE_2_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const s3_allowance = await STABLE_3_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const S3D_allowance = await S3D_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  console.log("Token 1 allowance: ", s1_allowance / 1e18);
  console.log("Token 2 allowance: ", s2_allowance / 1e18);
  console.log("Token 3 allowance: ", s3_allowance / 1e18);
  console.log("S3D allowance: ", S3D_allowance / 1e18);

  // approvals
  if (s1_allowance == 0) {
    $("#approve_swap_btn_usdt").show();
    $("#token_1_approve").show();
    $("#token_1_approve").click(function(){
      approveStable1();
    });
    $("#approve_swap_btn_usdt").click(function(){
      approveStable1();
    });
  } else {
    $("#revoke_swap_btn_usdt").show();
    $("#token_1_revoke").show();
    $("#token_1_revoke").click(function() {
      revokeStable1();
    });
    $("#revoke_swap_btn_usdt").click(function() {
      revokeStable1();
    });
  }
  if (s2_allowance == 0) {
    $("#token_2_approve").show();
    $("#token_2_approve").click(function(){
      approveStable2();
    });
    $("#approve_swap_btn_busd").click(function(){
      approveStable2();
    });
  } else {
    $("#token_2_revoke").show();
    $("#token_2_revoke").click(function() {
      revokeStable2();
    });
    $("#revoke_swap_btn_busd").click(function(){
      revokeStable2();
    });
  }
  if (s3_allowance == 0) {
    $("#token_3_approve").show();
    $("#token_3_approve").click(function(){
      approveStable3();
    });
    $("#approve_swap_btn_dai").click(function(){
      approveStable3();
    });
  } else {
    $("#token_3_revoke").show();
    $("#token_3_revoke").click(function() {
      revokeStable3();
    });
    $("#revoke_swap_btn_dai").click(function(){
      revokeStable3();
    });
  }

  $("#deposit_btn").click(function(){
    loadDepositModal(TUNDRA_CONTRACT, App, S3D_ratio, STABLE_1_TOKEN, STABLE_2_TOKEN, STABLE_3_TOKEN, TUNDRA_ADDRESS);
    $("#deposit_confirm_btn").prop('disabled', false);
  });
  $("#deposit_confirm_btn").click(function(){
    depositStables();
  });
  $("#withdraw_open_btn").click(function() {
    loadWithdrawModal(TUNDRA_CONTRACT, S3D_TOKEN, App, true);
    $("#withdraw_confirm_btn").prop('disabled', false);
  });
  $("#withdraw_confirm_btn").click(function(){
    withdrawLP();
  });

  if (S3D_allowance == 0){
    $("#withdraw_approve_btn").show();
    $("#withdraw_approve_btn").click(function(){
      approveLP();
    });
  } else {
    $("#revoke_lp_btn").show();
    $("#revoke_lp_btn").click(function(){
      revokeLP();
    });
  }

  $("#from_usdt").click(function() {
    loadFrom(s1_balance_formatted, 'usdt', s1_allowance, TUNDRA_CONTRACT);
  });
  $("#from_busd").click(function() {
    loadFrom(s2_balance_formatted, 'busd', s2_allowance, TUNDRA_CONTRACT);
  });
  $("#from_dai").click(function() {
    loadFrom(s3_balance_formatted, 'dai', s3_allowance, TUNDRA_CONTRACT);
  });

  $("#to_usdt").click(function() {
    loadTo('usdt', TUNDRA_CONTRACT);
  });
  $("#to_busd").click(function() {
    loadTo('busd', TUNDRA_CONTRACT);
  });
  $("#to_dai").click(function() {
    loadTo('dai', TUNDRA_CONTRACT);
  });

  // set defaults
  $("#swap_input").data("from_token", 'usdt');
  $("#swap_input").data("to_token", 'busd');

  $("#swap_input").change(function() {
    let from_token = $("#swap_input").data("from_token");
    let to_token = $("#swap_input").data("to_token");
    updateSwapAmount(from_token, to_token, TUNDRA_CONTRACT);
  });

  $("#swap_input").keyup(function() {
    let from_token = $("#swap_input").data("from_token");
    let to_token = $("#swap_input").data("to_token");
    updateSwapAmount(from_token, to_token, TUNDRA_CONTRACT);
  });

  $("#swap_btn").click(function(){
    let from_token = $("#swap_input").data("from_token");
    let to_token = $("#swap_input").data("to_token");
    swapTokens(from_token, to_token, TUNDRA_CONTRACT, STABLE_1_TOKEN, STABLE_2_TOKEN, STABLE_3_TOKEN, TUNDRA_ADDRESS, App);
  });

  $("#withdraw_percentage, #radio-withdraw-combo, #radio-withdraw-usdt, #radio-withdraw-busd, #radio-withdraw-dai").change(function() {
    updateWithdrawAmount(TUNDRA_CONTRACT, S3D_TOKEN, App);
  });

  $("#swap_max").click(function(){
    let from_token = $("#swap_input").data("from_token");
    let to_token = $("#swap_input").data("to_token");
    switch(from_token) {
      case 'usdt':
        $("#swap_input").val(s1_balance_formatted);
        updateSwapAmount(from_token, to_token, TUNDRA_CONTRACT);
        break;
      case 'busd':
        $("#swap_input").val(s2_balance_formatted);
        updateSwapAmount(from_token, to_token, TUNDRA_CONTRACT);
        break;
      case 'dai':
        $("#swap_input").val(s3_balance_formatted);
        updateSwapAmount(from_token, to_token, TUNDRA_CONTRACT);
        break;
      default:
        break;
    }
  });
  $("#token_1_max").click(function(){
    $("#token_1_input").val(s1_balance_formatted);
  });
  $("#token_2_max").click(function(){
    $("#token_2_input").val(s2_balance_formatted);
  });
  $("#token_3_max").click(function(){
    $("#token_3_input").val(s3_balance_formatted);
  });

  $("#remove_liquidity_btn").click(function(){
    $("#add_liquidity_text").hide();
    $("#add_liquidity_card").hide();
    $("#remove_liquidity_btn").hide();

    $("#add_liquidity_btn").show();
    $("#remove_liquidity_text").show();
    $("#remove_liquidity_card").show();
  });

  $("#add_liquidity_btn").click(function(){
    $("#add_liquidity_text").show();
    $("#add_liquidity_card").show();
    $("#remove_liquidity_btn").show();

    $("#add_liquidity_btn").hide();
    $("#remove_liquidity_text").hide();
    $("#remove_liquidity_card").hide();
  });

  loadEvents(App, TUNDRA_CONTRACT);

  hideLoading();
}

const updateWithdrawAmount = async function(TUNDRA_CONTRACT, S3D_TOKEN, App){
  const withdrawPercentage = $("#withdraw_percentage").val();
  $("#withdraw_percentage_display").html(withdrawPercentage);
  const comboChecked = $("#radio-withdraw-combo").is(':checked');
  const usdtChecked = $("#radio-withdraw-usdt").is(':checked');
  const busdChecked = $("#radio-withdraw-busd").is(':checked');
  const daiChecked = $("#radio-withdraw-dai").is(':checked');
  console.log("withdrawPercentage:", withdrawPercentage);
  const S3D_balance = await S3D_TOKEN.balanceOf(App.YOUR_ADDRESS);
  console.log("S3D_balance:", S3D_balance);
  let calculatedWithdraw = S3D_balance.mul(withdrawPercentage * 100 || 0).div(100).div(100);

  if (comboChecked){
    const withdrawAmount = await TUNDRA_CONTRACT.calculateRemoveLiquidity(App.YOUR_ADDRESS, calculatedWithdraw);
    if (withdrawAmount && withdrawAmount.length == 3) {
      $("#token_1_withdraw_input").val((withdrawAmount[0] / 1e18).toFixed(2));
      $("#token_2_withdraw_input").val((withdrawAmount[1] / 1e18).toFixed(2));
      $("#token_3_withdraw_input").val((withdrawAmount[2] / 1e18).toFixed(2));
    }
  }
  if (usdtChecked){
    const withdrawAmount = await TUNDRA_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 0);
    if (withdrawAmount) {
      $("#token_1_withdraw_input").val((withdrawAmount / 1e18).toFixed(2));
      $("#token_2_withdraw_input").val(0);
      $("#token_3_withdraw_input").val(0);
    }
  }
  if (busdChecked){
    const withdrawAmount = await TUNDRA_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 1);
    if (withdrawAmount) {
      $("#token_1_withdraw_input").val(0);
      $("#token_2_withdraw_input").val((withdrawAmount / 1e18).toFixed(2));
      $("#token_3_withdraw_input").val(0);
    }
  }
  if (daiChecked){
    const withdrawAmount = await TUNDRA_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 2);
    if (withdrawAmount) {
      $("#token_1_withdraw_input").val(0);
      $("#token_2_withdraw_input").val(0);
      $("#token_3_withdraw_input").val((withdrawAmount / 1e18).toFixed(2));
    }
  }
}

const loadEvents = async function (App, TUNDRA_CONTRACT) {
  $('#recent-transactions').html('');
  try {
    let blockNumber = await App.provider.getBlockNumber();
    let events = [];
    let attempt = 0;
    while (events.length < 10 && attempt < 10) {
      let moreEvents = await TUNDRA_CONTRACT.queryFilter('*', blockNumber - 500, blockNumber);
      events = events.concat(moreEvents);
      blockNumber = blockNumber - 501;
      attempt += 1;
    }
    console.log(events);
    await Promise.all(events.map(async (event) => {
      let block = await event.getBlock();
      let timeStamp = new Date(block.timestamp * 1000).toLocaleTimeString();
      event.timestamp = timeStamp;
    }));
    events.sort((a, b) => b.blockNumber - a.blockNumber).forEach(event => {
      addEventToDom(event, App);
    })
  } catch {console.log('could not get events')}
}

const addEventToDom = async function (event, App) {
  console.log(`${event.blockNumber}: ${event.timestamp}`);
  let transactionUrl = `https://cchain.explorer.avax.network/tx/${event.transactionHash}/token-transfers`;
  let row1 = ``;

  switch(event.event) {
    case 'AddLiquidity':
    case 'RemoveLiquidity':
      let label = event.event == 'RemoveLiquidity' ? 'Remove' : 'Add';
      let tokenAmounts = event.args.tokenAmounts;
      let deposits = [];
      if (tokenAmounts[0] > 0) {
        let usdt = new Intl.NumberFormat('en-US').format((tokenAmounts[0] / 1e18).toFixed(2));
        deposits.push(`$${usdt} USDT`);
      }
      if (tokenAmounts[1] > 0) {
        let busd = new Intl.NumberFormat('en-US').format((tokenAmounts[1] / 1e18).toFixed(2));
        deposits.push(`$${busd} BUSD`);
      }
      if (tokenAmounts[2] > 0) {
        let dai = new Intl.NumberFormat('en-US').format((tokenAmounts[2] / 1e18).toFixed(2));
        deposits.push(`$${dai} DAI`);
      }
      let depositsDisplay = deposits.join(' + ');
      row1 = `<div class="mb-5"><a target="_blank" href="${transactionUrl}"><span class="font-weight-bold">${label}: </span>`
      row1 += `${depositsDisplay} - ${event.timestamp}</a></div>`;
      break;
    case 'RemoveLiquidityOne':
      let labelRemove = 'Remove';
      let tokenAmount = event.args.tokensBought;
      let tokenTypeId = event.args.boughtId;
      let tokenLabel = tokenTypeId == 0 ? 'USDT' : tokenTypeId == 1 ? 'BUSD' : 'DAI';
      let decimals = tokenTypeId ==  0 ? 1e18 : 1e18;
      row1 = `<div class="mb-5"><a target="_blank" href="${transactionUrl}"><span class="font-weight-bold">${labelRemove}: </span>`
      row1 += `$${(tokenAmount / decimals).toFixed(2)} ${tokenLabel} - ${event.timestamp}</a></div>`;
      break;
    case 'TokenSwap':
      let tokenBought = event.args.boughtId;
      let tokenSold = event.args.soldId;
      let boughtAmount = event.args.tokensBought;
      let soldAmount = event.args.tokensSold;
      let decimalsBought = tokenBought == 0 ? 1e18 : 1e18;
      let decimalsSold = tokenSold == 0 ? 1e18 : 1e18;
      let tokenBoughtLabel = tokenBought == 0 ? 'USDT' : tokenBought == 1 ? 'BUSD' : ' DAI';
      let tokenSoldLabel = tokenSold == 0 ? 'USDT' : tokenSold == 1 ? 'BUSD' : ' DAI';
      let boughtDisplay = new Intl.NumberFormat('en-US').format((boughtAmount / decimalsBought).toFixed(2));
      let soldDisplay = new Intl.NumberFormat('en-US').format((soldAmount / decimalsSold).toFixed(2));
      row1 = `<div class="mb-5"><a target="_blank" href="${transactionUrl}"><span class="font-weight-bold">Trade: </span>$${soldDisplay} ${tokenSoldLabel} for $${boughtDisplay} ${tokenBoughtLabel} - ${event.timestamp}</a></div>`;
      break;
    default:
      break;
  }
  $('#recent-transactions').append(row1);
}

const swapTokens = async function(from_token, to_token, TUNDRA_CONTRACT, STABLE_1_TOKEN, STABLE_2_TOKEN, STABLE_3_TOKEN, TUNDRA_ADDRESS, App){
  console.log("from: ", from_token);
  console.log("to: ", to_token);
  $("#swap_btn").prop('disabled', true);
  const swapAmount = $("#swap_input").val();
  let token1index = null;
  let token2index = null;
  let from_decimals = 15;
  let to_decimals = 1e18;
  let allowance = 0;

  switch(from_token) {
    case 'usdt':
      from_decimals = 15;
      allowance = await STABLE_1_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
      token1index = 0;
      break;
    case 'busd':
      allowance = await STABLE_2_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
      token1index = 1;
      break;
    case 'dai':
      allowance = await STABLE_3_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
      token1index = 2;
      break;
    default:
      token1index = null;
  }

  switch(to_token) {
    case 'usdt':
      to_decimals = 1e18;
      token2index = 0;
      break;
    case 'busd':
      token2index = 1;
      break;
    case 'dai':
      token2index = 2;
      break;
    default:
      token2index = null;
  }

  if (swapAmount && Number(swapAmount) > 0 && token1index != token2index && allowance > 0){
    const bn_amount = ethers.BigNumber.from(String(Math.round(swapAmount * 1000)) + "0".repeat(from_decimals));
    const calculatedAmount = await TUNDRA_CONTRACT.calculateSwap(token1index, token2index, bn_amount);
    const slippage = getSwapSlippage();
    const slippageMultiplier = 1000 - (slippage * 10);
    const minAmount = calculatedAmount.mul(slippageMultiplier).div(1000);
    const deadline = Date.now() + 180; //3 minutes
    console.log("bn amount:", bn_amount / 1e18);
    console.log("calculated amount:", calculatedAmount / to_decimals);
    console.log("minAmount:", calculatedAmount / to_decimals);
    let allow = Promise.resolve()
    showLoading()
    allow
      .then(async function () {
        TUNDRA_CONTRACT.swap(token1index, token2index, bn_amount, minAmount, deadline)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
              $("#swap_btn").prop('disabled', false);
              alert('Swap successful. Refresh page to see balance.');
            })
          })
          .catch(function () {
            hideLoading()
            $("#swap_btn").prop('disabled', false);
            alert('Could not swap. Check approvals, slippage, and input amount');
          })
      })
      .catch(function () {
        hideLoading()
        $("#swap_btn").prop('disabled', false);
        alert('Could not swap. Check approvals, slippage, and input amount');
      })

  } else {
    $("#swap_btn").prop('disabled', false);
    alert('Could not swap. Check approvals and input amount');
  }
}

const updateSwapAmount = async function(from_token, to_token, TUNDRA_CONTRACT){
  console.log("from: ", from_token);
  console.log("to: ", to_token);
  const swapAmount = $("#swap_input").val();
  let token1index = null;
  let token2index = null;
  let from_decimals = 15;
  let to_decimals = 1e18;

  switch(from_token) {
    case 'usdt':
      from_decimals = 15;
      token1index = 0;
      break;
    case 'busd':
      token1index = 1;
      break;
    case 'dai':
      token1index = 2;
      break;
    default:
      token1index = null;
  }

  switch(to_token) {
    case 'usdt':
      to_decimals = 1e18;
      token2index = 0;
      break;
    case 'busd':
      token2index = 1;
      break;
    case 'dai':
      token2index = 2;
      break;
    default:
      token2index = null;
  }

  if (swapAmount && Number(swapAmount) > 0 && token1index != token2index){
    const bn_amount = ethers.BigNumber.from(String(Math.round(swapAmount * 1000)) + "0".repeat(from_decimals));
    const calculatedAmount = await TUNDRA_CONTRACT.calculateSwap(token1index, token2index, bn_amount)
    console.log("calculated amount:", calculatedAmount / to_decimals);
    $("#swap_calculated").val((calculatedAmount / to_decimals).toFixed(8));
  } else {
    $("#swap_calculated").val(0);
  }
}
const loadTo = async function(token, TUNDRA_CONTRACT){
  $("#to_usdt_button").hide();
  $("#to_busd_button").hide();
  $("#to_dai_button").hide();
  $("#to_" + token + "_button").show();
  $("#swap_input").data("to_token", token);
  let from_token = $("#swap_input").data("from_token");
  updateSwapAmount(from_token, token, TUNDRA_CONTRACT);
  $("#from_balance").click(); //click something to hide menu
}
const loadFrom = async function(balance, token, allowance, TUNDRA_CONTRACT){
  $("#from_usdt_button").hide();
  $("#from_busd_button").hide();
  $("#from_dai_button").hide();
  $("#approve_swap_btn_usdt").hide();
  $("#revoke_swap_btn_usdt").hide();
  $("#approve_swap_btn_busd").hide();
  $("#revoke_swap_btn_busd").hide();
  $("#approve_swap_btn_dai").hide();
  $("#revoke_swap_btn_dai").hide();

  $("#from_balance").html(balance);
  $("#from_" + token + "_button").show();
  if (allowance > 0) {
    $("#revoke_swap_btn_" + token).show();
  } else {
    $("#approve_swap_btn_" + token).show();
  }
  $("#swap_input").data("from_token", token);
  let to_token = $("#swap_input").data("to_token");
  updateSwapAmount(token, to_token, TUNDRA_CONTRACT);
  $("#from_balance").click(); //click something to hide menu
}

const loadWithdrawModal = async function(TUNDRA_CONTRACT, S3D_TOKEN, App){
  $("#withdraw_confirm_btn").show();
  $("#withdraw_success").hide();

  const slippage = getSlippageWithdraw();
  $("#withdraw-slippage").html(slippage);

  const withdrawPercentage = $("#withdraw_percentage").val();
  const comboChecked = $("#radio-withdraw-combo").is(':checked');
  const usdtChecked = $("#radio-withdraw-usdt").is(':checked');
  const busdChecked = $("#radio-withdraw-busd").is(':checked');
  const daiChecked = $("#radio-withdraw-dai").is(':checked');
  console.log("withdrawPercentage:", withdrawPercentage);
  const S3D_balance = await S3D_TOKEN.balanceOf(App.YOUR_ADDRESS);
  console.log("S3D_balance:", S3D_balance);
  let calculatedWithdraw = S3D_balance.mul(withdrawPercentage * 100 || 0).div(100).div(100);
  if (comboChecked){
    const withdrawAmount = await TUNDRA_CONTRACT.calculateRemoveLiquidity(App.YOUR_ADDRESS, calculatedWithdraw);
    if (withdrawAmount && withdrawAmount.length == 3) {
      $("#token_1_withdraw_amt").html((withdrawAmount[0] / 1e18).toLocaleString());
      $("#token_2_withdraw_amt").html((withdrawAmount[1] / 1e18).toLocaleString());
      $("#token_3_withdraw_amt").html((withdrawAmount[2] / 1e18).toLocaleString());
    }
  }
  if (usdtChecked){
    const withdrawAmount = await TUNDRA_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 0);
    if (withdrawAmount) {
      $("#token_1_withdraw_amt").html((withdrawAmount / 1e18).toLocaleString());
      $("#token_2_withdraw_amt").html(0);
      $("#token_3_withdraw_amt").html(0);
    }
  }
  if (busdChecked){
    const withdrawAmount = await TUNDRA_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 1);
    if (withdrawAmount) {
      $("#token_1_withdraw_amt").html(0);
      $("#token_2_withdraw_amt").html((withdrawAmount / 1e18).toLocaleString());
      $("#token_3_withdraw_amt").html(0);
    }
  }
  if (daiChecked){
    const withdrawAmount = await TUNDRA_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 2);
    if (withdrawAmount) {
      $("#token_1_withdraw_amt").html(0);
      $("#token_2_withdraw_amt").html(0);
      $("#token_3_withdraw_amt").html((withdrawAmount / 1e18).toLocaleString());
    }
  }
}

const loadDepositModal = async function(TUNDRA_CONTRACT, App, S3D_ratio, STABLE_1_TOKEN, STABLE_2_TOKEN, STABLE_3_TOKEN, TUNDRA_ADDRESS){
  $("#deposit_confirm_btn").show();
  $("#deposit_success").hide();
  // inputs
  const s1_input = $("#token_1_input").val();
  const s2_input = $("#token_2_input").val();
  const s3_input = $("#token_3_input").val();
  $("#token_1_deposit_amt").html(s1_input || 0);
  $("#token_2_deposit_amt").html(s2_input || 0);
  $("#token_3_deposit_amt").html(s3_input || 0);
  $("#total_deposit_amt").html(Number(s1_input) + Number(s2_input) + Number(s3_input));
  const s1_amount = ethers.BigNumber.from(String(Math.round(s1_input * 1000)) + "0".repeat(15));
  const s2_amount = ethers.BigNumber.from(String(Math.round(s2_input * 1000)) + "0".repeat(15));
  const s3_amount = ethers.BigNumber.from(String(Math.round(s3_input * 1000)) + "0".repeat(15));

  console.log("S3D_ratio deposit modal:", S3D_ratio);

  // recieving
  const minToMint = await TUNDRA_CONTRACT.calculateTokenAmount(App.YOUR_ADDRESS, [s1_amount, s2_amount, s3_amount], true)
  $("#receiving_amt").html((minToMint / 1e18).toFixed(6));

  // premium & fee
  const totalAmount = Number(s1_input) + Number(s2_input) + Number(s3_input)
  const difference = (minToMint / 1e18 * (S3D_ratio || 1)) - totalAmount;
  const premium = (totalAmount > 0 ? difference / totalAmount : 0);
  console.log("Difference:", (difference).toFixed(8));
  console.log("Premium:", (premium * 100).toFixed(6));
  $("#premium_amt").html(`${(premium * 100).toFixed(6)}%`);
  $("#premium_row").removeClass(`text-success`);
  $("#premium_row").removeClass(`text-secondary`);
  if (premium > 0) {
    $("#premium_label").html(`Discount:`);
    $("#premium_row").addClass(`text-success`);
  } else if (premium < 0) {
    $("#premium_label").html(`Premium:`);
    $("#premium_row").addClass(`text-secondary`);
  }

  const slippage = getSlippage();
  $("#max_slippage").html(slippage);

  // allowances
  const s1_allowance = await STABLE_1_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const s2_allowance = await STABLE_2_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const s3_allowance = await STABLE_3_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const s1_valid = s1_amount > 0 ? s1_allowance > 0 : true;
  const s2_valid = s2_amount > 0 ? s2_allowance > 0 : true;
  const s3_valid = s3_amount > 0 ? s3_allowance > 0 : true;
  if (!s1_valid || !s2_valid || !s3_valid) {
    $("#deposit_approvals_needed").show();
    $("#deposit_confirm_btn").hide();
  }
}

function getSwapSlippage() {
  // slippage
  const radio1checked = $("#swap-radio-1").is(':checked');
  const radio2checked = $("#swap-radio-2").is(':checked');
  const radio3checked = $("#swap-radio-3").is(':checked');
  const customSlippage = $("#swap_custom_slippage").val();
  let slippage = 1;
  if (radio1checked) {
    slippage = 0.1;
  } else if (radio2checked) {
    slippage = 1;
  } else if (radio3checked) {
    slippage = Number(customSlippage);
  }
  return slippage;
}

function getSlippage() {
  // slippage
  const radio1checked = $("#radio-1").is(':checked');
  const radio2checked = $("#radio-2").is(':checked');
  const radio3checked = $("#radio-3").is(':checked');
  const customSlippage = $("#custom_slippage").val();
  let slippage = 1;
  if (radio1checked) {
    slippage = 0.1;
  } else if (radio2checked) {
    slippage = 1;
  } else if (radio3checked) {
    slippage = Number(customSlippage);
  }
  return slippage;
}

const tundraContract_revoke = async function (chefAbi, chefAddress, stakeTokenAddr, App) {
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
  allow = STAKING_TOKEN.approve(chefAddress, 0)
    .then(function (t) {
      return App.provider.waitForTransaction(t.hash).then(function () {
        hideLoading();
        alert('Spending revoked')
      })
    })
    .catch(function () {
      hideLoading();
      alert('Revoke failed')
    })
}

const tundraContract_approve = async function (chefAbi, chefAddress, stakeTokenAddr, App) {
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
    hideLoading();
  } else {
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash).then(function () {
          hideLoading();
          alert('Spending Approved')
        })
      })
      .catch(function () {
        hideLoading();
        alert('Approval failed')
      })
  }
}
const tundraContract_deposit = async function (chefAbi, chefAddress, token1, token2, token3, App) {
  $("#deposit_confirm_btn").prop('disabled', true);
  const signer = App.provider.getSigner()
  console.log(signer)

  //Tokens
  const STABLE_1_TOKEN = new ethers.Contract(token1, ERC20_ABI, signer)
  const STABLE_2_TOKEN = new ethers.Contract(token2, ERC20_ABI, signer)
  const STABLE_3_TOKEN = new ethers.Contract(token3, ERC20_ABI, signer)

  // Balances
  const s1_balance = await STABLE_1_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const s2_balance = await STABLE_2_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const s3_balance = await STABLE_3_TOKEN.balanceOf(App.YOUR_ADDRESS)

  // Approvals
  const s1_allowance = await STABLE_1_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  const s2_allowance = await STABLE_2_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  const s3_allowance = await STABLE_3_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  // inputs
  const s1_input = $("#token_1_input").val();
  const s2_input = $("#token_2_input").val();
  const s3_input = $("#token_3_input").val();
  //web3.utils.toBN(String(totalSupply) + "0".repeat(decimalPrecision)
  const s1_amount = ethers.BigNumber.from(String(Math.round(s1_input * 1000)) + "0".repeat(15));
  const s2_amount = ethers.BigNumber.from(String(Math.round(s2_input * 1000)) + "0".repeat(15));
  const s3_amount = ethers.BigNumber.from(String(Math.round(s3_input * 1000)) + "0".repeat(15));

  // validation
  const s1_valid = s1_input > 0 ? (s1_allowance > 0 && s1_balance / 1e18 >= s1_input): true;
  const s2_valid = s2_input > 0 ? (s2_allowance > 0 && s2_balance / 1e18 >= s2_input) : true;
  const s3_valid = s3_input > 0 ? (s3_allowance > 0 && s3_balance / 1e18 >= s3_input) : true;
  const total = Number(s1_input) + Number(s2_input) + Number(s3_input);

  const slippage = getSlippage();
  const slippageMultiplier = 1000 - (slippage * 10);

  const minToMint = await CHEF_CONTRACT.calculateTokenAmount(App.YOUR_ADDRESS, [s1_amount, s2_amount, s3_amount], true);
  const minToMintAmount = minToMint.mul(slippageMultiplier).div(1000);
  const deadline = Date.now() + 180; //3 minutes

  console.log("minToMint: ", minToMint / 1e18);
  console.log("minToMintAmount: ", minToMintAmount / 1e18);
  let allow = Promise.resolve()

  showLoading()
  if (!s1_valid || !s2_valid|| !s3_valid || total == 0) {
    alert('Please approve spending first or check your input amounts')
    hideLoading();
  } else {
    allow
      .then(async function () {
        CHEF_CONTRACT.addLiquidity([s1_amount, s2_amount, s3_amount], minToMintAmount, deadline)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
              $("#deposit_confirm_btn").hide();
              $("#deposit_success").show();
              alert('Tokens deposited. Refresh page to see balance.');
            })
          })
          .catch(function () {
            hideLoading()
            alert('Could not deposit. Check token amounts and slippage %.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Could not deposit. Check token amounts and slippage %.')
      })
  }
}
function getSlippageWithdraw() {
  // slippage
  const radio1checked = $("#radio-withdraw-slippage-1").is(':checked');
  const radio2checked = $("#radio-withdraw-slippage-2").is(':checked');
  const radio3checked = $("#radio-withdraw-slippage-3").is(':checked');
  const customSlippage = $("#custom_withdraw_slippage").val();
  let slippage = 1;
  if (radio1checked) {
    slippage = 0.1;
  } else if (radio2checked) {
    slippage = 1;
  } else if (radio3checked) {
    slippage = Number(customSlippage);
  }
  return slippage;
}
const tundraContract_withdraw = async function (chefAbi, chefAddress, S3D_token, tundra_address, App) {
  $("#withdraw_confirm_btn").prop('disabled', true);
  const signer = App.provider.getSigner()
  console.log(signer)

  //Tokens
  const S3D_TOKEN = new ethers.Contract(S3D_token, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  const S3D_allowance = await S3D_TOKEN.allowance(App.YOUR_ADDRESS, tundra_address)
  const withdrawPercentage = $("#withdraw_percentage").val();
  const comboChecked = $("#radio-withdraw-combo").is(':checked');
  const usdtChecked = $("#radio-withdraw-usdt").is(':checked');
  const busdChecked = $("#radio-withdraw-busd").is(':checked');
  const daiChecked = $("#radio-withdraw-dai").is(':checked');
  console.log("withdrawPercentage:", withdrawPercentage);
  const S3D_balance = await S3D_TOKEN.balanceOf(App.YOUR_ADDRESS);
  console.log("S3D_balance:", S3D_balance);

  const slippage = getSlippageWithdraw();
  const slippageMultiplier = 1000 - (slippage * 10);
  let calculatedWithdraw = S3D_balance.mul(withdrawPercentage * 100 || 0).div(100).div(100);

  let minToRemove = null;
  if (calculatedWithdraw == 0 || S3D_allowance == 0){
    alert('Check approvals and input amounts first');
  } else if (comboChecked){
    minToRemove = await CHEF_CONTRACT.calculateRemoveLiquidity(App.YOUR_ADDRESS, calculatedWithdraw);
    const minToRemoveAmount = [];
    if (minToRemove && minToRemove.length == 3) {
      console.log("minToRemove1:", minToRemove[0] / 1e18);
      console.log("minToRemove2:", minToRemove[1] / 1e18);
      console.log("minToRemove3:", minToRemove[2] / 1e18);
      minToRemoveAmount[0] = minToRemove[0].mul(slippageMultiplier).div(1000);
      minToRemoveAmount[1] = minToRemove[1].mul(slippageMultiplier).div(1000);
      minToRemoveAmount[2] = minToRemove[2].mul(slippageMultiplier).div(1000);
      console.log("minToRemoveAmount1:", minToRemoveAmount[0] / 1e18);
      console.log("minToRemoveAmount2:", minToRemoveAmount[1] / 1e18);
      console.log("minToRemoveAmount3:", minToRemoveAmount[2] / 1e18);
    }
    const deadline = Date.now() + 180; //3 minutes

    let allow = Promise.resolve()

    showLoading()
    if (S3D_allowance == 0) {
      alert("Please approve spending first")
      hideLoading();
    } else {
      allow
        .then(async function () {
          CHEF_CONTRACT.removeLiquidity(calculatedWithdraw, minToRemoveAmount, deadline)
            .then(function (t) {
              App.provider.waitForTransaction(t.hash).then(function () {
                $("#withdraw_confirm_btn").hide();
                $("#withdraw_success").show();
                hideLoading()
                alert('Tokens withdrawn. Refresh page to see balance.')
              })
            })
            .catch(function () {
              hideLoading()
              alert('Could not withdraw. Refresh page and try again.')
            })
        })
        .catch(function () {
          hideLoading()
          alert('Could not withdraw. Refresh page and try again.')
        })
    }
  } else {

    let calculatedWithdraw = S3D_balance.mul(withdrawPercentage * 100 || 0).div(100).div(100);
    let tokenIndex = null;
    if (usdtChecked){
      tokenIndex = 0;
      minToRemove = await CHEF_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 0);
    }
    if (busdChecked){
      tokenIndex = 1;
      minToRemove = await CHEF_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 1);
    }
    if (daiChecked){
      tokenIndex = 2;
      minToRemove = await CHEF_CONTRACT.calculateRemoveLiquidityOneToken(App.YOUR_ADDRESS, calculatedWithdraw, 2);
    }

    const deadline = Date.now() + 180; //3 minutes

    let allow = Promise.resolve()

    showLoading()
    if (S3D_allowance == 0) {
      alert("Please approve spending first")
      hideLoading();
    } else {
      allow
        .then(async function () {
          CHEF_CONTRACT.removeLiquidityOneToken(calculatedWithdraw, tokenIndex, minToRemove.mul(slippageMultiplier).div(1000), deadline)
            .then(function (t) {
              App.provider.waitForTransaction(t.hash).then(function () {
                $("#withdraw_confirm_btn").hide();
                $("#withdraw_success").show();
                hideLoading()
                alert('Tokens withdrawn. Refresh page to see balance.')
              })
            })
            .catch(function () {
              hideLoading()
              alert('Could not withdraw. Refresh page and try again.')
            })
        })
        .catch(function () {
          hideLoading()
          alert('Could not withdraw. Refresh page and try again.')
        })
    }
  }
}

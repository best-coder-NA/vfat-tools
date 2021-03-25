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
  //FUJI ADDRESSES
  const TUNDRA_ADDRESS = "0x427BBe0E9D632b0285F046Ca36898D07F449452A"
  const STABLE_1_ADDRESS = "0xF7838d3fb0c8Ea840191a463551662c4064D3775"
  const STABLE_2_ADDRESS = "0xA79d0E1cD4E2482C7DEcCB50848d91B3daFE10F0"
  const STABLE_3_ADDRESS = "0xa17901A40Ec10a72840e1EaEa0Ea11B0Ad8a53D9"
  const T3P_ADDRESS = "0xE730AFB0C84416e33f17a6C781e46E59C6780CC4"

  const App = await init_ethers();
  const signer = App.provider.getSigner()

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
    return tundraContract_approve(TUNDRA_ABI, TUNDRA_ADDRESS, T3P_ADDRESS, App)
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
    return tundraContract_revoke(TUNDRA_ABI, TUNDRA_ADDRESS, T3P_ADDRESS, App)
  }
  const depositStables = async function () {
    return tundraContract_deposit(TUNDRA_ABI, TUNDRA_ADDRESS, STABLE_1_ADDRESS, STABLE_2_ADDRESS, STABLE_3_ADDRESS, App)
  }
  const withdrawLP = async function () {
    return tundraContract_withdraw(TUNDRA_ABI, TUNDRA_ADDRESS, T3P_ADDRESS, TUNDRA_ADDRESS, App)
  }
  // Tokens & contracts
  const STABLE_1_TOKEN = new ethers.Contract(STABLE_1_ADDRESS, ERC20_ABI, signer);
  const STABLE_2_TOKEN = new ethers.Contract(STABLE_2_ADDRESS, ERC20_ABI, signer);
  const STABLE_3_TOKEN = new ethers.Contract(STABLE_3_ADDRESS, ERC20_ABI, signer);
  const T3P_TOKEN = new ethers.Contract(T3P_ADDRESS, ERC20_ABI, signer);

  // User Balances
  const s1_balance = await STABLE_1_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const s2_balance = await STABLE_2_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const s3_balance = await STABLE_3_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const t3p_balance = await T3P_TOKEN.balanceOf(App.YOUR_ADDRESS);
  $('#token_1_balance').html(`${(s1_balance/1e18).toLocaleString()}`);
  $('#token_2_balance').html(`${(s2_balance/1e18).toLocaleString()}`);
  $('#token_3_balance').html(`${(s3_balance/1e18).toLocaleString()}`);
  $('#withdraw_balance').html(`${(t3p_balance/1e18).toLocaleString()}`);

  // supply
  const s1_supply = await STABLE_1_TOKEN.balanceOf(TUNDRA_ADDRESS);
  const s2_supply = await STABLE_2_TOKEN.balanceOf(TUNDRA_ADDRESS);
  const s3_supply = await STABLE_3_TOKEN.balanceOf(TUNDRA_ADDRESS);
  const combined_supply = s1_supply / 1e18 + s2_supply / 1e18 + s3_supply / 1e18;
  const s1_supply_percentage = s1_supply / 1e18 / combined_supply * 100;
  const s2_supply_percentage = s2_supply / 1e18 / combined_supply * 100;
  const s3_supply_percentage = s3_supply / 1e18 / combined_supply * 100;
  const t3p_supply = await T3P_TOKEN.totalSupply();
  const user_percentage = (t3p_balance / 1e18) / (t3p_supply / 1e18) * 100;

  $("#pool_percent").html(`${user_percentage.toLocaleString()}%`);
  $("#t1_supply").html(`${(s1_supply / 1e18).toLocaleString()}`);
  $("#t2_supply").html(`${(s2_supply / 1e18).toLocaleString()}`);
  $("#t3_supply").html(`${(s3_supply / 1e18).toLocaleString()}`);
  $("#t1_supply_percentage").html(`${s1_supply_percentage.toLocaleString()}%`);
  $("#t2_supply_percentage").html(`${s2_supply_percentage.toLocaleString()}%`);
  $("#t3_supply_percentage").html(`${s3_supply_percentage.toLocaleString()}%`);
  $("#combined_supply").html(`$${combined_supply.toLocaleString()}`);
  console.log("sUSD Supply:", t3p_supply / 1e18);
  console.log("Tundra S1 Supply:", s1_supply / 1e18);
  console.log("Tundra S2 Supply:", s2_supply / 1e18);
  console.log("Tundra S3 Supply:", s3_supply / 1e18);
  console.log("Tundra Combined Supply:", combined_supply);
  console.log("user sUSD Supply:", t3p_balance / 1e18);
  console.log("user_percentage:", `${user_percentage}`);

  // Approvals
  const s1_allowance = await STABLE_1_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const s2_allowance = await STABLE_2_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const s3_allowance = await STABLE_3_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  const t3p_allowance = await T3P_TOKEN.allowance(App.YOUR_ADDRESS, TUNDRA_ADDRESS)
  console.log("Token 1 allowance: ", s1_allowance / 1e18);
  console.log("Token 2 allowance: ", s2_allowance / 1e18);
  console.log("Token 3 allowance: ", s3_allowance / 1e18);
  console.log("T3P allowance: ", t3p_allowance / 1e18);
  // approvals
  if (s1_allowance == 0) {
    $("#token_1_approve").show();
    $("#token_1_approve").click(function(){
      approveStable1();
    });
  } else {
    $("#token_1_revoke").show();
    $("#token_1_revoke").click(function() {
      revokeStable1();
    });
  }
  if (s2_allowance == 0) {
    $("#token_2_approve").show();
    $("#token_2_approve").click(function(){
      approveStable2();
    });
  } else {
    $("#token_2_revoke").show();
    $("#token_2_revoke").click(function() {
      revokeStable2();
    });
  }
  if (s3_allowance == 0) {
    $("#token_3_approve").show();
    $("#token_3_approve").click(function(){
      approveStable3();
    });
  } else {
    $("#token_3_revoke").show();
    $("#token_3_revoke").click(function() {
      revokeStable3();
    });
  }

  if ((s1_balance + s2_balance + s3_balance) > 0){
    $("#deposit_btn").click(function(){
      depositStables();
    });
  } else {
    $("#deposit_btn").hide();
  }

  if (t3p_balance > 0 ){
    if (t3p_allowance == 0){
      $("#approve_lp_btn").show();
      $("#approve_lp_btn").click(function(){
        approveLP();
      });
    } else {
      $("#revoke_lp_btn").show();
      $("#revoke_lp_btn").click(function(){
        revokeLP();
      });
    }
    $("#withdraw_btn").click(function(){
      withdrawLP();
    });
  } else {
    $("#withdraw_btn").hide();
  }

  hideLoading();
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
  const s1_amount = ethers.BigNumber.from(String(Math.round(s1_input)) + "0".repeat(18));
  const s2_amount = ethers.BigNumber.from(String(Math.round(s2_input)) + "0".repeat(18));
  const s3_amount = ethers.BigNumber.from(String(Math.round(s3_input)) + "0".repeat(18));

  // validation
  const s1_valid = s1_input > 0 ? (s1_allowance > 0 && s1_balance / 1e18 >= s1_input): true;
  const s2_valid = s2_input > 0 ? (s2_allowance > 0 && s2_balance / 1e18 >= s2_input) : true;
  const s3_valid = s3_input > 0 ? (s3_allowance > 0 && s3_balance / 1e18 >= s3_input) : true;
  const total = s1_input + s2_input + s3_input;

  const minToMint = await CHEF_CONTRACT.calculateTokenAmount(App.YOUR_ADDRESS, [s1_amount, s2_amount, s3_amount], true)
  const minToMintAmount = ethers.BigNumber.from(String(Math.round(minToMint / 1e18 * 0.9)) + "0".repeat(18))
  const deadline = Date.now() + 180; //3 minutes

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
  }
}

const tundraContract_withdraw = async function (chefAbi, chefAddress, t3p_token, tundra_address, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  //Tokens
  const T3P_TOKEN = new ethers.Contract(t3p_token, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  const t3p_balance = await T3P_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const t3p_allowance = await T3P_TOKEN.allowance(App.YOUR_ADDRESS, tundra_address)


  const minToRemove = await CHEF_CONTRACT.calculateRemoveLiquidity(App.YOUR_ADDRESS, t3p_balance)
  //const minToMintAmount = ethers.BigNumber.from(String(Math.round(minToMint / 1e18 * 0.95)) + "0".repeat(18))
  const deadline = Date.now() + 180; //3 minutes

  let allow = Promise.resolve()

  showLoading()
  if (t3p_allowance == 0) {
    alert("Please approve spending first")
    hideLoading();
  } else {
    allow
      .then(async function () {
        CHEF_CONTRACT.removeLiquidity(t3p_balance, minToRemove, deadline)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
              alert('Tokens withdrawn. Refresh page to see balance.')
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

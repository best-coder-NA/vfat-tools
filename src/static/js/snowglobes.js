/*!
* YieldFarming
* Boilerplate for a Static website using EJS and SASS
* https://yieldfarming.info
* @author Jongseung Lim -- https://yieldfarming.info
* Copyright 2021. MIT Licensed.
*/

$(function() {
	consoleInit();
    start(main);
  });
  async function main() {
    const App = await init_ethers();

    //ABIs
  	const SNOWGLOBE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_governance","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"address","name":"_controller","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"available","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"controller","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"harvest","inputs":[{"type":"address","name":"reserve","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"max","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"min","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setController","inputs":[{"type":"address","name":"_controller","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMin","inputs":[{"type":"uint256","name":"_min","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimelock","inputs":[{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"timelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"token","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_shares","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  	const ICEQUEEN_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_snowball","internalType":"contract Snowball"},{"type":"address","name":"_devfund","internalType":"address"},{"type":"address","name":"_treasury","internalType":"address"},{"type":"uint256","name":"_snowballPerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"},{"type":"uint256","name":"_bonusEndBlock","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"bonusEndBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"devFundDivRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devfund","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingSnowball","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accSnowballPerShare","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBonusEndBlock","inputs":[{"type":"uint256","name":"_bonusEndBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDevFundDivRate","inputs":[{"type":"uint256","name":"_devFundDivRate","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setSnowballPerBlock","inputs":[{"type":"uint256","name":"_snowballPerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTreasuryDivRate","inputs":[{"type":"uint256","name":"_treasuryDivRate","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract Snowball"}],"name":"snowball","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"snowballPerBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"treasury","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"treasuryDivRate","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDevfund","inputs":[{"type":"address","name":"_devfund","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateTreasury","inputs":[{"type":"address","name":"_treasury","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]
  	const PGL_ABI = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Burn","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Mint","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Swap","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0In","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1In","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount0Out","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1Out","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Sync","inputs":[{"type":"uint112","name":"reserve0","internalType":"uint112","indexed":false},{"type":"uint112","name":"reserve1","internalType":"uint112","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_SEPARATOR","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MINIMUM_LIQUIDITY","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"amount0","internalType":"uint256"},{"type":"uint256","name":"amount1","internalType":"uint256"}],"name":"burn","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint112","name":"_reserve0","internalType":"uint112"},{"type":"uint112","name":"_reserve1","internalType":"uint112"},{"type":"uint32","name":"_blockTimestampLast","internalType":"uint32"}],"name":"getReserves","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_token0","internalType":"address"},{"type":"address","name":"_token1","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"kLast","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"mint","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"price0CumulativeLast","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"price1CumulativeLast","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"skim","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"swap","inputs":[{"type":"uint256","name":"amount0Out","internalType":"uint256"},{"type":"uint256","name":"amount1Out","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"bytes","name":"data","internalType":"bytes"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"sync","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token0","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token1","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false}]
	const PNG_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  	//contracts
    const SNOWGLOBE_SUSHI_ADDR = "0x751089F1bf31B13Fa0F0537ae78108088a2253BF";
    const SNOWGLOBE_PNG_ADDR = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
    const SNOWGLOBE_ETH_ADDR = "0x586554828eE99811A8ef75029351179949762c26";
    const SNOWGLOBE_LINK_ADDR = "0x00933c16e06b1d15958317C2793BC54394Ae356C";
    const ICEQUEEN_ADDR = "0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375";

    //pangolin pairs
    const SUSHI_AVAX_ADDR = "0xd8B262C0676E13100B33590F10564b46eeF652AD";
    const SNOB_AVAX_ADDR = "0xa1c2c3b6b120cbd4cec7d2371ffd4a931a134a32";
    const PNG_AVAX_ADDR = "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367";
    const ETH_AVAX_ADDR = "0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65";
	const LINK_AVAX_ADDR = "0xbbc7fff833d27264aac8806389e02f717a5506c9";

    //tokens
    const SPGL_SUSHI_ADDRESS = "0x751089f1bf31b13fa0f0537ae78108088a2253bf";
    const SPGL_PNG_ADDRESS = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
    const SPGL_ETH_ADDRESS = "0x586554828eE99811A8ef75029351179949762c26";
    const SPGL_LINK_ADDRESS = "0x00933c16e06b1d15958317C2793BC54394Ae356C";
    const SNOB_ADDRESS = "0xc38f41a296a4493ff429f1238e030924a1542e50";

    //LP URLs
    const SUSHI_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc";
    const SNOB_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xc38f41a296a4493ff429f1238e030924a1542e50";
    const PNG_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x60781c2586d68229fde47564546784ab3faca982";
    const ETH_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15";
    const LINK_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/avax/0xb3fe5374f67d7a22886a0ee082b2e2f9d2651651";

    // TVL URLS
    const SUSHI_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x14ec55f8B4642111A5aF4f5ddc56B7bE867eB6cC"
    const SNOB_AVAX_TVL = "https://info.pangolin.exchange/#/account/0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375"
    const PNG_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x6A803904b9eA0Fc982fBB077c7243c244Ae05a2d"
    const ETH_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x953853590b805A0E885A75A3C786D2aFfcEEA3Cf"
    const LINK_AVAX_TVL = "https://info.pangolin.exchange/#/account/0x974Ef0bDA58C81F3094e124f530eF34fe70dc103"

    // Last Harvest
    const ETH_AVAX_HARVEST = "3/18 4:46AM UTC - 189.15 PNG ($713.78)"
    const PNG_AVAX_HARVEST = "3/18 4:46AM UTC - 42.44 PNG ($160.29)"
    const SUSHI_AVAX_HARVEST = "3/18 4:46AM UTC - 137.75 PNG ($519.98)"
    const LINK_AVAX_HARVEST = "3/18 4:46AM UTC - 55.82 PNG ($210.84)"

    // Compounds Per Day
    const SUSHI_AVAX_COMPOUNDS = 6
    const PNG_AVAX_COMPOUNDS = 6
    const ETH_AVAX_COMPOUNDS = 6
    const LINK_AVAX_COMPOUNDS = 6

    // Gas
	// Claim: 0.1645 
	// Swap: 0.075221
	// Add Liquidity: 0.092299
	// Deposit into pool: 0.1645
	// Total: 0.49652 ($13.90)
    const GAS_PER_COMPOUND = 0.49652
    const AVAX_PRICE = 28

	const approveSUSHI = async function() {
		return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_SUSHI_ADDR, SUSHI_AVAX_ADDR, App)
	}
	const stakeSUSHI = async function() {
		return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_SUSHI_ADDR, 1, SUSHI_AVAX_ADDR, App)
	}
	const withdrawSUSHI = async function() {
		return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_SUSHI_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
	}
	const approvePNG = async function() {
		return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_PNG_ADDR, PNG_AVAX_ADDR, App)
	}
	const stakePNG = async function() {
		return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_PNG_ADDR, 1, PNG_AVAX_ADDR, App)
	}
	const withdrawPNG = async function() {
		return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_PNG_ADDR, 1, SPGL_PNG_ADDRESS, App)
	}
	const approveETH = async function() {
		return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_ETH_ADDR, ETH_AVAX_ADDR, App)
	}
	const stakeETH = async function() {
		return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_ETH_ADDR, 1, ETH_AVAX_ADDR, App)
	}
	const withdrawETH = async function() {
		return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_ETH_ADDR, 1, SPGL_ETH_ADDRESS, App)
	}
	const approveLINK = async function() {
		return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_LINK_ADDR, LINK_AVAX_ADDR, App)
	}
	const stakeLINK = async function() {
		return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_LINK_ADDR, 1, LINK_AVAX_ADDR, App)
	}
	const withdrawLINK = async function() {
		return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_LINK_ADDR, 1, SPGL_LINK_ADDRESS, App)
	}
	const approveSPGLSUSHI = async function() {
		return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_SUSHI_ADDRESS, App)
	}
	const stakeSPGLSUSHI = async function() {
		return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
	}
	const approveSPGLPNG = async function() {
		return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_PNG_ADDRESS, App)
	}
	const stakeSPGLPNG = async function() {
		return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SPGL_PNG_ADDRESS, App)
	}
	const approveSPGLETH = async function() {
		return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_ETH_ADDRESS, App)
	}
	const stakeSPGLETH = async function() {
		return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SPGL_ETH_ADDRESS, App)
	}
	const approveSNOB = async function() {
		return icequeenContract_approve(PGL_ABI, ICEQUEEN_ADDR, SNOB_AVAX_ADDR, App)
	}
	const stakeSNOB = async function() {
		return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
	}
	const claimPool1 = async function() {
	  	return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SNOB_AVAX_ADDR, App)
	}
	const claimPool2 = async function() {
	  	return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
	}
	const claimPool3 = async function() {
	  	return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SNOB_AVAX_ADDR, App)
	}
	const claimPool4 = async function() {
	  	return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SNOB_AVAX_ADDR, App)
	}

	const withdrawPool1 = async function() {
		return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
	}

	const withdrawPool2 = async function() {
		return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
	}

	const withdrawPool3 = async function() {
		return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SPGL_PNG_ADDRESS, App)
	}
	const withdrawPool4 = async function() {
		return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SPGL_ETH_ADDRESS, App)
	}


    const signer = App.provider.getSigner()

    //Tokens
    const SUSHI_AVAX_TOKEN = new ethers.Contract(SUSHI_AVAX_ADDR, ERC20_ABI, signer)
    const PNG_AVAX_TOKEN = new ethers.Contract(PNG_AVAX_ADDR, ERC20_ABI, signer)
    const ETH_AVAX_TOKEN = new ethers.Contract(ETH_AVAX_ADDR, ERC20_ABI, signer)
    const SNOB_AVAX_TOKEN = new ethers.Contract(SNOB_AVAX_ADDR, ERC20_ABI, signer)
    const LINK_AVAX_TOKEN = new ethers.Contract(LINK_AVAX_ADDR, ERC20_ABI, signer)

    const SPGL_SUSHI_TOKEN = new ethers.Contract(SPGL_SUSHI_ADDRESS, ERC20_ABI, signer)
    const SPGL_PNG_TOKEN = new ethers.Contract(SPGL_PNG_ADDRESS, ERC20_ABI, signer)
    const SPGL_ETH_TOKEN = new ethers.Contract(SPGL_ETH_ADDRESS, ERC20_ABI, signer)
    const SPGL_LINK_TOKEN = new ethers.Contract(SPGL_LINK_ADDRESS, ERC20_ABI, signer)

    const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)

    //Contracts
    const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)

    // wallet info
	const snobTotalSupply = await SNOB_TOKEN.totalSupply()
    const pendingSNOBTokensPool1 = await ICEQUEEN_CONTRACT.pendingSnowball(1, App.YOUR_ADDRESS)
    const pendingSNOBTokensPool2 = await ICEQUEEN_CONTRACT.pendingSnowball(2, App.YOUR_ADDRESS)
    const pendingSNOBTokensPool3 = await ICEQUEEN_CONTRACT.pendingSnowball(3, App.YOUR_ADDRESS)
    const pendingSNOBTokensPool4 = await ICEQUEEN_CONTRACT.pendingSnowball(4, App.YOUR_ADDRESS)
	const claimableSnowballs = pendingSNOBTokensPool1 / 1e18 + pendingSNOBTokensPool2 /  1e18 + pendingSNOBTokensPool3 / 1e18 + pendingSNOBTokensPool4 / 1e18
    const currentSNOBTokens = await SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const snowballMultiplier = await ICEQUEEN_CONTRACT.BONUS_MULTIPLIER()
    const blockRate = await ICEQUEEN_CONTRACT.snowballPerBlock()
    const snowballsPerBlock = snowballMultiplier * blockRate
    const blockNumber = await App.provider.getBlockNumber()
    const prices = await getAvaxPrices();
    const snobPrice = prices['0xc38f41a296a4493ff429f1238e030924a1542e50'].usd

	//total supply
	_print(`Circulating Snowball supply: ${(snobTotalSupply/ 1e18).toFixed()}`)
	_print(`Max Snowball supply: 18000000`)
	_print(`Snowballs per block: ${snowballsPerBlock / 1e18}`)
	_print(`Snowballs per day: ${snowballsPerBlock / 1e18 * 15000}`)
	_print(`Distribution blocks (current/ending): ${blockNumber}/1443700`)
	_print(`Estimated blocks per day: 15000 \n`)


	// balance
	_print(`<b>Wallet ❄️</b>`)
	_print(`Address: ${App.YOUR_ADDRESS}`);
	_print(`Snowballs: ${currentSNOBTokens / 1e18}`)
	_print(`Pending Snowballs: ${claimableSnowballs}`)
	_print(`Total (wallet + pending): ${currentSNOBTokens / 1e18 + claimableSnowballs}`)
	_print(`SNOB price: <a href='https://www.coingecko.com/en/coins/snowball-token' target='_blank'>$${snobPrice.toFixed(2)}</a>`)
	_print(`Total SNOB value: $${((currentSNOBTokens / 1e18 + claimableSnowballs) * snobPrice).toFixed(2)}\n\n`)


    //Balances

    const currentSUSHIAVAXTokens = await SUSHI_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const currentSPGLSUSHITokens = await SPGL_SUSHI_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const spglSushiDisplayAmt = currentSPGLSUSHITokens > 1000 ? currentSPGLSUSHITokens / 1e18: 0;

    const currentPNGAVAXTokens = await PNG_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const currentSPGLPNGTokens = await SPGL_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const spglPngDisplayAmt = currentSPGLPNGTokens > 1000 ? currentSPGLPNGTokens / 1e18 : 0;

    const currentETHAVAXTokens = await ETH_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const currentSPGLETHTokens = await SPGL_ETH_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const spglEthDisplayAmt = currentSPGLETHTokens > 1000 ? currentSPGLETHTokens / 1e18 : 0;

    const currentLINKAVAXTokens = await LINK_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const currentSPGLLINKTokens = await SPGL_LINK_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const spglLinkDisplayAmt = currentSPGLLINKTokens > 1000 ? currentSPGLLINKTokens / 1e18 : 0;

    const currentSNOBAVAXTokens = await SNOB_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const snobAvaxDisplayAmt = currentSNOBAVAXTokens > 1000 ? currentSNOBAVAXTokens / 1e18 : 0;

	//snowglobes
	_print(`<b>Snowglobes 🌐</b>`)
	_print(`Deposit LP tokens into Snowglobes for automatic compounding. Save on gas costs!`)
	_print(`Compound steps: Claim > Swap > Add Liquidity > Deposit\n`)
	_print(`Gas cost of one manual compound: ${GAS_PER_COMPOUND} AVAX`)
	_print(`Compounds per day/week/year: ${ETH_AVAX_COMPOUNDS}/${ETH_AVAX_COMPOUNDS*7}/${ETH_AVAX_COMPOUNDS*365} `)
	_print(`Gas saved per day/week/year: ${(GAS_PER_COMPOUND * ETH_AVAX_COMPOUNDS).toFixed(2)}/${(GAS_PER_COMPOUND * ETH_AVAX_COMPOUNDS * 7).toFixed(2)}/${(GAS_PER_COMPOUND * ETH_AVAX_COMPOUNDS * 365).toFixed(2)} AVAX\n`)

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

	// APY = P(1 + r/n)nt
	let compounds_per_year = ETH_AVAX_COMPOUNDS * 365
	let eth_r = eth_apr.yearlyAPR/100
	let eth_annual_apy = 100*(1 + eth_r/compounds_per_year)**compounds_per_year
	let png_r = png_apr.yearlyAPR/100
	let png_annual_apy = 100*(1 + png_r/compounds_per_year)**compounds_per_year
	let sushi_r = sushi_apr.yearlyAPR/100
	let sushi_annual_apy = 100*(1 + sushi_r/compounds_per_year)**compounds_per_year
	let link_r = link_apr.yearlyAPR/100
	let link_annual_apy = 100*(1 + link_r/compounds_per_year)**compounds_per_year

    //Contracts
    const LINK_CONTRACT = new ethers.Contract(SNOWGLOBE_LINK_ADDR, SNOWGLOBE_ABI, signer)
	const totalDepositedLINKAVAX = await LINK_CONTRACT.totalSupply()
    const userLinkDeposited = await LINK_CONTRACT.balanceOf(App.YOUR_ADDRESS)
	const userLinkPoolPercent = (userLinkDeposited / 1e18)/(totalDepositedLINKAVAX / 1e18)*100

	_print(`<a href='${LINK_AVAX_POOL_URL}' target='_blank'>AVAX-LINK Pangolin LP - New! 🌟</a>`)
	_print(`<a href='${LINK_AVAX_TVL}' target='_blank'>Total Value Locked</a>`)
    _print(`APR: Day ${link_apr.dailyAPR.toFixed(2)}% Week ${link_apr.weeklyAPR.toFixed(2)}% Year ${link_apr.yearlyAPR.toFixed(2)}%`);
    _print(`APY (compounding): ${link_annual_apy.toFixed(2)}%`);
	_print(`Last Harvest: ${LINK_AVAX_HARVEST}`)
	_print(`Total pool size: ${totalDepositedLINKAVAX / 1e18}`)
	_print(`Your % of pool: ${userLinkPoolPercent}`)
	_print(`PGL Available to deposit: ${currentLINKAVAXTokens / 1e18}`)
	_print(`sPGL Available to withdraw: ${spglLinkDisplayAmt}`)
	_print_link(`Approve`, approveLINK)
	_print_link(`Deposit`, stakeLINK)
	_print_link(`Withdraw\n`, withdrawLINK)
	_print(`<a href='${ETH_AVAX_POOL_URL}' target='_blank'>AVAX-ETH Pangolin LP</a>`)
    _print(`APR: Day ${eth_apr.dailyAPR.toFixed(2)}% Week ${eth_apr.weeklyAPR.toFixed(2)}% Year ${eth_apr.yearlyAPR.toFixed(2)}%`);
    _print(`APY (compounding): ${eth_annual_apy.toFixed(2)}%`);
	_print(`Last Harvest: ${ETH_AVAX_HARVEST}`)
	_print(`PGL Available to deposit: ${currentETHAVAXTokens / 1e18}`)
	_print(`sPGL Available to withdraw: ${spglEthDisplayAmt}`)
	_print_link(`Approve`, approveETH)
	_print_link(`Deposit`, stakeETH)
	_print_link(`Withdraw\n`, withdrawETH)
	_print(`<a href='${PNG_AVAX_POOL_URL}' target='_blank'>AVAX-PNG Pangolin LP</a>`)
    _print(`APR: Day ${png_apr.dailyAPR.toFixed(2)}% Week ${png_apr.weeklyAPR.toFixed(2)}% Year ${png_apr.yearlyAPR.toFixed(2)}%`);
    _print(`APY (compounding): ${png_annual_apy.toFixed(2)}%`);
	_print(`Last Harvest: ${PNG_AVAX_HARVEST} `)
	_print(`PGL Available to deposit: ${currentPNGAVAXTokens / 1e18}`)
	_print(`sPGL Available to withdraw: ${spglPngDisplayAmt}`)
	_print_link(`Approve`, approvePNG)
	_print_link(`Deposit`, stakePNG)
	_print_link(`Withdraw\n`, withdrawPNG)
	_print(`<a href='${SUSHI_AVAX_POOL_URL}' target='_blank'>AVAX-SUSHI Pangolin LP</a>`)
    _print(`APR: Day ${sushi_apr.dailyAPR.toFixed(2)}% Week ${sushi_apr.weeklyAPR.toFixed(2)}% Year ${sushi_apr.yearlyAPR.toFixed(2)}%`);
    _print(`APY (compounding): ${sushi_annual_apy.toFixed(2)}%`);
	_print(`Last Harvest: ${SUSHI_AVAX_HARVEST}`)
	_print(`PGL Available to deposit: ${currentSUSHIAVAXTokens / 1e18}`)
	_print(`sPGL Available to withdraw: ${spglSushiDisplayAmt}`)
	_print_link(`Approve`, approveSUSHI)
	_print_link(`Deposit`, stakeSUSHI)
	_print_link(`Withdraw`, withdrawSUSHI)
	_print(`\n`)

	_print(`<b>PGL vs sPGL</b>`)
	_print(`When you deposit PGL (Pangolin LP) tokens into a Snowglobe, you will receive sPGL (Snowglobe) tokens`)
	_print(`When you withdraw sPGL (Snowglobe) tokens, you will recieve PGL (Pangolin LP) tokens`)
	_print(`sPGL value grows as there are more harvests, which means 1 sPGL is worth more than 1 PGL`)
	_print(`The amount of PGL tokens withdrawn will be more than you deposited due to compounding from harvests`)

 //    const stakedPool1 = await ICEQUEEN_CONTRACT.userInfo(1, App.YOUR_ADDRESS)
 //    const stakedPool2 = await ICEQUEEN_CONTRACT.userInfo(2, App.YOUR_ADDRESS)
	// const stakedPool3 = await ICEQUEEN_CONTRACT.userInfo(3, App.YOUR_ADDRESS)
	// const stakedPool4 = await ICEQUEEN_CONTRACT.userInfo(4, App.YOUR_ADDRESS)

	// // Total staked in each pool
	// const totalStakedSPGLSUSHI = await SPGL_SUSHI_TOKEN.balanceOf(ICEQUEEN_ADDR)
 //    const totalStakedSPGLPNG = await SPGL_PNG_TOKEN.balanceOf(ICEQUEEN_ADDR)
 //    const totalStakedSPGLETH = await SPGL_ETH_TOKEN.balanceOf(ICEQUEEN_ADDR)
	// const totalStakedSNOBAVAX = await SNOB_AVAX_TOKEN.balanceOf(ICEQUEEN_ADDR)

	// const userPool4Percent = (stakedPool4.amount / 1e18)/(totalStakedSPGLETH / 1e18)*100
	// const userPool3Percent = (stakedPool3.amount / 1e18)/(totalStakedSPGLPNG / 1e18)*100
	// const userPool2Percent = (stakedPool2.amount / 1e18)/(totalStakedSNOBAVAX / 1e18)*100
	// const userPool1Percent = (stakedPool1.amount / 1e18)/(totalStakedSPGLSUSHI / 1e18)*100

	// const pool4weight = 0.125
	// const pool3weight = 0.25
	// const pool2weight = 0.5
	// const pool1weight = 0.125

	// //icequeen
	// _print(`<b>IceQueen 👸 - Governance </b>`)
	// _print(`Deposit Snowglobe tokens (sPGL) into IceQueen to receive governance tokens (SNOB)\n`)
	// _print(`<u>Pool 4 - ETH-AVAX Snowglobe (sPGL)</u>`)
	// _print(`<a href='${ETH_AVAX_TVL}' target='_blank'>Total Value Locked</a>`)
 //    _print(`SNOB allocation weight: ${pool4weight*100}%`)
	// _print(`Snowballs per block: ${snowballsPerBlock * pool4weight / 1e18}`)
 //    _print(`Total pool size: ${totalStakedSPGLETH / 1e18}`)
 //    _print(`Your % of pool: ${userPool4Percent}%`)
	// _print(`Your Snowballs per block: ${snowballsPerBlock * pool4weight * userPool4Percent / 100 / 1e18}`)
	// _print(`Estimated Snowballs per day*: ${snowballsPerBlock * pool4weight * userPool4Percent / 100 / 1e18 * 15000}`)
	// _print(`Estimated gain per day*: $${(snowballsPerBlock * pool4weight * userPool4Percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)}`)
	// _print(`Available to stake: ${spglEthDisplayAmt}`)
	// _print(`Available to unstake: ${stakedPool4.amount / 1e18}`)
	// _print(`Pending Snowballs: ${pendingSNOBTokensPool4 / 1e18}`)
	// _print_link(`Approve`, approveSPGLETH)
	// _print_link(`Stake`, stakeSPGLETH)
	// _print_link(`Unstake`, withdrawPool4)
	// _print_link(`Claim\n`, claimPool4)
	// _print(`<u>Pool 3 - PNG-AVAX Snowglobe (sPGL)</u>`)
 //    _print(`<a href='${PNG_AVAX_TVL}' target='_blank'>Total Value Locked</a>`)
 //    _print(`SNOB allocation weight: ${pool3weight*100}%`)
	// _print(`Snowballs per block: ${snowballsPerBlock * pool3weight / 1e18}`)
 //    _print(`Total pool size: ${totalStakedSPGLPNG / 1e18}`)
 //    _print(`Your % of pool: ${userPool3Percent}%`)
	// _print(`Your Snowballs per block: ${snowballsPerBlock * pool3weight * userPool3Percent / 100 / 1e18}`)
	// _print(`Estimated Snowballs per day*: ${snowballsPerBlock * pool3weight * userPool3Percent / 100 / 1e18 * 15000}`)
	// _print(`Estimated gain per day*: $${(snowballsPerBlock * pool3weight * userPool3Percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)}`)
	// _print(`Available to stake: ${spglPngDisplayAmt}`)
	// _print(`Available to unstake: ${stakedPool3.amount / 1e18}`)
	// _print(`Pending Snowballs: ${pendingSNOBTokensPool3 / 1e18}`)
	// _print_link(`Approve`, approveSPGLPNG)
	// _print_link(`Stake`, stakeSPGLPNG)
	// _print_link(`Unstake`, withdrawPool3)
	// _print_link(`Claim\n`, claimPool3)
	// _print(`<a href='${SNOB_AVAX_POOL_URL}' target='_blank'>Pool 2 - SNOB-AVAX Pangolin LP</a>`)
 //    _print(`<a href='${SNOB_AVAX_TVL}' target='_blank'>Total Value Locked</a>`)
 //    _print(`SNOB allocation weight: ${pool2weight*100}%`)
	// _print(`Snowballs per block: ${snowballsPerBlock * pool2weight / 1e18}`)
 //    _print(`Total pool size: ${totalStakedSNOBAVAX / 1e18}`)
 //    _print(`Your % of pool: ${userPool2Percent}%`)
	// _print(`Your Snowballs per block: ${snowballsPerBlock * pool2weight * userPool2Percent / 100 / 1e18}`)
	// _print(`Estimated Snowballs per day*: ${snowballsPerBlock * pool2weight * userPool2Percent / 100 / 1e18 * 15000}`)
	// _print(`Estimated gain per day*: $${(snowballsPerBlock * pool2weight * userPool2Percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)}`)
	// _print(`Available to stake: ${snobAvaxDisplayAmt}`)
	// _print(`Available to unstake: ${stakedPool2.amount / 1e18}`)
	// _print(`Pending Snowballs: ${pendingSNOBTokensPool2 / 1e18}`)
	// _print_link(`Approve`, approveSNOB)
	// _print_link(`Stake`, stakeSNOB)
	// _print_link(`Unstake`, withdrawPool2)
	// _print_link(`Claim\n`, claimPool2)
	// _print(`<u>Pool 1 - SUSHI-AVAX Snowglobe (sPGL)</u>`)
 //    _print(`<a href='${SUSHI_AVAX_TVL}' target='_blank'>Total Value Locked</a>`)
 //    _print(`SNOB allocation weight: ${pool1weight*100}%`)
	// _print(`Snowballs per block: ${snowballsPerBlock * pool1weight / 1e18}`)
 //    _print(`Total pool size: ${totalStakedSPGLSUSHI / 1e18}`)
 //    _print(`Your % of pool: ${userPool1Percent}%`)
	// _print(`Your Snowballs per block: ${snowballsPerBlock * pool1weight * userPool1Percent / 100 / 1e18}`)
	// _print(`Estimated Snowballs per day*: ${snowballsPerBlock * pool1weight * userPool1Percent / 100 / 1e18 * 15000}`)
	// _print(`Estimated gain per day*: $${(snowballsPerBlock * pool1weight * userPool1Percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)}`)
	// _print(`Available to stake: ${spglSushiDisplayAmt}`)
	// _print(`Available to unstake: ${stakedPool1.amount / 1e18}`)
	// _print(`Pending Snowballs: ${pendingSNOBTokensPool1 / 1e18}`)
	// _print_link(`Approve`, approveSPGLSUSHI)
	// _print_link(`Stake`, stakeSPGLSUSHI)
	// _print_link(`Unstake`, withdrawPool1)
	// _print_link(`Claim\n`, claimPool1)
	// _print(`*Estimates based on an average of 15,000 blocks per day\n`)


    hideLoading();
  }

const snowglobeContract_approve = async function(chefAbi, chefAddress, stakeTokenAddr, App) {
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
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Approval failed')
      })
  }
}

const icequeenContract_approve = async function(chefAbi, chefAddress, stakeTokenAddr, App) {
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
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Approval failed')
      })
  }

}

const snowglobeContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
      .then(async function() {
          CHEF_CONTRACT.depositAll()
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Tokens deposited. Refresh page to see balance.')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake')
  }
}

const snowglobeContract_withdraw = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
      .then(async function() {
          CHEF_CONTRACT.withdrawAll()
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Tokens Withdrawn. Refresh page to see balance.')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to withdraw')
  }
}


const icequeenContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
      .then(async function() {
          CHEF_CONTRACT.deposit(poolIndex, currentTokens)
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Tokens deposited. Refresh page to see balance.')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake')
  }
}

const icequeenContract_withdraw = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
      .then(async function() {
          ICEQUEEN_CONTRACT.withdraw(poolIndex, currentTokens)
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Tokens withdraw. Refresh page to see balance.')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to withdraw')
  }
}

const icequeenContract_claim = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
      .then(async function() {
          CHEF_CONTRACT.withdraw(poolIndex, 1)
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Rewards claimed. Refresh page for new balance')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  }
}

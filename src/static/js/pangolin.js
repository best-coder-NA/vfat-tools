$(function () {
  consoleInit();
  start(main);
});
async function main() {

  const App = await init_ethers();    

  const signer = App.provider.getSigner()  

  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)

  const CRYSTAL_CONTRACT = new ethers.Contract(CRYSTAL_VAULT_ADDRESS, CRYSTAL_VAULT_ABI, signer);
  const pendingGovReward = await CRYSTAL_CONTRACT.pendingReward(App.YOUR_ADDRESS);
  const assetsDeposited = await CRYSTAL_CONTRACT.accounts(App.YOUR_ADDRESS);

  const pendingSNOBTokensPool1 = await ICEQUEEN_CONTRACT.pendingSnowball(1, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool2 = await ICEQUEEN_CONTRACT.pendingSnowball(2, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool3 = await ICEQUEEN_CONTRACT.pendingSnowball(3, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool4 = await ICEQUEEN_CONTRACT.pendingSnowball(4, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool5 = await ICEQUEEN_CONTRACT.pendingSnowball(5, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool6 = await ICEQUEEN_CONTRACT.pendingSnowball(6, App.YOUR_ADDRESS)
  const pendingSNOBTokensPool7 = await ICEQUEEN_CONTRACT.pendingSnowball(7, App.YOUR_ADDRESS)

  const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)
  const blockRate = await ICEQUEEN_CONTRACT.snowballPerBlock()
  const snowballsPerBlock = blockRate
  const snobTotalSupply = await SNOB_TOKEN.totalSupply()
  const currentSNOBTokens = await SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const claimableSnowballs = pendingGovReward / 1e18 + pendingSNOBTokensPool1 / 1e18 + pendingSNOBTokensPool2 / 1e18 + pendingSNOBTokensPool3 / 1e18 + pendingSNOBTokensPool4 / 1e18 + pendingSNOBTokensPool5 / 1e18 + pendingSNOBTokensPool6 / 1e18 + pendingSNOBTokensPool7 / 1e18;
  const blockNumber = await App.provider.getBlockNumber()
  const currentBlock = await App.provider.getBlock(blockNumber);
  const yesterdayBlock = await App.provider.getBlock(blockNumber - 15000);
  const secondsInDay = 86400;
  const blocks24hrs = (secondsInDay / (currentBlock.timestamp - yesterdayBlock.timestamp)) * 15000;

  const prices = await getAvaxPrices();
  const snobPrice = prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'] ? prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'].usd : 0;
  
  layout_top($, currentSNOBTokens, claimableSnowballs, assetsDeposited, snowballsPerBlock, snobTotalSupply, snobPrice, blocks24hrs, blockNumber)

  let walletAddres = `${App.YOUR_ADDRESS}`;
  $('#wallet-address').html(`${walletAddres}`);


  const pools = PngStakingContracts.map(c => {
    return {
      address: c.stakingRewardAddress,
      abi: PNG_STAKING_ABI,
      stakeTokenFunction: "stakingToken",
      rewardTokenFunction: "rewardsToken"
    }
  })

  const tokens = {};

  let apr_array = await loadMultipleSnowglobePools(App, tokens, prices, pools)

  let res;
  try {
    res = await $.ajax({
      url: 'https://x-api.snowball.network/tvl/snob.json',
      type: 'GET',
    })
  } catch(e) {
    console.log('could not get tvl');
  }

  const doit = async (PGL_TOKEN, SPGL_TOKEN, apr, POOL_URL) => {
    const currentPGLTokens = await new ethers.Contract(PGL_TOKEN, ERC20_ABI, signer).balanceOf(App.YOUR_ADDRESS)
    const currentSPGLTokens = await new ethers.Contract(SPGL_TOKEN, ERC20_ABI, signer).balanceOf(App.YOUR_ADDRESS)
    const spglDisplayAmt = currentSPGLTokens > 1000 ? (currentSPGLTokens / 1e18).toFixed(4) : 0;
    let pair_tvl;
    let pair_tvl_display;
    res.pairs.forEach( p => {
      if (
        (p.token1.symbol.toLowerCase() == 'sushi' && p.token0.symbol.toLowerCase() == 'avax') ||
        (p.token0.symbol.toLowerCase() == 'sushi' && p.token1.symbol.toLowerCase() == 'avax')
       ) {
        pair_tvl = p.locked;
        pair_tvl_display = `$${new Intl.NumberFormat('en-US').format(pair_tvl)}`
      } 
    });    
    console.log(pair_tvl, pair_tvl_display)
    let token_apr = apr.yearlyAPR / 100
    let token_annual_apy = 100 * (1 + token_apr / compounds_per_year) ** compounds_per_year - 100
    let snowglobeContract = new ethers.Contract(SPGL_TOKEN, SNOWGLOBE_ABI, signer);
    let userDeposited = await snowglobeContract.balanceOf(App.YOUR_ADDRESS)
    let totalPoolPGL = await snowglobeContract.balance();
    let poolShareDisplay = null;
    let stakeDisplay = null;
    let withdrawDisplay = null;
    let userSPGL = userDeposited / 1e18;
    if (userSPGL > 0) {
      let totalSPGL = await snowglobeContract.totalSupply();
      ownedPGL = userSPGL * (totalPoolPGL / 1e18) / (totalSPGL / 1e18);
      const pglContract = new ethers.Contract(PGL_TOKEN, PGL_ABI, signer);
      let totalSupplyPGL = await pglContract.totalSupply();
      totalSupplyPGL = totalSupplyPGL / 1e18;
      const reserves = await pglContract.getReserves();
      const r0 = reserves._reserve0 / 1e18
      const r1 = reserves._reserve1 / 1e18
      let reserve0Owned = ownedPGL * (r0) / (totalSupplyPGL);
      let reserve1Owned = ownedPGL * (r1) / (totalSupplyPGL);
      const token0Address = await pglContract.token0();
      const token1Address = await pglContract.token1();
      const t0Price = prices[token0Address] ? prices[token0Address].usd : 0
      const t1Price = prices[token1Address] ? prices[token1Address].usd : 0
      const token0ValueUSDT = reserve0Owned * t0Price;
      const token1ValueUSDT = reserve1Owned * t1Price;
      const value = token0ValueUSDT + (token1ValueUSDT);
      withdrawDisplay = `<b>${userSPGL.toFixed(4)}</b> sPGL (<b>${ownedPGL.toFixed(4)}</b> PGL)`;
      poolShareDisplay = withdrawDisplay;
      stakeDisplay = `Your LP value is <b>${reserve0Owned.toFixed(3)}</b> ${TOKEN_NAMES[token0Address ]} / <b>${reserve1Owned.toFixed(3)}</b> ${TOKEN_NAMES[token1Address ]} ($<b>${value.toFixed(2)}</b>)**</b>`
    }    
    layout_pool($, {
      logo_token1: 'https://x-api.snowball.network/assets/avalanche-tokens/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7/logo.png',
      logo_token2: 'https://x-api.snowball.network/assets/avalanche-tokens/0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc/logo.png',
      url: POOL_URL,
      pool_name: 'AVAX-SUSHI Pangolin LP',
      apr: apr,
      apy: token_annual_apy,
      current_tokens: currentPGLTokens,
      display_amount: spglDisplayAmt,
      approve: 'approveSUSHI',
      stake: 'stakeSUSHI',
      withdraw: 'withdrawSUSHI',
      tvl_display: pair_tvl_display,
      pool_share_display: null,
      stake_display: stakeDisplay,
      total_pgl: null,
      withdraw_display: withdrawDisplay,
      owned_pgl: ownedPGL
    })  
  }
  
  let SUSHI_AVAX_ADDR = '0xd8B262C0676E13100B33590F10564b46eeF652AD';
  let SPGL_SUSHI_ADDRESS = '0x751089f1bf31b13fa0f0537ae78108088a2253bf';

  console.log('yo:', apr_array[2])

  doit(SUSHI_AVAX_ADDR, SPGL_SUSHI_ADDRESS, apr_array[2], 'POOL_URL')

  try {
    
  } catch (err) { console.log('error calculating PGL value:', err)}  

  const approveSUSHI = async function () {
    return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_ADDR, SUSHI_AVAX_ADDR, App)
  }
  const stakeSUSHI = async function () {
    return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_ADDR, 1, SUSHI_AVAX_ADDR, App)
  }
  const withdrawSUSHI = async function () {
    return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_ADDR, 1, SPGL_ADDRESS, App)
  }
  const approvePNG = async function () {
    return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_PNG_ADDR, PNG_AVAX_ADDR, App)
  }


}
$(function () {
  
  consoleInit();
  start(main);

});

const genpool = async(App, res, signer, PGL_TOKEN, SPGL_TOKEN, apr, POOL_URL) => {
  
  const currentPGLTokens = await new ethers.Contract(PGL_TOKEN, ERC20_ABI, signer).balanceOf(App.YOUR_ADDRESS)
  const currentSPGLTokens = await new ethers.Contract(SPGL_TOKEN, ERC20_ABI, signer).balanceOf(App.YOUR_ADDRESS)
  const spglDisplayAmt = currentSPGLTokens > 1000 ? (currentSPGLTokens / 1e18).toFixed(4) : 0;
  
  let pair_tvl = 0;
  let pair_tvl_display = 0;

  console.log('pairs tvl:', res.pairs.length);

  res.pairs.forEach( p => {
    if (
      (p.token1.symbol.toLowerCase() == 'png' && p.token0.symbol.toLowerCase() == 'eth') ||
      (p.token0.symbol.toLowerCase() == 'eth' && p.token1.symbol.toLowerCase() == 'png')
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
  console.log('step9:', userDeposited)
  let totalPoolPGL;
  try {
    totalPoolPGL = await snowglobeContract.balance();
  } catch (err) {
    console.log('ignore balance error')
    totalPoolPGL = 0
  }
  let poolShareDisplay = null;
  let stakeDisplay = null;
  let withdrawDisplay = null;
  let userSPGL = userDeposited / 1e18;
  let ownedPGL = 0
  console.log('userSPGL:', userSPGL)
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
  document.dispatchEvent(new CustomEvent('pool', { detail: {
      logo_token1: 'https://x-api.snowball.network/assets/avalanche-tokens/0x60781C2586D68229fde47564546784ab3fACA982/logo.png',
      logo_token2: 'https://x-api.snowball.network/assets/avalanche-tokens/0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15/logo.png',      
      url: POOL_URL,
      pool_name: 'PNG-SUSHI Pangolin LP',
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
    }
  }))
}

async function main() {

  const pools = PngStakingContracts.map(c => {
    return {
      address: c.stakingRewardAddress,
      abi: PNG_STAKING_ABI,
      stakeTokenFunction: "stakingToken",
      rewardTokenFunction: "rewardsToken"
    }
  })  

  return Promise.all([
    init_ethers(),
    getAvaxPrices(),
    $.getJSON('https://x-api.snowball.network/tvl/snob.json'),
  ]).then(results => {
    
    const App = results[0]  
    const prices = results[1]  
    const res = results[2]

    const signer = App.provider.getSigner()  
    
    dotop(App, signer, prices).then(res => { console.log('top done') })

    return loadMultipleSnowglobePools(App, tokens, prices, pools).then(apr_array => {
      
      let PNG_ETH_ADDR = '0x3815f36C3d60d658797958EAD8778f6500be16Df';
      let SPGL_PNG_ETH_ADDRESS = '0x3815f36C3d60d658797958EAD8778f6500be16Df';
    
      console.log('yo:', apr_array[2])
    
      genpool(App, res, signer, PNG_ETH_ADDR, SPGL_PNG_ETH_ADDRESS, apr_array[2], 'POOL_URL')
    })
  })
  
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
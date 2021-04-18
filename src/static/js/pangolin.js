$(function () {
  
  consoleInit();
  start(main);

});

const thispagespools = [
  { 
    strategy: '0x751089F1bf31B13Fa0F0537ae78108088a2253BF', 
    url: 'POOL_URL', 
    nickname: 'SUSHI_AVAX Pangolin LP',
    token0: '0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc',
    token1: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 
    pair: '0xd8b262c0676e13100b33590f10564b46eef652ad'    
  },
  { 
    strategy: '0x3815f36C3d60d658797958EAD8778f6500be16Df', 
    url: 'POOL_URL', 
    nickname: 'PNG-ETH Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    pair: '0x53b37b9a6631c462d74d65d61e1c056ea9daa637'
  }  
]

const genpool = async (app, res, signer, prices, apr, pool) => {

  const currentPGLTokens = await new ethers.Contract(pool.pair, ERC20_ABI, signer).balanceOf(app.YOUR_ADDRESS)
  const currentSPGLTokens = await new ethers.Contract(pool.strategy, ERC20_ABI, signer).balanceOf(app.YOUR_ADDRESS)
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

  let snowglobeContract = new ethers.Contract(pool.strategy, SNOWGLOBE_ABI, signer);
  let userDeposited = await snowglobeContract.balanceOf(app.YOUR_ADDRESS)

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

  if (userSPGL > 0) {
    let totalSPGL = await snowglobeContract.totalSupply();
    ownedPGL = userSPGL * (totalPoolPGL / 1e18) / (totalSPGL / 1e18);
    const pglContract = new ethers.Contract(pool.pair, PGL_ABI, signer);
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
    stakeDisplay = `Your LP value is <b>${reserve0Owned.toFixed(3)}</b> ${TOKEN_NAMES[token0Address]} / <b>${reserve1Owned.toFixed(3)}</b> ${TOKEN_NAMES[token1Address]} ($<b>${value.toFixed(2)}</b>)**</b>`
  }   
  document.dispatchEvent(new CustomEvent('pool', { detail: {
      logo_token1: `https://x-api.snowball.network/assets/avalanche-tokens/${pool.token0.toLowerCase()}/logo.png`,
      logo_token2: `https://x-api.snowball.network/assets/avalanche-tokens/${pool.token1.toLowerCase()}/logo.png`,      
      url: `https://app.pangolin.exchange/#/add/${pool.token0.toLowerCase()}/${pool.token1.toLowerCase()}`,
      pool_name: pool.nickname,
      apr: apr[2],  // placeholder
      apy: token_annual_apy,
      current_tokens: currentPGLTokens,
      display_amount: spglDisplayAmt,
      approve: async () => {
        return snowglobe_approve(PGL_ABI, pool.strategy, pool.pair, app)
      },
      stake: async () => {
        return snowglobe_stake(PGL_ABI, pool.strategy, pool.pair, app)
      },
      withdraw: async () => {
        return snowglobe_withdraw(PGL_ABI, pool.strategy, pool.pair, app)
      },
      tvl_display: pair_tvl_display,
      pool_share_display: null,
      stake_display: stakeDisplay,
      total_pgl: null,
      withdraw_display: withdrawDisplay,
      owned_pgl: ownedPGL
    }
  }))
  if ( thispagespools.length > 0 )  {
    genpool(app, res, signer, prices, apr, thispagespools.pop())
  } else {
    hideLoading();
  }
}

async function main() {  

  return Promise.all([
    init_ethers(),
    getAvaxPrices(),
    $.getJSON('https://x-api.snowball.network/tvl/snob.json'),
  ]).then(results => {
    
    const app = results[0]  
    const prices = results[1]  
    const res = results[2]

    const signer = app.provider.getSigner()  
    
    dotop(app, signer, prices).then(res => { console.log('top done') })

    return loadMultipleSnowglobePools(app, tokens, prices, pools).then(apr_array => {      
      genpool(app, res, signer, prices, apr_array, thispagespools.pop())
    })
  })

}
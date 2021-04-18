$(function () {
  
  consoleInit();
  start(main);

});

const thispagespools = [
  { 
    strategy: '0x234ed7c95Be12b2A0A43fF602e737225C83c2aa1', 
    nickname: 'PNG-YFI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x99519acb025a0e0d44c3875a4bbf03af65933627', 
    pair: '0xa465e953f9f2a00b2c1c5805560207b66a570093'    
  },
  { 
    strategy: '0x14F98349Af847AB472Eb7f7c705Dc4Bee530713B', 
    nickname: 'PNG-UNI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf39f9671906d8630812f9d9863bbef5d523c84ab', 
    pair: '0x874685bc6794c8b4befbd037147c2eef990761a9'    
  },  
  { 
    strategy: '0x3270b685A4a61252C6f30c1eBca9DbE622984e22', 
    nickname: 'PNG-AAVE Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x8ce2dee54bb9921a2ae0a63dbb2df8ed88b91dd9', 
    pair: '0x0025cebd8289bbe0a51a5c85464da68cbc2ec0c4'    
  },
  { 
    strategy: '0xcD651AD29835099334d312a9372418Eb2b70c72F', 
    nickname: 'PNG-DAI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xba7deebbfc5fa1100fb055a87773e1e99cd3507a', 
    pair: '0xd765b31399985f411a9667330764f62153b42c76'    
  },  
  { 
    strategy: '0x8eDd233546730C51a9d3840e954E5581Eb3fDAB1', 
    nickname: 'SUSHI-PNG Pangolin LP',
    token0: '0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf105fb50fc6ddd8a857bbecd296c8a630e8ca857'    
  },  
  { 
    strategy: '0x7987aDB3C789f071FeFC1BEb15Ce6DfDfbc75899', 
    nickname: 'PNG-USDT Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651', 
    pair: '0xE8AcF438B10A2C09f80aEf3Ef2858F8E758C98F9'    
  },
  { 
    strategy: '0x392c51Ab0AF3017E3e22713353eCF5B9d6fBDE84', 
    nickname: 'PNG-LINK Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651', 
    pair: '0x7313835802c6e8ca2a6327e6478747b71440f7a4'    
  },
  { 
    strategy: '0x763Aa38c837f61DD8429313933Cc47f24E881430', 
    nickname: 'WBTC-PNG Pangolin LP',
    token0: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf372ceae6b2f4a2c4a6c0550044a7eab914405ea'    
  },
  { 
    strategy: '0x3815f36C3d60d658797958EAD8778f6500be16Df', 
    nickname: 'PNG-ETH Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    pair: '0x53b37b9a6631c462d74d65d61e1c056ea9daa637'
  }  
]

const genpool = async (res, signer, prices, apr, pool) => {
  let app = window.app;

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
      approve: `snowglobe_approve('${pool.strategy}', '${pool.pair}')`,
      stake: `snowglobe_stake('${pool.strategy}', '${pool.pair}')`,
      withdraw: `snowglobe_withdraw('${pool.pair}', '${pool.pair}')`,
      tvl_display: pair_tvl_display,
      pool_share_display: null,
      stake_display: stakeDisplay,
      total_pgl: null,
      withdraw_display: withdrawDisplay,
      owned_pgl: ownedPGL
    }
  }))
  if ( thispagespools.length > 0 )  {
    genpool(res, signer, prices, apr, thispagespools.pop())
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
    
    window.app = results[0]  
    const prices = results[1]  
    const res = results[2]

    const signer = app.provider.getSigner()  
    
    dotop(signer, prices).then(res => { console.log('top done') })

    return loadMultipleSnowglobePools(window.app, tokens, prices, pools).then(apr_array => {      
      genpool(res, signer, prices, apr_array, thispagespools.pop())
    })
  })

}
$(function () {
  consoleInit();
  start(main);
});
async function main() {

  const App = await init_ethers();  

  const SUSHI_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc";

  const DAILY_COMPOUNDS = 6

  const signer = App.provider.getSigner()  

  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)

  const SUSHI_AVAX_TOKEN = new ethers.Contract(SUSHI_AVAX_ADDR, ERC20_ABI, signer)
  const SPGL_SUSHI_TOKEN = new ethers.Contract(SPGL_SUSHI_ADDRESS, ERC20_ABI, signer)

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

  const currentSUSHIAVAXTokens = await SUSHI_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentSPGLSUSHITokens = await SPGL_SUSHI_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const spglSushiDisplayAmt = currentSPGLSUSHITokens > 1000 ? (currentSPGLSUSHITokens / 1e18).toFixed(4) : 0;

  let res = null;
  let sushi_tvl_display = '';
  try {
    res = await $.ajax({
      url: 'https://x-api.snowball.network/tvl/snob.json',
      type: 'GET',
    })
    if (res && res.pairs) {
      res.pairs.forEach( p => {
        if (
          (p.token1.symbol.toLowerCase() == 'sushi' && p.token0.symbol.toLowerCase() == 'png') ||
          (p.token0.symbol.toLowerCase() == 'sushi' && p.token1.symbol.toLowerCase() == 'png')
         ) {
          sushi_tvl = p.locked;
          sushi_tvl_display = `$${new Intl.NumberFormat('en-US').format(p.locked)}`
        } 
      });
    }
  }
  catch(e) {
    console.log('could not get tvl');
  }

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
  const sushi_apr = apr_array[2]
  let compounds_per_year = DAILY_COMPOUNDS * 365
  
  let sushi_r = sushi_apr.yearlyAPR / 100
  let sushi_annual_apy = 100 * (1 + sushi_r / compounds_per_year) ** compounds_per_year - 100

  const snowglobeContract_sushi = new ethers.Contract(SNOWGLOBE_SUSHI_ADDR, SNOWGLOBE_ABI, signer);
  const userSushiDeposited = await snowglobeContract_sushi.balanceOf(App.YOUR_ADDRESS)
  let totalPoolPGL_sushi = await snowglobeContract_sushi.balance();

  let poolShareDisplay_sushi = null;
  let stakeDisplay_sushi = null;
  let withdrawDisplay_sushi = null;
  const userSPGL_sushi = userSushiDeposited / 1e18;
  let ownedPGL_sushi = 0;
  try {
    if (userSPGL_sushi > 0) {
      let totalSPGL_sushi = await snowglobeContract_sushi.totalSupply();
      ownedPGL_sushi = userSPGL_sushi * (totalPoolPGL_sushi / 1e18) / (totalSPGL_sushi / 1e18);
      const pglContract_sushi = new ethers.Contract(SUSHI_AVAX_ADDR, PGL_ABI, signer);
      let totalSupplyPGL_sushi = await pglContract_sushi.totalSupply();
      totalSupplyPGL_sushi = totalSupplyPGL_sushi / 1e18;
      const reserves_sushi = await pglContract_sushi.getReserves();
      const r0_sushi = reserves_sushi._reserve0 / 1e18
      const r1_sushi = reserves_sushi._reserve1 / 1e18
      let reserve0Owned_sushi = ownedPGL_sushi * (r0_sushi) / (totalSupplyPGL_sushi);
      let reserve1Owned_sushi = ownedPGL_sushi * (r1_sushi) / (totalSupplyPGL_sushi);
      const token0Address_sushi = await pglContract_sushi.token0();
      const token1Address_sushi = await pglContract_sushi.token1();
      const t0Price_sushi = prices[token0Address_sushi] ? prices[token0Address_sushi].usd : 0
      const t1Price_sushi = prices[token1Address_sushi] ? prices[token1Address_sushi].usd : 0
      const token0ValueUSDT_sushi = reserve0Owned_sushi * t0Price_sushi;
      const token1ValueUSDT_sushi = reserve1Owned_sushi * t1Price_sushi;
      const value_sushi = token0ValueUSDT_sushi + (token1ValueUSDT_sushi);
      withdrawDisplay_sushi = `<b>${userSPGL_sushi .toFixed(4)}</b> sPGL (<b>${ownedPGL_sushi .toFixed(4)}</b> PGL)`;
      poolShareDisplay_sushi = withdrawDisplay_sushi;
      stakeDisplay_sushi = `Your LP value is <b>${reserve0Owned_sushi .toFixed(3)}</b> ${TOKEN_NAMES[token0Address_sushi ]} / <b>${reserve1Owned_sushi .toFixed(3)}</b> ${TOKEN_NAMES[token1Address_sushi ]} ($<b>${value_sushi .toFixed(2)}</b>)**</b>`
    }
  } catch (err) { console.log('error calculating PGL value:', err)}  

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

  const layout_pool = function(options) {
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
      <span class="badge font-size-12 px-5 px-sm-10 mx-5">${options.apy.toFixed(2)}%</span>
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
      var approveBtn = `<button data-btn="${options.approve}" class="btn btn-sm mx-10 approveBtn"><ion-icon name="bag-check-outline"></ion-icon> Approve</button>`;
      var depositBtn = `<button data-btn="${options.stake}" class="btn btn-primary btn-sm depositBtn"><ion-icon name="download-outline"></ion-icon> Deposit </button>`;
    }
    var withdrawBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true;    
      var withdrawBtn = `<button data-btn="${options.withdraw}" class="btn btn-success btn-sm withdrawBtn"><ion-icon name="push-outline"></ion-icon> Withdraw </button>`;
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
              ${tvl}
              ${apy}
              <div class="col-sm-12 col-md-12 d-flex align-items-center mx-auto">
                  <div class="form-inline w-50 mx-auto">
                      <div class="form-group m-md-0">
                          <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                          <p class="m-0 font-size-12 font-weight-light">Weekly:</p>
                          <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                      </div>
                  </div>
                  <div class="form-inline w-50 mx-auto">
                      <div class="form-group m-md-0">
                      <p class="m-0 font-size-12 font-weight-semi-bold">${options.apr.dailyAPR.toFixed(2)}%</p>
                      <p class="m-0 font-size-12 font-weight-semi-bold">${options.apr.weeklyAPR.toFixed(2)}%</p>
                      <p class="m-0 font-size-12 font-weight-semi-bold">${options.apr.yearlyAPR.toFixed(2)}%</p>
                      </div>
                  </div>
              </div>
              ${poolSize}

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
                ${tvl}
                ${apy}
                <div class="col-sm-12 col-md-12 d-flex align-items-center mx-auto">
                    <div class="form-inline w-50 mx-auto">
                        <div class="form-group m-md-0">
                            <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                            <p class="m-0 font-size-12 font-weight-light">Weekly:</p>
                            <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                        </div>
                    </div>
                    <div class="form-inline w-50 mx-auto">
                        <div class="form-group m-md-0">
                        <p class="m-0 font-size-12 font-weight-semi-bold">${options.apr.dailyAPR.toFixed(2)}%</p>
                        <p class="m-0 font-size-12 font-weight-semi-bold">${options.apr.weeklyAPR.toFixed(2)}%</p>
                        <p class="m-0 font-size-12 font-weight-semi-bold">${options.apr.yearlyAPR.toFixed(2)}%</p>
                        </div>
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

  layout_pool({
    logo_token1: 'https://x-api.snowball.network/assets/avalanche-tokens/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7/logo.png',
    logo_token2: 'https://x-api.snowball.network/assets/avalanche-tokens/0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc/logo.png',
    url: SUSHI_AVAX_POOL_URL,
    pool_name: 'AVAX-SUSHI Pangolin LP',
    apr: sushi_apr,
    apy: sushi_annual_apy,
    current_tokens: currentSUSHIAVAXTokens,
    display_amount: spglSushiDisplayAmt,
    approve: 'approveSUSHI',
    stake: 'stakeSUSHI',
    withdraw: 'withdrawSUSHI',
    tvl_display: sushi_tvl_display,
    pool_share_display: null,
    stake_display: stakeDisplay_sushi,
    total_pgl: null,
    withdraw_display: withdrawDisplay_sushi,
    owned_pgl: ownedPGL_sushi
  })

}
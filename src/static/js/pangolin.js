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
    pair: '0xa465e953f9f2a00b2c1c5805560207b66a570093',
    stake: '0x2061298c76cd76219b9b44439e96a75f19c61f7f',
    apr: {
      dailyAPR : .16,      
      weeklyAPR: 1.13,
      yearlyAPR : 58.80
    }
  },
  { 
    strategy: '0x14F98349Af847AB472Eb7f7c705Dc4Bee530713B', 
    nickname: 'PNG-UNI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf39f9671906d8630812f9d9863bbef5d523c84ab', 
    pair: '0x874685bc6794c8b4befbd037147c2eef990761a9',
    stake: '0x41188b4332fe68135d1524e43db98e81519d263b',
    apr: {
      dailyAPR : 0.24,      
      weeklyAPR: 1.66,
      yearlyAPR : 86.58
    }
  },  
  { 
    strategy: '0x3270b685A4a61252C6f30c1eBca9DbE622984e22', 
    nickname: 'PNG-AAVE Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x8ce2dee54bb9921a2ae0a63dbb2df8ed88b91dd9', 
    pair: '0x0025cebd8289bbe0a51a5c85464da68cbc2ec0c4',
    stake: '0xb921a3ae9ceda66fa8a74dbb0946367fb14fae34',
    apr: {
      dailyAPR : 0.23,      
      weeklyAPR: 1.60,
      yearlyAPR : 83.88
    }
  },
  { 
    strategy: '0xcD651AD29835099334d312a9372418Eb2b70c72F', 
    nickname: 'PNG-DAI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xba7deebbfc5fa1100fb055a87773e1e99cd3507a', 
    pair: '0xd765b31399985f411a9667330764f62153b42c76',
    stake: '0x8866077f08b076360c25f4fd7fbc959ef135474c',
    apr: {
      dailyAPR : 0.16,      
      weeklyAPR: 1.15,
      yearlyAPR : 60.06
    }
  },  
  { 
    strategy: '0x8eDd233546730C51a9d3840e954E5581Eb3fDAB1', 
    nickname: 'SUSHI-PNG Pangolin LP',
    token0: '0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf105fb50fc6ddd8a857bbecd296c8a630e8ca857',
    stake: '0x6955cb85edea63f861c0be39c3d7f8921606c4dc',
    apr: {
      dailyAPR : 0.08,      
      weeklyAPR: 0.57,
      yearlyAPR : 29.43
    }
  },  
  { 
    strategy: '0x7987aDB3C789f071FeFC1BEb15Ce6DfDfbc75899', 
    nickname: 'PNG-USDT Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xde3A24028580884448a5397872046a019649b084', 
    pair: '0xE8AcF438B10A2C09f80aEf3Ef2858F8E758C98F9',
    stake: '0x7accc6f16bf8c0dce22371fbd914c6b5b402bf9f',
    apr: {
      dailyAPR : 0.39,      
      weeklyAPR: 2.75,
      yearlyAPR : 143.18
    }
  },
  { 
    strategy: '0x392c51Ab0AF3017E3e22713353eCF5B9d6fBDE84', 
    nickname: 'PNG-LINK Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651', 
    pair: '0x7313835802c6e8ca2a6327e6478747b71440f7a4',
    stake: '0x4ad6e309805cb477010bea9ffc650cb27c1a9504',
    apr: {
      dailyAPR : 0.28,      
      weeklyAPR: 1.96,
      yearlyAPR : 101.70
    }
  },
  { 
    strategy: '0x763Aa38c837f61DD8429313933Cc47f24E881430', 
    nickname: 'WBTC-PNG Pangolin LP',
    token0: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf372ceae6b2f4a2c4a6c0550044a7eab914405ea',
    stake: '0x99b06b9673fea30ba55179b1433ce909fdc28723',
    apr: {
      dailyAPR : 0.22,      
      weeklyAPR: 1.52,
      yearlyAPR : 78.95
    }
  },
  { 
    strategy: '0x3815f36C3d60d658797958EAD8778f6500be16Df', 
    nickname: 'PNG-ETH Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    pair: '0x53b37b9a6631c462d74d65d61e1c056ea9daa637',
    stake: '0x4e550fefbf888cb43ead73d821f646f43b1f2309',
    apr: {
      dailyAPR : 0.18,
      weeklyAPR: 1.25,
      yearlyAPR : 64.82
    }
  }  
]

async function main() {  

  return Promise.all([
    init_ethers(),
    getAvaxPrices(),
    $.getJSON('https://x-api.snowball.network/tvl/snob.json'),
  ]).then(results => {
    
    window.app = results[0]  
    window.prices = results[1]  
    window.tvl = results[2]
    
    gentop().then(td => { console.log('top done:', td) })

    genpool(thispagespools.pop())

  })

}
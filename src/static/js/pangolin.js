$(function () {
  
  consoleInit();
  start(main);

});

const thispagespools = [
  {
    pool_id: 'png-yfi',
    snowglobe: '0x234ed7c95Be12b2A0A43fF602e737225C83c2aa1',
    nickname: 'PNG-YFI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x99519acb025a0e0d44c3875a4bbf03af65933627', 
    pair: '0xa465e953f9f2a00b2c1c5805560207b66a570093',
    stake: '0xc7D0E29b616B29aC6fF4FD5f37c8Da826D16DB0D'
  },
  {
    pool_id: 'png-uni',
    snowglobe: '0x14F98349Af847AB472Eb7f7c705Dc4Bee530713B',
    nickname: 'PNG-UNI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf39f9671906d8630812f9d9863bbef5d523c84ab', 
    pair: '0x874685bc6794c8b4befbd037147c2eef990761a9',
    stake: '0x4f74BbF6859A994e7c309eA0f11E3Cc112955110'
  },  
  {
    pool_id: 'png-aave',
    snowglobe: '0x3270b685A4a61252C6f30c1eBca9DbE622984e22',
    nickname: 'PNG-AAVE Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x8ce2dee54bb9921a2ae0a63dbb2df8ed88b91dd9', 
    pair: '0x0025cebd8289bbe0a51a5c85464da68cbc2ec0c4',
    stake: '0xFd9ACEc0F413cA05d5AD5b962F3B4De40018AD87'
  },
  {
    pool_id: 'png-dai',
    snowglobe: '0xcD651AD29835099334d312a9372418Eb2b70c72F',
    nickname: 'PNG-DAI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xba7deebbfc5fa1100fb055a87773e1e99cd3507a', 
    pair: '0xd765b31399985f411a9667330764f62153b42c76',
    stake: '0xe3103e565cF96a5709aE8e603B1EfB7fED04613B'
  },  
  {
    pool_id: 'png-sushi',
    snowglobe: '0x8eDd233546730C51a9d3840e954E5581Eb3fDAB1',
    nickname: 'SUSHI-PNG Pangolin LP',
    token0: '0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf105fb50fc6ddd8a857bbecd296c8a630e8ca857',
    stake: '0x633F4b4DB7dD4fa066Bd9949Ab627a551E0ecd32'
  },  
  {
    pool_id: 'png-usdt',
    snowglobe: '0x7987aDB3C789f071FeFC1BEb15Ce6DfDfbc75899',
    nickname: 'PNG-USDT Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xde3A24028580884448a5397872046a019649b084', 
    pair: '0xE8AcF438B10A2C09f80aEf3Ef2858F8E758C98F9',
    stake: '0xE2510a1fCCCde8d2D1c40b41e8f71fB1F47E5bBA'
  },
  {
    pool_id: 'png-link',
    snowglobe: '0x392c51Ab0AF3017E3e22713353eCF5B9d6fBDE84',
    nickname: 'PNG-LINK Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651', 
    pair: '0x7313835802c6e8ca2a6327e6478747b71440f7a4',
    stake: '0x6356b24b36074AbE2903f44fE4019bc5864FDe36'
  },
  {
    pool_id: 'png-wbtc',
    snowglobe: '0x763Aa38c837f61DD8429313933Cc47f24E881430',
    nickname: 'WBTC-PNG Pangolin LP',
    token0: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf372ceae6b2f4a2c4a6c0550044a7eab914405ea',
    stake: '0x681047473B6145BA5dB90b074E32861549e85cC7'
  },
  {
    pool_id: 'png-eth',
    snowglobe: '0x3815f36C3d60d658797958EAD8778f6500be16Df',
    nickname: 'PNG-ETH Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    pair: '0x53b37b9a6631c462d74d65d61e1c056ea9daa637',
    stake: '0x7ac007afB5d61F48D1E3C8Cc130d4cf6b765000e'
  }  
]

async function main() {  

  return Promise.all([
    init_ethers(),
    getAvaxPrices(),
    $.getJSON('https://x-api.snowball.network/dex/0xc38f41a296a4493ff429f1238e030924a1542e50/tvl.json'),
  ]).then(results => {
    
    window.app = results[0]  
    window.prices = results[1]  
    window.tvl = results[2]
    
    gentop().then(td => { console.log('top done:', td) })
    genpool(thispagespools.pop())

  })

}
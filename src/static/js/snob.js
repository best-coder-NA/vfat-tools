$(function () {
  
  consoleInit();
  start(main);

});

const thispagespools = [
  {
    pool_id: 'avax-snob',
    snowglobe: '',
    nickname: 'AVAX-SNOB Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0xC38f41A296A4493Ff429F1238e030924A1542e50', 
    pair: '0xa1c2c3b6b120cbd4cec7d2371ffd4a931a134a32',
    stake: ''
  },
  {
    pool_id: 'png-snob',
    snowglobe: '',
    nickname: 'PNG-SNOB Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xC38f41A296A4493Ff429F1238e030924A1542e50', 
    pair: '0x97b4957df08e185502a0ac624f332c7f8967ee8d',
    stake: ''
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
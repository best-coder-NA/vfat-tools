$(function () {
  
    consoleInit();
    start(main);
  
  });
  
  const thispagespools = [
    {
      pool_id: 'avax-wbtc',
      network: 'Pangolin',
      snowglobe: '0x39BE35904f52E83137881C0AC71501Edf0180181',
      nickname: 'AVAX-WBTC Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
      pair: '0x7a6131110b82dacbb5872c7d352bfe071ea6a17c',
      stake: '0xe968e9753fd2c323c2fe94caff954a48afc18546'
    },
    {
      pool_id: 'avax-usdt',
      network: 'Pangolin',
      snowglobe: '0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605',
      nickname: 'AVAX-USDT Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xde3A24028580884448a5397872046a019649b084',
      pair: '0x9EE0a4E21bd333a6bb2ab298194320b8DaA26516',
      stake: '0x94c021845efe237163831dac39448cfd371279d6'
    },
    { 
      pool_id: 'avax-link',
      network: 'Pangolin',
      snowglobe: '0x00933c16e06b1d15958317C2793BC54394Ae356C',
      nickname: 'AVAX-LINK Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651',
      pair: '0xbbc7fff833d27264aac8806389e02f717a5506c9',
      stake: '0xbda623cdd04d822616a263bf4edbbce0b7dc4ae7'
    },
    {
      pool_id: 'avax-eth',
      network: 'Pangolin',
      snowglobe: '0x586554828eE99811A8ef75029351179949762c26',
      nickname: 'AVAX-ETH Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
      pair: '0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65',
      stake: '0x417c02150b9a31bcacb201d1d60967653384e1c6'
    },
    {
      pool_id: 'avax-png',
      network: 'Pangolin',
      snowglobe: '0x621207093D2e65Bf3aC55dD8Bf0351B980A63815',
      nickname: 'AVAX-PNG Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x60781C2586D68229fde47564546784ab3fACA982',
      pair: '0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367',
      stake: '0x574d3245e36cf8c9dc86430eadb0fdb2f385f829'
    },
    {
      pool_id: 'avax-sushi',
      network: 'Pangolin',
      snowglobe: '0x751089F1bf31B13Fa0F0537ae78108088a2253BF',
      nickname: 'AVAX-SUSHI Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc',
      pair: '0xd8B262C0676E13100B33590F10564b46eeF652AD',
      stake: '0xda354352b03f87f84315eef20cdd83c49f7e812e'
    },
    {
      pool_id: 'avax-dai',
      network: 'Pangolin',
      snowglobe: '0xb21b21E4fA802EE4c158d7cf4bD5416B8035c5e0',
      nickname: 'AVAX-DAI Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
      pair: '0x17a2e8275792b4616befb02eb9ae699aa0dcb94b',
      stake: '0x701e03fad691799a8905043c0d18d2213bbcf2c7'
    },
    {
      pool_id: 'avax-uni',
      network: 'Pangolin',
      snowglobe: '0xdf7F15d05d641dF701D961a38d03028e0a26a42D',
      nickname: 'AVAX-UNI Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xf39f9671906d8630812f9d9863bBEf5D523c84Ab',
      pair: '0x92dc558cb9f8d0473391283ead77b79b416877ca',
      stake: '0x1f6acc5f5fe6af91c1bb3bebd27f4807a243d935'
    },
    {
      pool_id: 'avax-vso',
      network: 'Pangolin',
      snowglobe: '0x888Ab4CB2279bDB1A81c49451581d7c243AffbEf',
      nickname: 'AVAX-VSO Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x846d50248baf8b7ceaa9d9b53bfd12d7d7fbb25a',
      pair: '0x2b532bc0afae65da57eccfb14ff46d16a12de5e6',
      stake: '0xf2b788085592380bfCAc40Ac5E0d10D9d0b54eEe'
    },
    {
      pool_id: 'avax-snob',
      network: 'Pangolin',
      snowglobe: '0xF4072358C1E3d7841BD7AfDE31F61E17E8d99BE7',
      nickname: 'AVAX-SNOB Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xC38f41A296A4493Ff429F1238e030924A1542e50',
      pair: '0xa1c2c3b6b120cbd4cec7d2371ffd4a931a134a32',
      stake: '0x640D754113A3CBDd80BcCc1b5c0387148EEbf2fE'
    },
    {
      pool_id: 'avax-spore',
      network: 'Pangolin',
      snowglobe: '0x27f8FE86a513bAAF18B59D3dD15218Cc629640Fc',
      nickname: 'AVAX-SPORE Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x6e7f5C0b9f4432716bDd0a77a3601291b9D9e985',
      pair: '0x0a63179a8838b5729e79d239940d7e29e40a0116',
      stake: '0xd3e5538A049FcFcb8dF559B85B352302fEfB8d7C'
    },
    {
      pool_id: 'joe-avax-eth',
      network: 'TraderJoe',
      snowglobe: '0xAbD637a6881a2D4bbf279aE484c2447c070f7C73',
      nickname: 'AVAX-ETH Joe LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
      pair: '0xc992Ab46428a5a2eDeB8F44D946CE5642F97EF71',
      stake: '0xd6a4F121CA35509aF06A0Be99093d08462f53052',
      pool_no: 1
    },
    {
      pool_id: 'joe-avax-png',
      network: 'TraderJoe',
      snowglobe: '0x962ECf51A169090002CC88B4Bf16e447d2E13100',
      nickname: 'AVAX-PNG Joe LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x60781C2586D68229fde47564546784ab3fACA982',
      pair: '0x3dAF1C6268362214eBB064647555438c6f365F96',
      stake: '0xd6a4F121CA35509aF06A0Be99093d08462f53052',
      pool_no: 6
    },
    {
      pool_id: 'joe-avax-joe',
      network: 'TraderJoe',
      snowglobe: '0xcC757081C972D0326de42875E0DA2c54af523622',
      nickname: 'AVAX-JOE Joe LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
      pair: '0x454E67025631C065d3cFAD6d71E6892f74487a15',
      stake: '0xd6a4F121CA35509aF06A0Be99093d08462f53052',
      pool_no: 6
    }
  ]
  
  async function main() {  
  
    return Promise.all([
      init_ethers(),
      getAvaxPrices()
    ]).then(results => {
      
      window.app = results[0]  
      window.prices = results[1]  
      window.tvl = 0;
      
      gentop().then(td => { console.log('top done:', td) })
      genpool(thispagespools.pop())
  
    })
  
  }

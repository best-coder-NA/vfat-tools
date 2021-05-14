$(function () {
  
    consoleInit();
    start(main);
  
  });
  
  const thispagespools = [
    {
      pool_id: 'avax-wbtc',
      snowglobe: '0x39BE35904f52E83137881C0AC71501Edf0180181',
      nickname: 'AVAX-WBTC Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
      pair: '0x7a6131110b82dacbb5872c7d352bfe071ea6a17c',
      stake: '0x2edC6522d658946fBA5116fFaA60d8760d1B21A8'
    },
    {
      pool_id: 'avax-usdt',
      snowglobe: '0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605',
      nickname: 'AVAX-USDT Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xde3a24028580884448a5397872046a019649b084',
      pair: '0x9EE0a4E21bd333a6bb2ab298194320b8DaA26516',
      stake: '0x961890586dfB84919d8C6C5f6304192A2b3ddaB7'
    },
    {
      pool_id: 'avax-link',
      snowglobe: '0x00933c16e06b1d15958317C2793BC54394Ae356C',
      nickname: 'AVAX-LINK Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xB3fe5374Fh67D7a22886A0eE082b2E2f9d2651651',
      pair: '0xbbc7fff833d27264aac8806389e02f717a5506c9',
      stake: '0x846E79A9d8CCC6bBafc3939177a3D53E51C634FC'
    },
    {
      pool_id: 'avax-eth',
      snowglobe: '0x586554828eE99811A8ef75029351179949762c26',
      nickname: 'AVAX-ETH Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15',
      pair: '0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65',
      stake: '0x6b32266e7793359Fa199C32e950cF5c0EB4b284A'
    },
    {
      pool_id: 'avax-png',
      snowglobe: '0x621207093D2e65Bf3aC55dD8Bf0351B980A63815',
      nickname: 'AVAX-PNG Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x60781c2586d68229fde47564546784ab3faca982',
      pair: '0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367',
      stake: '0x08d8C7C1a6E8543a4674E77cc0111EAa1D520f8b'
    },
    {
      pool_id: 'avax-sushi',
      snowglobe: '0x751089F1bf31B13Fa0F0537ae78108088a2253BF',
      nickname: 'AVAX-SUSHI Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc',
      pair: '0xd8B262C0676E13100B33590F10564b46eeF652AD',
      stake: '0x1b4468dC172B94B7B8307ca5b1f63466b086acc8'
    },
    {
      pool_id: 'avax-dai',
      snowglobe: '0xb21b21E4fA802EE4c158d7cf4bD5416B8035c5e0',
      nickname: 'AVAX-DAI Pangolin LP',
      token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      token1: '0x095370AE41FF23798d96c1ADF7D58Ae6a2b05b18',
      pair: '0x17a2e8275792b4616befb02eb9ae699aa0dcb94b',
      stake: '0xe6D5806B2248777761adE4Bc4f38E9AAB6Bf9BC2'
      
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

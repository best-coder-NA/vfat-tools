/*!
* YieldFarming
* Boilerplate for a Static website using EJS and SASS
* https://yieldfarming.info
* @author Jongseung Lim -- https://yieldfarming.info
* Copyright 2021. MIT Licensed.
*/

$(function () {
  consoleInit();
  start(main);
});

const pools = [
  {
    pool_id: 'avax-wbtc',
    network: 'Pangolin',
    snowglobe: '0x39BE35904f52E83137881C0AC71501Edf0180181',
    nickname: 'AVAX-WBTC Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
    pair: '0x7a6131110b82dacbb5872c7d352bfe071ea6a17c',
    stake: '0xe968e9753fd2c323c2fe94caff954a48afc18546',
    gauge: '0x4906bf6aa9aad2b76f2c92738b7242a5c7a6a7bd'
  },
  {
    pool_id: 'avax-usdt',
    network: 'Pangolin',
    snowglobe: '0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605',
    nickname: 'AVAX-USDT Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0xde3A24028580884448a5397872046a019649b084',
    pair: '0x9EE0a4E21bd333a6bb2ab298194320b8DaA26516',
    stake: '0x94c021845efe237163831dac39448cfd371279d6',
    gauge: '0x45590658f6608c5be4c94ce885c52dbddb4fa21a'
  },
  { 
    pool_id: 'avax-link',
    network: 'Pangolin',
    snowglobe: '0x00933c16e06b1d15958317C2793BC54394Ae356C',
    nickname: 'AVAX-LINK Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651',
    pair: '0xbbc7fff833d27264aac8806389e02f717a5506c9',
    stake: '0xbda623cdd04d822616a263bf4edbbce0b7dc4ae7',
    gauge: '0x7e68717f6228764bc1fc7a970dd5a041837c370c'
  },
  {
    pool_id: 'avax-eth',
    network: 'Pangolin',
    snowglobe: '0x586554828eE99811A8ef75029351179949762c26',
    nickname: 'AVAX-ETH Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    pair: '0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65',
    stake: '0x417c02150b9a31bcacb201d1d60967653384e1c6',
    gauge: '0x6bb9d2420217e0c3f272f47c58942e89e23806c9'
  },
  {
    pool_id: 'avax-png',
    network: 'Pangolin',
    snowglobe: '0x621207093D2e65Bf3aC55dD8Bf0351B980A63815',
    nickname: 'AVAX-PNG Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982',
    pair: '0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367',
    stake: '0x574d3245e36cf8c9dc86430eadb0fdb2f385f829',
    gauge: '0x3b062f421be17a7dc2d973a2da3fe56ff5ac8042'
  },
  {
    pool_id: 'avax-sushi',
    network: 'Pangolin',
    snowglobe: '0x751089F1bf31B13Fa0F0537ae78108088a2253BF',
    nickname: 'AVAX-SUSHI Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc',
    pair: '0xd8B262C0676E13100B33590F10564b46eeF652AD',
    stake: '0xda354352b03f87f84315eef20cdd83c49f7e812e',
    gauge: '0x38a9635c0a1b62a7d8bc608a3ad5d84b300831ae'
  },
  {
    pool_id: 'avax-dai',
    network: 'Pangolin',
    snowglobe: '0xb21b21E4fA802EE4c158d7cf4bD5416B8035c5e0',
    nickname: 'AVAX-DAI Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
    pair: '0x17a2e8275792b4616befb02eb9ae699aa0dcb94b',
    stake: '0x701e03fad691799a8905043c0d18d2213bbcf2c7',
    gauge: '0x2e2191fde0872e686b0a5117cd639896d2c8ad97'
  },
  {
    pool_id: 'avax-uni',
    network: 'Pangolin',
    snowglobe: '0xdf7F15d05d641dF701D961a38d03028e0a26a42D',
    nickname: 'AVAX-UNI Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0xf39f9671906d8630812f9d9863bBEf5D523c84Ab',
    pair: '0x92dc558cb9f8d0473391283ead77b79b416877ca',
    stake: '0x1f6acc5f5fe6af91c1bb3bebd27f4807a243d935',
    gauge: '0x0e06c4d0ecaae66b82ebc9133ca52ea82702cd30'
  },
  {
    pool_id: 'avax-vso',
    network: 'Pangolin',
    snowglobe: '0x888Ab4CB2279bDB1A81c49451581d7c243AffbEf',
    nickname: 'AVAX-VSO Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0x846d50248baf8b7ceaa9d9b53bfd12d7d7fbb25a',
    pair: '0x2b532bc0afae65da57eccfb14ff46d16a12de5e6',
    stake: '0xf2b788085592380bfCAc40Ac5E0d10D9d0b54eEe',
    gauge: '0x4d16ecff6dfa8f344ba182f09422b86b4d796ab4'
  },
  {
    pool_id: 'avax-snob',
    network: 'Pangolin',
    snowglobe: '0xF4072358C1E3d7841BD7AfDE31F61E17E8d99BE7',
    nickname: 'AVAX-SNOB Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0xC38f41A296A4493Ff429F1238e030924A1542e50',
    pair: '0xa1c2c3b6b120cbd4cec7d2371ffd4a931a134a32',
    stake: '0x640D754113A3CBDd80BcCc1b5c0387148EEbf2fE',
    gauge: '0xda7099baa4693209ead01d2baf2f722f40ab30c1'
  },
  {
    pool_id: 'avax-spore',
    network: 'Pangolin',
    snowglobe: '0x27f8FE86a513bAAF18B59D3dD15218Cc629640Fc',
    nickname: 'AVAX-SPORE Pangolin LP',
    token0: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    token1: '0x6e7f5C0b9f4432716bDd0a77a3601291b9D9e985',
    pair: '0x0a63179a8838b5729e79d239940d7e29e40a0116',
    stake: '0xd3e5538A049FcFcb8dF559B85B352302fEfB8d7C',
    gauge: '0x85852980d24f69714701C50371811d31410144c3'
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
    gauge: '0xA634ec1BaDa2faC4eaa71439b0b18Dd3486823e6',
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
    pool_no: 0
  },
  {
    pool_id: 'png-yfi',
    snowglobe: '0x234ed7c95Be12b2A0A43fF602e737225C83c2aa1',
    nickname: 'PNG-YFI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x99519AcB025a0e0d44c3875A4BbF03af65933627',
    pair: '0xa465e953f9f2a00b2c1c5805560207b66a570093',
    stake: '0xc7D0E29b616B29aC6fF4FD5f37c8Da826D16DB0D',
    gauge: '0xbf23aafa5ba0bc81f798f190b1b632ecf3fd4709'
  },
  {
    pool_id: 'png-uni',
    snowglobe: '0x14F98349Af847AB472Eb7f7c705Dc4Bee530713B',
    nickname: 'PNG-UNI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf39f9671906d8630812f9d9863bBEf5D523c84Ab',
    pair: '0x874685bc6794c8b4befbd037147c2eef990761a9',
    stake: '0x4f74BbF6859A994e7c309eA0f11E3Cc112955110',
    gauge: '0xbcbce1fb679b9eba3c2e266232c86e06ab2e1e45'
  },  
  {
    pool_id: 'png-aave',
    snowglobe: '0x3270b685A4a61252C6f30c1eBca9DbE622984e22',
    nickname: 'PNG-AAVE Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x8cE2Dee54bB9921a2AE0A63dBb2DF8eD88B91dD9',
    pair: '0x0025cebd8289bbe0a51a5c85464da68cbc2ec0c4',
    stake: '0xFd9ACEc0F413cA05d5AD5b962F3B4De40018AD87',
    gauge: '0xf0c180fcbd9fafd541e8be1303cf8c72eda80399'
  },
  {
    pool_id: 'png-dai',
    snowglobe: '0xcD651AD29835099334d312a9372418Eb2b70c72F',
    nickname: 'PNG-DAI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
    pair: '0xd765b31399985f411a9667330764f62153b42c76',
    stake: '0xe3103e565cF96a5709aE8e603B1EfB7fED04613B',
    gauge: '0xef36cce5017471189030c84a218a6c60502d2248'
  },  
  {
    pool_id: 'png-sushi',
    snowglobe: '0x8eDd233546730C51a9d3840e954E5581Eb3fDAB1',
    nickname: 'SUSHI-PNG Pangolin LP',
    token0: '0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf105fb50fc6ddd8a857bbecd296c8a630e8ca857',
    stake: '0x633F4b4DB7dD4fa066Bd9949Ab627a551E0ecd32',
    gauge: '0xaf309db1bed322880a1edb8da426450e1c3be98e'
  },  
  {
    pool_id: 'png-usdt',
    snowglobe: '0x7987aDB3C789f071FeFC1BEb15Ce6DfDfbc75899',
    nickname: 'PNG-USDT Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xde3A24028580884448a5397872046a019649b084', 
    pair: '0xE8AcF438B10A2C09f80aEf3Ef2858F8E758C98F9',
    stake: '0xE2510a1fCCCde8d2D1c40b41e8f71fB1F47E5bBA',
    gauge: '0xe58961d4895f0e26309ca1f36d607c6a2a1556ff'
  },
  {
    pool_id: 'png-link',
    snowglobe: '0x392c51Ab0AF3017E3e22713353eCF5B9d6fBDE84',
    nickname: 'PNG-LINK Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651', 
    pair: '0x7313835802c6e8ca2a6327e6478747b71440f7a4',
    stake: '0x6356b24b36074AbE2903f44fE4019bc5864FDe36',
    gauge: '0xc4960af75f321c7fb36b725afc6059727e2db457'
  },
  {
    pool_id: 'png-wbtc',
    snowglobe: '0x763Aa38c837f61DD8429313933Cc47f24E881430',
    nickname: 'WBTC-PNG Pangolin LP',
    token0: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf372ceae6b2f4a2c4a6c0550044a7eab914405ea',
    stake: '0x681047473B6145BA5dB90b074E32861549e85cC7',
    gauge: '0x1e544e0eedc7e44f506f2ae7d389e0b07289e3c1'
  },
  {
    pool_id: 'png-eth',
    snowglobe: '0x3815f36C3d60d658797958EAD8778f6500be16Df',
    nickname: 'PNG-ETH Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    pair: '0x53b37b9a6631c462d74d65d61e1c056ea9daa637',
    stake: '0x7ac007afB5d61F48D1E3C8Cc130d4cf6b765000e',
    gauge: '0x5f05dc58ee067c91a98ec025d5c332af40b84667'
  },
  {
    pool_id: 'png-vso',
    snowglobe: '0x8309C64390F376fD778BDd701d54d1F8DFfe1F39',
    nickname: 'PNG-VSO Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x846d50248baf8b7ceaa9d9b53bfd12d7d7fbb25a',
    pair: '0x9d472e21f6589380b21c42674b3585c47b74c891',
    stake: '0x759ee0072901f409e4959E00b00a16FD729397eC',
    gauge: '0xea4a0a6b5cc61b8edb228a5582308d0ad82b85cc'
  },
  {
    pool_id: 'png-snob',
    snowglobe: '0xB4db531076494432eaAA4C6fCD59fcc876af2734',
    nickname: 'PNG-SNOB Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xC38f41A296A4493Ff429F1238e030924A1542e50',
    pair: '0x97b4957df08e185502a0ac624f332c7f8967ee8d',
    stake: '0x08B9A023e34Bad6Db868B699fa642Bf5f12Ebe76',
    gauge: '0xf2b70c7d26b841566ef14027f91c8771d615d54a'
  },
  {
    pool_id: 'png-spore',
    snowglobe: '0xa39785a4E4CdDa7509751ed152a00f3D37FbFa9F',
    nickname: 'PNG-SPORE Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x6e7f5C0b9f4432716bDd0a77a3601291b9D9e985',
    pair: '0xad24a72ffe0466399e6f69b9332022a71408f10b',
    stake: '0x12A33F6B0dd0D35279D402aB61587fE7eB23f7b0',
    gauge: '0xfe570d95BAddFAb258c09B2F008B7786a2Da3b3f'
  },
  {
    pool_id: 's3d',
    gauge: '0x5994612ffffc31d6c05c4fbec4a17116676d5b22'
  },
  {
    pool_id: 's3f',
    gauge: '0x472075680e16d34aba24ce9a6ddb59f27995906a'
  }
]

const MAIN_GAUGE_INFO = Object.freeze({
  '0xF4072358C1E3d7841BD7AfDE31F61E17E8d99BE7': {
    tokenName: 'WAVAX-SNOWBALL',
    poolName: 'WAVAX-SNOWBALL Pool',
    a: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0xC38f41A296A4493Ff429F1238e030924A1542e50',
      priceId: 'snowball',
      decimals: 18
    }
  },
  '0xB4db531076494432eaAA4C6fCD59fcc876af2734': {
    tokenName: 'PNG-SNOWBALL',
    poolName: 'PNG-SNOWBALL Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0xC38f41A296A4493Ff429F1238e030924A1542e50',
      priceId: 'snowball',
      decimals: 18
    }
  },
  '0x586554828eE99811A8ef75029351179949762c26': {
    tokenName: 'WAVAX-ETH',
    poolName: 'WAVAX-ETH Pool',
    a: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
      priceId: 'eth',
      decimals: 18
    }
  },
  '0x621207093D2e65Bf3aC55dD8Bf0351B980A63815': {
    tokenName: 'PNG-WAVAX',
    poolName: 'PNG-WAVAX Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      priceId: 'wavax',
      decimals: 18
    }
  },
  '0x00933c16e06b1d15958317C2793BC54394Ae356C': {
    tokenName: 'WAVAX-LINK',
    poolName: 'WAVAX-LINK Pool',
    a: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651',
      priceId: 'link',
      decimals: 18
    }
  },
  '0x751089F1bf31B13Fa0F0537ae78108088a2253BF': {
    tokenName: 'SUSHI-WAVAX',
    poolName: 'SUSHI-WAVAX Pool',
    a: {
      address: '0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc',
      priceId: 'sushi',
      decimals: 18
    },
    b: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      priceId: 'wavax',
      decimals: 18
    }
  },
  '0x39BE35904f52E83137881C0AC71501Edf0180181': {
    tokenName: 'WBTC-WAVAX',
    poolName: 'WBTC-WAVAX Pool',
    a: {
      address: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
      priceId: 'wbtc',
      decimals: 18
    },
    b: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      priceId: 'wavax',
      decimals: 18
    }
  },
  '0x3fcFBCB4b368222fCB4d9c314eCA597489FE8605': {
    tokenName: 'WAVAX-USDT',
    poolName: 'WAVAX-USDT Pool',
    a: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0xde3A24028580884448a5397872046a019649b084',
      priceId: 'usdt',
      decimals: 18
    }
  },
  '0x53B37b9A6631C462d74D65d61e1c056ea9dAa637': {
    tokenName: '(removed)',
    poolName: '(removed)',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
      priceId: 'eth',
      decimals: 18
    }
  },
  '0x3815f36C3d60d658797958EAD8778f6500be16Df': {
    tokenName: 'PNG-ETH',
    poolName: 'PNG-ETH Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
      priceId: 'eth',
      decimals: 18
    }
  },
  '0x763Aa38c837f61DD8429313933Cc47f24E881430': {
    tokenName: 'WBTC-PNG',
    poolName: 'WBTC-PNG Pool',
    a: {
      address: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
      priceId: 'wbtc',
      decimals: 18
    },
    b: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    }
  },
  '0x392c51Ab0AF3017E3e22713353eCF5B9d6fBDE84': {
    tokenName: 'PNG-LINK',
    poolName: 'PNG-LINK Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651',
      priceId: 'link',
      decimals: 18
    }
  },
  '0x7987aDB3C789f071FeFC1BEb15Ce6DfDfbc75899': {
    tokenName: 'PNG-USDT',
    poolName: 'PNG-USDT Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0xde3A24028580884448a5397872046a019649b084',
      priceId: 'usdt',
      decimals: 18
    }
  },
  '0x8eDd233546730C51a9d3840e954E5581Eb3fDAB1': {
    tokenName: 'SUSHI-PNG',
    poolName: 'SUSHI-PNG Pool',
    a: {
      address: '0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc',
      priceId: 'sushi',
      decimals: 18
    },
    b: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    }
  },
  '0xcD651AD29835099334d312a9372418Eb2b70c72F': {
    tokenName: 'PNG-DAI',
    poolName: 'PNG-DAI Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
      priceId: 'dai',
      decimals: 18
    }
  },
  '0x3270b685A4a61252C6f30c1eBca9DbE622984e22': {
    tokenName: 'PNG-AAVE',
    poolName: 'PNG-AAVE Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0x8cE2Dee54bB9921a2AE0A63dBb2DF8eD88B91dD9',
      priceId: 'aave',
      decimals: 18
    }
  },
  '0x14F98349Af847AB472Eb7f7c705Dc4Bee530713B': {
    tokenName: 'PNG-UNI',
    poolName: 'PNG-UNI Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0xf39f9671906d8630812f9d9863bBEf5D523c84Ab',
      priceId: 'uni',
      decimals: 18
    }
  },
  '0x234ed7c95Be12b2A0A43fF602e737225C83c2aa1': {
    tokenName: 'PNG-YFI',
    poolName: 'PNG-YFI Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0x99519AcB025a0e0d44c3875A4BbF03af65933627',
      priceId: 'yfi',
      decimals: 18
    }
  },
  '0xb21b21E4fA802EE4c158d7cf4bD5416B8035c5e0': {
    tokenName: 'WAVAX-DAI',
    poolName: 'WAVAX-DAI Pool',
    a: {
      address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
      priceId: 'dai',
      decimals: 18
    }
  },
  '0xdf7F15d05d641dF701D961a38d03028e0a26a42D': {
    tokenName: 'WAVAX-UNI',
    poolName: 'WAVAX-UNI Pool',
    a: {
      address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0xf39f9671906d8630812f9d9863bBEf5D523c84Ab',
      priceId: 'uni',
      decimals: 18
    }
  },
  '0x888Ab4CB2279bDB1A81c49451581d7c243AffbEf': {
    tokenName: 'WAVAX-VSO',
    poolName: 'WAVAX-VSO Pool',
    a: {
      address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0x846d50248baf8b7ceaa9d9b53bfd12d7d7fbb25a',
      priceId: 'vso',
      decimals: 18
    }
  },
  '0x8309C64390F376fD778BDd701d54d1F8DFfe1F39': {
    tokenName: 'PNG-VSO',
    poolName: 'PNG-VSO Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0x846d50248baf8b7ceaa9d9b53bfd12d7d7fbb25a',
      priceId: 'vso',
      decimals: 18
    }
  },
  '0xdE1A11C331a0E45B9BA8FeE04D4B51A745f1e4A4': {
    tokenName: 'S3D',
    poolName: 'StableVault S3D Pool',
    a: {
      address: '0xaEb044650278731Ef3DC244692AB9F64C78FfaEA',
      priceId: 'busd',
      decimals: 18
    },
    b: {
      address: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
      priceId: 'sub',
      decimals: 18
    }
  },
  '0xA42BE3dB9aff3aee48167b240bFEE5e1697e1281': {
    tokenName: 'S3F',
    poolName: 'StableVault S3F Pool',
    a: {
      address: '0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98',
      priceId: 'frax',
      decimals: 18
    },
    b: {
      address: '0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB',
      priceId: 'sub',
      decimals: 18
    }
  },
  '0x27f8FE86a513bAAF18B59D3dD15218Cc629640Fc': {
    tokenName: 'WAVAX-SPORE',
    poolName: 'WAVAX-SPORE Pool',
    a: {
      address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0x6e7f5c0b9f4432716bdd0a77a3601291b9d9e985',
      priceId: 'spore',
      decimals: 18
    }
  },
  '0xa39785a4E4CdDa7509751ed152a00f3D37FbFa9F': {
    tokenName: 'PNG-SPORE',
    poolName: 'PNG-SPORE Pool',
    a: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    },
    b: {
      address: '0x6e7f5c0b9f4432716bdd0a77a3601291b9d9e985',
      priceId: 'spore',
      decimals: 18
    }
  },
  '0xAbD637a6881a2D4bbf279aE484c2447c070f7C73': {
    tokenName: 'JOE-AVAX-ETH',
    poolName: 'JOE-AVAX-ETH Pool',
    a: {
      address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
      priceId: 'eth',
      decimals: 18
    }
  },
  '0x962ECf51A169090002CC88B4Bf16e447d2E13100': {
    tokenName: 'JOE-AVAX-PNG',
    poolName: 'JOE-AVAX-PNG Pool',
    a: {
      address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
      priceId: 'wavax',
      decimals: 18
    },
    b: {
      address: '0x60781C2586D68229fde47564546784ab3fACA982',
      priceId: 'png',
      decimals: 18
    }
  }
})

function pairmatch(p, t0, t1) {
  return ( p.token0.symbol.toLowerCase() == t0.toLowerCase() || p.token1.symbol.toLowerCase() == t0.toLowerCase() ) && 
         ( p.token0.symbol.toLowerCase() == t1.toLowerCase() || p.token1.symbol.toLowerCase() == t1.toLowerCase() )
}

async function main() {
  const App = await init_ethers();
  //ABIs
  const SNOWGLOBE_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_token", "internalType": "address" }, { "type": "address", "name": "_governance", "internalType": "address" }, { "type": "address", "name": "_timelock", "internalType": "address" }, { "type": "address", "name": "_controller", "internalType": "address" }] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "available", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "controller", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "decreaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "subtractedValue", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "uint256", "name": "_amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "depositAll", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "earn", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getRatio", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "governance", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "harvest", "inputs": [{ "type": "address", "name": "reserve", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "increaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "addedValue", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "max", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "min", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setController", "inputs": [{ "type": "address", "name": "_controller", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setGovernance", "inputs": [{ "type": "address", "name": "_governance", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setMin", "inputs": [{ "type": "uint256", "name": "_min", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setTimelock", "inputs": [{ "type": "address", "name": "_timelock", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "timelock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract IERC20" }], "name": "token", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "sender", "internalType": "address" }, { "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "_shares", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdrawAll", "inputs": [] }]
  const ICEQUEEN_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_snowball", "internalType": "contract Snowball" }, { "type": "address", "name": "_devfund", "internalType": "address" }, { "type": "address", "name": "_treasury", "internalType": "address" }, { "type": "uint256", "name": "_snowballPerBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_startBlock", "internalType": "uint256" }, { "type": "uint256", "name": "_bonusEndBlock", "internalType": "uint256" }] }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "EmergencyWithdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "type": "address", "name": "previousOwner", "internalType": "address", "indexed": true }, { "type": "address", "name": "newOwner", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Recovered", "inputs": [{ "type": "address", "name": "token", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdraw", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "pid", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "BONUS_MULTIPLIER", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "add", "inputs": [{ "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "address", "name": "_lpToken", "internalType": "contract IERC20" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "bonusEndBlock", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "devFundDivRate", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "devfund", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "emergencyWithdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getMultiplier", "inputs": [{ "type": "uint256", "name": "_from", "internalType": "uint256" }, { "type": "uint256", "name": "_to", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "massUpdatePools", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "pendingSnowball", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "address", "name": "_user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "lpToken", "internalType": "contract IERC20" }, { "type": "uint256", "name": "allocPoint", "internalType": "uint256" }, { "type": "uint256", "name": "lastRewardBlock", "internalType": "uint256" }, { "type": "uint256", "name": "accSnowballPerShare", "internalType": "uint256" }], "name": "poolInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "poolLength", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "renounceOwnership", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "set", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_allocPoint", "internalType": "uint256" }, { "type": "bool", "name": "_withUpdate", "internalType": "bool" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setBonusEndBlock", "inputs": [{ "type": "uint256", "name": "_bonusEndBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setDevFundDivRate", "inputs": [{ "type": "uint256", "name": "_devFundDivRate", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setSnowballPerBlock", "inputs": [{ "type": "uint256", "name": "_snowballPerBlock", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setTreasuryDivRate", "inputs": [{ "type": "uint256", "name": "_treasuryDivRate", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract Snowball" }], "name": "snowball", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "snowballPerBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "startBlock", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalAllocPoint", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "transferOwnership", "inputs": [{ "type": "address", "name": "newOwner", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "treasury", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "treasuryDivRate", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateDevfund", "inputs": [{ "type": "address", "name": "_devfund", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updatePool", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateTreasury", "inputs": [{ "type": "address", "name": "_treasury", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }, { "type": "uint256", "name": "rewardDebt", "internalType": "uint256" }], "name": "userInfo", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "_pid", "internalType": "uint256" }, { "type": "uint256", "name": "_amount", "internalType": "uint256" }] }]
  const LP_API = [{ "type": "constructor", "stateMutability": "nonpayable", "payable": false, "inputs": [] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Burn", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Mint", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Swap", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount0In", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1In", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount0Out", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1Out", "internalType": "uint256", "indexed": false }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Sync", "inputs": [{ "type": "uint112", "name": "reserve0", "internalType": "uint112", "indexed": false }, { "type": "uint112", "name": "reserve1", "internalType": "uint112", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DOMAIN_SEPARATOR", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "MINIMUM_LIQUIDITY", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "PERMIT_TYPEHASH", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "amount0", "internalType": "uint256" }, { "type": "uint256", "name": "amount1", "internalType": "uint256" }], "name": "burn", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "factory", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint112", "name": "_reserve0", "internalType": "uint112" }, { "type": "uint112", "name": "_reserve1", "internalType": "uint112" }, { "type": "uint32", "name": "_blockTimestampLast", "internalType": "uint32" }], "name": "getReserves", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "initialize", "inputs": [{ "type": "address", "name": "_token0", "internalType": "address" }, { "type": "address", "name": "_token1", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "kLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "liquidity", "internalType": "uint256" }], "name": "mint", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "nonces", "inputs": [{ "type": "address", "name": "", "internalType": "address" }], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "permit", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price0CumulativeLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price1CumulativeLast", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "skim", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "swap", "inputs": [{ "type": "uint256", "name": "amount0Out", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Out", "internalType": "uint256" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "bytes", "name": "data", "internalType": "bytes" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "sync", "inputs": [], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "token0", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "token1", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "from", "internalType": "address" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }], "constant": false }]
  const PNG_STAKING_ABI = [{ "inputs": [{ "internalType": "address", "name": "_rewardsToken", "type": "address" }, { "internalType": "address", "name": "_stakingToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Recovered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newDuration", "type": "uint256" }], "name": "RewardsDurationUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "earned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "exit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getRewardForDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastTimeRewardApplicable", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastUpdateTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "notifyRewardAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "periodFinish", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "recoverERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rewardPerToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardPerTokenStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "rewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_rewardsDuration", "type": "uint256" }], "name": "setRewardsDuration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "stakeWithPermit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stakingToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userRewardPerTokenPaid", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  const CRYSTAL_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_iceQueen","internalType":"address"},{"type":"address","name":"_snowball","internalType":"address"},{"type":"address","name":"_pgl","internalType":"address"},{"type":"uint256","name":"_poolId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"snowball","internalType":"uint256"},{"type":"uint256","name":"PGL","internalType":"uint256"},{"type":"uint256","name":"rewardCredit","internalType":"uint256"},{"type":"uint256","name":"rewardSnapshot","internalType":"uint256"},{"type":"uint256","name":"votes","internalType":"uint256"},{"type":"uint256","name":"thawTimestamp","internalType":"uint256"}],"name":"accounts","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amountSnowball","internalType":"uint256"},{"type":"uint256","name":"_amountPGL","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositPGL","inputs":[{"type":"uint256","name":"_amountIn","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositSnowball","inputs":[{"type":"uint256","name":"_amountIn","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"freeze","inputs":[{"type":"address","name":"_address","internalType":"address"},{"type":"uint256","name":"_duration","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIceQueen"}],"name":"iceQueen","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isFrozen","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingReward","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPangolinPair"}],"name":"pgl","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quadraticVotes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"snowball","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  const STAKING_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"OwnerChanged","inputs":[{"type":"address","name":"oldOwner","internalType":"address","indexed":false},{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerNominated","inputs":[{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"PauseChanged","inputs":[{"type":"bool","name":"isPaused","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardsDurationUpdated","inputs":[{"type":"uint256","name":"newDuration","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastPauseTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"min","inputs":[{"type":"uint256","name":"a","internalType":"uint256"},{"type":"uint256","name":"b","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"nominateNewOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"nominatedOwner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setPaused","inputs":[{"type":"bool","name":"_paused","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDuration","inputs":[{"type":"uint256","name":"_rewardsDuration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]
  const GAUGE_PROXY_ABI = [ { "type": "constructor", "stateMutability": "nonpayable", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IceQueen" } ], "name": "MASTER", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "SNOWBALL", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "SNOWCONE", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "contract IERC20" } ], "name": "TOKEN", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "acceptGovernance", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "addGauge", "inputs": [ { "type": "address", "name": "_token", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "collect", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "distribute", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "gauges", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "getGauge", "inputs": [ { "type": "address", "name": "_token", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "governance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "length", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "pendingGovernance", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "pid", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "poke", "inputs": [ { "type": "address", "name": "_owner", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "reset", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setGovernance", "inputs": [ { "type": "address", "name": "_governance", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setPID", "inputs": [ { "type": "uint256", "name": "_pid", "internalType": "uint256" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "name": "tokenVote", "inputs": [ { "type": "address", "name": "", "internalType": "address" }, { "type": "uint256", "name": "", "internalType": "uint256" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "address[]", "name": "", "internalType": "address[]" } ], "name": "tokens", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "totalWeight", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "usedWeights", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "vote", "inputs": [ { "type": "address[]", "name": "_tokenVote", "internalType": "address[]" }, { "type": "uint256[]", "name": "_weights", "internalType": "uint256[]" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "votes", "inputs": [ { "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" } ] }, { "type": "function", "stateMutability": "view", "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "name": "weights", "inputs": [ { "type": "address", "name": "", "internalType": "address" } ] } ]
  const GAUGE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"DISTRIBUTION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DURATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWBALL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWCONE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"TOKEN","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"TREASURY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalance","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedBalances","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"derivedSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"kick","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]


  //governance
  const CRYSTAL_VAULT_ADDRESS = "0xe5614C304D73d990B8BcA8F055Ec0f2685Ebf60c";
  const GAUGE_PROXY_ADDRESS = "0xFc371bA1E7874Ad893408D7B581F3c8471F03D2C";

  
  const TOKEN_NAMES = {
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": "AVAX",
    "0x60781C2586D68229fde47564546784ab3fACA982": "PNG",
    "0xC38f41A296A4493Ff429F1238e030924A1542e50": "SNOB",
    "0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc": "SUSHI",
    "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15": "ETH",
    "0xde3A24028580884448a5397872046a019649b084": "USDT",
    "0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651": "LINK",
    "0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB": "WBTC",
    "0x095370AE41FF23798d96c1ADF7D58Ae6a2b05b18": "DAI",
    "0x846D50248BAf8b7ceAA9d9B53BFd12d7D7FBB25a": "VSO",
    "0xf39f9671906d8630812f9d9863bBEf5D523c84Ab": "UNI",
    "0x6e7f5C0b9f4432716bDd0a77a3601291b9D9e985": "SPORE",
    "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd": "JOE"
  }
  
  const signer = App.provider.getSigner();
  const GAUGE_PROXY_CONTRACT = new ethers.Contract(GAUGE_PROXY_ADDRESS, GAUGE_PROXY_ABI, signer);

  const globes = await GAUGE_PROXY_CONTRACT.tokens()

  const gaugeAddresses = await Promise.all(
    globes.map((globe) => {
      return GAUGE_PROXY_CONTRACT.getGauge(globe)
    }),
  )

   // iterate through each globe:
   const displayGlobe = async (globe, index) => {
    // if actually a 3Pool, run display3Pool instead
    if (globe == '0xA42BE3dB9aff3aee48167b240bFEE5e1697e1281' || globe == '0xdE1A11C331a0E45B9BA8FeE04D4B51A745f1e4A4') {
      return display3Pool(globe)
    }
  
    const SNOWGLOBE_CONTRACT = new ethers.Contract(globe, SNOWGLOBE_ABI, signer);
    
    const lp_token = SNOWGLOBE_CONTRACT.token()

    // if depricated pool, skip
    if (lp_token == '0x53B37b9A6631C462d74D65d61e1c056ea9dAa637'){ 
      return; 
    }

    const LP_TOKEN_CONTRACT = new ethers.Contract(lp_token, LP_API, signer)
    const GAUGE_CONTRACT = new ethers.Contract(gaugeAddresses[index], GAUGE_ABI, signer);
    
    const token_0 = await LP_TOKEN_CONTRACT.token0()
    const token_1 = await LP_TOKEN_CONTRACT.token1()
    const lp_symbol = await LP_TOKEN_CONTRACT.symbol()

    const TOKEN_0_CONTRACT = new ethers.Contract(token_0, ERC20_ABI, signer)
    const TOKEN_1_CONTRACT = new ethers.Contract(token_1, ERC20_ABI, signer)
    

    let token_0_symbol = await TOKEN_0_CONTRACT.symbol()
    let token_1_symbol = await TOKEN_1_CONTRACT.symbol()
    let globe_symbol = await SNOWGLOBE_CONTRACT.symbol()
    let snowglobe_balance = await SNOWGLOBE_CONTRACT.balanceOf(App.YOUR_ADDRESS)
    let total_staked_lp = await SNOWGLOBE_CONTRACT.balance()
    let pending_snob = await GAUGE_CONTRACT.earned(App.YOUR_ADDRESS)
    // let globe_snob_per_block = await GAUGE_CONTRACT.rewardRate()

    let poolShareDisplay, poolShareDisplay_lp, stakeDisplay, totalPoolLP
    if (staked_lp / 1e18 > 0) {
      let ret = await calculateShare(SNOWGLOBE_CONTRACT, lp_token, staked_lp / 1e18, 1e18, userPool_JOE_AVAX_ETH)
      poolShareDisplay = ret[0]
      poolShareDisplay_lp = ret[1]
      stakeDisplay = ret[2]
      totalPoolLP = ret[3]
    }

    let tvl_class = 'tvl-hide';

    pool({
      logo_token1 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${token_0}/logo.png`,
      logo_token2 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${token_1}/logo.png`,
      pool_nickname: `${token_0_symbol}-${token_1_symbol} ${globe_symbol}`,
      pool_name: `${token_0_symbol}-${token_1_symbol} ${globe_symbol}`,
      globe_symbol: globe_symbol,
      lp_symbol: lp_symbol,
      url: null,
      tvl: null,
      pool_weight: null,
      total_staked: total_staked_lp,
      user_pool_percent: (staked_lp / 1e18) / (total_staked_lp / 1e18) * 100,
      staked_pool: stakedPool6,
      pending_tokens: pending_snob,
      display_amount: snowglobe_balance > 1000 ? snowglobe_balance / 1e18 : 0,
      approve: `approve${token_0_symbol}-${token_1_symbol}-${globe_symbol}`,
      stake: `stake${token_0_symbol}-${token_1_symbol}-${globe_symbol}`,
      unstake: `withdraw${token_0_symbol}-${token_1_symbol}-${globe_symbol}`,
      claim: `claim${token_0_symbol}-${token_1_symbol}-${globe_symbol}`,
      icequeen_apr: null,
      snowglobe_apr: null,
      tvl_display: null,
      tvl_class: tvl_class,
      total_pgl: total_staked_lp,
      pool_share_display: poolShareDisplay,
      pool_share_display_pgl: poolShareDisplay_lp,
      stake_display: stakeDisplay,
      apy: null
    })
  }
  const display3Pool = async pool => {
    const TOKEN_ADDRESSES = {
      "DAI": "",
      "TUSD": "",
      "FRAX": "",
      "USDT": "",
      "BUSD": ""
    }

    const POOL_CONTRACT = new ethers.Contract(pool, ERC20_ABI, signer)
    const gauge = GAUGE_PROXY_CONTRACT.getGauge(pool)

    const GAUGE_CONTRACT = new ethers.Contract(gauge, GAUGE_ABI, signer);
    
    // let currentPoolTokens = await POOL_CONTRACT.balanceOf(App.YOUR_ADDRESS)
    let stakedPoolTokens = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS)
    let totalStakedPool = await GAUGE_CONTRACT.totalSupply()
    let pool_snob_per_block = await GAUGE_CONTRACT.rewardRate()

    let symbol = await POOL_CONTRACT.symbol()
    let name = await POOL_CONTRACT.name()

    let tokens = name.split(" ")[1].split("+")

    let pending_snob = await GAUGE_CONTRACT.earned(App.YOUR_ADDRESS)

    let poolShareDisplay, poolShareDisplay_lp, stakeDisplay, totalPoolLP
    if (staked_lp / 1e18 > 0) {
      let ret = await calculateShare(SNOWGLOBE_CONTRACT, lp_token, staked_lp / 1e18, 1e18, userPool_JOE_AVAX_ETH)
      poolShareDisplay = ret[0]
      poolShareDisplay_lp = ret[1]
      stakeDisplay = ret[2]
      totalPoolLP = ret[3]
    }

    vault({
      logo_token0 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${TOKEN_ADDRESSES[tokens[0]]}/logo.png`,
      logo_token1 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${TOKEN_ADDRESSES[tokens[1]]}/logo.png`,
      logo_token2 : `https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/${TOKEN_ADDRESSES[tokens[2]]}/logo.png`,
      pool_nickname: `StableVault ${symbol}`,
      pool_name: `StableVault ${symbol}`,
      symbol: symbol,
      url: null,
      tvl: null,
      pool_weight: null,
      total_staked: totalStakedPool,
      user_pool_percent: (stakedPoolTokens / 1e18) / (totalStakedPool / 1e18) * 100,
      staked_pool: stakedPoolTokens,
      pending_tokens: pending_snob,
      display_amount: snowglobe_balance > 1000 ? snowglobe_balance / 1e18 : 0,
      approve: 'approveS3F',
      stake: 'stakeS3F',
      unstake: 'withdrawPool8',
      claim: 'claimPool8',
      icequeen_apr: (pool_snob_per_block / 1e18) * 15000 * snobPrice / (totalStakedPool / 1e18) * 100,
      snowglobe_apr: null,
      tvl_display: `${new Intl.NumberFormat('en-US').format(totalStakedPool / 1e18)}`,
      total_pgl: null,
      pool_share_display: `${(stakedPoolTokens / 1e18).toFixed(6)} ${symbol}`,
      pool_share_display_pgl: '',
      stake_display: '',
      snobPrice
    });
  }


  await Promise.all(
    globes.map((globe, index) => {
      return displayGlobe(globe, index)
    }),
  )

  //Contracts
  const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)
  // const STAKING_CONTRACT = new ethers.Contract(STAKING_ADDR, STAKING_ABI, signer)

  
  let pendingSNOBTokensPool = await TOKEN_CONTRACT.earned(App.YOUR_ADDRESS)
  let snobTotalSupply = await SNOB_TOKEN.totalSupply()
  let currentSNOBTokens = await SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS)
  let blockNumber = await App.provider.getBlockNumber()
  // let snowballMultiplier = await ICEQUEEN_CONTRACT.BONUS_MULTIPLIER()
  let snowballsPerBlock = await ICEQUEEN_CONTRACT.snowballPerBlock()

  let currentBlock = await App.provider.getBlock(blockNumber)
  let yesterdayBlock = await App.provider.getBlock(blockNumber - 20000)

  claimableSnowballs += pendingSNOBTokensPool / 1e18;

  //votes
  const CRYSTAL_CONTRACT = new ethers.Contract(CRYSTAL_VAULT_ADDRESS, CRYSTAL_VAULT_ABI, signer);
  const assetsDeposited = await CRYSTAL_CONTRACT.accounts(App.YOUR_ADDRESS);
  const pendingGovReward = await CRYSTAL_CONTRACT.pendingReward(App.YOUR_ADDRESS);
  console.log("PGL deposited:", assetsDeposited.PGL / 1e18);
  console.log("Snowball deposited:", assetsDeposited.snowball / 1e18);
  console.log("Gov pending:", pendingGovReward / 1e18);

  
  const secondsInDay = 86400;
  
  const blocks24hrs = (secondsInDay / (currentBlock.timestamp - yesterdayBlock.timestamp)) * 20000;
  const prices = await getAvaxPrices();  
  const snobPrice = prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'] ? prices['0xC38f41A296A4493Ff429F1238e030924A1542e50'].usd : 0;
  const marketCapDisplay = `$${new Intl.NumberFormat('en-US').format(snobTotalSupply / 1e18 * snobPrice)}`
  
  $('#value-market').append(`$${snobPrice.toFixed(3)}`)
  $('#value-marketcap').append(`${marketCapDisplay}`)
  $('#snob-supply').append(`${(snobTotalSupply / 1e18).toLocaleString()}`)
  $('#snob-supply-max').append(`18,000,000`)
  $('#snob-per-block').append(`${snowballsPerBlock / 1e18}`)
  $('#snob-block-pday').append(`${(snowballsPerBlock / 1e18 * 15000).toLocaleString()}`)
  $('#blocks-24-hrs').append(`~${Math.round(blocks24hrs).toLocaleString()}`)
  $('#distribution_phase').append(`${blockNumber.toLocaleString()} / 3,065,000 (${(3065000 - blockNumber).toLocaleString()} blocks left)`);

  document.getElementById('wallet-copy').addEventListener('click', ()=>{
    navigator.clipboard.writeText(`${App.YOUR_ADDRESS}`).then(function() {
      console.log('Snowball Platform: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Snowball Platform: Could not copy text: ', err);
    });
  });
  let walletAddres = `${App.YOUR_ADDRESS}`;
  $('#wallet-address').html(`${walletAddres}`);
  try {
    if (currentSNOBTokens / 1e18 > 0 || claimableSnowballs > 0 || assetsDeposited.snowball / 1e18 > 0) {
      $('#account-info').show();
      $('#snob-info').show();
      $('#value-snob').append(`${(currentSNOBTokens / 1e18 + claimableSnowballs).toFixed(4)}`);
      $('#value-usd').append(`${((currentSNOBTokens / 1e18 + claimableSnowballs) * snobPrice).toFixed(2)}`);
      $('#wallet').append(`${(currentSNOBTokens / 1e18).toFixed(4)}`);
      $('#governance-snob').append(`In Governance: ${(assetsDeposited.snowball / 1e18).toFixed(4)}`);
      $('#track-portfolio').html(`<ion-icon name="arrow-redo-outline"></ion-icon> <a href='https://markr.io/#/wallet?address=${walletAddres}' target='_blank'>Track Your Portfolio</a>`);
      if (claimableSnowballs > 0) {
        $('#pending').append(`<ion-icon name="time-outline"></ion-icon> Pending: ${(claimableSnowballs).toFixed(4)}`);
      }else{
        $('#pending').append(`<ion-icon name="checkmark-circle" class="text-success"></ion-icon> No pending rewards`);
      }
    }
  } catch {console.log('could not load wallet info')}

  const stakeUnstake = (amount, stake, st) => {
    return `<div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
    <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
    <p class="m-0 font-size-16 font-weight-regular">${amount} ${(st?st:'sPGL')} </p>
    <p class="m-0 font-size-12">(Available to ${(stake? 'Stake': 'Unstake')}) </p>
    </div>`
  }

  const aprDisplay = (cDayAPR, cWeekAPR, cYearAPR) => {
    return `<div class="col-sm-12 col-md-3 align-items-center pb-10">
        <div class="row">
            <p class="w-full text-center">Combined APR :</p>
        </div>
        <div class="row">
            <div class="form-inline w-50 mx-auto">
                <div class="form-group m-md-0">
                    <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                    <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                </div>
            </div>
            <div class="form-inline w-50 mx-auto">
                <div class="form-group m-md-0">
                <p class="m-0 font-size-12 font-weight-regular">${cDayAPR}% </p>
                <p class="m-0 font-size-12 font-weight-regular">${cYearAPR}%</p>
                </div>
            </div>
        </div>
    </div>`    
  }

  const calculateShare = (snowglobeContract, PAIR_ADDR, userSPGL, decimals, pool_percent) => {
    let pglContract = new ethers.Contract(PAIR_ADDR, LP_API, signer)
    return Promise.all([
      snowglobeContract ? snowglobeContract.balance() : Promise.resolve(0), 
      snowglobeContract ? snowglobeContract.totalSupply() : Promise.resolve(0),
      pglContract.totalSupply(),
      pglContract.getReserves(),
      pglContract.token0(),
      pglContract.token1()
    ]).then(res => {
      let totalPoolPGL = res[0];
      let totalSPGL = res[1];
      let totalSupplyPGL = res[2] / 1e18
      let reserves = res[3]
      let token0Address = res[4]
      let token1Address = res[5]
      let ownedPGL = userSPGL * (totalPoolPGL / 1e18) / (totalSPGL / 1e18);
      // wBTC is 8 decimals
      const r0 = token0Address == '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB' ? reserves._reserve0 / 1e8 : reserves._reserve0 / 1e18;
      const r1 = reserves._reserve1 / decimals
      let reserve0Owned = ownedPGL * (r0) / (totalSupplyPGL);
      let reserve1Owned = ownedPGL * (r1) / (totalSupplyPGL);
      const t0Price = prices[token0Address] ? prices[token0Address].usd : 0
      const t1Price = prices[token1Address] ? prices[token1Address].usd : 0
      const token0ValueUSDT = reserve0Owned * t0Price;
      const token1ValueUSDT = reserve1Owned * t1Price;
      const value = token0ValueUSDT + (token1ValueUSDT);
      return [
        `${userSPGL > 1 ? userSPGL.toFixed(3) : userSPGL.toFixed(8)} sPGL`, // TODO:  convert to general symbol
        `${ownedPGL > 1 ? ownedPGL.toFixed(3) : ownedPGL.toFixed(8)} PGL - ${pool_percent.toFixed(6)}%`, // TODO:  convert to general symbol
        `<div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
          <p class="m-0 font-size-12"><ion-icon name="flame-outline"></ion-icon> Your LP value is</p>
          <p class="m-0 font-size-16 font-weight-regular">${reserve0Owned.toFixed(8)} ${TOKEN_NAMES[token0Address]} / ${reserve1Owned.toFixed(8)} ${TOKEN_NAMES[token1Address]}  </p>
          <p class="m-0 font-size-12">($${value.toFixed(2)})</p>
        </div>`,
        totalPoolPGL];
    }).catch( err => {
      console.log('error calculating LP value:', err)
    })    
  }

  function pool(options) {
    if (options.icequeen_apr) {

      var eDayAPR = `${options.icequeen_apr.toFixed(2)}`;
      var eWeekAPR = `${(options.icequeen_apr * 7).toFixed(2)}`;
      var eYearAPR = `${(options.icequeen_apr * 365).toFixed(2)}`;

      var combinedAprDisplay = '';
      if (options.snowglobe_apr) {
        let combinedAPR = options.icequeen_apr + options.snowglobe_apr

        var cDayAPR = `${combinedAPR.toFixed(2)}`;
        var cWeekAPR = `${(combinedAPR * 7).toFixed(2)}`;
        var cYearAPR = `${options.apy.toFixed(2)}`;

        var combinedAprDisplay = aprDisplay(cDayAPR, cWeekAPR, cYearAPR)
      }
    }
    if (options.total_staked && options.total_pgl) {
      

      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${options.total_staked / 1e18 > 1 ? (options.total_staked / 1e18).toLocaleString() : (options.total_staked / 1e18).toFixed(6)} ${globe_symbol} </span>
        <span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${options.total_pgl / 1e18 > 1 ? (options.total_pgl / 1e18).toLocaleString() :(options.total_pgl / 1e18).toFixed(6) } ${lp_symbol}</span>`;

    } else if (options.total_staked) {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} ${globe_symbol} </span>`;
    } else {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${ (options.total_pgl / 1e18).toLocaleString()} ${lp_symbol}</span>`;
    }
    var poolShare = '';
    var estimatedRate = '';
    var earning = '';
    if ( options.user_pool_percent > 0 ) {
      if (options.pool_share_display) {
        var poolShare = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
          <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> Your pool share is</p>
          <p class="m-0 font-size-16 font-weight-regular">${options.pool_share_display} </p>
          <p class="m-0 font-size-12">${options.pool_share_display_pgl} </p>
          </div>`;
      }
      var stakeDisplay = '';
      if (options.stake_display ) {
        stakeDisplay = options.stake_display;
      } else {
        stakeDisplay = '';
      }

      var estimatedRate = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0 mx-auto">
        <p class="m-0 font-size-12"> Estimated Rate</p>
        <span class="badge badge-success font-size-12 px-5 px-sm-10 mx-10">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)} SNOB <ion-icon name="trending-up-outline"></ion-icon></span>
        <p class="m-0 font-size-12">(24hr block rate)</p>
        </div>`;

      var earning = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You are earning</p>
        <p class="m-0 font-size-16 font-weight-regular">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)} SNOB </p>
        <p class="m-0 font-size-12">per day ($${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(Average block rate)</p>
        </div>`
    }
    availableStake = '';
    if ( options.display_amount > 0 ) {
      availableStake = stakeUnstake(options.display_amount.toFixed(8), true);
    }
    availableUnstake = '';
    if ( options.staked_pool / 1e18 > 0 ) {      
      availableUnstake = stakeUnstake((options.staked_pool / 1e18).toFixed(8), false);
    }

    let has_options = false
    approveBtn = '';
    stakeBtn = '';
    unstakeBtn = '';
    claimBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true
      approveBtn = `<button data-btn="${options.approve}" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button data-btn="${options.stake}" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake ${globe_symbol}</button>`;
    }
    if ( options.staked_pool / 1e18 > 0 ) {
      has_options = true
      unstakeBtn = `<button data-btn="${options.unstake}" class="btn btn-sm mx-10 unstakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Unstake ${globe_symbol}</button>`;
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      claimBtn = `<button data-btn="${options.claim}" class="btn btn-primary btn-sm claimBtn"><ion-icon name="push-outline"></ion-icon> Harvest SNOB</button>`;
    }
    if (!has_options){

      var poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens" class="align-items-center d-flex mx-auto mx-md-0">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center d-flex flex-column snob-tvl pb-10 pb-md-0 mx-auto">
                    <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                </div>
                <div class="col-sm-12 col-md-2 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <a href="/compound" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get ${globe_symbol} from Snowglobes</a>
                    <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APYs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display: none;">
                <div class="row">
                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
                        <p class="m-0 font-size-16 font-weight-regular">O ${globe_symbol} </p>
                        <p class="m-0 font-size-12">(No ${globe_symbol} to Stake/Withdraw) </p>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
      $('#snob-pools-unused').append(poolPrint);
    }
    if(has_options){
      var poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens" class="align-items-center d-flex mx-auto mx-md-0">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                ${approveBtn}
                ${stakeBtn}
                ${unstakeBtn}
                ${claimBtn}
                <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APYs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>

            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display:none">
                <div class="row">
                    <div class="col-sm-12 col-md-2 align-items-center d-flex flex-column text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                    </div>
                    ${poolShare}

                </div>
                <div class="row pt-20">
                    ${stakeDisplay || ''}
                    ${availableStake}
                    <div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="flame-outline"></ion-icon> Pending SNOB</p>
                        <p class="m-0 font-size-16 font-weight-regular">${(options.pending_tokens / 1e18).toFixed(6)}</p>
                    </div>
                    ${availableUnstake}
                </div>
            </div>
        </div>
    </div>`;
      $('#snob-pools-used').append(poolPrint);
    }
  }
  function vault(options) {
    if (options.icequeen_apr) {

      var eDayAPR = `${options.icequeen_apr.toFixed(2)}`;
      var eWeekAPR = `${(options.icequeen_apr * 7).toFixed(2)}`;
      var eYearAPR = `${(options.icequeen_apr * 365).toFixed(2)}`;

      var combinedAprDisplay = ''
      if (options.snowglobe_apr) {
        let combinedAPR = options.icequeen_apr + options.snowglobe_apr

        var cDayAPR = `${combinedAPR.toFixed(2)}`;
        var cWeekAPR = `${(combinedAPR * 7).toFixed(2)}`;
        var cYearAPR = `${(combinedAPR * 365).toFixed(2)}`;

        var combinedAprDisplay = aprDisplay(cDayAPR, cWeekAPR, cYearAPR)

      }
    }

    poolSize = '';
    if (options.total_staked) {
      var poolSize = `<span class="badge badge-pill font-size-12 px-5 px-sm-10 mx-5 font-weight-regular">${(options.total_staked / 1e18).toLocaleString()} S3D </span>`;
    }
    var estimatedRate = '';
    var poolShare = '';
    var earning = '';
    var stakeDisplay = '';
    
    if ( options.user_pool_percent > 0 ) {
      if (options.pool_share_display) {
        poolShare = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> Your pool share is</p>
        <p class="m-0 font-size-16 font-weight-regular">${options.pool_share_display} </p>
        <p class="m-0 font-size-12">(${options.user_pool_percent.toFixed(6)}%)</p>
        </div>`;
      }
      if (options.stake_display) {
        stakeDisplay = options.stake_display;
      }

      var estimatedRate = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0 mx-auto">
        <p class="m-0 font-size-12"> Estimated Rate</p>
        <span class="badge badge-success font-size-12 px-5 px-sm-10 mx-10">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs).toFixed(2)} SNOB <ion-icon name="trending-up-outline"></ion-icon></span>
        <p class="m-0 font-size-12">per day ($${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * blocks24hrs * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(24hr block rate)</p>
        </div>`;

      var earning = `<div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You are earning</p>
        <p class="m-0 font-size-16 font-weight-regular">${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000).toFixed(2)} SNOB </p>
        <p class="m-0 font-size-12">per day ($${(snowballsPerBlock * options.pool_weight * options.user_pool_percent / 100 / 1e18 * 15000 * snobPrice).toFixed(2)})</p>
        <p class="m-0 font-size-12">(Average block rate)</p>
        </div>`
    }
    var availableStake = '';
    if ( options.display_amount > 0 ) {
      availableStake = stakeUnstake(options.display_amount.toFixed(6), true, options.symbol);
    }
    var availableUnstake = ''
    if ( options.staked_pool / 1e18 > 0 ) {
      availableUnstake = stakeUnstake((options.staked_pool / 1e18).toFixed(6), false, options.symbol);
    }
    let has_options = false
    approveBtn = '';
    stakeBtn = '';
    unstakeBtn = '';
    claimBtn = '';
    if ( options.display_amount > 0 ) {
      has_options = true
      approveBtn = `<button data-btn="${options.approve}" class="btn btn-sm mx-10 approveBtn" ><ion-icon name="bag-check-outline" role="img" class="md hydrated" aria-label="bag check outline"></ion-icon> Approve</button>`;
      stakeBtn = `<button data-btn="${options.stake}" class="btn btn-sm mx-10 btn-success stakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Stake ${options.symbol}</button>`;
    }
    if ( options.staked_pool / 1e18 > 0 ) {
      has_options = true
      unstakeBtn = `<button data-btn="${options.unstake}" class="btn btn-sm mx-10 unstakeBtn"><ion-icon name="lock-open-outline"></ion-icon> Unstake ${options.symbol}</button>`;
    }
    if ( options.pending_tokens / 1e18 > 0 ) {
      has_options = true
      claimBtn = `<button data-btn="${options.claim}" class="btn btn-primary btn-sm claimBtn"><ion-icon name="push-outline"></ion-icon> Harvest SNOB</button>`;
    }

    if( !has_options ){
      let poolPrint = `<div class="col-md-12">
        <div class="card border-0 p-10 pl-20 pr-20 mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                    <div id="pooltokens-3sd" class="align-items-center d-flex mx-auto mx-md-0 ">
                        <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                        <img class="rounded-circle" width="48" src="${options.logo_token3}" alt="${options.pool_name}">
                        <h6 class="pl-10 m-0">${options.pool_name}</h6>
                    </div>
                </div>
                <div class="col-sm-12 col-md-1 align-items-center text-center snob-tvl pb-10 pb-md-0 ${options.tvl_class}">
                    <p class="m-0 font-size-12"><ion-icon name="lock-closed-outline"></ion-icon> Total Value Locked</p>
                    <span class="badge font-size-12 px-5 px-sm-10 mx-5">${options.tvl_display}</span>
                </div>
                <div class="col-sm-12 col-md-2 d-flex align-items-center pb-10 pb-md-0 mx-auto">
                    <div class="form-inline w-50 mx-auto">
                        <div class="form-group m-md-0">
                            <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                            <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                        </div>
                    </div>
                    <div class="form-inline w-50 mx-auto mx-md-0">
                        <div class="form-group m-md-0">
                        <p class="m-0 font-size-12 font-weight-regular">${eDayAPR}% </p>
                        <p class="m-0 font-size-12 font-weight-regular">${eYearAPR}% </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 align-items-center text-center d-flex flex-column snob-tvl pb-10 pb-md-0 mx-auto">
                    <p class="m-0 font-size-12"> Pool Size</p>
                        ${poolSize}
                </div>
                <div class="col-sm-12 col-md-2 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <a href="/stablevault" class="btn btn-primary btn-sm"><ion-icon name="link-outline"></ion-icon> Get ${options.symbol} from StableVault</a>
                    <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APYs and TVL on Markr.io</a>
                </div>

                <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                    <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
                </div>
            </div>
            <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display: none;">
                <div class="row">

                    <div class="col-sm-12 col-md-3 align-items-center text-center snob-tvl pb-10 pb-md-0">
                        <p class="m-0 font-size-12"><ion-icon name="pie-chart-outline"></ion-icon> You have</p>
                        <p class="m-0 font-size-16 font-weight-regular">O ${options.symbol} </p>
                        <p class="m-0 font-size-12">(No ${options.symbol} to Stake/Withdraw) </p>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
      $('#snob-pools-new').append(poolPrint);
    }
    if(has_options){
      var poolPrint = `<div class="col-md-12">
      <div class="card border-0 p-10 pl-20 pr-20 mt-5">
          <div class="row">
              <div class="col-sm-12 col-md-3 align-items-center d-flex pb-10 pb-md-0">
                  <div id="pooltokens-3sd" class="align-items-center d-flex mx-auto mx-md-0">
                      <img class="rounded-circle" width="48" src="${options.logo_token1}" alt="${options.pool_name}">
                      <img class="rounded-circle" width="48" src="${options.logo_token2}" alt="${options.pool_name}">
                      <img class="rounded-circle" width="48" src="${options.logo_token3}" alt="${options.pool_name}">
                      <h6 class="pl-10 m-0">${options.pool_name}</h6>
                  </div>
              </div>
              <div class="col-sm-12 col-md-1 align-items-center text-center snob-tvl pb-10 pb-md-0 ${options.tvl_class}">
                  <p class="m-0 font-size-12"><ion-icon name="lock-closed-outline"></ion-icon> Total Value Locked</p>
                  <span class="badge font-size-12 px-5 px-sm-10 mx-5">${options.tvl_display}</span>
              </div>
              <div class="col-sm-12 col-md-2 d-flex align-items-center pb-10 pb-md-0 mx-auto">
                  <div class="form-inline w-50 mx-auto">
                      <div class="form-group m-md-0">
                          <p class="m-0 font-size-12 font-weight-light">Daily:</p>
                          <p class="m-0 font-size-12 font-weight-light">Yearly:</p>
                      </div>
                  </div>
                  <div class="form-inline w-50 mx-auto mx-md-0">
                      <div class="form-group m-md-0">
                      <p class="m-0 font-size-12 font-weight-regular">${eDayAPR}% </p>
                      <p class="m-0 font-size-12 font-weight-regular">${eYearAPR}%</p>
                      </div>
                  </div>

              </div>
              <div class="col-sm-12 col-md-3 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
              ${approveBtn}
              ${stakeBtn}
              ${unstakeBtn}
              ${claimBtn}
              <a href="https://markr.io/#/applications/Snowball" target="_blank" class="btn btn-primary btn-sm mt-5"><ion-icon name="calculator"></ion-icon> Check APYs and TVL on Markr.io</a>
              </div>

              <div onclick="toggleDetails('${options.pool_nickname}');" class="col-sm-12 col-md-1 align-items-center text-center text-md-right snob-tvl pb-10 pb-md-0 mx-auto">
                  <ion-icon class="pointer" alt="More Details" name="chevron-down-outline"></ion-icon>
              </div>
          </div>

          <div id="details-${options.pool_nickname}" class="border-top mt-20 pt-10 pb-10" style="display:none">
              <div class="row">

                  <div class="col-sm-12 col-md-2 align-items-center d-flex flex-column text-center snob-tvl pb-10 pb-md-0">
                      <p class="m-0 font-size-12"> Pool Size</p>
                      ${poolSize}
                  </div>
                  ${poolShare}
                  <div class="col-sm-12 col-md-2 align-items-center text-center snob-tvl pb-10 pb-md-0">
                      <p class="m-0 font-size-12"><ion-icon name="flame-outline"></ion-icon> Pending SNOB</p>
                      <p class="m-0 font-size-16 font-weight-regular">${(options.pending_tokens / 1e18).toFixed(6)}</p>
                  </div>

              </div>
              <div class="row pt-20">

                  ${availableStake}
                  
                  ${availableUnstake}
              </div>
          </div>
      </div>
  </div>`;
      $('#snob-pools-new').append(poolPrint);
    }
  }


  function updateButtonHandlers() {
    $(".unstakeBtn").unbind('click');
    $(".unstakeBtn").click(function(){
      let fn = $(this).attr("data-btn");
      switch (fn) {
        case 'withdrawPool1':
          withdrawPool1();
          break;
        case 'withdrawPool2':
          withdrawPool2();
          break;
        case 'withdrawPool3':
          withdrawPool3();
          break;
        case 'withdrawPool4':
          withdrawPool4();
          break;
        case 'withdrawPool5':
          withdrawPool5();
          break;
        case 'withdrawPool6':
          withdrawPool6();
          break;
        case 'withdrawPool7':
          withdrawPool7();
          break;
        case 'withdrawPool8':
          withdrawPool8();
          break;
        case 'withdrawWBTC_AVAX':
          withdrawWBTC_AVAX();
          break;
        case 'withdrawDAI_AVAX':
          withdrawDAI_AVAX();
          break;
        case 'withdrawUNI_AVAX':
          withdrawUNI_AVAX();
          break;
        case 'withdrawWBTC_PNG':
          withdrawWBTC_PNG();
          break;
        case 'withdrawLINK_PNG':
          withdrawLINK_PNG();
          break;
        case 'withdrawUSDT_PNG':
          withdrawUSDT_PNG();
          break;
        case 'withdrawSUSHI_PNG':
          withdrawSUSHI_PNG();
          break;
        case 'withdrawDAI_PNG':
          withdrawDAI_PNG();
          break;
        case 'withdrawAAVE_PNG':
          withdrawAAVE_PNG();
          break;
        case 'withdrawUNI_PNG':
          withdrawUNI_PNG();
          break;
        case 'withdrawYFI_PNG':
          withdrawYFI_PNG();
          break;
        case 'withdrawETH_PNG':
          withdrawETH_PNG();
          break;
        case 'withdrawPNG_SNOB':
          withdrawPNG_SNOB();
          break;
        case 'withdrawPNG_VSO':
          withdrawPNG_VSO();
          break;
        case 'withdrawAVAX_VSO':
          withdrawAVAX_VSO();
          break;
        case 'withdrawPNG_SPORE':
          withdrawPNG_SPORE();
          break;
        case 'withdrawAVAX_SPORE':
          withdrawAVAX_SPORE();
          break;
        case 'withdrawJOE_AVAX_ETH':
          withdrawJOE_AVAX_ETH();
          break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  
    $(".claimBtn").unbind('click');
    $(".claimBtn").click(function(){
      let fn = $(this).attr("data-btn");
      switch (fn) {
        case 'claimPool1':
          claimPool1();
          break;
        case 'claimPool2':
          claimPool2();
          break;
        case 'claimPool3':
          claimPool3();
          break;
        case 'claimPool4':
          claimPool4();
          break;
        case 'claimPool5':
          claimPool5();
          break;
        case 'claimPool6':
          claimPool6();
          break;
        case 'claimPool7':
          claimPool7();
          break;
        case 'claimPool8':
          claimPool8();
          break;
        case 'claimWBTC_AVAX':
          claimWBTC_AVAX();
          break;
        case 'claimDAI_AVAX':
          claimDAI_AVAX();
          break;
        case 'claimUNI_AVAX':
          claimUNI_AVAX();
          break;
        case 'claimWBTC_PNG':
          claimWBTC_PNG();
          break;
        case 'claimLINK_PNG':
          claimLINK_PNG();
          break;
        case 'claimUSDT_PNG':
          claimUSDT_PNG();
          break;
        case 'claimSUSHI_PNG':
          claimSUSHI_PNG();
          break;
        case 'claimDAI_PNG':
          claimDAI_PNG();
          break;
        case 'claimAAVE_PNG':
          claimAAVE_PNG();
          break;
        case 'claimUNI_PNG':
          claimUNI_PNG();
          break;
        case 'claimYFI_PNG':
          claimYFI_PNG();
          break;
        case 'claimETH_PNG':
          claimETH_PNG();
          break;
        case 'claimPNG_SNOB':
          claimPNG_SNOB();
          break;
        case 'claimPNG_VSO':
          claimPNG_VSO();
          break;
        case 'claimAVAX_VSO':
          claimAVAX_VSO();
          break;
        case 'claimPNG_SPORE':
          claimPNG_SPORE();
          break;
        case 'claimAVAX_SPORE':
          claimAVAX_SPORE();
          break;
        case 'claimJOE_AVAX_ETH':
          claimJOE_AVAX_ETH();
          break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  
    $(".approveBtn").unbind('click');
    $(".approveBtn").click(function(){
      let fn = $(this).attr("data-btn");
      switch (fn) {
        case 'approveSPGLSUSHI':
          approveSPGLSUSHI();
          break;
        case 'approveSNOB':
          approveSNOB();
          break;
        case 'approveSPGLPNG':
          approveSPGLPNG();
          break;
        case 'approveSPGLETH':
          approveSPGLETH();
          break;
        case 'approveSPGLUSDT':
          approveSPGLUSDT();
          break;
        case 'approveSPGLLINK':
          approveSPGLLINK();
          break;
        case 'approveS3D':
          approveS3D();
          break;
        case 'approveS3F':
          approveS3F();
          break;
        case 'approveWBTC_AVAX':
          approveWBTC_AVAX();
          break;
        case 'approveDAI_AVAX':
          approveDAI_AVAX();
          break;
        case 'approveUNI_AVAX':
          approveUNI_AVAX();
          break;
        case 'approveWBTC_PNG':
          approveWBTC_PNG();
          break;
        case 'approveLINK_PNG':
          approveLINK_PNG();
          break;
        case 'approveUSDT_PNG':
          approveUSDT_PNG();
          break;
        case 'approveSUSHI_PNG':
          approveSUSHI_PNG();
          break;
        case 'approveDAI_PNG':
          approveDAI_PNG();
          break;
        case 'approveAAVE_PNG':
          approveAAVE_PNG();
          break;
        case 'approveUNI_PNG':
          approveUNI_PNG();
          break;
        case 'approveYFI_PNG':
          approveYFI_PNG();
          break;
        case 'approveETH_PNG':
          approveETH_PNG();
          break;
        case 'approvePNG_SNOB':
          approvePNG_SNOB();
          break;
        case 'approvePNG_VSO':
          approvePNG_VSO();
          break;
        case 'approveAVAX_VSO':
          approveAVAX_VSO();
          break;
        case 'approvePNG_SPORE':
          approvePNG_SPORE();
          break;
        case 'approveAVAX_SPORE':
          approveAVAX_SPORE();
          break;
          case 'approveJOE_AVAX_ETH':
            approveJOE_AVAX_ETH();
            break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  
    $(".stakeBtn").unbind('click');
    $(".stakeBtn").click(function(){
      let fn = $(this).attr("data-btn");
      switch (fn) {
        case 'stakeSPGLSUSHI':
          stakeSPGLSUSHI();
          break;
        case 'stakeSNOB':
          stakeSNOB();
          break;
        case 'stakeSPGLPNG':
          stakeSPGLPNG();
          break;
        case 'stakeSPGLETH':
          stakeSPGLETH();
          break;
        case 'stakeSPGLUSDT':
          stakeSPGLUSDT();
          break;
        case 'stakeSPGLLINK':
          stakeSPGLLINK();
          break;
        case 'stakeS3D':
          stakeS3D();
          break;
        case 'stakeS3F':
          stakeS3F();
          break;
        case 'stakeWBTC_AVAX':
          stakeWBTC_AVAX();
          break;
        case 'stakeDAI_AVAX':
          stakeDAI_AVAX();
          break;
        case 'stakeUNI_AVAX':
          stakeUNI_AVAX();
          break;
        case 'stakeWBTC_PNG':
          stakeWBTC_PNG();
          break;
        case 'stakeLINK_PNG':
          stakeLINK_PNG();
          break;
        case 'stakeUSDT_PNG':
          stakeUSDT_PNG();
          break;
        case 'stakeSUSHI_PNG':
          stakeSUSHI_PNG();
          break;
        case 'stakeDAI_PNG':
          stakeDAI_PNG();
          break;
        case 'stakeAAVE_PNG':
          stakeAAVE_PNG();
          break;
        case 'stakeUNI_PNG':
          stakeUNI_PNG();
          break;
        case 'stakeYFI_PNG':
          stakeYFI_PNG();
          break;
        case 'stakeETH_PNG':
          stakeETH_PNG();
          break;
        case 'stakePNG_SNOB':
          stakePNG_SNOB();
          break;
        case 'stakePNG_VSO':
          stakePNG_VSO();
          break;
        case 'stakeAVAX_VSO':
          stakeAVAX_VSO();
          break;
        case 'stakePNG_SPORE':
          stakePNG_SPORE();
          break;
        case 'stakeAVAX_SPORE':
          stakeAVAX_SPORE();
          break;
        case 'stakeJOE_AVAX_ETH':
          stakeJOE_AVAX_ETH();
          break;
        default:
          alert('Oops something went wrong. Try refreshing the page.');
      }
    });
  }

  updateButtonHandlers();
  hideLoading();
}


const approveGauge = async function(stakingToken, gaugeAddress, App) {
  const signer = App.provider.getSigner();
  const STAKING_TOKEN = new ethers.Contract(stakingToken, ERC20_ABI, signer);
  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, gaugeAddress);
  let allow = Promise.resolve();
  halfmoon.toggleModal('modal-loading');
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
    halfmoon.toggleModal('modal-loading')
    snobMessage(`Connected successfully`, `Already approved . <br>You can use the deposit/withdrawals options`, `checkmark-circle-outline`, `success`, false, `ok`, 4000);
  } else {
    allow = STAKING_TOKEN.approve(gaugeAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        halfmoon.toggleModal('modal-loading')
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Connecting to metamask`, `Approval failed . Please check your Metamask Wallet`, `close-circle-outline`, `danger`, false, `ok`, 4000);
      })
  }
}


const gaugeContractStake = async function(gaugeAddress, gaugeAbi, stakeTokenAddr, stakeTokenAbi, App) {
  const signer = App.provider.getSigner();
  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, stakeTokenAbi, signer);
  const GAUGE_CONTRACT = new ethers.Contract(gaugeAddress, gaugeAbi, signer);
  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, gaugeAddress);
  let allow = Promise.resolve();
  if (allowedTokens / 1e18 == 0) {
    snobMessage(`Approve spending`, `Please approve spending first. Please check your Metamask Wallet`, `information-circle-outline`, `primary`, false, `ok`);
  } else if (currentTokens / 1e18 > 0) {
    halfmoon.toggleModal('modal-loading');
    allow.then(async function() {
      GAUGE_CONTRACT.deposit(currentTokens).then(function(t) {
        App.provider.waitForTransaction(t.hash).then(function () {
          halfmoon.toggleModal('modal-loading');
          snobMessage(`Tokens deposit`, `Tokens deposited. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
          setTimeout(function(){ window.location.reload(true); }, 6000);
        });
      });
    })
    .catch(function () {
        halfmoon.toggleModal('modal-loading');
        snobMessage(`Oops! Failed`, `Deposit Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      })
  } else {
    snobMessage(`Oops! Failed`, `You have no tokens to stake`, `close-circle-outline`, `danger`, false, `ok`, false);
  }
}

const gaugeContractWithdraw = async function (gaugeAddress, gaugeAbi, App) {
  const signer = App.provider.getSigner();
  console.log(signer);
  const GAUGE_CONTRACT = new ethers.Contract(gaugeAddress, gaugeAbi, signer);
  const currentTokens = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS);
  console.log(currentTokens / 1e18);
  let allow = Promise.resolve();
  if(currentTokens / 1e18 > 0) {
    halfmoon.toggleModal('modal-loading');
    allow.then(async function() {
      GAUGE_CONTRACT.withdraw(currentTokens).then(function(t) {
        App.provider.waitForTransaction(t.hash).then(function () {
          halfmoon.toggleModal('modal-loading');
          snobMessage(`Withdrawn Tokens`, `Tokens Withdrawn. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
          setTimeout(function(){ window.location.reload(true); }, 6000);
        });
      }).catch(function() {
        halfmoon.toggleModal('modal-loading')
        snobMessage(`Oops! Failed`, `Withdrawn Failed. Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      });
    }).catch(function () {
      halfmoon.toggleModal('modal-loading')
      snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
    });
  } else {
    snobMessage(`Withdrawn Tokens`, `Withdraw failed . Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, 4000);
  }
}

const gaugeClaim = async function (gaugeAddress, gaugeAbi, App) {
  const signer = App.provider.getSigner();
  const GAUGE_CONTRACT = new ethers.Contract(gaugeAddress, gaugeAbi, signer);
  const pendingRewards = await GAUGE_CONTRACT.earned(App.YOUR_ADDRESS);
  let allow = Promise.resolve();
  if (pendingRewards / 1e18 == 0) {
    snobMessage(`Oops`, `You have no rewards to claim`, `information-circle-outline`, `primary`, false, `ok`, 4000);
  } else {
    halfmoon.toggleModal('modal-loading');
    allow.then(async function() {
      GAUGE_CONTRACT.getReward().then(function(t) {
        App.provider.waitForTransaction(t.hash).then(function() {
          halfmoon.toggleModal('modal-loading');
          snobMessage(`Withdrawn Tokens`, `Rewards claimed. We will refresh the browser in 5 seconds to see balance.`, `checkmark-circle-outline`, `success`, false, `ok`);
          setTimeout(function(){ window.location.reload(true); }, 6000);
        });
      }).catch(function() {
        halfmoon.toggleModal('modal-loading');
        snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
      });
    }).catch(function() {
      halfmoon.toggleModal('modal-loading');
      snobMessage(`Oops! Failed`, `Something went wrong`, `close-circle-outline`, `danger`, false, `ok`, false);
    })
  }
}

const snobMessage = (title, message, icon, state, btn1, btn2, time) =>{
  $('#snob-title-modal').html('').html(title);
  $('#snob-message-modal').html('').html(message);
  if (icon) {
    if(state){
      icon = `<ion-icon class="text-${state}" name="${icon}"></ion-icon>`;
    } else{
      icon = `<ion-icon name="${icon}"></ion-icon>`;
    }
  }else{
    icon = '';
  }
  switch (btn1) {
    case 'close':
      btn1 = `<button class="btn mr-5" data-dismiss="modal">Close</button>`;
      break;
    case 'ok':
      btn1 = `<button class="btn mr-5" data-dismiss="modal">Ok</button>`;
      break;
    case 'reload':
      btn1 = `<button onclick="window.location.reload(true);" class="btn mr-5" data-dismiss="modal">Reload</button>`;
      break;
    default:
      btn = ``;
      break;
  }
  switch (btn2) {
    case 'close':
      btn2 = `<button class="btn btn-primary" data-dismiss="modal">Close</button>`;
      break;
    case 'ok':
      btn2 = `<button class="btn btn-primary" data-dismiss="modal">Ok</button>`;
      break;
    case 'reload':
      btn2 = `<button onclick="window.location.reload(true);" class="btn btn-primary" data-dismiss="modal">Reload</button>`;
      break;
    default:
      btn = ``;
      break;
  }

  $('#snob-icon-modal').html('').html(`${icon}`);
  $('#snob-btn-modal').html('').append(btn1).append(btn2);
  halfmoon.toggleModal('modal-message')
  if(time){
    setTimeout(function(){ $('#modal-message').removeClass('show');   }, time);
  }

}

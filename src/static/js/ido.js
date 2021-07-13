$(function() {
    consoleInit()
    start(main)
})
async function main() {
  const App = await init_ethers()
  const signer = App.provider.getSigner()

  //ABIS
  const SHERPA_NFT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"approved","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"bool","name":"approved","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_TOKENS_PER_ADDRESS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"TOKEN_LIMIT","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"_feeAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"_salePrice","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_value","internalType":"uint256"}],"name":"_tokenIds","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"_xSNOB","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"_xSNOBRequired","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"addressMintAvailable","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"baseURI","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[],"name":"buyNFT","inputs":[{"type":"uint256","name":"count","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"ownerMint","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBaseURI","inputs":[{"type":"string","name":"baseURI","internalType":"string"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenByIndex","inputs":[{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenOfOwnerByIndex","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"tokensOfOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateFeeAddress","inputs":[{"type":"address","name":"addr","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMaxTokens","inputs":[{"type":"uint256","name":"maxTokens","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateSalePrice","inputs":[{"type":"uint256","name":"price","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateTokenLimit","inputs":[{"type":"uint256","name":"tokenLimit","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatexSNOBRequired","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IxSNOB"}],"name":"xSNOB","inputs":[]}]
  const XSNOB_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"approved","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"bool","name":"approved","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_TOKENS_PER_ADDRESS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"TOKEN_LIMIT","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"_feeAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"_salePrice","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_value","internalType":"uint256"}],"name":"_tokenIds","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"_xSNOB","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"_xSNOBRequired","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"addressMintAvailable","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"baseURI","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[],"name":"buyNFT","inputs":[{"type":"uint256","name":"count","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"ownerMint","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBaseURI","inputs":[{"type":"string","name":"baseURI","internalType":"string"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenByIndex","inputs":[{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenOfOwnerByIndex","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"tokensOfOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateFeeAddress","inputs":[{"type":"address","name":"addr","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMaxPerAddress","inputs":[{"type":"uint256","name":"maxTokens","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateSalePrice","inputs":[{"type":"uint256","name":"price","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateTokenLimit","inputs":[{"type":"uint256","name":"tokenLimit","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatexSNOBRequired","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IxSNOB"}],"name":"xSNOB","inputs":[]}]

  //FUJI
  // const SHERPA_NFT_ADDRESS = '0x47D8fAB478d3c064A2640bBca2988F9228916113';
  // const XSNOB_ADDRESS = "0x9a37dc4f28c38813a6d31391721376066fbb401d";

  // MAINNET
  const SHERPA_NFT_ADDRESS = '0x1b60d88Cb3db98a02594A85D0F823aC08194100F';
  const XSNOB_ADDRESS = "0x83952E7ab4aca74ca96217D6F8f7591BEaD6D64E";

  $("#wallet_address").html(App.YOUR_ADDRESS);

  const XSNOB = new ethers.Contract(XSNOB_ADDRESS, XSNOB_ABI, signer);
  const currentXSNOB = await XSNOB['balanceOf(address)'](App.YOUR_ADDRESS);
  $("#balance").html((currentXSNOB / 1e18).toLocaleString());

  // NFT
  const SHERPA_NFT_CONTRACT = new ethers.Contract(
    SHERPA_NFT_ADDRESS,
    SHERPA_NFT_ABI,
    signer
  );
  const avax_balance = await App.provider.getBalance(App.YOUR_ADDRESS);
  const xsnob_required = await SHERPA_NFT_CONTRACT._xSNOBRequired();
  const sale_price = await SHERPA_NFT_CONTRACT._salePrice();
  const nft_max = await SHERPA_NFT_CONTRACT.TOKEN_LIMIT();
  const nft_minted = await SHERPA_NFT_CONTRACT.totalSupply();
  const nft_balance = await SHERPA_NFT_CONTRACT.balanceOf(App.YOUR_ADDRESS);
  const nft_max_per_address = await SHERPA_NFT_CONTRACT.MAX_TOKENS_PER_ADDRESS();
  const total_purchasable = Math.floor((currentXSNOB / 1e18) / (xsnob_required / 1e18));
  let purchasable = total_purchasable > nft_max_per_address ? nft_max_per_address : total_purchasable;
  let sale_ended = (nft_minted * 1) >= (nft_max * 1);
  $("#sale_price").html(sale_price / 1e18);
  $("#xsnob_required").html(xsnob_required / 1e18);
  $("#nfts_owned").html(nft_balance * 1);
  if (sale_ended) {
    $("#purchasable").html(`Sale has ended. All NFTs have been sold.`);
  } else {
    $("#purchasable").html(`You can purchase ${purchasable - nft_balance} more NFTs today`);
  }
  $("#max_supply").html(nft_max);
  $("#minted").html(`${nft_minted} / ${nft_max}`);
  if (sale_ended) {
    $("#sale_ended").show();
    $(".buy-button").hide();
  } else if ((purchasable - nft_balance) < 1) {
    $("#limit_reached").show();
    $(".buy-button").hide();
  } else {
    $(".buy-button").show();
  }
  // click functions for buy buttons
  for (let i = 1; i <= 10; i++){
    let cost = ((sale_price / 1e18) * i).toFixed(2).toString();
    let limit = purchasable - nft_balance;
    $('#buy-' + i).click(function() {
      if (i > limit) {
        alert("Cannot purchase, over daily limit / not enough xSNOB");
      } else if ((avax_balance / 1e18) < ((sale_price / 1e18) * i)){
        alert("Not enough AVAX in wallet to purchase");
      } else {
        buy_nft(
          SHERPA_NFT_ABI,
          SHERPA_NFT_ADDRESS,
          App,
          i,
          cost
        )
      }
    })
  }

  hideLoading()
}

const buy_nft = async function(abi, address, App, amount, cost) {
    const signer = App.provider.getSigner()
    console.log(signer)

    const NFT_CONTRACT = new ethers.Contract(address, abi, signer)

    let allow = Promise.resolve()

    showLoading()

    allow
        .then(async function() {
            let overrides = {
                value: ethers.utils.parseEther(cost),
            }
            NFT_CONTRACT.buyNFT(amount, overrides)
                .then(function(t) {
                    App.provider.waitForTransaction(t.hash).then(function() {
                        hideLoading()
                        alert('NFT Minted. Refresh page to NFTs')
                    })
                })
                .catch(function(e) {
                    hideLoading()
                    alert('Could not mint NFT')
                })
        })
        .catch(function(e) {
            hideLoading()
            alert('Could not mint NFT')
        })
}
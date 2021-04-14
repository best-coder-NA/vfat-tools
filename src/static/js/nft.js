$(function () {
  consoleInit();
  start(main);
});
async function main() {
  const App = await init_ethers();
  const signer = App.provider.getSigner()


  //ABIS
  const EARLY_VOTER_ABI =   [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"approved","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"bool","name":"approved","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_MINTS_PER_ADDRESS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"_metadata","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"addressMintAvailable","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claim","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IGovernance"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"ownerMint","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMetadata","inputs":[{"type":"string","name":"metadata","internalType":"string"}]}]  // const GOVERNANCE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_crystalVault","internalType":"address"},{"type":"address","name":"_governer","internalType":"address"}]},{"type":"event","name":"GovernerAdded","inputs":[{"type":"address","name":"governer","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"GovernerRemoved","inputs":[{"type":"address","name":"governer","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"NewCrystalVault","inputs":[{"type":"address","name":"crystalVault","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"NewProposal","inputs":[{"type":"address","name":"proposer","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"string","name":"title","internalType":"string","indexed":false}],"anonymous":false},{"type":"event","name":"NewVote","inputs":[{"type":"address","name":"voter","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"bool","name":"support","internalType":"bool","indexed":false},{"type":"uint256","name":"votes","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalExecuted","inputs":[{"type":"address","name":"executor","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addGoverner","inputs":[{"type":"address","name":"_governer","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ICrystalVault"}],"name":"crystalVault","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"execute","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"address","name":"_target","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"executionDelay","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"executionExpiration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"},{"type":"bool","name":"","internalType":"bool"},{"type":"uint256","name":"","internalType":"uint256"}],"name":"getVote","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"address","name":"_voter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"governers","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"minimumVotingPeriod","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalCount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalThreshold","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"id","internalType":"uint256"},{"type":"string","name":"title","internalType":"string"},{"type":"address","name":"proposer","internalType":"address"},{"type":"address","name":"executor","internalType":"address"},{"type":"uint256","name":"startTime","internalType":"uint256"},{"type":"uint256","name":"votingPeriod","internalType":"uint256"},{"type":"uint256","name":"forVotes","internalType":"uint256"},{"type":"uint256","name":"againstVotes","internalType":"uint256"},{"type":"bytes32","name":"txHash","internalType":"bytes32"}],"name":"proposals","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"propose","inputs":[{"type":"string","name":"_title","internalType":"string"},{"type":"uint256","name":"_votingPeriod","internalType":"uint256"},{"type":"address","name":"_target","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quorumVotes","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeGoverner","inputs":[{"type":"address","name":"_governer","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCrystalVault","inputs":[{"type":"address","name":"_crystalVault","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExecutionDelay","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExecutionExpiration","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMinimumVotingPeriod","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setProposalThreshold","inputs":[{"type":"uint256","name":"_votes","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setQuorumVotes","inputs":[{"type":"uint256","name":"_votes","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"enum Governance.ProposalState"}],"name":"state","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"vote","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"bool","name":"_support","internalType":"bool"}]}]
  const GOVERNANCE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_crystalVault","internalType":"address"},{"type":"address","name":"_governer","internalType":"address"}]},{"type":"event","name":"GovernerAdded","inputs":[{"type":"address","name":"governer","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"GovernerRemoved","inputs":[{"type":"address","name":"governer","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"NewCrystalVault","inputs":[{"type":"address","name":"crystalVault","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"NewProposal","inputs":[{"type":"address","name":"proposer","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"string","name":"title","internalType":"string","indexed":false}],"anonymous":false},{"type":"event","name":"NewVote","inputs":[{"type":"address","name":"voter","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"bool","name":"support","internalType":"bool","indexed":false},{"type":"uint256","name":"votes","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalExecuted","inputs":[{"type":"address","name":"executor","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addGoverner","inputs":[{"type":"address","name":"_governer","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ICrystalVault"}],"name":"crystalVault","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"execute","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"address","name":"_target","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"executionDelay","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"executionExpiration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"getVote","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"address","name":"_voter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"governers","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"minimumVotingPeriod","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalCount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalThreshold","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"id","internalType":"uint256"},{"type":"string","name":"title","internalType":"string"},{"type":"address","name":"proposer","internalType":"address"},{"type":"address","name":"executor","internalType":"address"},{"type":"uint256","name":"startTime","internalType":"uint256"},{"type":"uint256","name":"votingPeriod","internalType":"uint256"},{"type":"uint256","name":"forVotes","internalType":"uint256"},{"type":"uint256","name":"againstVotes","internalType":"uint256"},{"type":"bytes32","name":"txHash","internalType":"bytes32"}],"name":"proposals","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"propose","inputs":[{"type":"string","name":"_title","internalType":"string"},{"type":"uint256","name":"_votingPeriod","internalType":"uint256"},{"type":"address","name":"_target","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quorumVotes","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeGoverner","inputs":[{"type":"address","name":"_governer","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCrystalVault","inputs":[{"type":"address","name":"_crystalVault","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExecutionDelay","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExecutionExpiration","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMinimumVotingPeriod","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setProposalThreshold","inputs":[{"type":"uint256","name":"_votes","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setQuorumVotes","inputs":[{"type":"uint256","name":"_votes","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"enum Governance.ProposalState"}],"name":"state","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"vote","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"bool","name":"_support","internalType":"bool"}]}]
  const ROLLING_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"approved","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"bool","name":"approved","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_MINTS_PER_ADDRESS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"TOKEN_LIMIT","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"_feeAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"_metadata","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"_price","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_value","internalType":"uint256"}],"name":"_tokenIds","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"addressMintAvailable","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"baseURI","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"payable","outputs":[],"name":"mint","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"ownerMint","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenByIndex","inputs":[{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenOfOwnerByIndex","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"tokensOfOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateFeeAddress","inputs":[{"type":"address","name":"addr","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMetadata","inputs":[{"type":"string","name":"metadata","internalType":"string"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePrice","inputs":[{"type":"uint256","name":"price","internalType":"uint256"}]}]

  const GOVERNANCE_ADDRESS = "0x914556b16c1220e4af63084dB1acbD4e6f9c65Aa";
  const EARLY_VOTER_ADDRESS = "0x7B097A18738cA9Fd524384Dab74c57CB12DAC724";

  async function printRolling(options) {
    const ROLLING_ADDRESS = options.addr;
    printShopItem(options.name, options.img_url, options.title, options.description, options.minted, options.max, options.artist, options.border, options.cost, options.buy_id, options.balance, options.rainbow);
    $("#"+options.buy_id).click(function(){
      buy_rolling(ROLLING_ABI, ROLLING_ADDRESS, App, options.cost)
    });
    if (options.balance > 0) {
      options.owned.forEach(id => {
        printNFT(options.name, options.img_url, options.title, options.description, id, options.max, options.artist, options.border, options.rainbow);
      });
    }
  }

  // PINK
  const ROLLING_ADDR_PINK = "0x35F268DaC74f94785135aA134deDEf7e67Db8fe3";
  const ROLLING_CONTRACT_PINK = new ethers.Contract(ROLLING_ADDR_PINK, ROLLING_ABI, signer);
  const rolling_minted_PINK = await ROLLING_CONTRACT_PINK.totalSupply()
  const rollingBalance_PINK = await ROLLING_CONTRACT_PINK.balanceOf(App.YOUR_ADDRESS);
  const tokensOfOwner_PINK = await ROLLING_CONTRACT_PINK.tokensOfOwner(App.YOUR_ADDRESS)

  printRolling({
    addr: ROLLING_ADDR_PINK,
    cost: "1.0",
    name: 'Rolling Sasquatch - Pink',
    img_url: 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/Snowball_NFT_Pink.gif',
    title: 'Rolling through the snow - Pink',
    description: 'Part of the "Rolling Sasquatch" series',
    max: 80,
    artist: 'Louis Lee',
    border: 'Salmon',
    buy_id: 'buy-rolling-pink',
    minted: rolling_minted_PINK,
    balance: rollingBalance_PINK,
    owned: tokensOfOwner_PINK,
    rainbow: false
  });

  // PURPLE
  const ROLLING_ADDR_PURPLE = "0xB954AE9a4374751CB3d578CfA3Db96e0E5881C00";
  const ROLLING_CONTRACT_PURPLE = new ethers.Contract(ROLLING_ADDR_PURPLE, ROLLING_ABI, signer);
  const rolling_minted_PURPLE = await ROLLING_CONTRACT_PURPLE.totalSupply()
  const rollingBalance_PURPLE = await ROLLING_CONTRACT_PURPLE.balanceOf(App.YOUR_ADDRESS);
  const tokensOfOwner_PURPLE = await ROLLING_CONTRACT_PURPLE.tokensOfOwner(App.YOUR_ADDRESS)
  printRolling({
    addr: ROLLING_ADDR_PURPLE,
    cost: "1.0",
    name: 'Rolling Sasquatch - Purple',
    img_url: 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/Snowball_NFT_Purple.gif',
    title: 'Rolling through the snow - Purple',
    description: 'Part of the "Rolling Sasquatch" series',
    max: 80,
    artist: 'Louis Lee',
    border: 'Purple',
    buy_id: 'buy-rolling-purple',
    minted: rolling_minted_PURPLE,
    balance: rollingBalance_PURPLE,
    owned: tokensOfOwner_PURPLE,
    rainbow: false
  });

  // ORANGE
  const ROLLING_ADDR_ORANGE = "0xD65e006644D417Af6A9385182C21733762b94E83";
  const ROLLING_CONTRACT_ORANGE = new ethers.Contract(ROLLING_ADDR_ORANGE, ROLLING_ABI, signer);
  const rolling_minted_ORANGE = await ROLLING_CONTRACT_ORANGE.totalSupply()
  const rollingBalance_ORANGE = await ROLLING_CONTRACT_ORANGE.balanceOf(App.YOUR_ADDRESS);
  const tokensOfOwner_ORANGE = await ROLLING_CONTRACT_ORANGE.tokensOfOwner(App.YOUR_ADDRESS)
  printRolling({
    addr: ROLLING_ADDR_ORANGE,
    cost: "1.0",
    name: 'Rolling Sasquatch - Orange',
    img_url: 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/Snowball_NFT_Orange.gif',
    title: 'Rolling through the snow - Orange',
    description: 'Part of the "Rolling Sasquatch" series',
    max: 80,
    artist: 'Louis Lee',
    border: 'Orange',
    buy_id: 'buy-rolling-orange',
    minted: rolling_minted_ORANGE,
    balance: rollingBalance_ORANGE,
    owned: tokensOfOwner_ORANGE,
    rainbow: false
  });

  // BLUE
  const ROLLING_ADDR_BLUE = "0xae88bE7d3fE6545C688b640B427aF4bAb90e2638";
  const ROLLING_CONTRACT_BLUE = new ethers.Contract(ROLLING_ADDR_BLUE, ROLLING_ABI, signer);
  const rolling_minted_BLUE = await ROLLING_CONTRACT_BLUE.totalSupply()
  const rollingBalance_BLUE = await ROLLING_CONTRACT_BLUE.balanceOf(App.YOUR_ADDRESS);
  const tokensOfOwner_BLUE = await ROLLING_CONTRACT_BLUE.tokensOfOwner(App.YOUR_ADDRESS)
  printRolling({
    addr: ROLLING_ADDR_BLUE,
    cost: "3.0",
    name: 'Rolling Sasquatch - Blue',
    img_url: 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/Snowball_NFT_Blue.gif',
    title: 'Rolling through the snow - Blue',
    description: 'Part of the "Rolling Sasquatch" series',
    max: 40,
    artist: 'Louis Lee',
    border: 'lightblue',
    buy_id: 'buy-rolling-blue',
    minted: rolling_minted_BLUE,
    balance: rollingBalance_BLUE,
    owned: tokensOfOwner_BLUE,
    rainbow: false
  });

  // GREEN
  const ROLLING_ADDR_GREEN = "0x5edd9bC699B6A613875E6760B4978d14d6EB3899";
  const ROLLING_CONTRACT_GREEN = new ethers.Contract(ROLLING_ADDR_GREEN, ROLLING_ABI, signer);
  const rolling_minted_GREEN = await ROLLING_CONTRACT_GREEN.totalSupply()
  const rollingBalance_GREEN = await ROLLING_CONTRACT_GREEN.balanceOf(App.YOUR_ADDRESS);
  const tokensOfOwner_GREEN = await ROLLING_CONTRACT_GREEN.tokensOfOwner(App.YOUR_ADDRESS)
  printRolling({
    addr: ROLLING_ADDR_GREEN,
    cost: "3.0",
    name: 'Rolling Sasquatch - Green',
    img_url: 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/Snowball_NFT_Green.gif',
    title: 'Rolling through the snow - Green',
    description: 'Part of the "Rolling Sasquatch" series',
    max: 40,
    artist: 'Louis Lee',
    border: 'Green',
    buy_id: 'buy-rolling-green',
    minted: rolling_minted_GREEN,
    balance: rollingBalance_GREEN,
    owned: tokensOfOwner_GREEN,
    rainbow: false
  });

  // LASER
  const ROLLING_ADDR_LASER = "0xd66Df640A2f213B6e5087204cAee2b2145A1c1c9";
  const ROLLING_CONTRACT_LASER = new ethers.Contract(ROLLING_ADDR_LASER, ROLLING_ABI, signer);
  const rolling_minted_LASER = await ROLLING_CONTRACT_LASER.totalSupply()
  const rollingBalance_LASER = await ROLLING_CONTRACT_LASER.balanceOf(App.YOUR_ADDRESS);
  const tokensOfOwner_LASER = await ROLLING_CONTRACT_LASER.tokensOfOwner(App.YOUR_ADDRESS)
  printRolling({
    addr: ROLLING_ADDR_LASER,
    cost: "20.0",
    name: 'Rolling Sasquatch - Laser Eyes',
    img_url: 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/Snowball_NFT_Sasquatch.gif',
    title: 'Rolling through the snow - Laser Eyes',
    description: 'Part of the "Rolling Sasquatch" series',
    max: 5,
    artist: 'Louis Lee',
    border: null,
    buy_id: 'buy-rolling-laser',
    minted: rolling_minted_LASER,
    balance: rollingBalance_LASER,
    owned: tokensOfOwner_LASER,
    rainbow: true
  });

  const earlyVote_claim = async function () {
    return earlyVoteContract_claim(EARLY_VOTER_ABI, EARLY_VOTER_ADDRESS, App)
  }

  const GOVERNANCE_CONTRACT = new ethers.Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
  const userVote1 = await GOVERNANCE_CONTRACT.getVote(1, App.YOUR_ADDRESS)
  const userVote2 = await GOVERNANCE_CONTRACT.getVote(2, App.YOUR_ADDRESS)

  const EARLY_VOTER_CONTRACT = new ethers.Contract(EARLY_VOTER_ADDRESS, EARLY_VOTER_ABI, signer);
  const userEarlyVoteBalance = await EARLY_VOTER_CONTRACT.balanceOf(App.YOUR_ADDRESS);
  const earlyVoteTokenURI = await EARLY_VOTER_CONTRACT.tokenURI(3);
  console.log("earlyVoteTokenURI", earlyVoteTokenURI)

  if (userVote1 == true || userVote2 == true) {
    $("#early_vote_status").html('Eligible');
    if (userEarlyVoteBalance == 0){
      $("#claim_early_vote").show();
    } else {
      $("#claim_early_vote_claimed").show();
    }
  } else {
    $("#early_vote_status").html('Did not vote');
  }

  if (userEarlyVoteBalance > 0) {
    printNFT('Early Voter', 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/nft1-3.gif', 'Sasquatch throwing snowball', 'Voted on Proposal 1 or Proposal 2 during the first week of Snowball Governance', null, null, null, null);
  }

  $("#claim_tab").click(function(){
    $("#shop_section").hide();
    $("#gallery_section").hide();
    $("#claim_section").show();
    $("#shop_tab").removeClass('btn-primary');
    $("#gallery_tab").removeClass('btn-primary');
    $("#claim_tab").addClass('btn-primary');
  });
  $("#shop_tab").click(function(){
    $("#claim_section").hide();
    $("#gallery_section").hide();
    $("#shop_section").show();
    $("#claim_tab").removeClass('btn-primary');
    $("#gallery_tab").removeClass('btn-primary');
    $("#shop_tab").addClass('btn-primary');
  });
  $("#gallery_tab").click(function(){
    $("#claim_section").hide();
    $("#gallery_section").show();
    $("#shop_section").hide();
    $("#claim_tab").removeClass('btn-primary');
    $("#gallery_tab").addClass('btn-primary');
    $("#shop_tab").removeClass('btn-primary');
  });

  // deposit/withdraw
  $("#claim_early_vote").click(function(){
    earlyVote_claim();
  });

  hideLoading();
}

function printShopItem(name, img_url, title, description, minted, max, artist, border, cost, buy_id, owned, rainbow) {
  let html = `<div class="card ml-auto mr-auto">`;
  html += `<div class="text-center"><div><b>${name}</b></div>`;
  html += `<div class="text-center"><div><b>Max supply: ${max}</b></div>`;
  if (border) {
    html += `<div class="my-5"><img class="nft-image" style="width: 180px; border: 5px solid ${border}; border-style: outset;" src='${img_url}'></div>`;
  } else if (rainbow){
    html += `<div class="my-5"><img class="nft-image rainbow-box" style="width: 180px" src='${img_url}'></div>`;
  } else {
    html += `<div class="my-5"><img class="nft-image" style="width: 180px" src='${img_url}'></div>`;
  }
  html += `</div><div><b>Title: </b>${title}</div>`;
  html += `<div><b>Description: </b>${description}</div>`;
  html += `<div><b>Type: </b>ERC-721 Token</div>`;
  if (artist) {
    html += `<div><b>Artist: </b>${artist}</div>`;
  }
  html += `<div><b>Minted: </b>${minted}/${max}</div>`;
  html += `<div><b>Owned: </b>${owned}</div>`;
  if (cost) {
    html += `<div><b>Price: </b>${cost} AVAX</div>`;
  }
  html += `<button id="${buy_id}" class="my-10 font-size-16 btn-block btn btn-primary" type="button">BUY</button>`;
  html += `</div>`;
  $("#shop_items").append(html);
}

function printNFT(name, img_url, title, description, id, max, artist, border, rainbow) {
  $("#no_nft").hide();
  let html = `<div class="card ml-auto mr-auto">`;
  html += `<div class="text-center"><div><b>${name}</b></div>`;
  if (border) {
    html += `<div class="my-5"><img class="nft-image" style="width: 250px; border: 5px solid ${border}; border-style: outset;" src='${img_url}'></div>`;
  } else if (rainbow) {
    html += `<div class="my-5"><img class="nft-image rainbow-box" style="width: 250px" src='${img_url}'></div>`;
  } else {
    html += `<div class="my-5"><img class="nft-image" style="width: 250px" src='${img_url}'></div>`;
  }
  html += `</div><div><b>Title: </b>${title}</div>`;
  html += `<div><b>Description: </b>${description}</div>`;
  html += `<div><b>Type: </b>ERC-721 Token</div>`;
  if (artist) {
    html += `<div><b>Artist: </b>${artist}</div>`;
  }
  if (id && max) {
    html += `<div><b>Number: </b>${id} out of ${max}</div>`;
  }
  html += `</div>`;
  $("#nft_section").append(html);
}
const buy_rolling = async function (abi, address, App, value) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const NFT_CONTRACT = new ethers.Contract(address, abi, signer)

  let allow = Promise.resolve()

  showLoading()

  allow
    .then(async function () {
      let overrides = {
        value: ethers.utils.parseEther(value)
      };
      NFT_CONTRACT.mint(App.YOUR_ADDRESS, overrides)
        .then(function (t) {
          App.provider.waitForTransaction(t.hash).then(function () {
            hideLoading();
            alert('NFT Minted. Refresh page to NFTs');
          })
        })
        .catch(function (e) {
          hideLoading()
          alert('Could not mint NFT')
        })
    })
    .catch(function (e) {
      hideLoading()
      alert('Could not mint NFT')
    })
}
const earlyVoteContract_claim = async function (abi, address, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const NFT_CONTRACT = new ethers.Contract(address, abi, signer)

  let allow = Promise.resolve()

  showLoading()

  allow
    .then(async function () {
      NFT_CONTRACT.claim(App.YOUR_ADDRESS)
        .then(function (t) {
          App.provider.waitForTransaction(t.hash).then(function () {
            hideLoading();
            alert('NFT Claimed. Refresh page to NFTs');
          })
        })
        .catch(function () {
          hideLoading()
          alert('Could not claim NFT')
        })
    })
    .catch(function () {
      hideLoading()
      alert('Could not claim NFT')
    })
}
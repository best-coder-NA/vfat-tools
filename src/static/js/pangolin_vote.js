$(function () {
  consoleInit();
  start(main);
});
async function main() {
  const App = await init_ethers();
  const signer = App.provider.getSigner()

  //bump
  //ABIS
  const GOVERNOR_ABI = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address","name":"timelock_","internalType":"address"},{"type":"address","name":"png_","internalType":"address"},{"type":"address","name":"guardian_","internalType":"address"}]},{"type":"event","name":"ProposalCanceled","inputs":[{"type":"uint256","name":"id","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalCreated","inputs":[{"type":"uint256","name":"id","internalType":"uint256","indexed":false},{"type":"address","name":"proposer","internalType":"address","indexed":false},{"type":"address[]","name":"targets","internalType":"address[]","indexed":false},{"type":"uint256[]","name":"values","internalType":"uint256[]","indexed":false},{"type":"string[]","name":"signatures","internalType":"string[]","indexed":false},{"type":"bytes[]","name":"calldatas","internalType":"bytes[]","indexed":false},{"type":"uint256","name":"startTime","internalType":"uint256","indexed":false},{"type":"uint256","name":"endTime","internalType":"uint256","indexed":false},{"type":"string","name":"description","internalType":"string","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalExecuted","inputs":[{"type":"uint256","name":"id","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalQueued","inputs":[{"type":"uint256","name":"id","internalType":"uint256","indexed":false},{"type":"uint256","name":"eta","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"StartBlockSet","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"uint256","name":"startBlock","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"VoteCast","inputs":[{"type":"address","name":"voter","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"bool","name":"support","internalType":"bool","indexed":false},{"type":"uint256","name":"votes","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"BALLOT_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"__abdicate","inputs":[],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"__acceptAdmin","inputs":[],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"__executeSetTimelockPendingAdmin","inputs":[{"type":"address","name":"newPendingAdmin","internalType":"address"},{"type":"uint256","name":"eta","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"__queueSetTimelockPendingAdmin","inputs":[{"type":"address","name":"newPendingAdmin","internalType":"address"},{"type":"uint256","name":"eta","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"cancel","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"castVote","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"},{"type":"bool","name":"support","internalType":"bool"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"castVoteBySig","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"},{"type":"bool","name":"support","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"payable","payable":true,"outputs":[],"name":"execute","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address[]","name":"targets","internalType":"address[]"},{"type":"uint256[]","name":"values","internalType":"uint256[]"},{"type":"string[]","name":"signatures","internalType":"string[]"},{"type":"bytes[]","name":"calldatas","internalType":"bytes[]"}],"name":"getActions","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"tuple","name":"","internalType":"struct GovernorAlpha.Receipt","components":[{"type":"bool","name":"hasVoted","internalType":"bool"},{"type":"bool","name":"support","internalType":"bool"},{"type":"uint96","name":"votes","internalType":"uint96"}]}],"name":"getReceipt","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"},{"type":"address","name":"voter","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"guardian","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"latestProposalIds","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"contract PngInterface"}],"name":"png","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalCount","inputs":[],"constant":true},{"type":"function","stateMutability":"pure","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalMaxOperations","inputs":[],"constant":true},{"type":"function","stateMutability":"pure","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalThreshold","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"id","internalType":"uint256"},{"type":"address","name":"proposer","internalType":"address"},{"type":"uint256","name":"eta","internalType":"uint256"},{"type":"uint256","name":"startTime","internalType":"uint256"},{"type":"uint256","name":"endTime","internalType":"uint256"},{"type":"uint256","name":"startBlock","internalType":"uint256"},{"type":"uint256","name":"forVotes","internalType":"uint256"},{"type":"uint256","name":"againstVotes","internalType":"uint256"},{"type":"bool","name":"canceled","internalType":"bool"},{"type":"bool","name":"executed","internalType":"bool"}],"name":"proposals","inputs":[{"type":"uint256","name":"","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"propose","inputs":[{"type":"address[]","name":"targets","internalType":"address[]"},{"type":"uint256[]","name":"values","internalType":"uint256[]"},{"type":"string[]","name":"signatures","internalType":"string[]"},{"type":"bytes[]","name":"calldatas","internalType":"bytes[]"},{"type":"string","name":"description","internalType":"string"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"queue","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"","internalType":"enum GovernorAlpha.ProposalState"}],"name":"state","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"contract TimelockInterface"}],"name":"timelock","inputs":[],"constant":true},{"type":"function","stateMutability":"pure","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votingDelay","inputs":[],"constant":true},{"type":"function","stateMutability":"pure","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votingPeriod","inputs":[],"constant":true}]
  const PNG_ABI = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DelegateChanged","inputs":[{"type":"address","name":"delegator","internalType":"address","indexed":true},{"type":"address","name":"fromDelegate","internalType":"address","indexed":true},{"type":"address","name":"toDelegate","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"DelegateVotesChanged","inputs":[{"type":"address","name":"delegate","internalType":"address","indexed":true},{"type":"uint256","name":"previousBalance","internalType":"uint256","indexed":false},{"type":"uint256","name":"newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DELEGATION_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint32","name":"fromBlock","internalType":"uint32"},{"type":"uint96","name":"votes","internalType":"uint96"}],"name":"checkpoints","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"uint32","name":"","internalType":"uint32"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"delegate","inputs":[{"type":"address","name":"delegatee","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"delegateBySig","inputs":[{"type":"address","name":"delegatee","internalType":"address"},{"type":"uint256","name":"nonce","internalType":"uint256"},{"type":"uint256","name":"expiry","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"delegates","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint96","name":"","internalType":"uint96"}],"name":"getCurrentVotes","inputs":[{"type":"address","name":"account","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint96","name":"","internalType":"uint96"}],"name":"getPriorVotes","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"blockNumber","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint32","name":"","internalType":"uint32"}],"name":"numCheckpoints","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"src","internalType":"address"},{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}],"constant":false}]
  // MAINNET
  const GOVERNOR_ADDRESS = "0xb0Ff2b1047d9E8d294c2eD798faE3fA817F43Ee1";
  const PNG_ADDRESS = "0x60781C2586D68229fde47564546784ab3fACA982";


  // balances
  const PNG_TOKEN = new ethers.Contract(PNG_ADDRESS, PNG_ABI, signer);
  const png_balance = await PNG_TOKEN.balanceOf(App.YOUR_ADDRESS);
  $("#png_balance").html((png_balance / 1e18).toLocaleString());
  const delegated_votes = await PNG_TOKEN.getCurrentVotes(App.YOUR_ADDRESS);
  $("#my_votes").html((delegated_votes / 1e18).toLocaleString());

  const GOVERNOR_CONTRACT = new ethers.Contract(GOVERNOR_ADDRESS, GOVERNOR_ABI, signer);
  const proposal = await GOVERNOR_CONTRACT.proposals(2);
  console.log(proposal);
  const proposal_status = await GOVERNOR_CONTRACT.state(2);
  console.log(proposal_status);
  const startDate = new Date(proposal.startTime * 1000).toLocaleString();
  const endDate = new Date(proposal.endTime * 1000).toLocaleString();
  console.log(startDate);
  console.log(endDate);
  const userVote = await GOVERNOR_CONTRACT.getReceipt(2, App.YOUR_ADDRESS)
  console.log(userVote);
  const userVoteDisplay = `${(userVote.votes / 1e18).toFixed(2)} votes ${userVote.support == 0 ? 'Against' : 'For'}`;

  let proposal_html = `<details class="mb-20 collapse-panel w-500 mw-full">`;
  proposal_html += `<summary class="collapse-header">`;
  proposal_html += `<div class="font-size-16"><span class="font-weight-bold">Proposal # 2:</span> Add Pangolin Rewards for Snowball token (SNOB) pairs</div>`
  proposal_html += `<div><span>Status: Active</span></div>`
  proposal_html += `<div class="font-size-16"><span class="text-success">For: ${(proposal.forVotes / 1e18).toFixed(2)}</span><span class="float-right text-secondary">Against: ${(proposal.againstVotes / 1e18).toFixed(2)}</span></div>`
  proposal_html += `</summary>`;
  proposal_html += `<div id="proposal_content" class="collapse-content">`;
  if (userVote.hasVoted == false) {
    proposal_html += `<button id="proposal_for" class="ml-20 btn btn-success" type="button">Vote for <ion-icon name="thumbs-up-outline"></ion-icon></button>`;
    proposal_html += `<button id="proposal_against" class="btn btn-secondary float-right" type="button">Vote against <ion-icon name="thumbs-down-outline"></ion-icon></button>`;
  } else {
    proposal_html += `<div class="ml-20"><span>Your vote: ${userVoteDisplay} </span></div>`;
  }
  proposal_html += `<div class="ml-20 mt-20"><span>Start: ${startDate} </span></div>`
  proposal_html += `<div class="ml-20"><span>End: ${endDate}</span></div>`
  proposal_html += `<div class="ml-20">Proposer: ${proposal.proposer}</div><hr/>`
  proposal_html += `<div class="ml-20 mt-20"><b>Description:</b></div>`
  proposal_html += `<div class="ml-20">TLDR: Add 1x rewards for the SNOB/AVAX pool, and 3x rewards for the SNOB/PNG pool (same weights as other AVAX and PNG pairs).</div>`
  proposal_html += `<div class="ml-20 mt-20">We should incentive SNOB pairs because the SNOB token is the first Avalanche native token to achieve high trade volume and liquidity on Pangolin. Also the Snowball project adds value to both Pangolin Exchange and the Avalanche ecosystem.</div>`
  proposal_html += `<div class="ml-20 mt-20">To do this, we need to call the addWhitelistedPool function on LiquidityPoolManagerV2 for each pair and set the appropriate weight.</div>`
  proposal_html += `<div class="ml-20 mt-20"><b>Technical Proposal:</b></div>`
  proposal_html += `<div class="ml-20">We will add the SNOB/AVAX pair with a weight of 100 and the SNOB/PNG pair with a weight of 300 by calling addWhitelistedPool on the LiquidityPoolManagerV2 contract</div>`

  proposal_html += `</div>`;
  proposal_html += `</details>`;
  $("#proposal_list").append(proposal_html);

  //vote
  $(`#proposal_for`).click(function() {
    governanceContract_voteFor(GOVERNOR_ABI, GOVERNOR_ADDRESS, App, PNG_TOKEN)
  });
  $(`#proposal_against`).click(function() {
    governanceContract_voteAgainst(GOVERNOR_ABI, GOVERNOR_ADDRESS, App, PNG_TOKEN)
  });


  hideLoading();
}

const governanceContract_voteFor = async function (chefAbi, chefAddress, App, PNG_TOKEN) {
  const signer = App.provider.getSigner()
  console.log(signer)
  const CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  const delegated_votes = await PNG_TOKEN.getCurrentVotes(App.YOUR_ADDRESS);

  let allow = Promise.resolve()

  showLoading()
  if (delegated_votes == 0) {
    alert('No votes to use')
    hideLoading();
  } else {
    allow
      .then(async function () {
        CONTRACT.castVote(2, true)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
              alert('Vote successful');
            })
          })
          .catch(function () {
            hideLoading()
            alert('Could not vote')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Could not vote')
      })
  }
}

const governanceContract_voteAgainst = async function (chefAbi, chefAddress, App, PNG_TOKEN) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  const delegated_votes = await PNG_TOKEN.getCurrentVotes(App.YOUR_ADDRESS);

  let allow = Promise.resolve()

  showLoading()
  if (delegated_votes == 0) {
    alert('No votes to use')
    hideLoading();
  } else {
    allow
      .then(async function () {
        CONTRACT.castVote(2, false)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
              alert('Vote successful');
            })
          })
          .catch(function () {
            hideLoading()
            alert('Could not vote.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Could not vote.')
      })
  }
}

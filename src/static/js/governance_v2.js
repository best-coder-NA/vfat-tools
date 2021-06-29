$(function () {
  consoleInit();
  start(main);
});
async function main() {
  const App = await init_ethers();
  const signer = App.provider.getSigner()

  //ABIS
  const GOVERNANCE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_xSNOB","internalType":"address"}]},{"type":"event","name":"ExecutionDelayChanged","inputs":[{"type":"uint256","name":"newExecutionDelay","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"MinimumVotingPeriodChanged","inputs":[{"type":"uint256","name":"newMinimumVotingPeriod","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"NewVote","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"address","name":"voter","internalType":"address","indexed":false},{"type":"bool","name":"support","internalType":"bool","indexed":false},{"type":"uint256","name":"votes","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalCreated","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"address","name":"proposer","internalType":"address","indexed":false},{"type":"string","name":"title","internalType":"string","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalExecuted","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"address","name":"executor","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalThresholdChanged","inputs":[{"type":"uint256","name":"newProposalThreshold","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"QuorumVotesChanges","inputs":[{"type":"uint256","name":"newQuorumVotes","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"EXECUTION_DELAY_MAXIMUM","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"EXECUTION_DELAY_MINIMUM","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"EXPIRATION_PERIOD","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PROPOSAL_THRESHOLD_MAXIMUM","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PROPOSAL_THRESHOLD_MINIMUM","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"QUORUM_VOTES_MAXIMUM","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"QUORUM_VOTES_MINIMUM","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"VOTING_PERIOD_MAXIMUM","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"VOTING_PERIOD_MINIMUM","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"execute","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"executionDelay","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"tuple","name":"","internalType":"struct Governance.Receipt","components":[{"type":"bool","name":"hasVoted","internalType":"bool"},{"type":"bool","name":"support","internalType":"bool"},{"type":"uint256","name":"votes","internalType":"uint256"}]}],"name":"getReceipt","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"address","name":"_voter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastProposalByAddress","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"minimumVotingPeriod","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalCount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"target","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"}],"name":"proposalExecutionContexts","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalThreshold","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"title","internalType":"string"},{"type":"string","name":"metadata","internalType":"string"},{"type":"address","name":"proposer","internalType":"address"},{"type":"address","name":"executor","internalType":"address"},{"type":"uint256","name":"startTime","internalType":"uint256"},{"type":"uint256","name":"votingPeriod","internalType":"uint256"},{"type":"uint256","name":"quorumVotes","internalType":"uint256"},{"type":"uint256","name":"executionDelay","internalType":"uint256"},{"type":"uint256","name":"forVotes","internalType":"uint256"},{"type":"uint256","name":"againstVotes","internalType":"uint256"}],"name":"proposals","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"propose","inputs":[{"type":"string","name":"_title","internalType":"string"},{"type":"string","name":"_metadata","internalType":"string"},{"type":"uint256","name":"_votingPeriod","internalType":"uint256"},{"type":"address","name":"_target","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quorumVotes","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"hasVoted","internalType":"bool"},{"type":"bool","name":"support","internalType":"bool"},{"type":"uint256","name":"votes","internalType":"uint256"}],"name":"receipts","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExecutionDelay","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMinimumVotingPeriod","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setProposalThreshold","inputs":[{"type":"uint256","name":"_votes","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setQuorumVotes","inputs":[{"type":"uint256","name":"_votes","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"enum Governance.ProposalState"}],"name":"state","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"vote","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"bool","name":"_support","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IxSNOB"}],"name":"xSNOB","inputs":[]}]
  const XSNOB_ABI = [{"name":"CommitOwnership","inputs":[{"type":"address","name":"admin","indexed":false}],"anonymous":false,"type":"event"},{"name":"ApplyOwnership","inputs":[{"type":"address","name":"admin","indexed":false}],"anonymous":false,"type":"event"},{"name":"Deposit","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"value","indexed":false},{"type":"uint256","name":"locktime","indexed":true},{"type":"int128","name":"type","indexed":false},{"type":"uint256","name":"ts","indexed":false}],"anonymous":false,"type":"event"},{"name":"Withdraw","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"value","indexed":false},{"type":"uint256","name":"ts","indexed":false}],"anonymous":false,"type":"event"},{"name":"Supply","inputs":[{"type":"uint256","name":"prevSupply","indexed":false},{"type":"uint256","name":"supply","indexed":false}],"anonymous":false,"type":"event"},{"outputs":[],"inputs":[{"type":"address","name":"token_addr"},{"type":"string","name":"_name"},{"type":"string","name":"_symbol"},{"type":"string","name":"_version"}],"stateMutability":"nonpayable","type":"constructor"},{"name":"commit_transfer_ownership","outputs":[],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":37568},{"name":"apply_transfer_ownership","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":38407},{"name":"commit_smart_wallet_checker","outputs":[],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":36278},{"name":"apply_smart_wallet_checker","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":37005},{"name":"get_last_user_slope","outputs":[{"type":"int128","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"view","type":"function","gas":2540},{"name":"user_point_history__ts","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"_addr"},{"type":"uint256","name":"_idx"}],"stateMutability":"view","type":"function","gas":1643},{"name":"locked__end","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"_addr"}],"stateMutability":"view","type":"function","gas":1564},{"name":"checkpoint","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":37118215},{"name":"deposit_for","outputs":[],"inputs":[{"type":"address","name":"_addr"},{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":74411056},{"name":"create_lock","outputs":[],"inputs":[{"type":"uint256","name":"_value"},{"type":"uint256","name":"_unlock_time"}],"stateMutability":"nonpayable","type":"function","gas":74412397},{"name":"increase_amount","outputs":[],"inputs":[{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":74411818},{"name":"increase_unlock_time","outputs":[],"inputs":[{"type":"uint256","name":"_unlock_time"}],"stateMutability":"nonpayable","type":"function","gas":74412465},{"name":"withdraw","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":37289006},{"name":"balanceOf","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"view","type":"function"},{"name":"balanceOf","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"},{"type":"uint256","name":"_t"}],"stateMutability":"view","type":"function"},{"name":"balanceOfAt","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"},{"type":"uint256","name":"_block"}],"stateMutability":"view","type":"function","gas":509566},{"name":"totalSupply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function"},{"name":"totalSupply","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"t"}],"stateMutability":"view","type":"function"},{"name":"totalSupplyAt","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"_block"}],"stateMutability":"view","type":"function","gas":879507},{"name":"changeController","outputs":[],"inputs":[{"type":"address","name":"_newController"}],"stateMutability":"nonpayable","type":"function","gas":36878},{"name":"token","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1751},{"name":"supply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1781},{"name":"locked","outputs":[{"type":"int128","name":"amount"},{"type":"uint256","name":"end"}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":3260},{"name":"epoch","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1841},{"name":"point_history","outputs":[{"type":"int128","name":"bias"},{"type":"int128","name":"slope"},{"type":"uint256","name":"ts"},{"type":"uint256","name":"blk"}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":5178},{"name":"user_point_history","outputs":[{"type":"int128","name":"bias"},{"type":"int128","name":"slope"},{"type":"uint256","name":"ts"},{"type":"uint256","name":"blk"}],"inputs":[{"type":"address","name":"arg0"},{"type":"uint256","name":"arg1"}],"stateMutability":"view","type":"function","gas":5423},{"name":"user_point_epoch","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2146},{"name":"slope_changes","outputs":[{"type":"int128","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":2076},{"name":"controller","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1991},{"name":"transfersEnabled","outputs":[{"type":"bool","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2021},{"name":"name","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":8453},{"name":"symbol","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":7506},{"name":"version","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":7536},{"name":"decimals","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2141},{"name":"future_smart_wallet_checker","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2171},{"name":"smart_wallet_checker","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2201},{"name":"admin","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2231},{"name":"future_admin","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2261}]

  // // FUJI
  // const GOVERNANCE_ADDRESS = "0x4d4d92274770dA6040964e64b57b02Edb6346888";
  // const XSNOB_ADDRESS = "0x9a37dc4f28c38813a6d31391721376066fbb401d";

  // MAINNET
  const GOVERNANCE_ADDRESS = "0xFdd994AD468cd39a4a3a3C3A0c460BB2213159B6";
  const GOVERNANCE_V2_ADDRESS = "0xfdCcf6D49A29f435E509DFFAAFDecB0ADD93f8C0";
  const XSNOB_ADDRESS = "0x83952E7ab4aca74ca96217D6F8f7591BEaD6D64E";

  $("#wallet_address").html(App.YOUR_ADDRESS);


  const XSNOB = new ethers.Contract(XSNOB_ADDRESS, XSNOB_ABI, signer);
  const currentXSNOB = await XSNOB['balanceOf(address)'](App.YOUR_ADDRESS, { gasLimit: 1000000 });
  $("#voting_power").html((currentXSNOB / 1e18).toLocaleString());
  /// @notice Possible states that a proposal may be in
  // enum ProposalState {
  //     Active,
  //       Defeated,
  //       PendingExecution,
  //       ReadyForExecution,
  //       Executed,
  //       Vetoed
  //   }
  print_proposals(GOVERNANCE_V2_ADDRESS, GOVERNANCE_ABI, currentXSNOB, App, signer, 7)
  .then( () => {
    console.log("original proposals");
    print_proposals(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, currentXSNOB, App, signer, 5);
  });

  hideLoading();
}

const print_proposals = async function (GOVERNANCE_ADDRESS, GOVERNANCE_ABI, currentXSNOB, App, signer, offset) {
  const GOVERNANCE_CONTRACT = new ethers.Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
  const proposal_count = await GOVERNANCE_CONTRACT.proposalCount();
  const quorumVotes = await GOVERNANCE_CONTRACT.quorumVotes();
  for (let i = proposal_count * 1; i > 0; i--) {
    const proposal = await GOVERNANCE_CONTRACT.proposals(i)
    const duration = (proposal.votingPeriod / 60 / 60).toFixed(2);
    const startDate = new Date(proposal.startTime * 1000).toLocaleString();
    const endDate = new Date((proposal.startTime * 1 + proposal.votingPeriod * 1) * 1000).toLocaleString()
    const state = await GOVERNANCE_CONTRACT.state(i)
    const userVote = await GOVERNANCE_CONTRACT.receipts(i, App.YOUR_ADDRESS)
    const userVoted = userVote[0];
    const userForAgainst = userVote[1];
    const userVoteAmount = userVote[2];
    const userVoteDisplay = `${(userVoteAmount / 1e18).toFixed(2)} votes ${userForAgainst == 0 ? '"Against"' : '"For"'}`;
    const safeTitle = proposal.title.replaceAll('<', '%3C').replaceAll('>', '%3E');
    console.log(userVote)
    let stateDisplay = '';
    switch (state){
      case 0:
        stateDisplay =  'Active';
        break;
      case 1:
        stateDisplay =  'Defeated';
        break;
      case 2:
        stateDisplay =  'Pending Execution';
        break;
      case 3:
        stateDisplay =  'Ready For Execution';
        break;
      case 4:
        stateDisplay =  'Executed';
        break;
      case 5:
        stateDisplay =  'Vetoed';
        break;
      default:
        break;
    }
    console.log(proposal)
    let proposal_html = `<details class="mb-20 collapse-panel w-500 mw-full">`;
    proposal_html += `<summary class="collapse-header">`;
    proposal_html += `<div class="font-size-16"><span class="font-weight-bold">Proposal # ${i + offset}:</span> ${safeTitle}</div>`
    proposal_html += `<div><span>Status: ${stateDisplay}</span></div>`
    proposal_html += `<div class="font-size-16"><span class="text-success">For: ${(proposal.forVotes / 1e18).toFixed(2)}</span><span class="float-right text-secondary">Against: ${(proposal.againstVotes / 1e18).toFixed(2)}</span></div>`
    proposal_html += `</summary>`;
    proposal_html += `<div id="proposal_${i}_content" class="collapse-content">`;
    if (state == 0) {
      proposal_html += `<div class="ml-20 mb-10 font-weight-bold">Voting power: ${(currentXSNOB / 1e18).toFixed(2).toLocaleString()}</span></div>`;
      proposal_html += `<button id="proposal_${i}_for" class="ml-20 btn btn-success" type="button">Vote for <ion-icon name="thumbs-up-outline"></ion-icon></button>`;
      proposal_html += `<button id="proposal_${i}_against" class="btn btn-secondary float-right" type="button">Vote against <ion-icon name="thumbs-down-outline"></ion-icon></button>`;
    }
    if (userVoted == true) {
      proposal_html += `<div class="ml-20"><span>Your vote history: ${userVoted == 0 ? 'Did not vote' : userVoteDisplay} </span></div>`;
    }
    proposal_html += `<div class="ml-20 mt-10"><span>Duration: ${duration} hours </span></div>`
    proposal_html += `<div class="ml-20"><span>Start: ${startDate} </span></div>`
    proposal_html += `<div class="ml-20"><span>End: ${endDate}</span></div>`
    if (state == 0) {
      proposal_html += `<div class="ml-20"><span>Votes needed for Quorum: ${(quorumVotes / 1e18).toLocaleString()}</span></div>`
    }
    proposal_html += `<div class="ml-20">Proposer: ${proposal.proposer}</div>`
    proposal_html += `</div>`;
    proposal_html += `</details>`;
    $("#proposal_list").append(proposal_html);
    //vote
    console.log("i", i);
    $(`#proposal_${i}_for`).click(function(){
      console.log("iclick", i);
      governanceContract_voteFor(GOVERNANCE_ABI, GOVERNANCE_ADDRESS, i, App, currentXSNOB)
    });
    $(`#proposal_${i}_against`).click(function(){
      governanceContract_voteAgainst(GOVERNANCE_ABI, GOVERNANCE_ADDRESS, i, App, currentXSNOB)
    });
  }
}

const governanceContract_voteFor = async function (chefAbi, chefAddress, proposal_id, App, xSNOB) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  let allow = Promise.resolve()

  showLoading()
  if (xSNOB == 0) {
    alert('No votes to use')
    hideLoading();
  } else {
    allow
      .then(async function () {
        CHEF_CONTRACT.vote(proposal_id, true)
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
        alert('Could not vote .')
      })
  }
}

const governanceContract_voteAgainst = async function (chefAbi, chefAddress, proposal_id, App, xSNOB) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  let allow = Promise.resolve()

  showLoading()
  if (xSNOB == 0) {
    alert('No votes to use')
    hideLoading();
  } else {
    allow
      .then(async function () {
        CHEF_CONTRACT.vote(proposal_id, false)
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
        alert('Could not vote .')
      })
  }
}

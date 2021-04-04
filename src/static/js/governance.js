$(function () {
  consoleInit();
  start(main);
});
async function main() {
  const App = await init_ethers();
  const signer = App.provider.getSigner()

  //ABIS
  const CRYSTAL_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_iceQueen","internalType":"address"},{"type":"address","name":"_snowball","internalType":"address"},{"type":"address","name":"_pgl","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"snowball","internalType":"uint256"},{"type":"uint256","name":"PGL","internalType":"uint256"},{"type":"uint256","name":"rewardCredit","internalType":"uint256"},{"type":"uint256","name":"rewardSnapshot","internalType":"uint256"},{"type":"uint256","name":"votes","internalType":"uint256"},{"type":"uint256","name":"thawTimestamp","internalType":"uint256"}],"name":"accounts","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amountSnowball","internalType":"uint256"},{"type":"uint256","name":"_amountPGL","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"freeze","inputs":[{"type":"address","name":"_address","internalType":"address"},{"type":"uint256","name":"_duration","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIceQueen"}],"name":"iceQueen","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isFrozen","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingReward","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPangolinPair"}],"name":"pgl","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quadraticVotes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"snowball","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votes","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  const GOVERNANCE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_crystalVault","internalType":"address"},{"type":"address","name":"_governer","internalType":"address"}]},{"type":"event","name":"GovernerAdded","inputs":[{"type":"address","name":"governer","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"GovernerRemoved","inputs":[{"type":"address","name":"governer","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"NewCrystalVault","inputs":[{"type":"address","name":"crystalVault","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"NewProposal","inputs":[{"type":"address","name":"proposer","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"string","name":"title","internalType":"string","indexed":false}],"anonymous":false},{"type":"event","name":"NewVote","inputs":[{"type":"address","name":"voter","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false},{"type":"bool","name":"support","internalType":"bool","indexed":false},{"type":"uint256","name":"votes","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ProposalExecuted","inputs":[{"type":"address","name":"executor","internalType":"address","indexed":false},{"type":"uint256","name":"proposalId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addGoverner","inputs":[{"type":"address","name":"_governer","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ICrystalVault"}],"name":"crystalVault","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"execute","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"address","name":"_target","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"executionDelay","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"executionExpiration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"getVote","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"address","name":"_voter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"governers","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"minimumVotingPeriod","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalCount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"proposalThreshold","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"id","internalType":"uint256"},{"type":"string","name":"title","internalType":"string"},{"type":"address","name":"proposer","internalType":"address"},{"type":"address","name":"executor","internalType":"address"},{"type":"uint256","name":"startTime","internalType":"uint256"},{"type":"uint256","name":"votingPeriod","internalType":"uint256"},{"type":"uint256","name":"forVotes","internalType":"uint256"},{"type":"uint256","name":"againstVotes","internalType":"uint256"},{"type":"bytes32","name":"txHash","internalType":"bytes32"}],"name":"proposals","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"propose","inputs":[{"type":"string","name":"_title","internalType":"string"},{"type":"uint256","name":"_votingPeriod","internalType":"uint256"},{"type":"address","name":"_target","internalType":"address"},{"type":"uint256","name":"_value","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"quorumVotes","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeGoverner","inputs":[{"type":"address","name":"_governer","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCrystalVault","inputs":[{"type":"address","name":"_crystalVault","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExecutionDelay","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExecutionExpiration","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMinimumVotingPeriod","inputs":[{"type":"uint256","name":"_seconds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setProposalThreshold","inputs":[{"type":"uint256","name":"_votes","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setQuorumVotes","inputs":[{"type":"uint256","name":"_votes","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"enum Governance.ProposalState"}],"name":"state","inputs":[{"type":"uint256","name":"proposalId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"vote","inputs":[{"type":"uint256","name":"_proposalId","internalType":"uint256"},{"type":"bool","name":"_support","internalType":"bool"}]}]
  //FUJI
  const CRYSTAL_VAULT_ADDRESS = "0xD684FcB37CAC667100EC46Cf38e64d83635d7a4F";
  const GOVERNANCE_ADDRESS = "0xC86142c5884525964081bA032BCDe883B95312da";
  const SNOB_ADDRESS = "0xf319e2f610462f846d6e93f51cdc862eeff2a554";
  const PGL_ADDRESS = "0xf91BD10B18B45262A324883FbDB2Ea21d66ca938";

  // MAINNET
  //const CRYSTAL_VAULT_ADDRESS = "";
  //const SNOB_ADDRESS = "0xC38f41A296A4493Ff429F1238e030924A1542e50";

  const approveSnob = async function () {
    return crystalVaultContract_approve(CRYSTAL_VAULT_ABI, CRYSTAL_VAULT_ADDRESS, SNOB_ADDRESS, App)
  }
  const revokeSnob = async function () {
    return crystalVaultContract_revoke(CRYSTAL_VAULT_ABI, CRYSTAL_VAULT_ADDRESS, SNOB_ADDRESS, App)
  }
  const approvePgl = async function () {
    return crystalVaultContract_approve(CRYSTAL_VAULT_ABI, CRYSTAL_VAULT_ADDRESS, PGL_ADDRESS, App)
  }
  const revokePgl = async function () {
    return crystalVaultContract_revoke(CRYSTAL_VAULT_ABI, CRYSTAL_VAULT_ADDRESS, PGL_ADDRESS, App)
  }
  const deposit_crystal = async function () {
    return crystalVaultContract_deposit(CRYSTAL_VAULT_ABI, CRYSTAL_VAULT_ADDRESS, SNOB_ADDRESS, PGL_ADDRESS, App)
  }
  const withdraw_crystal = async function () {
    return crystalVaultContract_withdraw(CRYSTAL_VAULT_ABI, CRYSTAL_VAULT_ADDRESS, App)
  }
  const governance_vote_for_1 = async function () {
    return governanceContract_voteFor(GOVERNANCE_ABI, GOVERNANCE_ADDRESS, 1, App)
  }
  const governance_vote_against_1 = async function () {
    return governanceContract_voteAgainst(GOVERNANCE_ABI, GOVERNANCE_ADDRESS, 1, App)
  }

  // balances
  const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)
  const currentSNOBTokens = await SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS)
  $("#available_snob").html((currentSNOBTokens / 1e18).toLocaleString())
  const PGL_TOKEN = new ethers.Contract(PGL_ADDRESS, ERC20_ABI, signer)
  const currentPGLTokens = await PGL_TOKEN.balanceOf(App.YOUR_ADDRESS)
  $("#available_pgl").html((currentPGLTokens / 1e18).toLocaleString())

  //votes
  const CRYSTAL_CONTRACT = new ethers.Contract(CRYSTAL_VAULT_ADDRESS, CRYSTAL_VAULT_ABI, signer);
  const votes = await CRYSTAL_CONTRACT.votes(App.YOUR_ADDRESS);
  const qVotes = await CRYSTAL_CONTRACT.quadraticVotes(App.YOUR_ADDRESS);
  const assetsDeposited = await CRYSTAL_CONTRACT.accounts(App.YOUR_ADDRESS)
  console.log("votes:", votes / 1e18)
  console.log("qVotes:", qVotes / 1e18)
  console.log("PGL deposited:", assetsDeposited.PGL / 1e18)
  console.log("Snowball deposited:", assetsDeposited.snowball / 1e18)
  $("#my_votes").html((qVotes / 1e18).toLocaleString())
  $("#deposited_snob").html((assetsDeposited.snowball / 1e18).toLocaleString())
  $("#deposited_pgl").html((assetsDeposited.PGL  / 1e18).toLocaleString())

  //proposals
  const GOVERNANCE_CONTRACT = new ethers.Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
  const proposal_count = await GOVERNANCE_CONTRACT.proposalCount();
  for (i = proposal_count; i > 0; i--) {
    const proposal = await GOVERNANCE_CONTRACT.proposals(i)
    const duration = (proposal.votingPeriod / 1e18 / 60 / 60).toFixed(4);
    const startDate = new Date(proposal.startTime * 1000).toLocaleString();
    const endDate = new Date((proposal.startTime + (proposal.votingPeriod * 1)) * 1000).toLocaleString()
    console.log(proposal)
    let proposal_html = `<details class="mb-20 collapse-panel w-500 mw-full">`;
    proposal_html += `<summary class="collapse-header">`;
    proposal_html += `<div class="font-size-16"><span class="font-weight-bold">Proposal # ${proposal.id * 1}:</span> ${proposal.title}</div>`
    proposal_html += `<div><span>Duration: ${duration} hours </span></div>`
    proposal_html += `<div><span>Start: ${startDate} </span><span>End: ${endDate}</span></div>`
    proposal_html += `<div><span class="text-success">For: ${proposal.forVotes / 1e18}</span><span class="float-right text-secondary">Against: ${proposal.againstVotes / 1e18}</span></div>`
    proposal_html += `</summary>`;
    proposal_html += `<div id="proposal_${i}_content" class="collapse-content">`;
    proposal_html += `<div class="ml-20 mb-10">(Insert description here)</div>`;
    proposal_html += `<button id="proposal_${i}_for" class="ml-20 btn btn-success" type="button">Vote for <ion-icon name="thumbs-up-outline"></ion-icon></button>`;
    proposal_html += `<button id="proposal_${i}_against" class="btn btn-secondary float-right" type="button">Vote against <ion-icon name="thumbs-down-outline"></ion-icon></button>`;
    proposal_html += `</div>`;
    proposal_html += `</details>`;
    $("#proposal_list").append(proposal_html);
  }

  // Approvals
  const snob_allowance = await SNOB_TOKEN.allowance(App.YOUR_ADDRESS, CRYSTAL_VAULT_ADDRESS)
  console.log("snob_allowance:", snob_allowance / 1e18);
  if (snob_allowance == 0) {
    $("#snob_approve").show();
    $("#snob_approve").click(function(){
      approveSnob();
    });
  } else {
    $("#snob_revoke").show();
    $("#snob_revoke").click(function(){
      revokeSnob();
    });
  }

  //
  const pgl_allowance = await PGL_TOKEN.allowance(App.YOUR_ADDRESS, CRYSTAL_VAULT_ADDRESS)
  console.log("pgl_allowance:", pgl_allowance / 1e18);
  if (pgl_allowance == 0) {
    $("#pgl_approve").show();
    $("#pgl_approve").click(function(){
      approvePgl();
    });
  } else {
    $("#pgl_revoke").show();
    $("#pgl_revoke").click(function(){
      revokePgl();
    });
  }

  // deposit/withdraw
  $("#deposit_crystal").click(function(){
    deposit_crystal();
  });
  $("#withdraw_crystal").click(function(){
    withdraw_crystal();
  });

  //vote
  $("#proposal_1_for").click(function(){
    governance_vote_for_1();
  });
  $("#proposal_1_against").click(function(){
    governance_vote_against_1();
  });


  hideLoading();
}
const crystalVaultContract_approve = async function (chefAbi, chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  showLoading()
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
    alert('Already approved')
    hideLoading();
  } else {
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash).then(function () {
          hideLoading();
          alert('Spending Approved')
        })
      })
      .catch(function () {
        hideLoading();
        alert('Approval failed')
      })
  }
}
const crystalVaultContract_revoke = async function (chefAbi, chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  showLoading()

  allow = STAKING_TOKEN.approve(chefAddress, 0)
    .then(function (t) {
      return App.provider.waitForTransaction(t.hash).then(function () {
        hideLoading();
        alert('Spending revoked')
      })
    })
    .catch(function () {
      hideLoading();
      alert('Revoke failed')
    })
}
const crystalVaultContract_deposit = async function (chefAbi, chefAddress, tokensnob, tokenpgl, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  //Tokens
  const TOKEN_SNOB = new ethers.Contract(tokensnob, ERC20_ABI, signer)
  const TOKEN_PGL = new ethers.Contract(tokenpgl, ERC20_ABI, signer)

  // Balances
  const balance_snob = await TOKEN_SNOB.balanceOf(App.YOUR_ADDRESS)
  const balance_pgl = await TOKEN_PGL.balanceOf(App.YOUR_ADDRESS)

  // Approvals
  const allowance_snob = await TOKEN_SNOB.allowance(App.YOUR_ADDRESS, chefAddress)
  const allowance_pgl = await TOKEN_PGL.allowance(App.YOUR_ADDRESS, chefAddress)

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  //inputs
  const snob_input = $("#snob_input").val();
  const pgl_input = $("#pgl_input").val();
  const snob_amount = ethers.BigNumber.from(String(Math.round((snob_input || 0) * 1000)) + "0".repeat(15));
  const pgl_amount = ethers.BigNumber.from(String(Math.round((pgl_input || 0) * 1000)) + "0".repeat(15));

  const snob_valid = snob_amount > 0 ? allowance_snob > 0 && balance_snob > 0 : true;
  const pgl_valid = pgl_amount > 0 ? allowance_pgl > 0 && balance_pgl > 0 : true;

  let allow = Promise.resolve()

  showLoading()
  if (!snob_valid || !pgl_valid || (snob_amount == 0 && pgl_amount == 0)) {
    alert('Please approve first or check your balance')
    hideLoading();
  } else {
    allow
      .then(async function () {
        CHEF_CONTRACT.deposit(snob_amount, pgl_amount)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
              alert('Tokens deposited. Refresh page to see balance.');
            })
          })
          .catch(function () {
            hideLoading()
            alert('Could not deposit. Check approvals and amounts.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Could not deposit. Check approvals and amounts.')
      })
  }
}
const crystalVaultContract_withdraw = async function (chefAbi, chefAddress, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  //balance
  const votes = await CHEF_CONTRACT.votes(App.YOUR_ADDRESS)
  
  let allow = Promise.resolve()

  showLoading()
  if (votes == 0) {
    alert('No balance to withdraw')
    hideLoading();
  } else {
    allow
      .then(async function () {
        CHEF_CONTRACT.withdrawAll()
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
              alert('Tokens Withdrawn. Refresh page to see balance.');
            })
          })
          .catch(function () {
            hideLoading()
            alert('Could not withdraw. Check approvals and amounts.')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Could not withdraw. Check approvals and amounts.')
      })
  }
}

const governanceContract_voteFor = async function (chefAbi, chefAddress, proposal_id, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  // //balance
  // const votes = await CHEF_CONTRACT.votes(App.YOUR_ADDRESS)

  let allow = Promise.resolve()

  showLoading()
  if (1 == 0) {
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
            alert('Could not vote')
          })
      })
      .catch(function () {
        hideLoading()
        alert('Could not vote')
      })
  }
}

const governanceContract_voteAgainst = async function (chefAbi, chefAddress, proposal_id, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  // //balance
  // const votes = await CHEF_CONTRACT.votes(App.YOUR_ADDRESS)

  let allow = Promise.resolve()

  showLoading()
  if (1 == 0) {
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
        alert('Could not vote.')
      })
  }
}

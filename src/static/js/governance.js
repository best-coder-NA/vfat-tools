$(function () {
  consoleInit();
  start(main);
});
async function main() {
  const App = await init_ethers();
  const signer = App.provider.getSigner()

  //ABIS
  const CRYSTAL_VAULT_ABI = [{"inputs":[{"internalType":"address","name":"_iceQueen","type":"address"},{"internalType":"address","name":"_snowball","type":"address"},{"internalType":"address","name":"_pgl","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_amountSnowball","type":"uint256"},{"internalType":"uint256","name":"_amountPGL","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"freeze","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"iceQueen","outputs":[{"internalType":"contractIIceQueen","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"isFrozen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pgl","outputs":[{"internalType":"contractIPangolinPair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"quadraticVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"snowball","outputs":[{"internalType":"contractIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const GOVERNANCE_ABI = [{"inputs":[{"internalType":"address","name":"_crystalVault","type":"address"},{"internalType":"address","name":"_governer","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"governer","type":"address"}],"name":"GovernerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"governer","type":"address"}],"name":"GovernerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"proposer","type":"address"},{"indexed":false,"internalType":"uint256","name":"proposalId","type":"uint256"},{"indexed":false,"internalType":"string","name":"title","type":"string"}],"name":"NewProposal","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"voter","type":"address"},{"indexed":false,"internalType":"uint256","name":"proposalId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"support","type":"bool"},{"indexed":false,"internalType":"uint256","name":"votes","type":"uint256"}],"name":"NewVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"ProposalExecuted","type":"event"},{"inputs":[{"internalType":"address","name":"_governer","type":"address"}],"name":"addGoverner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"crystalVault","outputs":[{"internalType":"contract ICrystalVault","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_proposalId","type":"uint256"},{"internalType":"address","name":"_target","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"execute","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"executionDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"executionExpiration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_proposalId","type":"uint256"},{"internalType":"address","name":"_voter","type":"address"}],"name":"getVote","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"governers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposalThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"address","name":"proposer","type":"address"},{"internalType":"address","name":"executor","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"forVotes","type":"uint256"},{"internalType":"uint256","name":"againstVotes","type":"uint256"},{"internalType":"bytes32","name":"txHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"address","name":"_target","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"propose","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"quorumVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_governer","type":"address"}],"name":"removeGoverner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_seconds","type":"uint256"}],"name":"setExecutionDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_seconds","type":"uint256"}],"name":"setExecutionExpiration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_votes","type":"uint256"}],"name":"setProposalThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_votes","type":"uint256"}],"name":"setQuorumVotes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_seconds","type":"uint256"}],"name":"setVotingPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"state","outputs":[{"internalType":"enum Governance.ProposalState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_proposalId","type":"uint256"},{"internalType":"bool","name":"_support","type":"bool"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"votingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
  //FUJI
  const CRYSTAL_VAULT_ADDRESS = "0xD29788466A66127326a9562d26C677DCEbAd12B9";
  const GOVERNANCE_ADDRESS = "0x2630922AcFe0B412040B3b23041811227756d8b1";
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
  console.log("votes:", votes / 1e18)
  console.log("qVotes:", qVotes / 1e10)
  $("#my_votes").html((qVotes / 1e10).toLocaleString())

  //proposals
  const GOVERNANCE_CONTRACT = new ethers.Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, signer);
  const proposal_count = await GOVERNANCE_CONTRACT.proposalCount();
  for (i = proposal_count - 1; i > -1; i--) {
    const proposal = await GOVERNANCE_CONTRACT.proposals(i)
    console.log(proposal)
    let proposal_html = `<details class="mb-20 collapse-panel w-500 mw-full">`;
    proposal_html += `<summary class="collapse-header">`;
    proposal_html += `<div class="font-size-16"><span class="font-weight-bold">Proposal # ${proposal.id * 1}:</span> ${proposal.title}</div><div><span class="text-success">For: ${proposal.forVotes / 1e18}</span><span class="float-right text-secondary">Against: ${proposal.againstVotes / 1e18}</span></div>`
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

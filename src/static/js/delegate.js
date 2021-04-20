$(function () {
  consoleInit();
  start(main);
});

const abi = [
  "event delegate(address indexed src, address indexed dst, uint val)"
];

async function main() {

  const app = await init_ethers();

  let walletAddres = `${app.YOUR_ADDRESS}`;
  $('#wallet-address').html(`${walletAddres}`);

  let signer = app.provider.getSigner()  

  let snowballmultisig = '0x294aB3200ef36200db84C4128b7f1b4eec71E38a';
  let root = '0x0000000000000000000000000000000000000000';

  let png_contract = new ethers.Contract('0x60781C2586D68229fde47564546784ab3fACA982', YAM_TOKEN_ABI, signer)

  png_contract.getCurrentVotes(snowballmultisig).then(results => {
    $('#votecount').html(results / 1e18)
  })

  png_contract.delegates(app.YOUR_ADDRESS).then(results => {
    if ( results === snowballmultisig ) {
      $('#undelegate').show();
      $('#undelegate > button').on('click', () => {
        png_contract.delegate(root).then( result => {
          document.location.reload()
        });
      })
    } else {
      $('#delegate').show();
      $('#delegate > button').on('click', () => {
        png_contract.delegate(snowballmultisig).then( result => {
          document.location.reload()
        });
      })
    }
  })

}

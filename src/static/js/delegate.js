$(function () {
  consoleInit();
  start(main);
});

const abi = [
  "event delegate(address indexed src, address indexed dst, uint val)"
];

const prettyNumber = (n, fixed) => {
  let nonNan = new Intl.NumberFormat('en-US').format(fixed ? n.toFixed(fixed): n);
  if  ( isNaN(n) ) {
      return n;
  }
  if ( n > 10000 && parseInt(n) != n ) {
      return prettyNumber(parseInt(n))
  }
  return nonNan
}

async function main() {

  const app = await init_ethers();

  let walletAddres = `${app.YOUR_ADDRESS}`;
  $('#wallet-address').html(`${walletAddres}`);

  let signer = app.provider.getSigner()  

  let snowballmultisig = '0x294aB3200ef36200db84C4128b7f1b4eec71E38a';
  let root = '0x0000000000000000000000000000000000000000';

  let png_contract = new ethers.Contract('0x60781C2586D68229fde47564546784ab3fACA982', YAM_TOKEN_ABI, signer)

  png_contract.getCurrentVotes(snowballmultisig).then(results => {
    let vc = results / 1e18
    let sr = 1000000 - vc
    $('#votecount').html(prettyNumber(vc));
    $('#stillrequire').html(prettyNumber(sr))
  })

  png_contract.delegates(app.YOUR_ADDRESS).then(results => {
    if ( results === snowballmultisig ) {
      $('#undelegate').show();
      $('button.undelegate').on('click', (e) => {
        e.target.disabled = true;
        png_contract.delegate(root).then( result => {
          setTimeout( () => {
            document.location.reload()
          }, 5000)          
        }).catch(err => {
          setTimeout( () => {
            document.location.reload()
          }, 5000)          
        });
      })
    } else {
      $('#delegate').show();
      $('button.delegate').on('click', (e) => {
        e.target.disabled = true;
        $('#effects').html(`<audio controls autoplay><source src="https://x-api.snowball.network/dex/delegate.mp3" type="audio/mpeg"></audio>`)

        png_contract.delegate(snowballmultisig).then( result => {
          setTimeout( () => {
            document.location.reload()
          }, 5000)          
        }).catch(err => {
          setTimeout( () => {
            document.location.reload()
          }, 5000)          
        });
      })
    }
  })

}

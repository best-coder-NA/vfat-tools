$(function () {
  consoleInit();
  start(main);
});

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

  let png_vote = new ethers.Contract('0x60781C2586D68229fde47564546784ab3fACA982', YAM_TOKEN_ABI, signer)

  png_vote.getCurrentVotes(snowballmultisig).then(results => {
    let vc = results / 1e18
    let sr = (1000000 - vc) > 0 ? (1000000 - vc) : 0;
    $('#votecount').html(prettyNumber(vc));
    $('#stillrequire').html(prettyNumber(sr))
  })

  let png_token = new ethers.Contract('0x60781C2586D68229fde47564546784ab3fACA982', ERC20_ABI, signer)

  png_token.balanceOf(app.YOUR_ADDRESS).then(results => {
    console.log('results:', results)
    let bo = results / 1e18
    if ( bo === 0 ) {
      $('#yourcontribution').html(`${prettyNumber(bo)} PNGs of support is still support`)
    } else {
      $('#yourcontribution').html(`We appreciate your <span style="color:#fff">${prettyNumber(bo)}</span> PNGs of support`)
    }    
  })

  Promise.all([fetch('https://x-api.snowball.network/snob/price').then(res => res.text()).then(price => {
    console.log('price:', price)
    return parseFloat(price)
  }),fetch('https://x-api.snowball.network/snob/circulating').then(res => res.text()).then(circulating => {
    console.log('circulating:', circulating)
    return parseFloat(circulating)
  }),fetch('https://x-api.snowball.network/snob/harvest').then(res => res.text()).then(harvest => {
    console.log('harvest:', harvest)
    return parseFloat(harvest)
  })]).then(res => {
    console.log('results:', res)
    $('#rightcolumn').append(`    
    <div style="text-align:center">
      <div style="white-space: nowrap;text-align:left"><span style="text-align:right;display:inline-block;width:100px">$${prettyNumber(res[0], 2)}</span> Price</div>
      <div style="white-space: nowrap;text-align:left"><span style="text-align:right;display:inline-block;width:100px">${prettyNumber(res[1], 0)}</span> Circulating Supply</div>
      <div style="white-space: nowrap;text-align:left"><span style="text-align:right;display:inline-block;width:100px">$${prettyNumber(res[1] * res[0], 0)}</span> Market Cap</div>
      <div style="white-space: nowrap;text-align:left"><span style="text-align:right;display:inline-block;width:100px">$${prettyNumber(res[2], 2)}</span> Reinvestments</div>    
    </div>    
    `);
    $('#rightcolumn').show();
  }).catch(err => {
    console.log('fact error:', err);
  })
  
  png_vote.delegates(app.YOUR_ADDRESS).then(results => {
    if ( results === snowballmultisig ) {
      $('#undelegate').show();
      $('button.undelegate').on('click', (e) => {
        e.target.disabled = true;
        png_vote.delegate(root).then( result => {
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

        png_vote.delegate(snowballmultisig).then( result => {
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

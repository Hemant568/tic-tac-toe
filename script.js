document.addEventListener('DOMContentLoaded', () => {
  console.log('started');
  let info = document.querySelector('.info');
  let isCircleTurn = true;
  let isGameOver = false;
  const grids = document.querySelectorAll('.grid-item');
  let values = new Array(grids.length).fill(null);
  
  function checkForWinAndGameOver() {
    const toComp = isCircleTurn ? 'O' : 'X';
    const hr = [0,3,6];
    const hc = [0,1,2];
    for(const r of hr) {
      if(values[r] === toComp && values[r+1] === toComp && values[r+2] === toComp) {
        isGameOver = true;
        info.innerText = isCircleTurn ? 'Circle won!' : 'Cross won!'
        return;
      }
    }
    for(const c of hc) {
      if(values[c] === toComp && values[c+3] === toComp && values[c+6] === toComp) {
        isGameOver = true;
        info.innerText = isCircleTurn ? 'Circle won!' : 'Cross won!'
        return;
      }
    }
    //vertical
    if((values[0] === toComp && values[4] === toComp && values[8] === toComp) ||
       (values[2] === toComp && values[4] === toComp && values[6] === toComp)) {
      isGameOver = true;
      info.innerText = isCircleTurn ? 'Circle won!' : 'Cross won!'
      return;
    }
    const someLeft = values.some((a) => a === null);
    if(!someLeft) {
      isGameOver = true;
      info.innerText = 'Drawn!';
    }
  }
  
  for(let i=0; i<grids.length; i++) {
    grids[i].addEventListener('click', (e) => {
      const idx = Number(e.target.id);
      if(!values[idx] || !isGameOver) {
        grids[i].classList.add('mark');
        if(isCircleTurn) {
          values[i] = 'O';
          grids[i].innerText = 'O';
        }else {
          values[i] = 'X';
          grids[i].innerText = 'X';
        }
        checkForWinAndGameOver();
        if(!isGameOver) {
          isCircleTurn = !isCircleTurn;
          info.innerText = isCircleTurn ? 'Turn: Circle' : 'Turn: Cross'
        }
      }
    });
  }
})

const rows = 3;
const cols = 3;

const Symbol_Count = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const Symbol_Values = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  const depositAmountInput = document.getElementById('depositAmount');
  const depositAmountNumber = parseFloat(depositAmountInput.value);
  if (isNaN(depositAmountNumber) || depositAmountNumber <= 0) {
    alert("Invalid Deposit Amount!!!, try again.");
    return 0;
  } else {
    return depositAmountNumber;
  }
};

const getNoOfLines = () => {
  const linesInput = document.getElementById('lines');
  const NoOfLines = parseFloat(linesInput.value);
  if (isNaN(NoOfLines) || NoOfLines <= 0 || NoOfLines > 3) {
    alert("Invalid No of Lines!!!, try again.");
    return 0;
  } else {
    return NoOfLines;
  }
};

const getBetAmount = (balance, lines) => {
  const betAmountInput = document.getElementById('betAmount');
  const betAmount = parseFloat(betAmountInput.value);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
    alert("Invalid Bet Amount!!!, try again.");
    return 0;
  } else {
    return betAmount;
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(Symbol_Count)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < cols; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < rows; j++) {
      const index = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[index];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(index, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rowsTransposed = [];
  for (let i = 0; i < rows; i++) {
    rowsTransposed.push([]);
    for (let j = 0; j < cols; j++) {
      rowsTransposed[i].push(reels[j][i]);
    }
  }
  return rowsTransposed;
};

const printRows = (rowsTransposed) => {
  for (let i = 0; i < cols; i++) {
    const reel = document.getElementById(`reel${i + 1}`);
    reel.innerHTML = '';
    for (let j = 0; j < rows; j++) {
      const symbolDiv = document.createElement('div');
      symbolDiv.className = 'symbol';
      symbolDiv.textContent = rowsTransposed[j][i];
      reel.appendChild(symbolDiv);
    }
  }
};

const getWinner = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    let allSame = true;
    const Symbol = rows[row];
    for (const symbol of Symbol) {
      if (symbol != Symbol[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * Symbol_Values[Symbol[0]];
    }
  }
  return winnings;
};
/*
const showConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};*/

const showConfetti = () => {
    confetti({
      particleCount: 800, //changeable
      spread: 1000, //changeable
      startVelocity: 50, //changeable
      origin: { y: 0.5 }, //you can add x-horizontal place and y-vertical place
      colors: ['#bb0000', '#ffffff', '#00ff00', '#0000ff', '#ff00ff', '#ffff00', '#00ffff'], //changeable colors
      shapes: ['circle', 'square', 'triangle', 'rectangle', 'hexagon', 'pentagon'],
      gravity: 0.5  //speed of falling
    });
  };

const game = () => {
  let balance = 0;
  const balanceDisplay = document.getElementById('balance');
  const messageDisplay = document.getElementById('message');
  const playButton = document.getElementById('playButton');
  const depositButton = document.getElementById('depositButton');

  depositButton.addEventListener('click', () => {
    balance = deposit();
    if (balance > 0) {
      balanceDisplay.textContent = `Your Current Balance: ${balance}`;
      playButton.disabled = false;
    }
  });

  playButton.addEventListener('click', () => {
    const NoOfLines = getNoOfLines();
    if (NoOfLines === 0) return;

    const betAmount = getBetAmount(balance, NoOfLines);
    if (betAmount === 0) return;

    const totalBet = betAmount * NoOfLines;
    balance -= totalBet;
    balanceDisplay.textContent = `Your Current Balance: ${balance}`;

    const reels = spin();
    const rowsTransposed = transpose(reels);
    printRows(rowsTransposed);

    const symbols = document.querySelectorAll('.symbol');
    symbols.forEach(symbol => symbol.classList.add('spin'));

    setTimeout(() => {
      symbols.forEach(symbol => symbol.classList.remove('spin'));
      const winnings = getWinner(rowsTransposed, betAmount, NoOfLines);
      balance += winnings;

      if (winnings > 0) {
        showConfetti();
        messageDisplay.textContent = `You won! Your Winnings: ${winnings}\nYour New Balance: ${balance}`;
      } else {
        messageDisplay.textContent = `You lost! Better luck next time.\nYour New Balance: ${balance}`;
      }

      if (balance <= 0) {
        messageDisplay.textContent += "\nYou ran out of balance.";
        playButton.disabled = true;
      }
    }, 1000);
  });
};

game();

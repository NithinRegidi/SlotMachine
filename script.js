//1. Deposit some money
//2. Determine number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if user won or not
//6. if user wins grant his winnings
//7. if lose take away
//8. play again

const prompt = require("prompt-sync")();

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

//1. Deposit some money
const deposit = () => {
  while (true) {
    // const depositAmount = prompt("Enter Deposit Amount: ");
    const depositAmountNumber = parseFloat(prompt("Enter Deposit Amount: "));

    if (isNaN(depositAmountNumber) || depositAmountNumber <= 0) {
      console.log("Invalid Deposit Amount!!!, try again.");
    } else {
      return depositAmountNumber;
    }
  }
};
/*
let balance = deposit();
console.log(balance);*/

//2. Determine number of lines to bet on
const getNoOfLines = () => {
  while (true) {
    // const lines = prompt("Enter No of Lines to bet on(1-3): ");
    const NoOfLines = parseFloat(prompt("Enter No of Lines to bet on(1-3): "));

    if (isNaN(NoOfLines) || NoOfLines <= 0 || NoOfLines > 3) {
      console.log("Invalid No of Lines!!!, try again.");
    } else {
      return NoOfLines;
    }
  }
};
/*
const NoOfLines = getNoOfLines();
console.log(NoOfLines);*/

//3. collect a bet amount
const getBetAmount = (balance, lines) => {
  while (true) {
    const betAmount = parseFloat(prompt("Enter Bet Amount as per Lines: "));

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
      console.log("Invalid Bet Amount!!!, try again.");
    } else {
      return betAmount;
    }
  }
};
/*
const betAmount = getBetAmount(balance, NoOfLines); //Here, We need to pass args to work properly
console.log("Total Bet Amount: ", betAmount * NoOfLines);*/

//4. spin the slot machine
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
/*
const reels = spin();
console.log(reels);*/

//5. check if user won or not
//transpose the array

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
/*const rowsTransposed = transpose(reels);
console.log(rowsTransposed);*/

//Printing
const printRows = (rowsTransposed) => {
  for (const row of rowsTransposed) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};
//printRows(rowsTransposed);

//6. if user wins grant his winnings
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
/*const winnings = getWinner(rowsTransposed, betAmount, NoOfLines);
console.log(`You won!, ${winnings.toString()}`);*/

const game=()=>{
    let balance = deposit();

    while(true){
        console.log(`You Current Balance: ${balance}`);
        const NoOfLines=getNoOfLines();
        const betAmount=getBetAmount();
        const totalBet=betAmount*NoOfLines;

        balance=balance-totalBet;

        const reels=spin();
        const rowsTransposed=transpose(reels);

        console.log(rowsTransposed);

        const winnings=getWinner(rowsTransposed, betAmount, NoOfLines);
        balance=balance+winnings;

        console.log(`Your Winnings ${winnings}`);
        console.log(`Your new balance ${balance}`);

        if(balance<=0){
            console.log("You are ran out of balance");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");
    if (playAgain !== "y") break;
    }
};

game();
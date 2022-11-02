'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}</div>
      </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(part => part[0])
      .join('');
  });
};

createUserName(accounts);

const calcDisplaySummary = function (ca) {
  const movements = ca.movements;
  const inSummary = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = inSummary;

  const outSummary = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = outSummary;

  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * ca.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = interest + 1;
};

const displaySummary = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = balance;
};
// const checkDogs = function (dogsjulia, dogsKate) {
//   //const correctedItems = dogsjulia.slice(1, dogsjulia.length - 2);
//   const correctedItems = dogsjulia.slice();
//   correctedItems.splice(0, 1);
//   correctedItems.splice(-2);

//   return [...correctedItems, ...dogsKate];
// };

// const dogsjulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const remainDogs = checkDogs(dogsjulia, dogsKate);

// // remainDogs.forEach(function (age, i) {
// //   if (age >= 3) {
// //     console.log(`Dog number ${i + 1} is an adult, and is ${age}years old`);
// //   } else {
// //     console.log(`Dog number ${i + 1} is still a puppy`);
// //   }
// // });

// const calcAverageHumanAge = function (dogsAge) {
//   const avgAge = dogsAge
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(dogAge => dogAge >= 18)
//     .reduce((acc, dogAge, i, arr) => acc + dogAge / arr.length, 0);
//   console.log(avgAge);
// };

// calcAverageHumanAge(remainDogs);

// const firstWithDrawal = function (accounts) {
//   for (const acc of accounts) {
//     console.log(acc.owner);

//     if (acc.owner === 'Jessica Davis') {
//       return acc;
//     }
//   }
// };

// console.log(firstWithDrawal(accounts));

const updateUI = function (ca) {
  displayMovements(ca.movements);
  displaySummary(ca.movements);
  calcDisplaySummary(ca);
};
let ca;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  ca = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (ca?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome ${ca.owner[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(ca);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const payee = inputTransferTo.value;
  const amt = Number(inputTransferAmount.value);
  inputTransferTo.value = inputTransferAmount = '';
  const balance = ca.movements.reduce((acc, mov) => acc + mov);
  console.log(balance);
  const receiver = accounts.find(acc => acc.username === payee);
  if (amt > 0 && amt <= balance && receiver?.username !== ca.username) {
    receiver.movements.push(amt);
    ca.movements.push(-amt);
    updateUI(ca);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmt = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';
  ca.movements.some(mov => mov >= 0.1 * loanAmt);
  ca.movements.push(loanAmt);
  updateUI(ca);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(inputCloseUsername.value, inputClosePin.value);

  if (
    inputCloseUsername.value === ca.username &&
    Number(inputClosePin.value) === ca.pin
  ) {
    const index = accounts.findIndex(acc => acc.username === ca.username);
    console.log(index);
    //accounts.splice(index);
    console.log(accounts);
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(ca.movements, !sorted);
  sorted = !sorted;
});

const a = Array.from({ length: 100 }, () => Math.abs(Math.random() * 100));
console.log(a);

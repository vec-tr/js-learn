'use = strict';

const calcObj = {};
const renoCalcAppRes = document.querySelector('.reno-cal-btn-app-res');
const renoCalcAppCom = document.querySelector('.reno-cal-btn-app-com');
const renoCalcSubmit = document.querySelector('.reno-submit-btn');

const renoCalcTypeTariff = document.querySelector('.reno-cal-btn-type-tariff');
const renoCalcTypeArea = document.querySelector('.reno-cal-btn-type-area');
const renoCalcTypeCap = document.querySelector('.reno-cal-btn-type-cap');

const renoCalcResult = document.querySelector('.reno-calc-result');

renoCalcAppRes.addEventListener('click', function (e) {
  calcObj.application = e.target.value;
});

renoCalcAppCom.addEventListener('click', function (e) {
  calcObj.application = e.target.value;
});

renoCalcTypeTariff.addEventListener('click', function (e) {
  console.log(e.target.value);
  calcObj.type = e.target.value;
});

renoCalcTypeArea.addEventListener('click', function (e) {
  console.log(e.target.value);
  calcObj.type = e.target.value;
});

renoCalcTypeCap.addEventListener('click', function (e) {
  console.log(e.target.value);
  calcObj.capacity = e.target.value;
});

renoCalcSubmit.addEventListener('click', function (e) {
  console.log(calcObj.application);
  console.log(calcObj.type);

  //   if (!calcObj || !calcObj.application || calcObj.type) {
  //     alert('Missing input');
  //   }
  const avgMonthlyBill = Number(
    document.querySelector('.avg-monthly-bill').value
  );
  console.log(avgMonthlyBill);
  const perKwCost = Number(document.querySelector('.perKwCost').value);
  console.log(perKwCost);

  const units = avgMonthlyBill / 4;
  const billForYear = avgMonthlyBill * 12;
  const plantCap = Math.trunc(units / (4.5 * 30) + 1);
  const grossInvestment = plantCap * perKwCost;

  var subsidy;
  if (plantCap <= 3) {
    subsidy = 14588 * plantCap;
  } else if (plantCap > 10) {
    subsidy = 94822;
  } else {
    subsidy = 14588 * 3 + 7294 * (plantCap - 3);
  }

  const netInvestment = grossInvestment - subsidy;
  const area = plantCap * 100;
  const roi = renoCalcResult.insertAdjacentHTML(
    'afterend',
    `<p>Total Units required to generate to go zero electricity bill = ${units}</p>
    <p>Your total electricity bill for the year = ${billForYear}</p>
    <p>Plant capacity required to generate ${units} = ${plantCap}kw</p>
    <p>Total investment ${grossInvestment}</p>
    <p>Total subsidy ${subsidy}</p>
    <p>Net investment ${netInvestment}</p>
    <p>Area required ${area} sq feet</p>`
  );
});

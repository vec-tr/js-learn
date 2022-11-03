'use = strict';

const calcObj = {};
const renoCalcAppRes = document.querySelector('.reno-cal-btn-app-res');
const renoCalcAppCom = document.querySelector('.reno-cal-btn-app-com');
const renoCalcSubmit = document.querySelector('.reno-submit-btn');

const renoCalcTypeTariff = document.querySelector('.reno-cal-btn-type-tariff');
const renoCalcTypeArea = document.querySelector('.reno-cal-btn-type-area');
const renoCalcTypeCap = document.querySelector('.reno-cal-btn-type-cap');

const renoCalcResult = document.querySelector('.reno-calc-result');

const tariffSectionSelector = document.getElementById('reno-inputs-div-bill');
const areaSectionSelector = document.getElementById('reno-inputs-div-area');
const capSectionSelector = document.getElementById('reno-inputs-div-cap');

tariffSectionSelector.style.display = 'none';
areaSectionSelector.style.display = 'none';
capSectionSelector.style.display = 'none';

renoCalcAppRes.addEventListener('click', function (e) {
  tariffSectionSelector.style.display = 'none';
  areaSectionSelector.style.display = 'none';
  capSectionSelector.style.display = 'none';

  calcObj.application = e.target.value;
});

renoCalcAppCom.addEventListener('click', function (e) {
  tariffSectionSelector.style.display = 'none';
  areaSectionSelector.style.display = 'none';
  capSectionSelector.style.display = 'none';

  calcObj.application = e.target.value;
});

renoCalcTypeTariff.addEventListener('click', function (e) {
  tariffSectionSelector.style.display = 'block';
  areaSectionSelector.style.display = 'none';
  capSectionSelector.style.display = 'none';

  calcObj.type = e.target.value;
});

renoCalcTypeArea.addEventListener('click', function (e) {
  tariffSectionSelector.style.display = 'none';
  areaSectionSelector.style.display = 'block';
  capSectionSelector.style.display = 'none';

  calcObj.type = e.target.value;
});

renoCalcTypeCap.addEventListener('click', function (e) {
  tariffSectionSelector.style.display = 'none';
  areaSectionSelector.style.display = 'none';
  capSectionSelector.style.display = 'block';

  calcObj.type = e.target.value;
});

renoCalcSubmit.addEventListener('click', function (e) {
  //   if (!calcObj || !calcObj.application || calcObj.type) {
  //     alert('Missing input');
  //   }
  if (calcObj.type === 'tariff') {
    const avgMonthlyBill = Number(
      document.querySelector('.avg-monthly-bill').value
    );
    console.log(avgMonthlyBill);
    const perKwCost = Number(
      document.querySelector('.reno-per-kw-cost-bill').value
    );
    console.log(perKwCost);

    const units = avgMonthlyBill / 4;
    const billForYear = avgMonthlyBill * 12;
    const plantCap = Math.trunc(units / (4.5 * 30) + 1);
    const grossInvestment = plantCap * perKwCost;

    var subsidy;
    if (calcObj.application === 'residential') {
      if (plantCap <= 3) {
        subsidy = 14588 * plantCap;
      } else if (plantCap > 10) {
        subsidy = 94822;
      } else {
        subsidy = 14588 * 3 + 7294 * (plantCap - 3);
      }
    } else {
      subsidy = 0;
    }

    const netInvestment = grossInvestment - subsidy;
    const area = plantCap * 100;
    const roiPerYear = 135 * 12 * 4 * plantCap;
    const payBackPeriod = Math.trunc(netInvestment / roiPerYear);
    const payBackPeriodPerc = ((roiPerYear * 100) / netInvestment).toFixed(2);

    renoCalcResult.insertAdjacentHTML(
      'afterend',
      `<p>Total Units required to generate to go zero electricity bill = ${units}</p>
    <p>Your total electricity bill for the year = ${billForYear}</p>
    <p>Plant capacity required to generate ${units} = ${plantCap}kw</p>
    <p>Total investment ${grossInvestment}</p>
    <p>Total subsidy ${subsidy}</p>
    <p>Net investment ${netInvestment}</p>
    <p>Area required apprx. ${area}-${area + 100} sq feet</p>
    <p>Return on investment per year ${roiPerYear} in percentage ${payBackPeriodPerc}</p>
    <p>Pay back period ${payBackPeriod}</p>`
    );
  } else if (calcObj.type === 'area') {
    const areaAvailable = Number(
      document.querySelector('.reno-area-available').value
    );

    const perKwCost = Number(
      document.querySelector('.reno-per-kw-cost-area').value
    );

    var effArea = (areaAvailable / 1.3).toFixed(2);

    renoCalcResult.insertAdjacentHTML(
      'afterend',
      `<p>Effective usable area ${effArea} sq feet</p>`
    );

    effArea = effArea / 10.764;
  } else if (calcObj.type === 'cap') {
    const plantCap = Number(document.querySelector('.reno-capacity').value);

    const perKwCost = Number(
      document.querySelector('.reno-per-kw-cost-cap').value
    );

    console.log(plantCap, perKwCost);

    const grossInvestment = plantCap * perKwCost;

    var subsidy;
    if (calcObj.application === 'residential') {
      if (plantCap <= 3) {
        subsidy = 14588 * plantCap;
      } else if (plantCap > 10) {
        subsidy = 94822;
      } else {
        subsidy = 14588 * 3 + 7294 * (plantCap - 3);
      }
    } else {
      subsidy = 0;
    }

    const netInvestment = grossInvestment - subsidy;
    const area = plantCap * 100;
    const roiPerYear = 135 * 12 * 4 * plantCap;
    const payBackPeriod = Math.trunc(netInvestment / roiPerYear);
    const payBackPeriodPerc = ((roiPerYear * 100) / netInvestment).toFixed(2);

    renoCalcResult.insertAdjacentHTML(
      'afterend',
      `<p>Total investment ${grossInvestment}</p>
      <p>Total subsidy ${subsidy}</p>
      <p>Net investment ${netInvestment}</p>
      <p>Area required apprx. ${area}-${area + 100} sq feet</p>
      <p>Return on investment per year ${roiPerYear} in percentage ${payBackPeriodPerc}</p>
      <p>Pay back period ${payBackPeriod}</p>`
    );
  }
});

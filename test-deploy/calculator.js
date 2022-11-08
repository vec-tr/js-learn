'use = strict';

const calcObj = {};

const tariffSectionSelector = document.getElementById('reno_inputs_div_bill');
const areaSectionSelector = document.getElementById('reno_inputs_div_area');
const capSectionSelector = document.getElementById('reno_inputs_div_cap');

tariffSectionSelector.style.display = 'none';
areaSectionSelector.style.display = 'none';
capSectionSelector.style.display = 'none';

const renoAppResEl = document.getElementById('reno_app_res');
const renoAppCommEl = document.getElementById('reno_app_comm');
const renoTypeBillEl = document.getElementById('reno_type_bill');
const renoTypeAreaEl = document.getElementById('reno_type_area');
const renoTypeCapEl = document.getElementById('reno_type_cap');
const renoShowResultEl = document.querySelector('.reno-show-result');

const renoBillForYear = document.querySelector('.reno-bill-for-year');
const renoTotalUnits = document.querySelector('.reno-total-units');
const renoPlantCap = document.querySelector('.reno-plant-capacity');
const renoGrossInvest = document.querySelector('.reno-gross-investment');
const renoSubsidy = document.querySelector('.reno-subsidy');
const renoNetInvest = document.querySelector('.reno-net-investment');
const renoAreaReqd = document.querySelector('.reno-area-reqd');
const renoROCEAbs = document.querySelector('.reno-roce-number');
const renoROCEPer = document.querySelector('.reno-roce-percentage');
const renoPayBack = document.querySelector('.reno-pay-back');

const renoCalcResult = document.querySelector('.reno-submit-btn');
const renoBackBtn = document.querySelector('.reno-back-btn');

const renoAppCheckBoxRes = function () {
  tariffSectionSelector.style.display = 'none';
  areaSectionSelector.style.display = 'none';
  capSectionSelector.style.display = 'none';

  renoAppCommEl.checked = false;

  renoTypeBillEl.checked = false;
  renoTypeAreaEl.checked = false;
  renoTypeCapEl.checked = false;

  renoShowResultEl.style.display = 'none';
  renoBackBtn.style.display = 'none';

  calcObj.application = document.getElementById('reno_app_res').value;

  console.log(calcObj.application);
};

const renoAppCheckBoxComm = function () {
  tariffSectionSelector.style.display = 'none';
  areaSectionSelector.style.display = 'none';
  capSectionSelector.style.display = 'none';

  renoAppResEl.checked = false;

  renoTypeBillEl.checked = false;
  renoTypeAreaEl.checked = false;
  renoTypeCapEl.checked = false;

  renoShowResultEl.style.display = 'none';
  renoBackBtn.style.display = 'none';

  calcObj.application = renoAppCommEl.value;
};

const renoTypeBill = function () {
  tariffSectionSelector.style.display = 'block';
  areaSectionSelector.style.display = 'none';
  capSectionSelector.style.display = 'none';

  renoTypeAreaEl.checked = false;
  renoTypeCapEl.checked = false;

  renoShowResultEl.style.display = 'none';
  renoBackBtn.style.display = 'none';

  calcObj.type = renoTypeBillEl.value;
};

const renoTypeArea = function () {
  tariffSectionSelector.style.display = 'none';
  areaSectionSelector.style.display = 'block';
  capSectionSelector.style.display = 'none';

  renoTypeBillEl.checked = false;
  renoTypeCapEl.checked = false;

  renoShowResultEl.style.display = 'none';
  renoBackBtn.style.display = 'none';

  calcObj.type = document.getElementById('reno_type_area').value;
};

const renoTypeCap = function () {
  tariffSectionSelector.style.display = 'none';
  areaSectionSelector.style.display = 'none';
  capSectionSelector.style.display = 'block';

  renoTypeAreaEl.checked = false;
  renoTypeBillEl.checked = false;

  renoShowResultEl.style.display = 'none';
  renoBackBtn.style.display = 'none';

  calcObj.type = renoTypeCapEl.value;
};

renoCalcResult.addEventListener('click', function (e) {
  //   if (!calcObj || !calcObj.application || calcObj.type) {
  //     alert('Missing input');
  //   }

  renoShowResultEl.style.display = 'block';

  if (calcObj.type === 'bill') {
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

    renoTotalUnits.value = `${units} units/kwh`;
    renoBillForYear.value = `${billForYear.toLocaleString('en-IN')}/-`;
    renoPlantCap.value = `${plantCap}kw`;
    renoGrossInvest.value = `${grossInvestment.toLocaleString('en-IN')}/-`;
    renoSubsidy.value = `${subsidy.toLocaleString('en-IN')}/-`;
    renoNetInvest.value = `${netInvestment.toLocaleString('en-IN')}/-`;
    renoAreaReqd.value = `${area} - ${area + 100} sq. ft.`;
    renoROCEAbs.value = `${roiPerYear.toLocaleString('en-IN')}/-`;
    renoROCEPer.value = `${payBackPeriodPerc}%`;
    renoPayBack.value = `${payBackPeriod} years`;

    renoBackBtn.style.display = 'block';
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

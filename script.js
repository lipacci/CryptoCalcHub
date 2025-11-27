// CryptoCalcHub – core calculators
// This script is shared by all pages.

// Helper: parse number with support for comma or dot
function parseNum(value) {
  if (!value) return NaN;
  return parseFloat(String(value).replace(',', '.'));
}

// Helper: format number with 2 decimals
function format2(n) {
  if (!isFinite(n)) return '—';
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

document.addEventListener('DOMContentLoaded', () => {
  setupProfitCalculator();
  setupDcaCalculator();
  setupPositionSizeCalculator();
});

function setupProfitCalculator() {
  const form = document.getElementById('profit-form');
  if (!form) return; // not on this page

  const investmentInput = document.getElementById('profit-investment');
  const entryInput = document.getElementById('profit-entry');
  const exitInput = document.getElementById('profit-exit');
  const assetInput = document.getElementById('profit-asset');
  const resultBox = document.getElementById('profit-result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const investment = parseNum(investmentInput.value);
    const entry = parseNum(entryInput.value);
    const exit = parseNum(exitInput.value);
    const asset = (assetInput.value || '').trim() || 'asset';

    if (!isFinite(investment) || !isFinite(entry) || !isFinite(exit) || investment <= 0 || entry <= 0 || exit <= 0) {
      resultBox.innerHTML = `
        <h2>Result</h2>
        <p class="error">Please enter valid positive numbers for investment, entry price and exit price.</p>
      `;
      return;
    }

    const qty = investment / entry;
    const finalValue = qty * exit;
    const profit = finalValue - investment;
    const profitPct = (profit / investment) * 100;

    resultBox.innerHTML = `
      <h2>Result</h2>
      <p><strong>Asset:</strong> ${asset.toUpperCase()}</p>
      <p><strong>Quantity:</strong> ${format2(qty)}</p>
      <p><strong>Final value:</strong> ${format2(finalValue)}</p>
      <p><strong>Profit / loss:</strong> <span class="${profit >= 0 ? 'green' : 'red'}">${format2(profit)} (${format2(profitPct)}%)</span></p>
    `;
  });
}

function setupDcaCalculator() {
  const form = document.getElementById('dca-form');
  if (!form) return;

  const amountInput = document.getElementById('dca-amount');
  const periodsInput = document.getElementById('dca-periods');
  const avgPriceInput = document.getElementById('dca-average-price');
  const currentPriceInput = document.getElementById('dca-current-price');
  const assetInput = document.getElementById('dca-asset');
  const resultBox = document.getElementById('dca-result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseNum(amountInput.value);
    const periods = parseNum(periodsInput.value);
    const avgPrice = parseNum(avgPriceInput.value);
    const currentPrice = parseNum(currentPriceInput.value);
    const asset = (assetInput.value || '').trim() || 'asset';

    if (!isFinite(amount) || !isFinite(periods) || !isFinite(avgPrice) || !isFinite(currentPrice) ||
        amount <= 0 || periods <= 0 || avgPrice <= 0 || currentPrice <= 0) {
      resultBox.innerHTML = `
        <h2>Result</h2>
        <p class="error">Please enter valid positive numbers for all fields.</p>
      `;
      return;
    }

    const totalInvested = amount * periods;
    const totalQty = totalInvested / avgPrice;
    const finalValue = totalQty * currentPrice;
    const profit = finalValue - totalInvested;
    const profitPct = (profit / totalInvested) * 100;

    resultBox.innerHTML = `
      <h2>Result</h2>
      <p><strong>Asset:</strong> ${asset.toUpperCase()}</p>
      <p><strong>Total invested:</strong> ${format2(totalInvested)}</p>
      <p><strong>Quantity accumulated:</strong> ${format2(totalQty)}</p>
      <p><strong>Final value:</strong> ${format2(finalValue)}</p>
      <p><strong>Profit / loss:</strong> <span class="${profit >= 0 ? 'green' : 'red'}">${format2(profit)} (${format2(profitPct)}%)</span></p>
    `;
  });
}

function setupPositionSizeCalculator() {
  const form = document.getElementById('position-form');
  if (!form) return;

  const accountInput = document.getElementById('pos-account-size');
  const riskPctInput = document.getElementById('pos-risk-percent');
  const entryInput = document.getElementById('pos-entry-price');
  const stopInput = document.getElementById('pos-stop-price');
  const resultBox = document.getElementById('position-result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const accountSize = parseNum(accountInput.value);
    const riskPercent = parseNum(riskPctInput.value);
    const entry = parseNum(entryInput.value);
    const stop = parseNum(stopInput.value);

    if (!isFinite(accountSize) || !isFinite(riskPercent) || !isFinite(entry) || !isFinite(stop) ||
        accountSize <= 0 || riskPercent <= 0 || entry <= 0 || stop <= 0 || entry === stop) {
      resultBox.innerHTML = `
        <h2>Result</h2>
        <p class="error">Please enter valid positive numbers. Entry and stop must be different.</p>
      `;
      return;
    }

    const riskAmount = accountSize * (riskPercent / 100);
    const perUnitRisk = Math.abs(entry - stop);
    const positionSize = riskAmount / perUnitRisk;
    const notional = positionSize * entry;

    resultBox.innerHTML = `
      <h2>Result</h2>
      <p><strong>Risk amount:</strong> ${format2(riskAmount)} (which is ${format2(riskPercent)}% of account)</p>
      <p><strong>Position size:</strong> ${format2(positionSize)} units</p>
      <p><strong>Notional value:</strong> ${format2(notional)}</p>
    `;
  });
}

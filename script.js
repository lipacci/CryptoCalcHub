// scripts.js - CryptoCalcHub

window.addEventListener('DOMContentLoaded', () => {
  // --- PROFIT CALCULATOR ---
  const profitForm = document.getElementById('profit-form');
  if (profitForm) {
    profitForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const amount = parseFloat(document.getElementById('investment-amount').value);
      const entry = parseFloat(document.getElementById('entry-price').value);
      const exit = parseFloat(document.getElementById('exit-price').value);
      const resultEl = document.getElementById('profit-result');

      if (isNaN(amount) || isNaN(entry) || isNaN(exit) || amount <= 0 || entry <= 0 || exit <= 0) {
        resultEl.textContent = 'Please enter valid positive numbers in all fields.';
        return;
      }

      const qty = amount / entry;
      const finalValue = qty * exit;
      const profit = finalValue - amount;
      const profitPct = (profit / amount) * 100;

      const profitRounded = profit.toFixed(2);
      const profitPctRounded = profitPct.toFixed(2);

      const label = profit >= 0 ? 'Profit' : 'Loss';
      resultEl.textContent =
        `${label}: ${profitRounded} (${profitPctRounded}%) | Final value: ${finalValue.toFixed(2)}`;
    });
  }

  // --- DCA CALCULATOR ---
  const dcaForm = document.getElementById('dca-form');
  if (dcaForm) {
    dcaForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const amountPerPeriod = parseFloat(document.getElementById('dca-amount').value);
      const periods = parseInt(document.getElementById('dca-periods').value, 10);
      const avgPrice = parseFloat(document.getElementById('dca-avg-price').value);
      const resultEl = document.getElementById('dca-result');

      if (
        isNaN(amountPerPeriod) ||
        isNaN(periods) ||
        isNaN(avgPrice) ||
        amountPerPeriod <= 0 ||
        periods <= 0 ||
        avgPrice <= 0
      ) {
        resultEl.textContent = 'Please enter valid positive numbers in all fields.';
        return;
      }

      const totalInvested = amountPerPeriod * periods;
      const totalCoins = totalInvested / avgPrice;

      resultEl.textContent =
        `Total invested: ${totalInvested.toFixed(2)} | Estimated coins accumulated: ${totalCoins.toFixed(6)}`;
    });
  }

  // --- POSITION SIZE CALCULATOR ---
  const positionForm = document.getElementById('position-form');
  if (positionForm) {
    positionForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const accountSize = parseFloat(document.getElementById('account-size').value);
      const riskPercent = parseFloat(document.getElementById('risk-percent').value);
      const entryPrice = parseFloat(document.getElementById('position-entry').value);
      const stopPrice = parseFloat(document.getElementById('position-stop').value);
      const resultEl = document.getElementById('position-result');

      if (
        isNaN(accountSize) ||
        isNaN(riskPercent) ||
        isNaN(entryPrice) ||
        isNaN(stopPrice) ||
        accountSize <= 0 ||
        riskPercent <= 0 ||
        entryPrice <= 0 ||
        stopPrice <= 0 ||
        stopPrice === entryPrice
      ) {
        resultEl.textContent = 'Please enter valid positive numbers in all fields (entry and stop must be different).';
        return;
      }

      const riskAmount = accountSize * (riskPercent / 100);
      const priceDiff = Math.abs(entryPrice - stopPrice);
      const positionSize = riskAmount / priceDiff; // in coins
      const notional = positionSize * entryPrice;

      resultEl.textContent =
        `Position size: ${positionSize.toFixed(6)} coins | Notional: ${notional.toFixed(2)} | Risk per trade: ${riskAmount.toFixed(2)}`;
    });
  }
});

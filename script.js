// Helper: format number with 2 decimals and thousands separator
function fmt(num) {
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* 1. Profit calculator */
function initProfitCalculator() {
  const btn = document.getElementById("profit-btn");
  if (!btn) return; // not on this page

  btn.addEventListener("click", () => {
    const asset = (document.getElementById("profit-asset").value || "Asset").toUpperCase();
    const investment = parseFloat(document.getElementById("profit-investment").value);
    const entry = parseFloat(document.getElementById("profit-entry").value);
    const exit = parseFloat(document.getElementById("profit-exit").value);
    const out = document.getElementById("profit-result");

    if (!investment || !entry || !exit || investment <= 0 || entry <= 0 || exit <= 0) {
      out.innerHTML = "<h2>Result</h2><p>Please enter valid positive numbers for all fields.</p>";
      return;
    }

    const qty = investment / entry;
    const finalValue = qty * exit;
    const profit = finalValue - investment;
    const profitPct = (profit / investment) * 100;

    out.innerHTML = `
      <h2>Result</h2>
      <p><span class="result-highlight">Asset:</span> ${asset}</p>
      <p><span class="result-highlight">Quantity:</span> ${fmt(qty)}</p>
      <p><span class="result-highlight">Final value:</span> ${fmt(finalValue)}</p>
      <p><span class="result-highlight">Profit / loss:</span> ${fmt(profit)} (${fmt(profitPct)}%)</p>
    `;
  });
}

/* 2. DCA calculator */
function initDcaCalculator() {
  const btn = document.getElementById("dca-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const asset = (document.getElementById("dca-asset").value || "Asset").toUpperCase();
    const amount = parseFloat(document.getElementById("dca-amount").value);
    const periods = parseFloat(document.getElementById("dca-periods").value);
    const avgPrice = parseFloat(document.getElementById("dca-avg-price").value);
    const currentPrice = parseFloat(document.getElementById("dca-current-price").value);
    const out = document.getElementById("dca-result");

    if (!amount || !periods || !avgPrice || !currentPrice ||
        amount <= 0 || periods <= 0 || avgPrice <= 0 || currentPrice <= 0) {
      out.innerHTML = "<h2>Result</h2><p>Please enter valid positive numbers for all fields.</p>";
      return;
    }

    const totalInvested = amount * periods;
    const qty = totalInvested / avgPrice;
    const finalValue = qty * currentPrice;
    const profit = finalValue - totalInvested;
    const profitPct = (profit / totalInvested) * 100;

    out.innerHTML = `
      <h2>Result</h2>
      <p><span class="result-highlight">Asset:</span> ${asset}</p>
      <p><span class="result-highlight">Total invested:</span> ${fmt(totalInvested)}</p>
      <p><span class="result-highlight">Quantity accumulated:</span> ${fmt(qty)}</p>
      <p><span class="result-highlight">Final value:</span> ${fmt(finalValue)}</p>
      <p><span class="result-highlight">Profit / loss:</span> ${fmt(profit)} (${fmt(profitPct)}%)</p>
    `;
  });
}

/* 3. Position size calculator */
function initPositionCalculator() {
  const btn = document.getElementById("pos-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const account = parseFloat(document.getElementById("pos-account").value);
    const riskPct = parseFloat(document.getElementById("pos-risk-pct").value);
    const entry = parseFloat(document.getElementById("pos-entry").value);
    const stop = parseFloat(document.getElementById("pos-stop").value);
    const out = document.getElementById("pos-result");

    if (!account || !riskPct || !entry || !stop ||
        account <= 0 || riskPct <= 0 || entry <= 0 || stop <= 0) {
      out.innerHTML = "<h2>Result</h2><p>Please enter valid positive numbers for all fields.</p>";
      return;
    }

    const riskAmount = (account * riskPct) / 100;
    const riskPerUnit = Math.abs(entry - stop);

    if (riskPerUnit === 0) {
      out.innerHTML = "<h2>Result</h2><p>Entry price and stop-loss price must be different.</p>";
      return;
    }

    const units = riskAmount / riskPerUnit;
    const notional = units * entry;

    out.innerHTML = `
      <h2>Result</h2>
      <p><span class="result-highlight">Risk amount:</span> ${fmt(riskAmount)} (which is ${fmt(riskPct)}% of account)</p>
      <p><span class="result-highlight">Position size:</span> ${fmt(units)} units</p>
      <p><span class="result-highlight">Notional value:</span> ${fmt(notional)}</p>
    `;
  });
}

/* 4. Local visitor counter (only shows something meaningful on index) */
function initLocalVisitorCounter() {
  const el = document.getElementById("visitor-count");
  if (!el) return;

  const KEY = "cch_local_visits";
  let count = parseInt(localStorage.getItem(KEY) || "0", 10);
  if (Number.isNaN(count)) count = 0;
  count += 1;
  localStorage.setItem(KEY, String(count));

  el.textContent = "Your visits on this browser: " + count;
}

/* Init all */
document.addEventListener("DOMContentLoaded", () => {
  initProfitCalculator();
  initDcaCalculator();
  initPositionCalculator();
  initLocalVisitorCounter();
});

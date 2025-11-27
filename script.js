// Helper: parse number safely
function toNumber(value) {
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

// Render result text
function formatMoney(n) {
  return "$" + n.toFixed(2);
}

function formatPercent(n) {
  return n.toFixed(2) + "%";
}

// PROFIT CALCULATOR
document.getElementById("profit-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const asset = document.getElementById("profit-asset").value.trim() || "Asset";
  const investment = toNumber(
    document.getElementById("profit-investment").value
  );
  const entry = toNumber(document.getElementById("profit-entry").value);
  const exit = toNumber(document.getElementById("profit-exit").value);

  const box = document.getElementById("profit-result");

  if (investment === null || entry === null || exit === null || entry <= 0) {
    box.innerHTML =
      "<h3>Result</h3><p class='muted'>Please fill investment, entry and exit price with valid numbers.</p>";
    return;
  }

  const qty = investment / entry;
  const finalValue = qty * exit;
  const pnl = finalValue - investment;
  const pnlPct = (pnl / investment) * 100;

  const positive = pnl >= 0;
  const pnlClass = positive ? "result-positive" : "result-negative";
  const label = positive ? "profit" : "loss";

  box.innerHTML = `
    <h3>Result</h3>
    <p><strong>${asset}</strong></p>
    <p>Quantity: <strong>${qty.toFixed(6)}</strong></p>
    <p>Final value: <strong>${formatMoney(finalValue)}</strong></p>
    <p class="${pnlClass}">
      ${label.toUpperCase()}: <strong>${formatMoney(pnl)}</strong>
      (${formatPercent(pnlPct)})
    </p>
    <p class="muted small">
      Based on investing ${formatMoney(investment)} at ${entry} and closing at ${exit}.
    </p>
  `;
});

// DCA CALCULATOR
document.getElementById("dca-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const asset = document.getElementById("dca-asset").value.trim() || "Asset";
  const amount = toNumber(document.getElementById("dca-amount").value);
  const periods = toNumber(document.getElementById("dca-periods").value);
  const avg = toNumber(document.getElementById("dca-average").value);
  const current = toNumber(document.getElementById("dca-current").value);

  const box = document.getElementById("dca-result");

  if (
    amount === null ||
    periods === null ||
    avg === null ||
    current === null ||
    periods <= 0 ||
    avg <= 0
  ) {
    box.innerHTML =
      "<h3>Result</h3><p class='muted'>Please fill all fields with valid numbers.</p>";
    return;
  }

  const invested = amount * periods;
  const qty = invested / avg;
  const finalValue = qty * current;
  const pnl = finalValue - invested;
  const pnlPct = (pnl / invested) * 100;

  const positive = pnl >= 0;
  const pnlClass = positive ? "result-positive" : "result-negative";
  const label = positive ? "profit" : "loss";

  box.innerHTML = `
    <h3>Result</h3>
    <p><strong>${asset}</strong></p>
    <p>Total invested: <strong>${formatMoney(invested)}</strong></p>
    <p>Coins accumulated: <strong>${qty.toFixed(6)}</strong></p>
    <p>Value at current price: <strong>${formatMoney(finalValue)}</strong></p>
    <p class="${pnlClass}">
      ${label.toUpperCase()}: <strong>${formatMoney(pnl)}</strong>
      (${formatPercent(pnlPct)})
    </p>
    <p class="muted small">
      Simple DCA: ${formatMoney(amount)} per period × ${periods} periods at an
      average buy price of ${avg}.
    </p>
  `;
});

// POSITION SIZE CALCULATOR
document
  .getElementById("position-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const asset = document.getElementById("pos-asset").value.trim() || "Asset";
    const account = toNumber(document.getElementById("pos-account").value);
    const riskPct = toNumber(document.getElementById("pos-risk-pct").value);
    const entry = toNumber(document.getElementById("pos-entry").value);
    const stop = toNumber(document.getElementById("pos-stop").value);

    const box = document.getElementById("position-result");

    if (
      account === null ||
      riskPct === null ||
      entry === null ||
      stop === null ||
      account <= 0 ||
      riskPct <= 0 ||
      entry <= 0 ||
      stop <= 0
    ) {
      box.innerHTML =
        "<h3>Result</h3><p class='muted'>Please fill all fields with valid positive numbers.</p>";
      return;
    }

    const riskAmount = (account * riskPct) / 100;
    const perUnitRisk = Math.abs(entry - stop);

    if (perUnitRisk === 0) {
      box.innerHTML =
        "<h3>Result</h3><p class='muted'>Entry price and stop loss cannot be the same.</p>";
      return;
    }

    const size = riskAmount / perUnitRisk;
    const notional = size * entry;

    box.innerHTML = `
      <h3>Result</h3>
      <p><strong>${asset}</strong></p>
      <p>Max risk per trade: <strong>${formatMoney(riskAmount)}</strong> (${formatPercent(
      riskPct
    )} of account)</p>
      <p>Position size: <strong>${size.toFixed(4)} coins</strong></p>
      <p>Notional value: <strong>${formatMoney(notional)}</strong></p>
      <p class="muted small">
        Based on entry ${entry} and stop loss ${stop}.
      </p>
    `;
  });

// Smooth scroll for hero pills
document.querySelectorAll(".pill[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-scroll");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

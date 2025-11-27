// --- Helper: format number nicely ---
function fmt(x) {
    return Number(x).toLocaleString(undefined, { maximumFractionDigits: 8 });
}

// ===============================
// 1. PROFIT CALCULATOR
// ===============================
function calculateProfit() {
    const asset = document.getElementById("profit-asset")?.value || "";
    const investment = parseFloat(document.getElementById("profit-investment")?.value);
    const entry = parseFloat(document.getElementById("profit-entry")?.value);
    const exit = parseFloat(document.getElementById("profit-exit")?.value);

    if (isNaN(investment) || isNaN(entry) || isNaN(exit)) {
        alert("Please fill all fields correctly.");
        return;
    }

    const quantity = investment / entry;
    const finalValue = quantity * exit;
    const profit = finalValue - investment;
    const profitPct = (profit / investment) * 100;

    document.getElementById("profit-result").innerHTML = `
        <p><b>Asset:</b> ${asset || "-"}</p>
        <p><b>Quantity:</b> ${fmt(quantity)}</p>
        <p><b>Final value:</b> ${fmt(finalValue)}</p>
        <p><b>Profit / Loss:</b> ${fmt(profit)} (${profitPct.toFixed(2)}%)</p>
    `;
}

// ===============================
// 2. DCA CALCULATOR
// ===============================
function calculateDCA() {
    const asset = document.getElementById("dca-asset")?.value || "";
    const amount = parseFloat(document.getElementById("dca-amount")?.value);
    const periods = parseFloat(document.getElementById("dca-periods")?.value);
    const avgPrice = parseFloat(document.getElementById("dca-avgprice")?.value);
    const current = parseFloat(document.getElementById("dca-current")?.value);

    if (isNaN(amount) || isNaN(periods) || isNaN(avgPrice) || isNaN(current)) {
        alert("Please fill all fields correctly.");
        return;
    }

    const totalInvested = amount * periods;
    const quantity = totalInvested / avgPrice;
    const finalValue = quantity * current;
    const profit = finalValue - totalInvested;
    const profitPct = (profit / totalInvested) * 100;

    document.getElementById("dca-result").innerHTML = `
        <p><b>Asset:</b> ${asset || "-"}</p>
        <p><b>Total invested:</b> ${fmt(totalInvested)}</p>
        <p><b>Quantity accumulated:</b> ${fmt(quantity)}</p>
        <p><b>Final value:</b> ${fmt(finalValue)}</p>
        <p><b>Profit / Loss:</b> ${fmt(profit)} (${profitPct.toFixed(2)}%)</p>
    `;
}

// ===============================
// 3. POSITION SIZE CALCULATOR
// ===============================
function calculatePositionSize() {
    const account = parseFloat(document.getElementById("pos-account")?.value);
    const riskPct = parseFloat(document.getElementById("pos-riskpct")?.value);
    const entry = parseFloat(document.getElementById("pos-entry")?.value);
    const stop = parseFloat(document.getElementById("pos-stop")?.value);

    if (isNaN(account) || isNaN(riskPct) || isNaN(entry) || isNaN(stop) || stop >= entry) {
        alert("Please fill all fields correctly. Stop-loss must be lower than entry.");
        return;
    }

    const riskAmount = account * (riskPct / 100);
    const stopDistance = entry - stop;
    const positionSize = riskAmount / stopDistance;
    const notionalValue = positionSize * entry;

    document.getElementById("pos-result").innerHTML = `
        <p><b>Risk amount:</b> ${fmt(riskAmount)} (which is ${riskPct}% of account)</p>
        <p><b>Position size:</b> ${fmt(positionSize)} units</p>
        <p><b>Notional value:</b> ${fmt(notionalValue)}</p>
    `;
}

// ===============================
// Attach event listeners
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    // Profit calculator button
    const btnProfit = document.getElementById("btn-profit");
    if (btnProfit) btnProfit.addEventListener("click", calculateProfit);

    // DCA calculator button
    const btnDCA = document.getElementById("btn-dca");
    if (btnDCA) btnDCA.addEventListener("click", calculateDCA);

    // Position size calculator button
    const btnPos = document.getElementById("btn-pos");
    if (btnPos) btnPos.addEventListener("click", calculatePositionSize);
});

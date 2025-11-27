// ===== PROFIT CALCULATOR =====
const profitForm = document.getElementById("profit-form");
const profitResult = document.getElementById("profit-result");

profitForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("profit-amount").value);
    const buy = parseFloat(document.getElementById("profit-buy").value);
    const sell = parseFloat(document.getElementById("profit-sell").value);

    if (amount > 0 && buy > 0 && sell > 0) {
        const quantity = amount / buy;
        const finalValue = quantity * sell;
        const profit = finalValue - amount;
        const percent = (profit / amount) * 100;

        profitResult.innerHTML = `
            <p><strong>Quantity:</strong> ${quantity.toFixed(6)}</p>
            <p><strong>Final Value:</strong> $${finalValue.toFixed(2)}</p>
            <p><strong>Profit:</strong> ${profit >= 0 ? "+" : ""}${profit.toFixed(2)} USD (${percent.toFixed(2)}%)</p>
        `;
    } else {
        profitResult.innerHTML = "<p>Please enter valid numbers.</p>";
    }
});

// ===== DCA CALCULATOR =====
const dcaForm = document.getElementById("dca-form");
const dcaResult = document.getElementById("dca-result");

dcaForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("dca-amount").value);
    const periods = parseInt(document.getElementById("dca-periods").value);
    const avgPrice = parseFloat(document.getElementById("dca-price").value);

    if (amount > 0 && periods > 0 && avgPrice > 0) {
        const totalInvested = amount * periods;
        const totalCoins = totalInvested / avgPrice;

        dcaResult.innerHTML = `
            <p><strong>Total Invested:</strong> $${totalInvested.toFixed(2)}</p>
            <p><strong>Total Coins:</strong> ${totalCoins.toFixed(6)}</p>
            <p><strong>Average Buy Price:</strong> $${avgPrice.toFixed(2)}</p>
        `;
    } else {
        dcaResult.innerHTML = "<p>Please enter valid numbers.</p>";
    }
});

// ===== POSITION SIZE CALCULATOR =====
const sizeForm = document.getElementById("size-form");
const sizeResult = document.getElementById("size-result");

sizeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const balance = parseFloat(document.getElementById("size-balance").value);
    const risk = parseFloat(document.getElementById("size-risk").value);
    const stop = parseFloat(document.getElementById("size-stop").value);

    if (balance > 0 && risk > 0 && stop > 0) {
        const riskAmount = (balance * risk) / 100;
        const positionSize = riskAmount / stop;

        sizeResult.innerHTML = `
            <p><strong>Risk Amount:</strong> $${riskAmount.toFixed(2)}</p>
            <p><strong>Position Size:</strong> ${positionSize.toFixed(4)} units</p>
        `;
    } else {
        sizeResult.innerHTML = "<p>Please enter valid numbers.</p>";
    }
});

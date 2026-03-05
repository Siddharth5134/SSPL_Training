document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const customRateInput = document.getElementById('customRate');
    const rateButtons = document.querySelectorAll('.rate-btn');
    const taxModeSwitch = document.getElementById('taxMode');

    const netAmountDisplay = document.getElementById('netAmount');
    const taxAmountDisplay = document.getElementById('taxAmount');
    const totalAmountDisplay = document.getElementById('totalAmount');
    const taxLabel = document.getElementById('taxLabel');
    const cgstDisplay = document.getElementById('cgst');
    const sgstDisplay = document.getElementById('sgst');

    let currentRate = 18;

    // Set default active button
    rateButtons.forEach(btn => {
        if (btn.dataset.rate == currentRate) btn.classList.add('active');
    });

    function calculate() {
        const amount = parseFloat(amountInput.value) || 0;
        const rate = parseFloat(customRateInput.value) || currentRate;
        const isInclusive = taxModeSwitch.checked;

        let netAmount, taxAmount, totalAmount;

        if (isInclusive) {
            // Formula for GST Inclusive: GST = Total - (Total / (1 + Rate/100))
            totalAmount = amount;
            netAmount = totalAmount / (1 + rate / 100);
            taxAmount = totalAmount - netAmount;
        } else {
            // Formula for GST Exclusive: GST = Amount * (Rate/100)
            netAmount = amount;
            taxAmount = netAmount * (rate / 100);
            totalAmount = netAmount + taxAmount;
        }

        const cgst = taxAmount / 2;
        const sgst = taxAmount / 2;

        updateDisplay(netAmount, taxAmount, totalAmount, cgst, sgst, rate);
    }

    function updateDisplay(net, tax, total, cgst, sgst, rate) {
        netAmountDisplay.innerText = formatCurrency(net);
        taxAmountDisplay.innerText = formatCurrency(tax);
        totalAmountDisplay.innerText = formatCurrency(total);
        cgstDisplay.innerText = formatCurrency(cgst);
        sgstDisplay.innerText = formatCurrency(sgst);
        taxLabel.innerText = `GST (${rate}%):`;
    }

    function formatCurrency(v) {
        return '₹ ' + v.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Event Listeners
    amountInput.addEventListener('input', calculate);
    customRateInput.addEventListener('input', () => {
        rateButtons.forEach(b => b.classList.remove('active'));
        calculate();
    });

    rateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentRate = parseFloat(btn.dataset.rate);
            customRateInput.value = '';
            rateButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            calculate();
        });
    });

    taxModeSwitch.addEventListener('change', calculate);
});

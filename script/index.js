
// Input fields
const carType = document.getElementById('car-type');            // Input field for selecting car type (Brand New or Used)
const carValue = document.getElementById('car-value');          // Input field for entering car value
const carValueRange = document.getElementById('car-value-range');// Range input synced with car value input
const leasePeriod = document.getElementById('lease-period');     // Input field for selecting lease period in months
const downPayment = document.getElementById('down-payment');     // Input field for entering down payment percentage
const downPaymentRange = document.getElementById('down-payment-range');  // Range input synced with down payment input


// Output fields
const totalCost = document.getElementById('total-cost');   // Output field to display total leasing cost
const downPaymentValue = document.getElementById('down-payment-value');   // Output field to display calculated down payment amount
const monthlyInstallment = document.getElementById('monthly-installment');   // Output field to display monthly installment amount
const interestRateDisplay = document.getElementById('interest-rate');   // Output field to display interest rate


/**
 * Synchronizes an input field with a range input and triggers the calculation function.
 * @param {HTMLInputElement} inputElement - Input field element to sync with range.
 * @param {HTMLInputElement} rangeElement - Range input element to sync with input field.
 * @param {number} min - Minimum allowed value for synchronization.
 * @param {number} max - Maximum allowed value for synchronization.
 */
function syncInputWithRange(inputElement, rangeElement, min, max) {


    inputElement.addEventListener('change', () => {
        let value = parseFloat(inputElement.value.replace(/,/g, ''));

        if (!isNaN(value) && value >= min && value <= max) {
            rangeElement.value = value;
        }
        calculate();
    });

    rangeElement.addEventListener('input', () => {
        let value = parseFloat(rangeElement.value.replace(/,/g, ''));
        if (!isNaN(value) && value >= min && value <= max) {
            inputElement.value = rangeElement.value;
        }
        calculate();
    })
}


/**
 * Validates the input fields related to car leasing and displays error messages if validation fails.
 */
function validateInputs() {

    let errorMessages = [];

    const carTypes = ['Brand New', 'Used'];
    const validLeasePeriods = [12, 24, 36, 48, 60];

    const carValueAmount = parseFloat(carValue.value.replace(/,/g, ''));

    if (isNaN(carValueAmount)) {
        carValue.value = 100000
    }
    if (carValueAmount < 10000 || carValueAmount > 200000) {
        carValue.value = 100000
    }


    const downPaymentPercent = parseFloat(downPayment.value.replace(/,/g, ''));

    if (isNaN(downPaymentPercent)) {
        downPayment.value = 25
    }
    if (downPaymentPercent < 10 || downPayment > 50) {
        downPayment.value = 25
    }
    const currentCarType = carType.value;
    if (!carTypes.includes(currentCarType)) {
        errorMessages.push('Please select a car type!')
    }

    const leaseMonths = parseInt(leasePeriod.value);
    if (!validLeasePeriods.includes(leaseMonths)) {
        errorMessages.push('Please select a car type!')
    }

    if (errorMessages.length) {
        alert(errorMessages.join('\n'));
    }

}


/**
 * Calculates the total leasing cost, monthly installment, down payment amount,
 * and updates the respective output fields.
 */
function calculate() {
    validateInputs();
    const carValueAmount = parseFloat(carValue.value.replace(/,/g, ''));
    const downPaymentPercent = parseFloat(downPayment.value.replace(/,/g, ''));
    const leaseMonths = parseFloat(leasePeriod.value);
    const isCarNew = carType.value === 'Brand New';
    const interesRate = isCarNew ? 2.99 : 3.7;

    const downPaymentAmount = (carValueAmount * downPaymentPercent) / 100;
    const loanAmount = carValueAmount - downPaymentAmount;
    const monthlyInteresRate = (interesRate / 100) / 12;
    const monthlyInstallmentAmount = (loanAmount * monthlyInteresRate) / (1 - Math.pow(1 + monthlyInteresRate, -leaseMonths));
    const totalLeasingCost = (monthlyInstallmentAmount * leaseMonths) + downPaymentAmount;

    totalCost.textContent = totalLeasingCost.toFixed(2);
    downPaymentValue.textContent = downPaymentAmount.toFixed(2);
    monthlyInstallment.textContent = monthlyInstallmentAmount.toFixed(2);
    interestRateDisplay.textContent = interesRate;
}

// Initial synchronization and event listeners setup
syncInputWithRange(carValue, carValueRange, 10000, 200000);
syncInputWithRange(downPayment, downPaymentRange, 10, 50);

carType.addEventListener('change', calculate);
leasePeriod.addEventListener('change', calculate);

// Calculate initial values on page load
calculate();


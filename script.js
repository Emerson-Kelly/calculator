document.addEventListener('DOMContentLoaded', function () {
// Get the elements
const screen = document.getElementById('screen');
const keys = document.querySelectorAll('.calculator-key');

// Initialize the calculator object
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
};


// Update the display
function updateDisplay() {
    screen.textContent = calculator.displayValue;
}


 // Handle digit input
 function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    
    if (waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue =
            displayValue === '0' ? digit : displayValue + digit;    
    }
}

 // Handle key clicks
 keys.forEach((key) => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;

        if (/\d/.test(keyValue)) {
            inputDigit(keyValue);
            updateDisplay();
            console.table(calculator); // CALCULATOR OBJECT TEST
        } else if (/\+|-|\*|\//.test(keyValue)) {
            inputOperator(keyValue);
            console.table(calculator); // CALCULATOR OBJECT TEST
        } else if (keyValue === '=') {
            inputOperator('=');
            updateDisplay();
            console.table(calculator); // CALCULATOR OBJECT TEST
        } else if (keyValue === 'AC') {
            calculator.displayValue = '0';
            calculator.firstOperand = null;
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
            updateDisplay();
            console.table(calculator); // CALCULATOR OBJECT TEST
        }
    });
    
});




});
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

/*

inputOperator needs to be defined
Multiplication and division value from const keyValue = key.textContent; may be an issue

*/

// Handle operator input
function inputOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;

    // Only set the operator if it's not the equal sign
    if (nextOperator !== '=') {
        calculator.operator = nextOperator;
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
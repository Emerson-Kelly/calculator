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

// Handle operator input
function inputOperator(nextOperator) {
    const { displayValue, firstOperand, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (nextOperator === '+/-') {
        calculator.displayValue = String(inputValue * -1);
        console.log(calculator.displayValue);
        return;
    }

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
    calculator.operator = nextOperator;
}

 // Perform calculations
 const performCalculation = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '%': (x, y) => x % y,
};

 // Handle key clicks
 keys.forEach((key) => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;
        if (keyValue === '+/-') {
            console.log(keyValue);
           
            inputOperator('+/-');
            updateDisplay();
        }
       
        else if (keyValue === 'x'){
            inputOperator('*');
        }

        else if (keyValue === '÷'){
            inputOperator('/');
        }
        else if (/\d/.test(keyValue)) {
            inputDigit(keyValue);
            updateDisplay();
            console.table(calculator); // CALCULATOR OBJECT TEST
        } else if (/\+|-|\*|\/|%/.test(keyValue)) {
          
            inputOperator(keyValue);
            console.log("test"); //TEST
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